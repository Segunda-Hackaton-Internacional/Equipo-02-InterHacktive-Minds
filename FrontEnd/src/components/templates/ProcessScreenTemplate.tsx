import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/atoms/ui/dashboards-carousel';
import { Status } from '@/lib/utils/dataManagement';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { MateriaPrimaWithCounters } from '../molecules/MateriaPrimaWithCounters';
import DashboardTemplate from './DashBoardTemplate';
import { ArrayOfCardsMateriasPrimas } from './MateriaPrimaTemplate';

export function CarouselBasic({ dashboardData, materiasPrimasData }: Readonly<{
  dashboardData: {
    onRangeChange: React.Dispatch<React.SetStateAction<{
      from: Date;
      to: Date;
    }>>;
    range: { from: Date; to: Date; };
    pieSeries: { name: string; value: number }[];
  };
  materiasPrimasData: Array<{
    id: string
    title: string;
    statuses: Record<Status, number>;
    totalQuantity: number;
    imageSrc: string;
    imageAlt: string;
    description: string;
    statusDetails: Array<{ status: string; quantity: number }>;
  }>;
}>) {
  
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);

  //Tan pronto como empieze pantalla
  useEffect(() => {
    // si dialogConfigs existe
    if (dialogConfigs[0]) {
      setOpenDialogIndex(0);
    }
  }, []);


  const handleDialogTrigger = (index: number) => {
    setOpenDialogIndex(index);
  };

  //Dialogs para cada fase en el carrousel
  const dialogConfigs = [
    {
      title: "Totalizacion de la materia prima",
      description: "Dentro de este dashboard usted podra ver el total de materia prima que posee"
    }, // index 0
    {
      title: "Subtotales por materia prima",
      description: "Aqui podra ver por cada mataeria prima, cual se encuentra disponible, cual por vencerse y cual ya esta vencida"
    }, // Index 1 
    {
      title: "Asignar Materia Prima",
      description: "Asigne la cantidad de materia prima disponible para procesar..."
    }, //Index 2
    null, // Index 3
    {
      title: "Otra Acción",
      description: "Descripción diferente para este diálogo..."
    } //Index 4
  ];

  return (
    <div className="relative w-full h-full">
      {/* Carousel Component */}
      <Carousel dialogIndices={[0,1,2,3,4]} onDialogTrigger={handleDialogTrigger}>
        <CarouselContent className="h-full">
          {/* Item 1 - Dashboard */}
          <CarouselItem className="p-4 w-full">
            <div className="overflow-y-auto">
              <DashboardTemplate 
                cardsData={[]} 
                lineSeries={[]} 
                pieSeries={dashboardData.pieSeries} 
                range={dashboardData.range} 
                onRangeChange={dashboardData.onRangeChange}
                barChartData={[]}
              />
            </div>
          </CarouselItem>

          {/* Item 2 - Grid of SimpleCards */}
          <CarouselItem className="p-4 w-full">
            <ArrayOfCardsMateriasPrimas data={materiasPrimasData} />
          </CarouselItem>

          {/* Item 3 - StatsCard */}
          <CarouselItem className="p-4 w-full">
          <MateriaPrimaWithCounters data={materiasPrimasData} />
          </CarouselItem>

          {/* Items 4 and 5 (will trigger dialog) */}
          {[3, 4].map((item) => (
            <CarouselItem key={item} className="h-full p-4 w-full">
              <div className="flex h-full w-full items-center justify-center border border-zinc-200 dark:border-zinc-800">
                {item}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavigation alwaysShow className="px-4" />
        <CarouselIndicator />
      </Carousel>

      <Dialog 
  open={openDialogIndex !== null} 
  onOpenChange={(open) => !open && setOpenDialogIndex(null)}
>
  <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
    {openDialogIndex !== null && dialogConfigs[openDialogIndex] && (
      <>
        <DialogTitle className="text-lg font-semibold">
          {dialogConfigs[openDialogIndex].title}
        </DialogTitle>
        <p>{dialogConfigs[openDialogIndex].description}</p>
        
      </>
    )}
  </DialogContent>
</Dialog>
    </div>
  );
}
  