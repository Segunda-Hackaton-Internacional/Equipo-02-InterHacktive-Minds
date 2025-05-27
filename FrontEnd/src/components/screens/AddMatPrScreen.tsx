
import { useMatPrActions } from "@/hooks/flux/materia-prima/materiaPrimaAuth";
import { useMatPrStore } from "@/hooks/flux/materia-prima/materiaPrimaStore";
import { useEffect } from "react";
import CreateMatPrModalFormButtom from "../organisms/CreateMateriaPrima";
import ProductTemplate from "../templates/ProductTemplate";


const matprOptions = 
    [
        {value: 'Mango', label: 'Mango'},
        {value: 'Pitahaya', label: 'Pitahaya'}
    ]


const headerActions = (

    
    <CreateMatPrModalFormButtom ProductOptions={matprOptions}></CreateMatPrModalFormButtom>
    
);

export default function AddMatPrScreen(){

    const { loadAllMatPr} = useMatPrActions()
    const {materias_primas} = useMatPrStore()

    useEffect(() => {
    loadAllMatPr();
  }, [loadAllMatPr]);


return (
    
    <ProductTemplate data={[materias_primas]} columnsConfig={[]} headerActions={headerActions}></ProductTemplate>
  );
}