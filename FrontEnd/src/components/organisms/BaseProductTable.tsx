import ProductTemplate from '@/components/templates/ProductTemplate';
import { useProductTable } from './useProductTable';
import { useProductsFromProcessTable } from './useProductsFromProcessTable';

interface BaseProductTableProps {
  headerActions?: React.ReactNode;
  boolType?: boolean;
}

export function BaseProductTable({ headerActions, boolType = true }: Readonly<BaseProductTableProps>) {
  const { tableData, columns } = boolType 
    ? useProductTable() 
    : useProductsFromProcessTable();

  return (
    <ProductTemplate
      data={tableData}
      columnsConfig={columns}
      headerActions={headerActions}
    />
  );
}