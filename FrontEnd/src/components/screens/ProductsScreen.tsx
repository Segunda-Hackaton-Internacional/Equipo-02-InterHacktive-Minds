import { Button } from '@/components/atoms/ui/button'
import { Calendar } from '@/components/atoms/ui/calendar'
import ModalForm from '@/components/organisms/dialogs/ModalForm'
import ProductTemplate from '@/components/templates/ProductTemplate'
import { ColumnConfig } from '@/types/table'
import {
  useEffect,
  useMemo,
  useState
} from 'react'
import { toast } from 'sonner'

import { useProductActions } from '@/hooks/flux/product/useProductActions'
import { useProductStore } from '@/hooks/flux/product/useProductStore'
import { MateriaPrimaNombreChoose } from '../atoms/ui/choose-materia-prima'

const usd = (v: number) =>
  `$${v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

const fmtDate = (d: string | Date) =>
  new Date(d).toISOString().split('T')[0]

const toTableRow = (p: any) => ({
  id: p.id,
  name: p.name,
  price: usd(p.price),
  quantity: p.quantity,
  expirationDate: fmtDate(p.expirationDate),
})

function columns({
  onEdit,
  onDelete,
}: {
  onEdit: (row: any) => void
  onDelete: (row: any) => void
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
    {id: 'choose', 
      type: 'selection',
        headerLabel: 'Nombre', 
        renderType: 'badgeWithText', // Optional: to display as badges
        searchable: true 
     }
  ]
}

export default function ProductScreen() {
  const { products } = useProductStore()
  
  const {
    loadUserProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductActions()

  // carga inicial
  useEffect(() => {
    loadUserProducts()
  }, [loadUserProducts])

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

  const handleEdit = async (row: any) => {
    const newName = window.prompt('Nuevo nombre:', row.name)
    if (!newName || newName === row.name) return
    await updateProduct(row.id, { name: newName })
    toast.success('Producto actualizado')
  }
  const handleDelete = async (row: any) => {
    if (window.confirm(`¿Eliminar producto "${row.name}"?`)) {
      await deleteProduct(row.id)
      toast.success('Producto eliminado')
    }
  }

  const cols = useMemo(() => columns({ onEdit: handleEdit, onDelete: handleDelete }), [
    handleEdit,
    handleDelete,
  ])
  const tableData = useMemo(() => products.map(toTableRow), [products])

  const headerActions = (
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

  return (
    <ProductTemplate
      data={tableData}
      columnsConfig={cols}
      headerActions={headerActions}
    />
  )
}
