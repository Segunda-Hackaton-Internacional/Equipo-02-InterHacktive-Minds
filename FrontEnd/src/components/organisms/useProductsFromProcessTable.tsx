import { useProcessActions } from "@/hooks/flux/process/useProccesActions";
import { useProcessStore } from "@/hooks/flux/process/useProcessStore";
import { Process } from "@/types/processType";
import { ColumnConfig } from "@/types/table";
import { useEffect, useMemo } from "react";


export function useProductFromProcessData() {
  // Destructure the entire store state
  const { processes, loading, error } = useProcessStore();
  const { loadUserProcess } = useProcessActions();

  useEffect(() => {
    loadUserProcess();
  }, [loadUserProcess]);

  const handleEdit = async (process: Process) => {
    console.log("Editing process:", process);
  };

  const handleDelete = async (process: Process) => {
    console.log("Deleting process:", process);
  };

  return {
    processes, // This is now properly typed as Process[]
    loading,
    error,
    handleEdit,
    handleDelete
  };
}

export function useProductsFromProcessTable() {
  const { processes, loading, error, handleEdit, handleDelete } = useProductFromProcessData();

  console.log('not on use effect', processes)

  // Formatting functions
  const usd = (amount: number) => 
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);

  const fmtDate = (date?: string | Date) => 
    date ? new Date(date).toLocaleDateString() : '';

  // Safe transformation
  const toTableRow = (process: Process) => ({
    id: process.id,
    productIds: process.items?.map(i => i.productId).join(', ') || '',
    quantities: process.items?.map(i => i.quantity).join(', ') || '',
    totalAmount: usd(process.totalAmount || 0),
    startDate: fmtDate(process.startDate),
    deliveryDate: fmtDate(process.deliveryDate),
    progress: `${process.progressPercentage || 0}%`,
    status: process.status || 'OPERATING'
  });

  const tableData = useMemo(() => processes.map(toTableRow), [processes]);

  const columns = useMemo(() => 
    getColumns({ onEdit: handleEdit, onDelete: handleDelete }), 
    [handleEdit, handleDelete]
  );

  return {
    tableData,
    columns,
    loading,
    error
  };
}

// Column configuration
function getColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}): ColumnConfig[] {
  return [
    { id: 'id', accessorKey: 'id', headerLabel: 'ID', searchable: true },
    { id: 'productIds', accessorKey: 'productIds', headerLabel: 'Product IDs', searchable: true },
    { id: 'quantities', accessorKey: 'quantities', headerLabel: 'Quantities' },
    { id: 'totalAmount', accessorKey: 'totalAmount', headerLabel: 'Total Amount' },
    { id: 'startDate', accessorKey: 'startDate', headerLabel: 'Start Date' },
    { id: 'deliveryDate', accessorKey: 'deliveryDate', headerLabel: 'Delivery Date' },
    { id: 'progress', accessorKey: 'progress', headerLabel: 'Progress' },
    { id: 'status', accessorKey: 'status', headerLabel: 'Status', searchable: true },
    {
      id: 'actions',
      type: 'actions',
      actionItems: [
        { label: 'Editar', onClick: onEdit },
        { label: 'Eliminar', onClick: onDelete },
      ],
    }
  ];
  }