

import { addProcess } from "@/actions/process/processThunks";
import { addProduct } from "@/actions/product/productThunks";
import { calcularProduccion } from "@/lib/utils/processUnidadDeMermeladaManagement";
import React from "react";
import { Button } from "../atoms/ui/button";
import { LinkedCounters } from "./LinkedCounters";

export function MateriaPrimaWithCounters({ data }: {
  data: Array<{
    title: string;
    statuses: Record<string, number>;
    totalQuantity: number;
    imageSrc: string;
    imageAlt: string;
    description: string;
    statusDetails: Array<{ status: string; quantity: number }>;
  }>;
}) {
  
  const countersRefs = React.useRef<Array<React.RefObject<{
    getCounts: () => { available: number; processing: number }
  }>>>([]);

    
    React.useEffect(() => {
      countersRefs.current = data.map((_, i) => countersRefs.current[i] || React.createRef());
    }, [data]);
  
    const createPrintHandler = (currentIndex: number) => async () => {
      const currentCounterRef = countersRefs.current[currentIndex];
      const prevCounterRef = countersRefs.current[currentIndex - 1]; 
    
      if (currentCounterRef?.current && prevCounterRef?.current) {
        const currentCounts = currentCounterRef.current.getCounts();
        const prevCounts = prevCounterRef.current.getCounts();
    
        console.log(`Materia Prima Actual: ${data[currentIndex].title}`);
        console.log(`- Cantidad disponible: ${currentCounts.available}`);
        console.log(`- Cantidad a procesar: ${currentCounts.processing}`);
    
        console.log(`Materia Prima Anterior: ${data[currentIndex - 1]?.title || "N/A"}`);
        console.log(`- Cantidad procesada anterior: ${prevCounts.processing}`);
    
        
        const { unidadesProducidas, mangoNoUtilizado, pitahayaNoUtilizada } = 
          calcularProduccion(prevCounts.processing, currentCounts.processing);
    
        console.log(`Unidades producidas: ${unidadesProducidas}`);
        console.log(`Mango no utilizado: ${mangoNoUtilizado}`);
        console.log(`Pitahaya no utilizada: ${pitahayaNoUtilizada}`);

        const dataStockMermelada = { 
    name: "Mermelada de Mango y Pitahaya",
    price: 8000,
    quantity: unidadesProducidas,
    expirationDate: getExpirationDate(),
};

// Obtener la respuesta de addProduct
    const newProduct =  await addProduct(dataStockMermelada);
    
        
        const dataStock = {
   // Reemplazar con el ID real del usuario
        items: [{
          productId: newProduct.id, // ID del producto en tu DB
          quantity: unidadesProducidas
          }],
        
        startDate: new Date(),
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días después
        progressPercentage: 0,
        status: 'OPERATING'
          };

        const respuesta = await addProcess(dataStock);

        
        console.log("Respuesta de addProduct:", respuesta);
  }
      else {
        
        const currentCounts = currentCounterRef.current.getCounts();
        const nextCounterRef = countersRefs.current[currentIndex + 1];
        const nextCounts = nextCounterRef.current.getCounts();
        const { unidadesProducidas, mangoNoUtilizado, pitahayaNoUtilizada } = 
          calcularProduccion(currentCounts.processing, nextCounts.processing);
    
        console.log(`Unidades producidas: ${unidadesProducidas}`);
        console.log(`Mango no utilizado: ${mangoNoUtilizado}`);
        console.log(`Pitahaya no utilizada: ${pitahayaNoUtilizada}`);
      }
    };

  // Initialize refs array
  React.useEffect(() => {
    countersRefs.current = countersRefs.current.slice(0, data.length);
  }, [data]);

  return (
    <div className="space-y-6">
      {data.map((materiaPrima, index) => (
        <div key={materiaPrima.title} className="flex items-start gap-6">
          <div className="w-48 min-w-[12rem]">
            <h3 className="text-lg font-medium sticky top-4">
              {materiaPrima.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {materiaPrima.description}
            </p>
          </div>

          <div className="flex-1 w-full min-w-0">
          <LinkedCounters 
              ref={el => {
                if (el) {
                  countersRefs.current[index] = { current: el };
                }
              }}
              availableInitialValue={materiaPrima.totalQuantity} 
            />
          </div>
          <Button
            onClick={createPrintHandler(index)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Imprimir esta cantidad
          </Button>
        </div>
      ))}
     
    </div>
  );
}

const getExpirationDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 8); // Add 8 months
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};