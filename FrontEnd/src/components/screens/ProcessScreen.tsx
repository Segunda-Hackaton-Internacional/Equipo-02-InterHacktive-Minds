import { CarouselBasic } from "@/components/templates/ProcessScreenTemplate";
import { assignStateToProduct, isDateBetweenDateOnly, Status } from "@/lib/utils/dataManagement";
import { subTotalesDeProductos, totalPorStatus } from "@/lib/utils/productManagement";
import { startOfDay, subMonths } from "date-fns";
import { useState } from "react";


export const ProcessScreen = () => {

  // 1. date‐picker range
    const [range, setRange] = useState({
      from: startOfDay(subMonths(new Date(), 1)),
      to: startOfDay(new Date()),
    });

  let productWithStatus = assignStateToProduct();

  productWithStatus = productWithStatus.filter(
  p => p.name !== "Mermelada de Mango y Pitahaya"
);

  productWithStatus = productWithStatus.filter((product) =>
    isDateBetweenDateOnly(product.expirationDate, range.from, range.to)
  );
  
  //Sumar todos los subtotales de los productos 
  const groupedProducts = subTotalesDeProductos({productWithStatus});

  
  const totalByStatus = totalPorStatus({groupedProducts});
  
  // Prepara la informacion para el dashboard
const dashboardData = {

  onRangeChange: setRange,
  range: range, 
  pieSeries: [
    { name: "Disponibles", value: totalByStatus[Status.DISPONIBLE] || 0 },
    { name: "Por Vencerse", value: totalByStatus[Status.POR_VENCER] || 0 },
    { name: "Vencida", value: totalByStatus[Status.VENCIDA] || 0 },
  ],
}; 

// Data para las materias primas
const materiasPrimasData = Object.values(
  productWithStatus.reduce((acc, product) => {
    // If product doesn't exist in accumulator, initialize it
    acc[product.name] ??= {
        title: product.name,
        statuses: {
          [Status.DISPONIBLE]: 0,
          [Status.POR_VENCER]: 0,
          [Status.VENCIDA]: 0
        },
        totalQuantity: 0,
        imageSrc: "https://placehold.co/600x400",
        imageAlt: `${product.name} image`
      };
    
    // Add status information
    acc[product.name].statuses[product.status] = 
      (acc[product.name].statuses[product.status] || 0) + product.quantity;
    
    // Update total quantity
    acc[product.name].totalQuantity += product.quantity;
        
    return acc;
  }, {} as Record<string, {
    title: string;
    statuses: Record<Status, number>;
    totalQuantity: number;
    imageSrc: string;
    imageAlt: string;
  }>)
).map(product => ({
  ...product,
  description: `Total: ${product.totalQuantity}`,
  statusDetails: Object.entries(product.statuses).map(([status, quantity]) => ({
    status,
    quantity
  }))
}));


  return (
    <div className="flex-1">
      <CarouselBasic dashboardData = {dashboardData}
      materiasPrimasData={materiasPrimasData}  />
    </div>
);
};


export default ProcessScreen; 


