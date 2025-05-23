import { Cpu, Presentation, Send, Settings, ShoppingBasket, User } from "lucide-react";
import type { SidebarData } from "../types/sideBar";

// sidebarData.ts
export const getSidebarData = (userType: "OPERATOR" | "ADMIN" | "PROVEEDOR" | null): SidebarData => {
  const commonItems = [
    {
      title: "Ajustes",
      icon: Settings,
      items: [
        { title: "Cuenta", url: "/ajustes/cuenta", icon: User },
      ],
    },
  ];

  const roleItems = {
    OPERATOR: [
      { title: "Dashboard", url: "/estadisticas", icon: Presentation },
      { title: "Mis productos", url: "/productos", icon: ShoppingBasket },
      { title: "Mis procesos", url: "/procesos", icon: Cpu },
      { title: "Despachar", url: "/despachos", icon: Send },
    ],
    ADMIN: [
      // Items para ADMIN (pueden ser iguales a OPERATOR)
    ],
    PROVEEDOR: [
      { title: "Mis productos", url: "/proveedorProductos", icon: ShoppingBasket },
    ],
  };

  return {
    navGroups: [
      {
        title: "Menú",
        items: userType ? roleItems[userType] : [],
      },
      {
        title: "Otros",
        items: commonItems,
      },
    ],
  };
};

