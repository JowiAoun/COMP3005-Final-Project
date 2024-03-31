export interface Session {
  sessionId: number;
  name: string;
  shortDescription: string;
  roomNumber: number;
  adminId: number;
  trainerName: string;
  type: string;
  numEnrolled: number;
  capacity: number;
  startDate: Date;
  endDate: Date;
}