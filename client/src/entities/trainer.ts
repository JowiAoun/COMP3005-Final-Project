export interface Trainer {
  trainerId: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  availabilities: TrainerAvailabilities[];
}

export interface TrainerAvailabilities {
  day: string;
  startTime: string;
  endTime: string;
  occupied: boolean;
}