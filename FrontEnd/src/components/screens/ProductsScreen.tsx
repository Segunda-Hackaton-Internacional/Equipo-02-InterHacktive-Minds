
import { useProductActions } from '@/hooks/flux/product/useProductActions';
import { BaseProductTable } from '../organisms/BaseProductTable';
import CreateProductModalFormButtom from '../organisms/CreateProduct';
import { CreateProductButton } from '../organisms/MateriaPrima-form';
import { RadioSelectionProvider } from '../organisms/useProductsFromProcessTable';

export default function ProductScreen() {
  const { addProduct } = useProductActions();
  
  const headerActions = (
    <>
      <CreateProductModalFormButtom addProduct={addProduct} />
      <CreateProductButton />
    </>
  );

  return (<RadioSelectionProvider>
    <BaseProductTable headerActions={headerActions} />;
  </RadioSelectionProvider>
  );
}
