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
      path: "/student/dashboard",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/student/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/student/grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/student/messages",
    },
  ],
  parent: [
    {
      name: "dashboard",
      Icon: LayoutDashboard,
      path: "/parent/dashboard",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/parent/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/parent/grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/parent/messages",
    },
  ],
  teacher: [
    {
      name: "dashboard",
      Icon: LayoutDashboard,
      path: "/teacher/dashboard",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/teacher/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/teacher/grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/teacher/messages",
    },
  ],
  admin: [
    {
      name: "dashboard",
      Icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "assignments",
      Icon: ClipboardList,
      path: "/admin/assignments",
    },
    {
      name: "grades",
      Icon: ChartNoAxesCombined,
      path: "/admin /grades",
    },
    {
      name: "messages",
      Icon: Mail,
      path: "/admin/messages",
    },
  ],
}
