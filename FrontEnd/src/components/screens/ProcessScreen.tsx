import { CarouselBasic } from "@/components/templates/ProcessScreenTemplate";
import { assignStateToProduct, Status } from "@/lib/utils/dataManagement";


export const ProcessScreen = () => {

  const productWithStatus = assignStateToProduct();
  
  //Sumar todos los subtotales de los productos 
  const groupedProducts = productWithStatus.reduce((acc, product) => {
    const key = `${product.name}_${product.status}`; // Unique key for name + status
  
    if (!acc[key]) {
      acc[key] = {
        name: product.name,
        status: product.status,
        quantity: product.quantity, // Initialize with the product's quantity
        expirationDates: new Set<string>(), // Track unique expiration dates
      };
    } else {
      acc[key].quantity += product.quantity; // Sum quantities
    }
  
    acc[key].expirationDates.add(product.expirationDate); // Track unique dates
    return acc;
  }, {} as Record<string, { name: string; status: Status; quantity: number; expirationDates: Set<string> }>);

  //LOGEARLO

  Object.values(groupedProducts).forEach((product) => {
    console.log(
      `Product: ${product.name} | ` +
      `Status: ${product.status} | ` +
      `Count: ${product.quantity}`
    );
  });

  const totalByStatus = Object.values(groupedProducts).reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + product.quantity;
    return acc;
  }, {} as Record<string, number>);
  
  console.log("\n=== Total Quantity by Product ===");
  Object.entries(totalByStatus).forEach(([name, total]) => {
    console.log(`Product: ${name} | Total: ${total}`);
  });

  // Prepara la informacion para el dashboard
const dashboardData = {
  pieSeries: [
    { name: "Disponibles", value: totalByStatus[Status.DISPONIBLE] || 0 },
    { name: "Por Vencerse", value: totalByStatus[Status.POR_VENCER] || 0 },
    { name: "Vencida", value: totalByStatus[Status.VENCIDA] || 0 },
  ],
}; 

// Prepare data for Materias Primas cards - grouped by product name
const materiasPrimasData = Object.values(
  productWithStatus.reduce((acc, product) => {
    // If product doesn't exist in accumulator, initialize it
    if (!acc[product.name]) {
      acc[product.name] = {
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
    }
    
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

console.table(materiasPrimasData.map(item => ({
  Product: item.title,
  Available: item.statuses[Status.DISPONIBLE],
  'About to Expire': item.statuses[Status.POR_VENCER],
  Expired: item.statuses[Status.VENCIDA],
  Total: item.totalQuantity
})));

  
  
  return (
    <div className="flex-1">
      <CarouselBasic dashboardData = {dashboardData}
      materiasPrimasData={materiasPrimasData}  />
    </div>
);
};


export default ProcessScreen; 


