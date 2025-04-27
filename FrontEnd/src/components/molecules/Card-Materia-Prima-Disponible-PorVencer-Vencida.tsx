import { StatsCard } from "@/components/molecules/Stats-card";
import { Status } from "@/lib/utils/dataManagement";

interface SimpleCardProps {
  card?: {
    title: string;
    statuses: Record<Status, number>;
    totalQuantity: number;
    imageSrc: string;
    imageAlt: string;
    description: string;
    statusDetails: Array<{ status: string; quantity: number }>;
  };
}

const SimpleCard = ({
  card = {
    title: "Product Name",
    statuses: {
      [Status.DISPONIBLE]: 0,
      [Status.POR_VENCER]: 0,
      [Status.VENCIDA]: 0
    },
    totalQuantity: 0,
    imageSrc: "https://placehold.co/600x400",
    imageAlt: "placeholder",
    description: "No description",
    statusDetails: []
  },
}: SimpleCardProps) => {
  return (
    <div className="w-full rounded-2xl bg-muted/70 p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold lg:text-3xl">
            {card.title}
          </h3>
          <p className="text-lg">Total: {card.totalQuantity}</p>
          
          <div className="flex flex-row gap-4 overflow-x-auto pb-2">
            <StatsCard 
              title={'Disponible'} 
              value={card.statuses[Status.DISPONIBLE].toString()} 
              description={'Materia Prima disponible'}
            />
            <StatsCard 
              title={'Por Vencer'} 
              value={card.statuses[Status.POR_VENCER].toString()} 
              description={'Próxima a vencerse'}
            />
            <StatsCard 
              title={'Vencida'} 
              value={card.statuses[Status.VENCIDA].toString()} 
              description={'Materia Prima vencida'}
            />
          </div>
        </div>
        <img
          src={card.title === 'Maracuya' ? 'https://www.svgrepo.com/show/406279/mango.svg' : card.title === 'Pitahaya' ? 'https://img.freepik.com/free-psd/vibrant-dragon-fruit-duo-watercolor-delight_191095-81014.jpg?t=st=1745792115~exp=1745795715~hmac=74282146550a8ae4204ee3c79a49bba666b25d5d20bff23b0bd0a7e8bedd759b&w=740' : card.imageSrc}
          alt={card.imageAlt}
          className="h-64 w-full rounded-xl object-contain bg-white p-2"
        />
      </div>
    </div>
  );
};
  
  export { SimpleCard };
