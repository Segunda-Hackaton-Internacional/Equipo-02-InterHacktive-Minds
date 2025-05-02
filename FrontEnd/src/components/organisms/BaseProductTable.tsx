import ProductTemplate from '@/components/templates/ProductTemplate';
import { useProductTable } from './useProductTable';

interface BaseProductTableProps {
  headerActions?: React.ReactNode;
}

export function BaseProductTable({ headerActions }: BaseProductTableProps) {
  const { tableData, columns } = useProductTable();

  return (
    <ProductTemplate
      data={tableData}
      columnsConfig={columns}
      headerActions={headerActions}
    />
  );
}