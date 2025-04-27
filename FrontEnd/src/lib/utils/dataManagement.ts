import { loadUserProducts } from "@/actions/product/productThunks";
import { useProductStore } from "@/hooks/flux/product/useProductStore";
import { useEffect } from "react";

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
    
    const { products } = useProductStore();
    
      useEffect(() => {
        loadUserProducts();
      }, [loadUserProducts]);
    
      //Darle Estado a cada producto
    
      const productsWithStatus = products.map(product => ({
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
