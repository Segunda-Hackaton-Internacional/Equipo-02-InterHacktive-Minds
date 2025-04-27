import { loadUserProducts } from "@/actions/product/productThunks";
import { useProductStore } from "@/hooks/flux/product/useProductStore";
import { useEffect } from "react";

export enum Status {
    DISPONIBLE = "DISPONIBLE",
    POR_VENCER = "POR_VENCER",
    VENCIDA = "VENCIDA"
  }
  
export function checkDateStatus(targetDate: Date, daysToCheck: number = 30): Status {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date by setting time to midnight
    
    const dateToCheck = new Date(targetDate);
    dateToCheck.setHours(0, 0, 0, 0); // Normalize target date by setting time to midnight
  
    // Calculate the difference in days
    const diffTime = dateToCheck.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) {
      return Status.VENCIDA; // dia vencida
    } else if (diffDays <= daysToCheck) {
      return Status.POR_VENCER; // por vencer (30 dias )
    } else {
      return Status.DISPONIBLE; // Date is more than 30 days (or specified daysToCheck) in the future
    }
  }

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
