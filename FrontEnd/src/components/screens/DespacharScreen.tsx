import { BaseProductTable } from "../organisms/BaseProductTable";
import { RadioSelectionProvider } from "../organisms/useProductsFromProcessTable";

export default function DespacharScreen() {

    

     return (
    <RadioSelectionProvider>
      <BaseProductTable boolType = {false} />;
    </RadioSelectionProvider>
  );
  }