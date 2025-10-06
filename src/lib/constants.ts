import {
  ChartNoAxesCombined,
  ClipboardList,
  LayoutDashboard,
  Mail,
} from "lucide-react"

export const USER_SIDEBAR = {
  student: [
    {
      name: "dashboard",
      Icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/messages",
    },
  ],
  parent: [
    {
      name: "dashboard",
      Icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/messages",
    },
  ],
  teacher: [
    {
      name: "dashboard",
      Icon: LayoutDashboard,
      path: "/student",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/messages",
    },
  ],
  admin: [
    {
      name: "dashboard",
      Icon: LayoutDashboard,
      path: "/student",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/messages",
    },
  ],
}
