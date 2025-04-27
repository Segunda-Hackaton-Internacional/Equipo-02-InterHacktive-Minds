import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/ui/select';

// Nombre de la materia prima
const PRODUCT_OPTIONS = [
  { value: 'Maracuya', label: 'Maracuya' },
  { value: 'Pitahaya', label: 'Pitahaya' },
  { value: 'Azucar', label: 'Azucar' },
]

interface MateriaPrimaNombreChooseProps {
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    name?: string;
    onBlur?: () => void; // Add onBlur for form validation
  }
  
  export function MateriaPrimaNombreChoose({ 
    value, 
    onChange, 
    required,
    name,
    onBlur
  }: MateriaPrimaNombreChooseProps) {
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
          {PRODUCT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }