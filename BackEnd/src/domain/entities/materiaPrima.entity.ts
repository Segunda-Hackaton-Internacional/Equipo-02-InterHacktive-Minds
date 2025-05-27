export interface MateriaPrima {
  id: string;
  userId: string;      
  name: string;
  price: number;        
  quantity: number;     
  expirationDate: Date;
}

export type MatPr = MateriaPrima;
