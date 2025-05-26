import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';

import { useProductActions } from '@/hooks/flux/product/useProductActions';
import { useProductStore } from '@/hooks/flux/product/useProductStore';
import { ColumnConfig } from '@/types/table';

export function useProductData() {
    const { products } = useProductStore();
    const { loadUserProducts, updateProduct, deleteProduct } = useProductActions();
  
    //conseguir productos
    useEffect(() => {
      loadUserProducts();
    }, [loadUserProducts]);

    // handleedit
    const handleEdit = async (row: any) => {
      const newName = window.prompt('Nuevo nombre:', row.name);
      if (!newName || newName === row.name) return;
      await updateProduct(row.id, { name: newName });
      toast.success('Producto actualizado');
    };
  
    const handleDelete = async (row: any) => {
      if (window.confirm(`¿Eliminar producto "${row.name}"?`)) {
        await deleteProduct(row.id);
        toast.success('Producto eliminado');
      }
    };
  
    return {
      products,
      handleEdit,
      handleDelete
    };
  }

export function useProductTable() {
  
const { products, handleEdit, handleDelete } = useProductData();

  // formato
  const usd = (v: number) => 
    `$${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  const fmtDate = (d: string | Date) => new Date(d).toISOString().split('T')[0];

  // transformar data a producto
  const toTableRow = (p: any) => ({
    id: p.id,
    name: p.name,
    price: usd(p.price),
    quantity: p.quantity,
    expirationDate: fmtDate(p.expirationDate),
  });

 
  // tabla meomizada
  const tableData = useMemo(() => products.map(toTableRow), [products]);
  const columns = useMemo(() => getColumns({ onEdit: handleEdit, onDelete: handleDelete }), 
    [handleEdit, handleDelete]);

  return {
    tableData,
    columns
  };
}

// configuracion de columnas
function getColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}): ColumnConfig[] {
  return [
    { id: 'id', accessorKey: 'id', headerLabel: 'ID', searchable: true },
    { id: 'name', accessorKey: 'name', headerLabel: 'Nombre', searchable: true },
    { id: 'price', accessorKey: 'price', headerLabel: 'Precio (USD)' },
    { id: 'quantity', accessorKey: 'quantity', headerLabel: 'Stock' },
    { id: 'expirationDate', accessorKey: 'expirationDate', headerLabel: 'Vence' },
    {
      id: 'actions',
      type: 'actions',
      actionItems: [
        { label: 'Editar', onClick: onEdit },
        { label: 'Eliminar', onClick: onDelete },
      ],
    },
       {
  id: 'actions',
  type: 'actions',
  actionItems: [
    {
      label: 'Cambiar Estado',
      
      subMenu: [ 
        {
          
          radioGroup: {
            name: 'process-status', 
            valueKey: 'status',
            options: [
              {
                value: 'OPERANDO',
                label: 'Operando',
                
              },
              {
                value: 'ENVIADO',
                label: 'Enviado'
              },
              {
                value: 'ENTREGADO',
                label: 'Entregado'
              }
            ]
          }
        }
      ]
    }
  ]},
    { 
      id: 'choose', 
      type: 'selection',
      headerLabel: 'Nombre', 
      renderType: 'badgeWithText',
      searchable: true 
    }
  ];
}