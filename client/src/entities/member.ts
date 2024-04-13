export interface Member {
  memberId: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  membershipType: string;
  healthStatics: HealthStatics;
  healthMetrics: HealthMetrics;
  fitnessGoals?: FitnessGoals[];
  routines: Routine[];
}

export interface HealthStatics {
  caloriesBurned: number;
  ran: number;
}

export interface HealthMetrics {
  age: Date;
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
  completed: boolean;
}

export interface Routine {
  name: string;
  description: string;
  id: number;
}