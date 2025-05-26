import ProductTemplate from '@/components/templates/ProductTemplate';
import { useProductTable } from './useProductTable';
import { useProductsFromProcessTable } from './useProductsFromProcessTable';

interface BaseProductTableProps {
  headerActions?: React.ReactNode;
  boolType?: boolean;
  onRowSelected?: (row: any) => void;
}

export function BaseProductTable({ headerActions, boolType = true, onRowSelected }: Readonly<BaseProductTableProps>) {
  const { tableData, columns } = boolType 
    ? useProductTable() 
    : useProductsFromProcessTable();

  return (
    <ProductTemplate
      data={tableData}
      columnsConfig={columns}
      headerActions={headerActions}
      onRowSelected={onRowSelected}
    />
  );
}