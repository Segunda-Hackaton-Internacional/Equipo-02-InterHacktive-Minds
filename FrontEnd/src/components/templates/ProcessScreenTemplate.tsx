import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/atoms/ui/dashboards-carousel';
import { SimpleCard } from '../atoms/ui/card-with-image';
import DashboardTemplate from './DashBoardTemplate';
  
// Mock data for cards (replace with your actual data)
const cardsData = [
  {
    title: "Card 1",
    description: "Description for card 1",
    imageSrc: "https://placehold.co/600x400",
    imageAlt: "Card 1 Image",
  },
  {
    title: "Card 2",
    description: "A longer description that might wrap to multiple lines, forcing the card height to adjust dynamically.",
    imageSrc: "https://placehold.co/600x400",
    imageAlt: "Card 2 Image",
  },
  // Add more cards as needed...
];

export function CarouselBasic() {
  return (
    <div className="relative w-full h-full">
      <Carousel>
        <CarouselContent className="h-full">
          {/* Item 1 - Dashboard (unchanged) */}
          <CarouselItem className="h-full p-4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto">
              <DashboardTemplate 
                cardsData={[]} 
                lineSeries={[]} 
                pieSeries={[]} 
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
            <div className="flex flex-col gap-1 h-full overflow-y-auto">
              {cardsData.map((card, index) => (
                <div key={index} className="h-auto"> {/* Let height adjust dynamically */}
                  <SimpleCard card={card} />
                </div>
              ))}
            </div>
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
  