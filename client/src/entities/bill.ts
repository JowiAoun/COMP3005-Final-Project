export interface Bill {
  id: number;
  service: string;
  paid: boolean;
  amount: number;
  method?: string;
  paymentDate?: Date;
}