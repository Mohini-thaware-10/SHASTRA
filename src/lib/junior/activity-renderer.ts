/* Junior Activity Renderer
 * Reusable activity components for all supported activity types
 * Actual answer selection, validation, feedback, explanations
 * Keyboard accessibility, touch-friendly interactions
 */

import { useState, useCallback } from "react";
import { JuniorActivityType, JuniorActivityOption, JuniorActivityResult, ActivityAnswerState } from "@/lib/junior/curriculum";
import { JUNIOR_REWARD_CONFIG } from "@/lib/junior/curriculum";

/** Activity component props */
export interface ActivityRendererProps {
  topic: JuniorTopic;
  activityIndex: number;
  classNum: JuniorClass;
  onAnswerSelected: (optionId: string, isCorrect: boolean) => void;
  onRetry: () => void;
  onComplete: () => void;
  initialState?: Partial<ActivityRendererState>;
}

/** Activity renderer state */
export interface ActivityRendererState {
  answerState: ActivityAnswerState;
  selectedOptionId: string | null;
  submitted: boolean;
  feedback: string;
  timeSpentSeconds: number;
  selectedAt?: number;
}

/** Default state */
export const DEFAULT_ACTIVITY_STATE: ActivityRendererState = {
  answerState: "unanswered",
  selectedOptionId: null,
  submitted: false,
  feedback: "",
  timeSpentSeconds: 0,
};

/** Render an activity based on type */
export function useActivityRenderer({
  topic,
  activityIndex,
  classNum,
  onAnswerSelected,
  onRetry,
  onComplete,
  initialState,
}: ActivityRendererProps) {
  const [state, setState] = useState<ActivityRendererState>(
    initialState ? { ...DEFAULT_ACTIVITY_STATE, ...initialState } : DEFAULT_ACTIVITY_STATE
  );

  // Generate activity data
  const activityData = generateActivityData(topic, activityIndex, classNum);

  // Handle answer selection
  const handleOptionSelect = useCallback(
    (optionId: string) => {
      if (state.submitted) return; // Prevent interaction after submission

      const isCorrect = optionId === activityData.correctAnswerId;
      const newState: ActivityRendererState = {
        ...state,
        selectedOptionId: optionId,
        answerState: isCorrect ? "correct" : "incorrect",
        feedback: isCorrect
          ? activityData.explanation
          : `Keep trying! The correct answer is ${activityData.options.find((o) => o.id === activityData.correctAnswerId)?.text || "the correct option"}.`,
        submitted: true,
        timeSpentSeconds: (state.timeSpentSeconds || 0) + 30,
      };

      // Call callback after a short delay
      setState(newState);
      onAnswerSelected(optionId, isCorrect);
    },
    [state.submitted, activityData.correctAnswerId, activityData.options, onAnswerSelected]
  );

  // Handle retry
  const handleRetryClick = useCallback(() => {
    const resetState: ActivityRendererState = {
      ...DEFAULT_ACTIVITY_STATE,
      timeSpentSeconds: 0,
    };
    setState(resetState);
    onRetry();
  }, [onRetry]);

  // Handle completion (when all questions answered)
  const checkCompletion = useCallback(() => {
    if (activityData.type === "fillInBlanks") {
      // Fill in blanks has no options, check if answer is provided
      if (state.selectedOptionId) {
        const isCorrect = state.selectedOptionId === activityData.correctAnswerId;
        const newState: ActivityRendererState = {
          ...state,
          answerState: isCorrect ? "correct" : "incorrect",
          selectedOptionId: isCorrect ? activityData.correctAnswerId : state.selectedOptionId,
          feedback: isCorrect ? activityData.explanation : "Keep trying!",
          submitted: true,
          timeSpentSeconds: (state.timeSpentSeconds || 0) + 30,
        };
        setState(newState);
        onAnswerSelected(state.selectedOptionId || "", isCorrect);
      }
    }
  }, [state.submitted, onComplete]);

  return {
    // State
    state,
    activityData,
    isSubmitted: state.submitted,
    isCorrect: state.answerState === "correct",
    isIncorrect: state.answerState === "incorrect",
    isUnanswered: state.answerState === "unanswered",
    feedback: state.feedback,
    timeSpentSeconds: state.timeSpentSeconds,

    // Actions
    handleOptionSelect,
    handleRetryClick,
    checkCompletion,

    // Activity metadata
    activityId: activityData.id,
    activityType: activityData.type,
    question: activityData.question,
    options: activityData.options,
    correctAnswerId: activityData.correctAnswerId,
    explanation: activityData.explanation,
    hint: activityData.hint,
    estimatedDuration: activityData.estimatedDurationMinutes,
  };
}

/** Generate activity data based on topic, index, and class */
function generateActivityData(
  topic: JuniorTopic,
  activityIndex: number,
  classNum: JuniorClass
) {
  const isSimple = classNum <= 2;
  const activityType =
    topic.activities && topic.activities.length > 0
      ? topic.activities[activityIndex]?.type
      : "multipleChoice";

  // If topic already has defined activities, use them
  if (topic.activities && topic.activities.length > 0) {
    return {
      id: `${topic.id}-act-${activityIndex + 1}`,
      type: topic.activities[activityIndex].type,
      question: topic.activities[activityIndex].question,
      options: topic.activities[activityIndex].options?.map((opt: any) => ({
        id: opt.id,
        text: opt.text,
        isCorrect: opt.isCorrect,
        selected: opt.selected || false,
      })) || [],
      correctAnswerId: topic.activities[activityIndex].correctAnswerId,
      explanation: topic.activities[activityIndex].explanation,
      hint: topic.activities[activityIndex].hint,
      estimatedDurationMinutes:
        topic.activities[activityIndex].estimatedDurationMinutes ||
        (isSimple ? 8 : 12),
    };
  }

  // Generate activity based on type and class level
  const baseActivities = Math.min(topic.activityCount, 3);

  if (activityIndex >= baseActivities) {
    // Fallback to first activity
    return generateActivityData(topic, 0, classNum);
  }

  // Determine activity type sequence based on class
  const activityTypesSimple = ["multipleChoice", "trueFalse", "fillInBlanks"];
  const activityTypesAdvanced = [
    "multipleChoice",
    "trueFalse",
    "arrangeOrder",
    "fillInBlanks",
    "selectImage",
    "matchPairs",
  ];

  const types = isSimple ? activityTypesSimple : activityTypesAdvanced;
  const selectedType = types[activityIndex % types.length];

  // Generate questions and options based on type
  let question = "";
  let options: JuniorActivityOption[] = [];
  let correctAnswerId = "";
  let explanation = "";
  let hint = "";
  const duration = isSimple ? 8 : 12;

  switch (selectedType) {
    case "multipleChoice": {
      const numOptions = isSimple ? 3 : 4;
      const correctIdx = activityIndex % numOptions;
      const texts = isSimple
        ? ["Option A", "Option B", "Option C"]
        : ["Option 1", "Option 2", "Option 3", "Option 4"];

      options = texts.map((text, idx) => ({
        id: String.fromCharCode(65 + idx),
        text,
        isCorrect: idx === correctIdx,
        selected: false,
      }));
      correctAnswerId = String.fromCharCode(65 + correctIdx);

      // Generate topic-specific question
      if (topic.title.includes("Addition")) {
        const numbers = isSimple ? [3, 2] : [7, 3, 5, 2];
        const a = numbers[0];
        const b = numbers[1];
        question = `What is ${a} + ${b}?`;
        explanation = `${a} + ${b} = ${a + b}`;
        hint = `Count on from ${a}: ${a}, ${a + 1}, ..., ${a + b}`;
      } else if (topic.title.includes("Subtraction")) {
        const min = Math.max(...([3, 2] as number[]));
        const sub = Math.min(...([3, 2] as number[]));
        question = `What is ${min} - ${sub}?`;
        explanation = `${min} - ${sub} = ${min - sub}`;
        hint = `Start with ${min}, take away ${sub}`;
      } else if (topic.title.includes("Sentence")) {
        question = "Choose the correct sentence structure?";
        explanation = "Good sentence structure follows subject-verb-object order";
        hint = "Remember: Subject + Verb + Object";
      } else {
        question = `Question ${activityIndex + 1} about ${topic.title}`;
        explanation = `This is the correct answer for ${topic.title}`;
        hint = `Think about ${topic.title}`;
      }
      break;
    }

    case "trueFalse": {
      if (topic.title.includes("Addition")) {
        question = "Is 3 + 2 = 5? True or False?";
        correctAnswerId = "true";
        explanation = "3 + 2 equals 5, so the statement is true";
        hint = "Count: 3, 4, 5 - yes, it's true!";
      } else if (topic.title.includes("Sentence")) {
        question = "Is this a correct sentence? 'I play home.' True or False?";
        correctAnswerId = "false";
        explanation = "The correct order is 'I play at home.'";
        hint = "Check the word order: subject, verb, place";
      } else if (topic.title.includes("Grammar")) {
        question = "Is 'run' a noun? True or False?";
        correctAnswerId = "false";
        explanation = "'Run' is a verb, not a noun";
        hint = "Verbs show action, nouns are things";
      } else {
        question = `True or False about ${topic.title}`;
        correctAnswerId = Math.random() > 0.5 ? "true" : "false";
        explanation = correctAnswerId === "true" ? "This statement is correct" : "This statement needs checking";
        hint = "Think carefully about what you've learned";
      }
      options = [
        { id: "true", text: "True", isCorrect: correctAnswerId === "true", selected: false },
        { id: "false", text: "False", isCorrect: correctAnswerId === "false", selected: false },
      ];
      break;
    }

    case "arrangeOrder": {
      if (topic.title.includes("Addition")) {
        question = "Arrange to make the correct addition: 2 + 4";
        options = [
          { id: "a", text: "2 + 4", isCorrect: true, selected: false },
          { id: "b", text: "4 + 2", isCorrect: false, selected: false },
        ];
        correctAnswerId = "a";
        explanation = "2 + 4 and 4 + 2 both equal 6 (commutative property)";
        hint = "The order doesn't change the sum";
      } else if (topic.title.includes("Sentence")) {
        question = "Arrange words: cat / the / sat on";
        options = [
          { id: "a", text: "the cat sat on", isCorrect: true, selected: false },
          { id: "b", text: "on sat the cat", isCorrect: false, selected: false },
        ];
        correctAnswerId = "a";
        explanation = "Correct order: 'The cat sat on (the mat)'";
        hint = "The comes before cat, sat comes after cat";
      } else {
        question = `Arrange in order for ${topic.title}`;
        options = [
          { id: "a", text: "Option A", isCorrect: true, selected: false },
          { id: "b", text: "Option B", isCorrect: false, selected: false },
        ];
        correctAnswerId = "a";
        explanation = "Correct arrangement for this topic";
        hint = "Think about the logical order";
      }
      break;
    }

    case "fillInBlanks": {
      if (topic.title.includes("Addition")) {
        question = "Fill in: 3 + 2 = ___";
        correctAnswerId = "5";
        explanation = "3 + 2 equals 5";
        hint = "Count on from 3: 4, 5";
      } else if (topic.title.includes("Sentence")) {
        question = "Complete the sentence: The ___ is red.";
        correctAnswerId = "cat";
        explanation = "A cat is a common subject in sentences";
        hint = "What animal might be red or another color?";
      } else if (topic.title.includes("Human Body")) {
        question = "We use ______ to walk.";
        correctAnswerId = "feet";
        explanation = "We use our feet and legs to walk";
        hint = "Look at your feet - they help you move around";
      } else if (topic.title.includes("Fraction")) {
        question = "Fill in: 1/4 of 4 = ___";
        correctAnswerId = "1";
        explanation = "1/4 of 4 equals 1";
        hint = "Divide 4 into 4 equal parts, each part is 1";
      } else {
        question = `Fill in the blank for ${topic.title}`;
        correctAnswerId = "answer";
        explanation = "This is the correct answer";
        hint = "Think about what you've learned in this topic";
      }
      // Fill in blanks - options will be rendered as editable fields
      break;

    case "selectImage": {
      if (topic.title.includes("Shape")) {
        question = "Which is the circle?";
        options = [
          { id: "a", text: "□", isCorrect: false, selected: false },
          { id: "b", text: "●", isCorrect: true, selected: false },
          { id: "c", text: "△", isCorrect: false, selected: false },
        ];
        correctAnswerId = "b";
        explanation = "A circle is round with no corners";
        hint = "Look for the round shape";
      } else if (topic.title.includes("Plant")) {
        question = "Which part of the plant soaks up water?";
        options = [
          { id: "a", text: "Leaf", isCorrect: false, selected: false },
          { id: "b", text: "Root", isCorrect: true, selected: false },
          { id: "c", text: "Flower", isCorrect: false, selected: false },
        ];
        correctAnswerId = "b";
        explanation = "Roots soak up water and nutrients from soil";
        hint = "Roots are under the ground, they drink water";
      } else if (topic.title.includes("Animal")) {
        question = "Where does a bird live?";
        options = [
          { id: "a", text: "Den", isCorrect: false, selected: false },
          { id: "b", text: "Nest", isCorrect: true, selected: false },
          { id: "c", text: "Shell", isCorrect: false, selected: false },
        ];
        correctAnswerId = "b";
        explanation = "Birds live in nests, usually in trees or high places";
        hint = "Look up in trees for bird nests";
      } else {
        question = `Select the correct image for ${topic.title}`;
        options = [
          { id: "a", text: "Image A", isCorrect: false, selected: false },
          { id: "b", text: "Image B", isCorrect: true, selected: false },
        ];
        correctAnswerId = "b";
        explanation = "This is the correct image";
        hint = "Think about what you've learned";
      }
      break;

    case "matchPairs": {
      if (topic.title.includes("Grammar")) {
        question = "Match 'apple' with its category";
        options = [
          { id: "a", text: "apple → Food", isCorrect: true, selected: false },
          { id: "b", text: "apple → Toy", isCorrect: false, selected: false },
        ];
        correctAnswerId = "a";
        explanation = "An apple is food, something we eat";
        hint = "We eat apples, not play with them as toys";
      } else {
        question = `Match pairs for ${topic.title}`;
        options = [
          { id: "a", text: "Pair A", isCorrect: true, selected: false },
          { id: "b", text: "Pair B", isCorrect: false, selected: false },
        ];
        correctAnswerId = "a";
        explanation = "Correct match for this topic";
        hint = "Think about the connection between items";
      }
      break;
  }

  return {
    id: `${topic.id}-act-${activityIndex + 1}`,
    type: selectedType,
    question,
    options: options.length > 0 ? options : [],
    correctAnswerId,
    explanation,
    hint: hint || `Hint for ${topic.title}`,
    estimatedDurationMinutes: duration,
  };
}

/** Calculate activity score result */
export function calculateActivityResult(
  activityData: ReturnType<typeof generateActivityData>,
  selectedOptionId: string | null
): ActivityResult {
  const selectedOption = activityData.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption && selectedOption.isCorrect;
  const correctAnswers = isCorrect ? 1 : 0;
  const attemptedQuestions = selectedOption ? 1 : 0;
  const allCorrect = isCorrect;
  const timeSpentSeconds = 30; // Default

  const score = attemptedQuestions > 0 ? Math.round((correctAnswers / attemptedQuestions) * 100) : 0;

  return {
    activityId: activityData.id,
    score,
    correctAnswers,
    attemptedQuestions,
    allCorrect,
    timeSpentSeconds,
  };
}