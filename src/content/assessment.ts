export type QuestionType =
  | "multiple-choice"
  | "multiple-select"
  | "true-false"
  | "fill-in-the-blank"
  | "short-answer";

export type DifficultyLevel = "easy" | "medium" | "hard";

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionBase {
  id: string;
  classLevel: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
  board: "CBSE" | "ICSE" | "State Board" | "IB" | "Other";
  subject: string;
  topic: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  questionText: string;
  explanation: string;
  marks: number;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  questionType: "multiple-choice";
  options: QuestionOption[];
  correctAnswerId: string;
}

export interface MultipleSelectQuestion extends QuestionBase {
  questionType: "multiple-select";
  options: QuestionOption[];
  correctAnswerIds: string[];
}

export interface TrueFalseQuestion extends QuestionBase {
  questionType: "true-false";
  correctAnswer: "true" | "false";
}

export interface FillInTheBlankQuestion extends QuestionBase {
  questionType: "fill-in-the-blank";
  correctAnswer: string;
  acceptedAnswers: string[]; // normalized acceptable answers
}

export interface ShortAnswerQuestion extends QuestionBase {
  questionType: "short-answer";
  correctAnswer: string;
  acceptedAnswers: string[]; // normalized acceptable answers
}

export type AssessmentQuestion =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | TrueFalseQuestion
  | FillInTheBlankQuestion
  | ShortAnswerQuestion;

export interface AssessmentSubject {
  id: string;
  name: string;
  topics: string[];
}

export interface AssessmentClassData {
  classLevel: string;
  board: string;
  subjects: AssessmentSubject[];
}

// Mock assessment questions covering all types and difficulty levels
// Questions are organized by class level and subject

export const mockQuestions: AssessmentQuestion[] = [
  // Class 4 - Junior universe
  {
    id: "q4-1",
    classLevel: "4",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Fractions",
    difficulty: "easy",
    questionType: "multiple-choice",
    questionText: "What is 1/2 + 1/4?",
    options: [
      { id: "a", text: "1/6" },
      { id: "b", text: "1/4" },
      { id: "c", text: "3/4" },
      { id: "d", text: "2/4" },
    ],
    correctAnswerId: "c",
    explanation: "1/2 = 2/4, so 2/4 + 1/4 = 3/4",
    marks: 1,
  },
  {
    id: "q4-2",
    classLevel: "4",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Fractions",
    difficulty: "medium",
    questionType: "multiple-select",
    questionText: "Which of the following are equivalent to 1/2?",
    options: [
      { id: "a", text: "2/4" },
      { id: "b", text: "3/6" },
      { id: "c", text: "4/8" },
      { id: "d", text: "5/10" },
    ],
    correctAnswerIds: ["a", "b", "c", "d"],
    explanation: "All these fractions simplify to 1/2",
    marks: 1,
  },
  {
    id: "q4-3",
    classLevel: "4",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Fractions",
    difficulty: "easy",
    questionType: "true-false",
    questionText: "2/3 is greater than 1/2",
    correctAnswer: "true",
    explanation: "2/3 = 4/6 and 1/2 = 3/6, so 4/6 > 3/6",
    marks: 1,
  },
  {
    id: "q4-4",
    classLevel: "4",
    board: "CBSE",
    subject: "EVS",
    topic: "Food chains",
    difficulty: "medium",
    questionType: "fill-in-the-blank",
    questionText: "A food chain always starts with a _______.",
    correctAnswer: "producer",
    acceptedAnswers: ["producer", "green plant"],
    explanation: "Food chains start with organisms that make their own food",
    marks: 1,
  },
  {
    id: "q4-5",
    classLevel: "4",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Geometry",
    difficulty: "hard",
    questionType: "short-answer",
    questionText: "How many sides does a hexagon have?",
    correctAnswer: "6",
    acceptedAnswers: ["6", "six"],
    explanation: "A hexagon is a polygon with 6 sides",
    marks: 1,
  },

  // Class 8 - Nexus universe
  {
    id: "q8-1",
    classLevel: "8",
    board: "CBSE",
    subject: "Science",
    topic: "Cell Structure",
    difficulty: "easy",
    questionType: "multiple-choice",
    questionText: "Which organelle is the 'powerhouse' of the cell?",
    options: [
      { id: "a", text: "Mitochondria" },
      { id: "b", text: "Nucleus" },
      { id: "c", text: "Ribosome" },
      { id: "d", text: "Cell membrane" },
    ],
    correctAnswerId: "a",
    explanation: "Mitochondria generate energy for the cell through cellular respiration",
    marks: 1,
  },
  {
    id: "q8-2",
    classLevel: "8",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Algebra",
    difficulty: "medium",
    questionType: "multiple-select",
    questionText: "Which of the following are like terms?",
    options: [
      { id: "a", text: "3x" },
      { id: "b", text: "5x" },
      { id: "c", text: "3y" },
      { id: "d", text: "7" },
    ],
    correctAnswerIds: ["a", "b"],
    explanation: "3x and 5x are like terms because they have the same variable x",
    marks: 1,
  },
  {
    id: "q8-3",
    classLevel: "8",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Geometry",
    difficulty: "easy",
    questionType: "true-false",
    questionText: "The sum of interior angles of a triangle is 180°",
    correctAnswer: "true",
    explanation: "This is a fundamental property of triangles",
    marks: 1,
  },
  {
    id: "q8-4",
    classLevel: "8",
    board: "CBSE",
    subject: "Science",
    topic: "Force and Pressure",
    difficulty: "medium",
    questionType: "fill-in-the-blank",
    questionText: "Force is measured in _______.",
    correctAnswer: "newtons",
    acceptedAnswers: ["newtons", "N"],
    explanation: "The SI unit of force is the newton",
    marks: 1,
  },
  {
    id: "q8-5",
    classLevel: "8",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Data Handling",
    difficulty: "hard",
    questionType: "short-answer",
    questionText: "What is the median of the data set: 3, 7, 2, 9, 5?",
    correctAnswer: "5",
    acceptedAnswers: ["5", "five"],
    explanation: "Arranging in order: 2, 3, 5, 7, 9. The middle value is 5.",
    marks: 1,
  },

  // Class 11 Science - Ascend universe
  {
    id: "q11s-1",
    classLevel: "11",
    board: "CBSE",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "easy",
    questionType: "multiple-choice",
    questionText: "What is the SI unit of work?",
    options: [
      { id: "a", text: "Joule" },
      { id: "b", text: "Newton" },
      { id: "c", text: "Watt" },
      { id: "d", text: "Pascal" },
    ],
    correctAnswerId: "a",
    explanation: "Work is measured in joules in the SI system",
    marks: 1,
  },
  {
    id: "q11s-2",
    classLevel: "11",
    board: "CBSE",
    subject: "Chemistry",
    topic: "Chemical Bonding",
    difficulty: "medium",
    questionType: "multiple-select",
    questionText: "Which of the following are ionic compounds?",
    options: [
      { id: "a", text: "NaCl" },
      { id: "b", text: "CO2" },
      { id: "c", text: "H2O" },
      { id: "d", text: "MgO" },
    ],
    correctAnswerIds: ["a", "d"],
    explanation: "NaCl and MgO are ionic compounds formed by metal and non-metal",
    marks: 1,
  },
  {
    id: "q11s-3",
    classLevel: "11",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Calculus",
    difficulty: "easy",
    questionType: "true-false",
    questionText: "The derivative of x^n is nx^(n-1)",
    correctAnswer: "true",
    explanation: "This is the power rule of differentiation",
    marks: 1,
  },
  {
    id: "q11s-4",
    classLevel: "11",
    board: "CBSE",
    subject: "Physics",
    topic: "Waves",
    difficulty: "medium",
    questionType: "fill-in-the-blank",
    questionText: "The frequency of a wave is measured in _______.",
    correctAnswer: "hertz",
    acceptedAnswers: ["hertz", "Hz"],
    explanation: "The SI unit of frequency is hertz",
    marks: 1,
  },
  {
    id: "q11s-5",
    classLevel: "11",
    board: "CBSE",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    difficulty: "hard",
    questionType: "short-answer",
    questionText: "Name the functional group -OH",
    correctAnswer: "hydroxyl group",
    acceptedAnswers: ["hydroxyl group", "–OH group"],
    explanation: "–OH is the hydroxyl functional group",
    marks: 1,
  },

  // Class 11 Commerce - Ascend universe
  {
    id: "q11c-1",
    classLevel: "11",
    board: "CBSE",
    subject: "Accountancy",
    topic: "Financial Statements",
    difficulty: "easy",
    questionType: "multiple-choice",
    questionText: "Which of the following is a primary financial statement?",
    options: [
      { id: "a", text: "Cash Flow Statement" },
      { id: "b", text: "Ratio Analysis" },
      { id: "c", text: "Trend Analysis" },
      { id: "d", text: "Common Size Analysis" },
    ],
    correctAnswerId: "a",
    explanation: "Cash Flow Statement is one of the primary financial statements",
    marks: 1,
  },
  {
    id: "q11c-2",
    classLevel: "11",
    board: "CBSE",
    subject: "Business Studies",
    topic: "Principles of Management",
    difficulty: "medium",
    questionType: "multiple-select",
    questionText: "Which of the following principles were given by Fayol?",
    options: [
      { id: "a", text: "Division of Work" },
      { id: "b", text: "Authority and Responsibility" },
      { id: "c", text: "Unity of Command" },
      { id: "d", text: "SMART Goals" },
    ],
    correctAnswerIds: ["a", "b", "c"],
    explanation: "Division of Work, Authority and Responsibility, and Unity of Command are Fayol's principles",
    marks: 1,
  },
  {
    id: "q11c-3",
    classLevel: "11",
    board: "CBSE",
    subject: "Economics",
    topic: "Supply and Demand",
    difficulty: "easy",
    questionType: "true-false",
    questionText: "When demand increases and supply remains constant, price tends to rise",
    correctAnswer: "true",
    explanation: "This is the law of demand",
    marks: 1,
  },
  {
    id: "q11c-4",
    classLevel: "11",
    board: "CBSE",
    subject: "Business Studies",
    topic: "Financial Management",
    difficulty: "hard",
    questionType: "short-answer",
    questionText: "What is working capital?",
    correctAnswer: "Current assets minus current liabilities",
    acceptedAnswers: ["Current assets minus current liabilities", "Working capital = Current assets - Current liabilities"],
    explanation: "Working capital represents the liquidity available to a business",
    marks: 1,
  },

  // Class 12 Science - Ascend universe
  {
    id: "q12s-1",
    classLevel: "12",
    board: "CBSE",
    subject: "Physics",
    topic: "Electrostatics",
    difficulty: "easy",
    questionType: "multiple-choice",
    questionText: "Coulomb's law describes the force between _______.",
    options: [
      { id: "a", text: "two stationary charged particles" },
      { id: "b", text: "two moving charged particles" },
      { id: "c", text: "a charged and a neutral particle" },
      { id: "d", text: "two magnetic dipoles" },
    ],
    correctAnswerId: "a",
    explanation: "Coulomb's law describes the electrostatic force between stationary charges",
    marks: 1,
  },
  {
    id: "q12s-2",
    classLevel: "12",
    board: "CBSE",
    subject: "Chemistry",
    topic: "Thermodynamics",
    difficulty: "medium",
    questionType: "multiple-select",
    questionText: "Which of the following are state functions?",
    options: [
      { id: "a", text: "Heat" },
      { id: "b", text: "Work" },
      { id: "c", text: "Internal Energy" },
      { id: "d", text: "Path functions" },
    ],
    correctAnswerIds: ["c"],
    explanation: "Internal energy is a state function, while heat and work are path functions",
    marks: 1,
  },
  {
    id: "q12s-3",
    classLevel: "12",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Linear Algebra",
    difficulty: "easy",
    questionType: "true-false",
    questionText: "The determinant of a matrix is zero if and only if the matrix is singular",
    correctAnswer: "true",
    explanation: "A singular matrix has determinant zero and no inverse",
    marks: 1,
  },
  {
    id: "q12s-4",
    classLevel: "12",
    board: "CBSE",
    subject: "Chemistry",
    topic: "Equilibrium",
    difficulty: "medium",
    questionType: "fill-in-the-blank",
    questionText: "At equilibrium, the ratio of product concentrations to reactant concentrations is the _______.",
    correctAnswer: "equilibrium constant",
    acceptedAnswers: ["equilibrium constant", "Kc", "Kp"],
    explanation: "The equilibrium constant quantifies the position of equilibrium",
    marks: 1,
  },
  {
    id: "q12s-5",
    classLevel: "12",
    board: "CBSE",
    subject: "Mathematics",
    topic: "Probability",
    difficulty: "hard",
    questionType: "short-answer",
    questionText: "If two events A and B are independent, P(A and B) = ?",
    correctAnswer: "P(A) × P(B)",
    acceptedAnswers: ["P(A) × P(B)", "P(A) × P(B)", "the product of their individual probabilities"],
    explanation: "For independent events, the joint probability is the product of individual probabilities",
    marks: 1,
  },

  // Class 12 Commerce - Ascend universe
  {
    id: "q12c-1",
    classLevel: "12",
    board: "CBSE",
    subject: "Accountancy",
    topic: "Company Accounts",
    difficulty: "easy",
    questionType: "multiple-choice",
    questionText: "Which of the following is shown in the Balance Sheet?",
    options: [
      { id: "a", text: "Revenue for the year" },
      { id: "b", text: "Profit for the year" },
      { id: "c", text: "Assets and Liabilities" },
      { id: "d", text: "Cash flow for the year" },
    ],
    correctAnswerId: "c",
    explanation: "The Balance Sheet shows assets, liabilities, and equity at a point in time",
    marks: 1,
  },
  {
    id: "q12c-2",
    classLevel: "12",
    board: "CBSE",
    subject: "Business Studies",
    topic: "Marketing",
    difficulty: "medium",
    questionType: "multiple-select",
    questionText: "Which of the following are elements of the marketing mix?",
    options: [
      { id: "a", text: "Product" },
      { id: "b", text: "Price" },
      { id: "c", text: "Place" },
      { id: "d", text: "Promotion" },
      { id: "e", text: "People" },
    ],
    correctAnswerIds: ["a", "b", "c", "d"],
    explanation: "The 4Ps of marketing are Product, Price, Place, and Promotion",
    marks: 1,
  },
  {
    id: "q12c-3",
    classLevel: "12",
    board: "CBSE",
    subject: "Economics",
    topic: "National Income",
    difficulty: "easy",
    questionType: "true-false",
    questionText: "GDP measures the total market value of all final goods and services produced",
    correctAnswer: "true",
    explanation: "Gross Domestic Product measures the total economic output",
    marks: 1,
  },
  {
    id: "q12c-4",
    classLevel: "12",
    board: "CBSE",
    subject: "Business Studies",
    topic: "Planning",
    difficulty: "hard",
    questionType: "short-answer",
    questionText: "What is the difference between strategic and tactical planning?",
    correctAnswer: "Strategic planning focuses on long-term goals while tactical planning focuses on short-term objectives",
    acceptedAnswers: ["Strategic planning focuses on long-term goals while tactical planning focuses on short-term objectives", "Strategic = long-term, tactical = short-term"],
    explanation: "Strategic planning is about the overall direction, tactical planning is about implementation",
    marks: 1,
  },
];