
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
  return (
    <div className="space-y-6">
      {data.map((materiaPrima) => (
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
            <LinkedCounters availableInitialValue={materiaPrima.totalQuantity} />
          </div>
        </div>
      ))}
    </div>
  );
}