
import { Product } from '@/types/productType';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../atoms/ui/button';
import { Calendar } from '../atoms/ui/calendar';
import { MateriaPrimaNombreChoose } from '../atoms/ui/choose-materia-prima';
import ModalForm from './dialogs/ModalForm';

interface CreateProductModalFormButtonProps {
    addProduct: (productData: any) => Promise<Product>;
  }

export default function CreateProductModalFormButtom({
    addProduct
  }: CreateProductModalFormButtonProps){

      // ** Para el modal de creación **
  const [createOpen, setCreateOpen] = useState(false)
  const [expirationDate, setExpirationDate] = useState<Date>(new Date())
  const [selectedProduct, setSelectedProduct] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  
  
  const handleCreate = async (data: any) => {
    try {

      if (!nameTouched) {
        setNameTouched(true); 
        toast.error('Por favor seleccione un producto');
        return;
      }

      const finalData = {
        ...data,
        expirationDate: expirationDate.toISOString(),
        name: selectedProduct
      }
  
      console.log(finalData)

      await addProduct(finalData)
      
      toast.success('Producto creado')
      setCreateOpen(false)
      
      
    } catch {
      toast.error('Error al crear producto')
    }
  }

  const createFields = [
    [
      {
        type: 'custom',
        key: 'name',
        placeholder: 'Nombre',
        component: (
          <MateriaPrimaNombreChoose required
          onChange={setSelectedProduct}
          name="name" 
          value={selectedProduct}
          onBlur={() => setNameTouched(true)} />
        ),
      },
        
      { type: 'number', key: 'price', placeholder: 'Precio (USD)', required: true },
    ],
    [
      { type: 'number', key: 'quantity', placeholder: 'Cantidad', required: true },
      {
        type: 'custom',
        key: 'expirationDate',
        placeholder: 'Fecha de Vencimiento',
        component: (
          <Calendar
            mode="single"
            selected={expirationDate}
            onSelect={setExpirationDate}
            required={true}
          />
        ),
      },
    ],
  ] as Array<Array<import('@/types/formTypes').FormField>>


  return(
    <>
    <ModalForm
      open={createOpen}
      onOpenChange={setCreateOpen}
      title={{ text: 'Crear producto' }}
      formDataConfig={createFields}
      onSubmit={handleCreate}
      submitButtonText="Crear"
      width="400px"
    />
    <Button onClick={() => setCreateOpen(true)}>Crear Producto</Button>
    
  </>
  )




}