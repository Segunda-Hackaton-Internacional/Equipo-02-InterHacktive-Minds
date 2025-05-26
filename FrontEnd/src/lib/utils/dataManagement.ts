
import { Product } from "@/types/productType";


export enum Status {
    DISPONIBLE = "DISPONIBLE",
    POR_VENCER = "POR_VENCER",
    VENCIDA = "VENCIDA"
  }

  //asignar estados segun fecha de hoy para cuando se vence
export function checkDateStatus(targetDate: Date, daysToCheck: number = 30): Status {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // media noche
    
    const dateToCheck = new Date(targetDate);
    dateToCheck.setHours(0, 0, 0, 0); // media noche
  
    // calcula la diferencia en dias
    const diffTime = dateToCheck.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) {
      return Status.VENCIDA; // dia vencida
    } else if (diffDays <= daysToCheck) {
      return Status.POR_VENCER; // por vencer (30 dias )
    } else {
      return Status.DISPONIBLE; // 30 dias o mas en el futuro  
    }
  }
//asignar estados
  export function assignStateToProduct(){
    
      const productsWithStatus = mockProducts.map(product => ({
    ...product,
    status: checkDateStatus(new Date(product.expirationDate))
  }));

      return productsWithStatus;
  }

  //Revisar si una fecha se encuentra entre otras dos fechas 
  export function isDateBetweenDateOnly(
    dateToCheck: Date | string,
    startDate: Date | string,
    endDate: Date | string
  ): boolean {
    const check = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // NO nos importa el tiempo
    check.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
  
    return check >= start && check <= end;
  }

  const mockProducts: Product[] = [
  {
    id: '1',
    userId: 'user123',
    name: 'Pitahaya',
    price: 5.99,
    quantity: 10,
    expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '2',
    userId: 'user123',
    name: 'Pitahaya',
    price: 5.99,
    quantity: 5,
    expirationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '3',
    userId: 'user123',
    name: 'Mango',
    price: 3.49,
    quantity: 20,
    expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '4',
    userId: 'user123',
    name: 'Mango',
    price: 3.49,
    quantity: 8,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '5',
    userId: 'user123',
    name: 'Mango',
    price: 3.49,
    quantity: 3,
    expirationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() 
  }
];
