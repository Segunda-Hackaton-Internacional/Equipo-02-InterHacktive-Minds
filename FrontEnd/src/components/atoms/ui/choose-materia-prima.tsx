import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select';


interface MateriaPrimaNombreChooseProps {
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    name?: string;
    ProductOptions?: {value: string, label: string}[];
    onBlur?: () => void; // Add onBlur for form validation
  }

const defaultProps: Partial<MateriaPrimaNombreChooseProps> = {
    ProductOptions: [{ value: 'Mermelada de Pitahaya y Mango', label: 'Mermelada de Pitahaya y Mango' }]
};
  
  export function MateriaPrimaNombreChoose({ 
    value, 
    onChange, 
    required,
    name,
    onBlur,
    ProductOptions = defaultProps.ProductOptions
  }: Readonly<MateriaPrimaNombreChooseProps>) {
    return (
      <Select
        value={value}
        onValueChange={onChange}
        required={required}
        name={name}
        onOpenChange={(open) => !open && onBlur?.()} // Trigger validation when dropdown closes
      >
        <SelectTrigger className={value ? '' : 'border-destructive'}> 
          <SelectValue placeholder="Seleccione una materia prima" />
        </SelectTrigger>
        <SelectContent>
          {ProductOptions?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }