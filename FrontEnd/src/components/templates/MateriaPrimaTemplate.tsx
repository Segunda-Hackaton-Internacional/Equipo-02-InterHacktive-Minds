import { Status } from "@/lib/utils/dataManagement";
import { SimpleCard } from "../molecules/Card-Materia-Prima-Disponible-PorVencer-Vencida";

interface MateriaPrimaCard {
  title: string;
  statuses: Record<Status, number>;
  totalQuantity: number;
  imageSrc: string;
  imageAlt: string;
  description: string;
  statusDetails: Array<{ status: string; quantity: number }>;
}

export function ArrayOfCardsMateriasPrimas({ data }: { data: MateriaPrimaCard[] }) {
  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {data.map((card, index) => (
        <div key={index} className="h-auto">
          <SimpleCard card={card} />
        </div>
      ))}
    </div>
  );
}