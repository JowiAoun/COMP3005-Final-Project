export interface Member {
  memberId: number;
  firstName: string;
  lastName: string;
  healthStatics: HealthStatics;
  healthMetrics: HealthMetrics;
  fitnessGoals?: [FitnessGoals];
}

export interface HealthStatics {
  caloriesBurned: number;
  currentPr: number;
  ran: number;
}

export interface HealthMetrics {
  age: number;
  weight: number;
  height: number;
  bmi: number;
}

export interface FitnessGoals {
  goalName: string;
  deadline: Date;
  description: string;
  type: string;
  commitment: number;
}