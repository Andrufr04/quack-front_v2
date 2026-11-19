import HomeIcon from "@/components/ui/Icon/HomeIcon";
import DashboardIcon from "@/components/ui/Icon/DashboardIcon";
import CalendarIcon from "@/components/ui/Icon/CalendarIcon";
import ChatsIcon from "@/components/ui/Icon/ChatsIcon";
import SettingsIcon from "@/components/ui/Icon/SettingsIcon";
import NotificationIcon from "@/components/ui/Icon/NotificationIcon";
import TasksIcon from "@/components/ui/Icon/TasksIcon";

export const navigation = [
  [{ label: "Home", href: "/home", icon: HomeIcon }],
  [
    { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
    { label: "Calendar", href: "/calendar", icon: CalendarIcon },
    { label: "Chats", href: "/chats", icon: ChatsIcon },
    { label: "Tasks", href: "/tasks", icon: TasksIcon },
  ],
  [
    { label: "Notifications", href: "/notifications", icon: NotificationIcon, badge: 5 },
    { label: "Settings", href: "/settings", icon: SettingsIcon },
  ],
] as const;
