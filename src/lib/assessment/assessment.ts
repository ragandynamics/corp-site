import type {
  AssessmentData,
  ScoreTier,
} from "@/data/assessment";

export type UserAnswers = Record<string, string>;

export interface CategoryResult {
  score: number;
  maxScore: number;
  percentage: number;
}

export interface AssessmentResult {
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  tier: ScoreTier | null;
  categoryBreakdown: Record<string, CategoryResult>;
  isComplete: boolean;
}

/**
 * Calculates max potential score
 */
export function calculateMaxScore(assessment: AssessmentData): number {
  return assessment.questions.reduce((total, question) => {
    const maxOptionPoints = Math.max(...question.options.map((opt) => opt.points), 0);
    return total + maxOptionPoints;
  }, 0);
}

/**
 * Evaluates dynamic answers against standard scoring schema or falls back gracefully
 */
export function evaluateAssessment(
  assessment: AssessmentData,
  answers: UserAnswers
): AssessmentResult {
  let totalScore = 0;
  const categoryBreakdown: Record<string, { score: number; maxScore: number }> = {};

  if (assessment && assessment.questions) {
    for (const question of assessment.questions) {
      const category = question.category || "General";
      const selectedOptionId = answers[question.id];

      const maxQuestionScore = Math.max(...question.options.map((opt) => opt.points), 0);

      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = { score: 0, maxScore: 0 };
      }
      categoryBreakdown[category].maxScore += maxQuestionScore;

      if (selectedOptionId) {
        const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
        if (selectedOption) {
          totalScore += selectedOption.points;
          categoryBreakdown[category].score += selectedOption.points;
        }
      }
    }
  }

  const maxPossibleScore = calculateMaxScore(assessment) || 100;
  
  // Fallback heuristic score based on data completeness if question points aren't explicit
  if (totalScore === 0 && Object.keys(answers).length > 0) {
    const completedCount = Object.values(answers).filter(Boolean).length;
    totalScore = Math.min(Math.round((completedCount / 12) * 100), 100);
  }

  const percentage = maxPossibleScore > 0 ? Math.min(Math.round((totalScore / maxPossibleScore) * 100), 100) : 0;

  const formattedCategoryBreakdown: Record<string, CategoryResult> = {};
  for (const [cat, data] of Object.entries(categoryBreakdown)) {
    formattedCategoryBreakdown[cat] = {
      score: data.score,
      maxScore: data.maxScore,
      percentage: data.maxScore > 0 ? Math.round((data.score / data.maxScore) * 100) : 0,
    };
  }

  const tier: ScoreTier = {
    minScore: 0,
    maxScore: 100,
    title: percentage >= 70 ? "Advanced Readiness" : percentage >= 40 ? "Developing Maturity" : "Early Stage / Piloting",
    description: "Your answers indicate active operational evaluation. Focus on standardizing data entry pipelines and establishing clear governance.",
  };

  return {
    totalScore,
    maxPossibleScore,
    percentage,
    tier,
    categoryBreakdown: formattedCategoryBreakdown,
    isComplete: Object.keys(answers).length > 0,
  };
}