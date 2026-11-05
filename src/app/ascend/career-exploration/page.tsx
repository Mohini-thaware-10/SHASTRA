"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/common/container";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getUniverse } from "@/config/themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AscendCareerExploration() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const router = useRouter();

  useEffect(() => {
    const classNum = 11;
    const stream = "science";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
    setLearnerProfile(profile);
  }, []);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading career exploration...</p>
      </div>
    );
  }

  const theme = getUniverse("ascend");

  // Career exploration data by stream
  const careerData = {
    science: {
      title: "Science Stream Careers",
      subtitle: "Pathways for senior science students",
      categories: [
        {
          name: "Engineering",
          description: "Branch-specific engineering careers (Computer, Mechanical, Electrical, Civil, Aerospace)",
          prerequisite: "Physics & Mathematics at Class 12 level",
          skills: ["Problem-solving", "Analytical thinking", "Programming", "Design"],
          courses: ["B.Tech", "B.E.", "Integrated M.Tech"],
        },
        {
          name: "Medicine and Allied Health",
          description: "MBBS, BDS, B.Pharm, Allied health sciences",
          prerequisite: "Biology & Chemistry at Class 12 level, NEET examination",
          skills: ["Empathy", "Clinical knowledge", "Research", "Communication"],
          courses: ["MBBS", "BDS", "B.Pharm", "B.Sc. Nursing"],
        },
        {
          name: "Pure Sciences",
          description: "Research and academia in physics, chemistry, mathematics, biology",
          prerequisite: "Strong foundation in Class 11-12 science subjects",
          skills: ["Research methodology", "Statistical analysis", "Scientific writing"],
          courses: ["B.Sc.", "M.Sc.", "Ph.D.", "Integrated Ph.D."],
        },
        {
          name: "Computer Science",
          description: "Software development, AI, data science, cybersecurity",
          prerequisite: "Mathematics + Computer Science fundamentals",
          skills: ["Programming languages", "Algorithm design", "Data structures"],
          courses: ["B.Sc. Computer Science", "BCA", "B.Tech IT"],
        },
        {
          name: "Research",
          description: "Scientific research across various disciplines",
          prerequisite: "Postgraduate research experience, strong academic record",
          skills: ["Experimental design", "Data analysis", "Literature review"],
          courses: ["M.Phil", "Ph.D.", "Research fellowships"],
        },
      ],
    },
    commerce: {
      title: "Commerce Stream Careers",
      subtitle: "Pathways for senior commerce students",
      categories: [
        {
          name: "Finance",
          description: "Financial analysis, investment banking, financial planning",
          prerequisite: "Accountancy + Mathematics at Class 12 level",
          skills: ["Financial analysis", "Quantitative reasoning", "Risk assessment"],
          courses: ["B.Com", "BBA", "Chartered Accountancy"],
        },
        {
          name: "Accounting",
          description: "Corporate accounting, auditing, tax consultancy",
          prerequisite: "Accountancy at Class 12 level",
          skills: ["Attention to detail", "GAAP knowledge", "Tax laws"],
          courses: ["B.Com", "Chartered Accountancy", "Cost Accounting"],
        },
        {
          name: "Management",
          description: "Business management, operations, human resources",
          prerequisite: "Business Studies + Mathematics recommended",
          skills: ["Leadership", "Organizational behavior", "Strategic planning"],
          courses: ["BBA", "BMS", "Integrated MBA"],
        },
        {
          name: "Economics",
          description: "Economic analysis, policy research, financial consulting",
          prerequisite: "Economics + Mathematics at Class 12 level",
          skills: ["Economic modeling", "Statistical analysis", "Research"],
          courses: ["B.A. Economics", "B.Com Economics", "M.A. Economics"],
        },
        {
          name: "Business and Entrepreneurship",
          description: "Startup founding, business development, consulting",
          prerequisite: "Business Studies + entrepreneurial mindset",
          skills: ["Business planning", "Market analysis", "Negotiation"],
          courses: ["BBA", "Entrepreneurship programs", "Incubator programs"],
        },
      ],
    },
    arts: {
      title: "Arts & Humanities Stream Careers",
      subtitle: "Pathways for senior arts/humanities students",
      categories: [
        {
          name: "Law",
          description: "Legal practice, corporate law, civil law, litigation",
          prerequisite: "Humanities subjects at Class 12 level, CLAT examination",
          skills: ["Logical reasoning", "Argumentation", "Research"],
          courses: ["Five-year integrated LL.B.", "LL.B.", "BA LL.B."],
        },
        {
          name: "Civil Services",
          description: "IAS, IPS, IFS and other government administrative services",
          prerequisite: "Bachelor's degree in any discipline, UPSC examination",
          skills: ["Administrative aptitude", "Essay writing", "Current affairs"],
          courses: ["B.A. (any discipline)", "UPSC coaching"],
        },
        {
          name: "Psychology",
          description: "Clinical psychology, counseling, organizational psychology",
          prerequisite: "Psychology at Class 12 level, Bachelor of Arts in Psychology",
          skills: ["Empathy", "Active listening", "Statistical analysis"],
          courses: ["B.A. Psychology", "M.A. Psychology", "M.Phil", "Ph.D."],
        },
        {
          name: "Journalism and Mass Communication",
          description: "Reporting, editing, broadcasting, digital media",
          prerequisite: "Language subjects + current affairs knowledge",
          skills: ["Writing", "Interviewing", "Multimedia production"],
          courses: ["B.A. Journalism", "Mass Communication", "B.M.M."],
        },
        {
          name: "Social Sciences and Design",
          description: "Sociology, psychology, political science, design, communication",
          prerequisite: "Relevant humanities subjects at Class 12 level",
          skills: ["Critical thinking", "Research methods", "Design thinking"],
          courses: ["B.A. Sociology/Psychology/Political Science", "B.Des", "B.Communication"],
        },
      ],
    },
  };

  const streamKey = learnerProfile.stream as "science" | "commerce" | "arts";
  const streamCareerData = careerData[streamKey] || careerData.science;

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1600px] mx-auto p-4 md:p-6">
        {/* Career Exploration Header */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            {streamCareerData.title}
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            {streamCareerData.subtitle}
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Based on your {learnerProfile.stream.toUpperCase()} stream • Class {learnerProfile.currentClass}
          </p>
        </div>

        {/* Career Categories */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {streamCareerData.categories.map((category) => (
            <div
              key={category.name}
              className="rounded-lg bg-white border border-[theme.border] p-6 hover:bg-[theme.soft] transition-colors">
                <h3 className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-3">
                  {category.name}
                </h3>
                <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
                  {category.description}
                </p>
                <div className="grid grid-cols-2 gap-3 text-[0.45rem] text-[theme.inkSmall]">
                  <div>
                    <p className="text-[0.4rem] text-[theme.inkSmall] uppercase tracked mb-1">
                      Prerequisite
                    </p>
                    <span>{category.prerequisite}</span>
                  </div>
                  <div>
                    <p className="text-[0.4rem] text-[theme.inkSmall] uppercase tracked mb-1">
                      Key Skills
                    </p>
                    <span>
                      {category.skills.map((skill) => (
                        <span key={skill} className="mr-2 text-[0.45rem] bg-[theme.soft] rounded px-1">
                          {skill}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[0.4rem] text-[theme.inkSmall] uppercase tracked mb-1">
                    Recommended Courses
                  </p>
                  <span>
                    {category.courses.map((course) => (
                      <span key={course} className="mr-2 text-[0.45rem] underline cursor-pointer">
                        {course}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Personal Interest Reflection */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-8 mb-8">
          <h2 className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-4">
            Personal Interest Reflection
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            Take a moment to reflect on your interests and goals:
          </p>
          <ul className="space-y-4">
            <li className="p-3 rounded bg-white border border-[theme.border]">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[theme.accent] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                <div>
                  <span className="text-[0.5rem] font-medium">What subjects do I enjoy most?</span>
                  <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">— Select 2-3 subjects you find most engaging</span>
                </div>
              </div>
            </li>
            <li className="p-3 rounded bg-white border border-[theme.border]">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[theme.accent] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                <div>
                  <span className="text-[0.5rem] font-medium">What careers appeal to me?</span>
                  <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">— Consider roles that match your skills and interests</span>
                </div>
              </div>
            </li>
            <li className="p-3 rounded bg-white border border-[theme.border]">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[theme.accent] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                <div>
                  <span className="text-[0.5rem] font-medium">What are my strengths?</span>
                  <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">— Reflect on subjects where you perform well</span>
                </div>
              </div>
            </li>
          </ul>
          <Button
            variant="link"
            size="sm"
            className="mt-4 w-full text-[theme.accent] hover:text-[theme.accentStrong] transition-colors"
          >
            Save My Reflection
          </Button>
        </div>

        {/* Course Information Notes */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6">
          <h2 className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Important Notes
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            These are exploration categories, not career guarantees.
          </p>
          <ul className="space-y-3">
            <li className="p-2 text-[0.45rem] text-[theme.inkSmall]">
              Do not claim eligibility for a course without verified current admission requirements
            </li>
            <li className="p-2 text-[0.45rem] text-[theme.inkSmall]">
              Do not fabricate college rankings, cut-offs, salaries or placement statistics
            </li>
            <li className="p-2 text-[0.45rem] text-[theme.inkSmall]">
              Keep this feature informational and exploratory
            </li>
          </ul>
          <Button
            variant="link"
            size="sm"
            className="mt-3 w-full text-[theme.accent] hover:text-[theme.accentStrong] transition-colors text-[0.45rem]"
          >
            Refresh Exploration
          </Button>
        </div>
      </Container>
    </div>
  );
}