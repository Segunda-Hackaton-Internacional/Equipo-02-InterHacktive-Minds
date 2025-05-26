
import { useProcessActions } from '@/hooks/flux/process/useProccesActions';
import { useProductActions } from '@/hooks/flux/product/useProductActions';
import { Product } from '@/types/productType';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '../atoms/ui/button';
import { BaseProductTable } from '../organisms/BaseProductTable';
import CreateProductModalFormButtom from '../organisms/CreateProduct';
import { RadioSelectionProvider } from '../organisms/useProductsFromProcessTable';
export default function ProductScreen() {
  const { addProduct, deleteProduct } = useProductActions();
  const { addProcess } = useProcessActions();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  
  const headerActions = (
    <>
      <CreateProductModalFormButtom addProduct={addProduct} />
      <Button 
        variant="outline" 
        onClick={async () => {
          if (!selectedProduct) {
            console.warn("No product selected");
            return;
          }

          setIsProcessing(true);
          try {
            const productCopy = JSON.parse(JSON.stringify(selectedProduct));
            
            
            const dataStock = {
              
              items: [{
                productId: productCopy.id,
                quantity: productCopy.quantity
              }],
              startDate: new Date(),
              deliveryDate: new Date(productCopy.expirationDate),
              progressPercentage: 0,
              status: 'OPERATING'
            };

            
            const response = await addProcess(dataStock);
            console.log("Stock created:", response);

            
            await deleteProduct(selectedProduct.id);
            
            console.log("Product deleted");

            
            setSelectedProduct(null);
          } catch (error) {
            console.error("Error in stock creation:", error);
            toast.error("Failed to create stock");
          } finally {
            setIsProcessing(false);
          }
        }}
        disabled={!selectedProduct || isProcessing}
      >
        {isProcessing ? "Processing..." : "Create Stock"}
      </Button>
    </>
  );

  return (
    <RadioSelectionProvider>
      <BaseProductTable 
        headerActions={headerActions}  
        onRowSelected={setSelectedProduct} 
      />
    </RadioSelectionProvider>
  );
}
