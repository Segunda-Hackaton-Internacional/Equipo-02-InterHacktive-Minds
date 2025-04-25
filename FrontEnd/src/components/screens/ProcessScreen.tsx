import { CarouselBasic } from "@/components/templates/ProcessScreenTemplate";

export const ProcessScreen = () => {
  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Mis Procesos</h1>
      
      <div className="flex-1">
        <CarouselBasic />
      </div>
      
      {/* Add other process-related UI here */}
      <div className="mt-8">
        {/* Example: Process list or workflow visualization */}
      </div>
    </div>
  );
};


export default ProcessScreen; 