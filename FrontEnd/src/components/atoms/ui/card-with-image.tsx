
interface CardContent {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  }
  
  interface SimpleCardProps {
    card?: CardContent;
  }
  
  const SimpleCard = ({
    card = {
      title: "Make your site a true standout.",
      description: "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
      imageSrc: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
      imageAlt: "placeholder",
    },
  }: SimpleCardProps) => {
    return (
      <div className="w-full rounded-2xl bg-muted/70 p-6 lg:p-8"> {/* Removed container and section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-6"> {/* Simplified grid */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold lg:text-3xl"> {/* Reduced text size */}
              {card.title}
            </h3>
            <p className="text-muted-foreground">
              {card.description}
            </p>
          </div>
          <img
            src={card.imageSrc}
            alt={card.imageAlt}
            className="h-auto w-full rounded-xl object-cover max-h-64" /* Constrained image */
          />
        </div>
      </div>
    );
  };
  
  export { SimpleCard };
