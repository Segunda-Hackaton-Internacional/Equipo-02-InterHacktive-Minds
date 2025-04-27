import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/atoms/ui/dashboards-carousel';
import { Status } from '@/lib/utils/dataManagement';
import { StatsCard } from '../molecules/Stats-card';
import DashboardTemplate from './DashBoardTemplate';
import { ArrayOfCardsMateriasPrimas } from './MateriaPrimaTemplate';

  


export function CarouselBasic({dashboardData, materiasPrimasData}: {
  dashboardData: {
    pieSeries: { name: string; value: number }[];
  };

  materiasPrimasData: Array<{
    title: string;
    statuses: Record<Status, number>;
    totalQuantity: number;
    imageSrc: string;
    imageAlt: string;
    description: string;
    statusDetails: Array<{ status: string; quantity: number }>;
  }>;

}
) {
  return (
    <div className="relative w-full h-full">
      <Carousel>
        <CarouselContent className="h-full">
          {/* Item 1 - Dashboard (unchanged) */}
          <CarouselItem className="p-4 w-full">
            <div className="overflow-y-auto">
              <DashboardTemplate 
                cardsData={[]} 
                lineSeries={[]} 
                pieSeries = {dashboardData.pieSeries} 
                range={{
                  from: new Date(),
                  to: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                }} 
                onRangeChange={(range) => console.log(range)}
                barChartData={[]}
              />
            </div>
          </CarouselItem>

          {/* Item 2 - Grid of SimpleCards */}
          <CarouselItem className="p-4 w-full">
          <ArrayOfCardsMateriasPrimas data={materiasPrimasData} />
          </CarouselItem>

          <CarouselItem className="p-4 w-full">
            <StatsCard title={'Statscard'} value={'56'} description={'show value'}>
              
            </StatsCard>
          </CarouselItem>

          {/* Other Items (unchanged) */}
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
    </div>
  );
}
  