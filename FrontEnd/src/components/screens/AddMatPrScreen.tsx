
import { useMatPrActions } from "@/hooks/flux/materia-prima/materiaPrimaAuth";
import { useMatPrStore } from "@/hooks/flux/materia-prima/materiaPrimaStore";
import { MateriaPrima } from "@/types/materiaPrimaTypes";
import { useEffect } from "react";
import CreateMatPrModalFormButtom from "../organisms/CreateMateriaPrima";
import ProductTemplate from "../templates/ProductTemplate";

  const mockProducts: MateriaPrima[] = [
  {
    id: '1',
    userId: '23',
    name: 'Pitahaya',
    price: 5.99,
    quantity: 10,
    expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '2',
    userId: 'u23',
    name: 'Pitahaya',
    price: 5.99,
    quantity: 5,
    expirationDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '3',
    userId: 'u3',
    name: 'Mango',
    price: 3.49,
    quantity: 20,
    expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '4',
    userId: 'u23',
    name: 'Mango',
    price: 3.49,
    quantity: 8,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() 
  },
  {
    id: '5',
    userId: 'us3',
    name: 'Mango',
    price: 3.49,
    quantity: 3,
    expirationDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() 
  }
];

const matprOptions = [
  {value: 'Mango', label: 'Mango'},
  {value: 'Pitahaya', label: 'Pitahaya'}
];

const headerActions = (
  <CreateMatPrModalFormButtom ProductOptions={matprOptions} />
);

const column_config = [{ id: 'id', accessorKey: 'id', headerLabel: 'ID', searchable: true },
    { id: 'name', accessorKey: 'name', headerLabel: 'Nombre', searchable: true },
    { id: 'price', accessorKey: 'price', headerLabel: 'Precio (USD)' },
    { id: 'quantity', accessorKey: 'quantity', headerLabel: 'Stock' },
    { id: 'expirationDate', accessorKey: 'expirationDate', headerLabel: 'Vence' },
    
      {
      id: 'choose', 
      type: 'selection',
      headerLabel: 'Nombre', 
      renderType: 'badgeWithText',
      searchable: true 
    }
  ];

export default function AddMatPrScreen() {
  const { loadAllMatPr } = useMatPrActions();
  const { materias_primas, loading, error } = useMatPrStore(); // Make sure to destructure materias_primas

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadAllMatPr(); // This dispatches the action
      } catch (err) {
        console.error('Failed to load materials:', err);
      }
    };
    
    fetchData();
  }, []);

  // Add this useEffect to log when materias_primas changes
  useEffect(() => {
    if (materias_primas) {
      console.log('Loaded materias primas:', materias_primas);
    }
  }, [materias_primas]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProductTemplate 
      data={mockProducts || []}  // Use the actual data from store
      columnsConfig={column_config} 
      headerActions={headerActions}
    />
  );
}