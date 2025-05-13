
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

    // Initialize refs array
    React.useEffect(() => {
      countersRefs.current = data.map((_, i) => countersRefs.current[i] || React.createRef());
    }, [data]);
  
    // Create individual handlers for each counter
    const createPrintHandler = (index: number) => () => {
      const counterRef = countersRefs.current[index];
      if (counterRef?.current) {
        const counts = counterRef.current.getCounts();
        console.log(`Materia Prima: ${data[index].title}`);
        console.log(`- Cantidad disponible: ${counts.available}`);
        console.log(`- Cantidad a procesar: ${counts.processing}`);
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