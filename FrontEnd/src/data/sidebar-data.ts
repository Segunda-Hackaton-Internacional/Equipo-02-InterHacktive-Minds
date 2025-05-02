import { Cpu, Presentation, Send, Settings, ShoppingBasket, User } from "lucide-react";
import type { SidebarData } from "../types/sideBar";

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'Menú',
      items: [
        {
          title: "Dashboard",
          url: "/estadisticas",
          icon: Presentation,
        },
        {
          title: "Mis productos",
          url: "/productos",
          icon: ShoppingBasket,
        },
        {
          title: "Mis procesos",
          url: "/procesos",
          icon: Cpu,
        },
        {
          title: "Despachar",
          url: "/despachos",
          icon: Send
        }
      ],
    },
    {
      title: "Otros",
      items: [
        {
          title: "Ajustes",
          icon: Settings,
          items: [
            { title: "Cuenta", url: "/ajustes/cuenta", icon: User },
          ]
        }
      ]
    }
  ],
};

