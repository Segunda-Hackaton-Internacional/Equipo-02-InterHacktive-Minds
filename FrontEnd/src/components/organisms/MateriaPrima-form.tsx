import { useState } from "react";
import { Button } from "../atoms/ui/button";
import ModalForm from "./ModalForm";

export function CreateProductButton() {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [imagenSrc, setImagenSrc] = useState('');
  
  const createFields = [
      [
          { 
              type: 'text', 
              key: 'nombreMateriaPrima', 
              placeholder: 'nombre de la materia prima', 
              required: true,
              value: nombre,
              onChange: ({setNombre})
          },
      ],
      [
          { 
              type: 'text', 
              key: 'imagenSRC', 
              placeholder: 'url imagen', 
              required: true,
              value: imagenSrc,
              onChange: ({setImagenSrc})
          }
      ]
  ] as unknown as Array<Array<import('@/types/formTypes').FormField>>

  const handleCreate = async (data: any) => {
    
      console.log('Created materia prima:', {
            ...data,
          nombre: nombre,
          imagenSrc: imagenSrc
      });
      
      
      setNombre('');
      setImagenSrc('');
      setOpen(false);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Añadir materia prima</Button>
      <ModalForm
        open={open}
        onOpenChange={setOpen}
        title={{ text: 'Crear producto' }}
        formDataConfig={createFields}
        onSubmit={handleCreate}
        submitButtonText="Crear"
        width="400px"
      />
    </>
  )
}