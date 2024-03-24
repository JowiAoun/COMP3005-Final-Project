export interface Bill {
  id: number;
  service: string;
  paid: boolean;
  method?: string;
  amount: number;
}