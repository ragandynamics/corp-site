export interface AssessmentAnswer {
  id: string;
  value: string | string[];
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  description?: string;
  type:
    | "radio"
    | "checkbox"
    | "text"
    | "select";

  options?: string[];

  weight?: number;
}

export interface AssessmentSection {
  id: string;

  title: string;

  description: string;

  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  score: number;

  maturity:
    | "Getting Started"
    | "Developing"
    | "Emerging"
    | "AI Ready"
    | "Advanced";

  recommendations: string[];
}