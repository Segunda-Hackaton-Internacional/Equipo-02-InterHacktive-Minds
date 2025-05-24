
export interface ProcessItem {
  productId: string;
  quantity: number;
}

export interface BaseProcess {

  id: string      
  userId: string
  totalAmount: number,
  items: ProcessItem[];
  startDate: Date;
  deliveryDate: Date;
  progressPercentage: number;
    status: string;
}

export type Process = BaseProcess;
