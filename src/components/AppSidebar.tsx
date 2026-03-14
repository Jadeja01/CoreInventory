import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  Truck,
  ArrowLeftRight,
  ClipboardList,
  History,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

const mainNav = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Products", path: "/products", icon: Package },
];

const operationsNav = [
  { title: "Receipts", path: "/receipts", icon: ArrowDownToLine },
  { title: "Deliveries", path: "/deliveries", icon: Truck },
  { title: "Transfers", path: "/transfers", icon: ArrowLeftRight },
  { title: "Adjustments", path: "/adjustments", icon: ClipboardList },
  { title: "Move History", path: "/history", icon: History },
];

const settingsNav = [
  { title: "Warehouses", path: "/warehouses", icon: Warehouse },
  { title: "Settings", path: "/settings", icon: Settings },
];

interface NavItemProps {
  item: { title: string; path: string; icon: React.ElementType };
  collapsed: boolean;
}

function NavItem({ item, collapsed }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === item.path;

  return (
    <RouterNavLink
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all btn-press",
        collapsed ? "justify-center px-2" : "",
        isActive
          ? "bg-primary/15 text-primary-foreground shadow-ceramic inner-glow"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <item.icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{item.title}</span>}
    </RouterNavLink>
  );
}

function NavGroup({ label, items, collapsed }: { label: string; items: typeof mainNav; collapsed: boolean }) {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
      )}
      {items.map((item) => (
        <NavItem key={item.path} item={item} collapsed={collapsed} />
      ))}
    </div>
  );
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn("flex items-center h-16 px-4 border-b border-sidebar-border", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">Aura IMS</span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
            <Package className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors",
            collapsed && "absolute -right-3 top-5 bg-card shadow-ceramic border z-10"
          )}
        >
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        <NavGroup label="Overview" items={mainNav} collapsed={collapsed} />
        <NavGroup label="Operations" items={operationsNav} collapsed={collapsed} />
        <NavGroup label="Settings" items={settingsNav} collapsed={collapsed} />
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground w-full btn-press transition-all"
        >
          {theme === "light" ? <Moon className="h-5 w-5 shrink-0" /> : <Sun className="h-5 w-5 shrink-0" />}
          {!collapsed && <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
        </button>
        <RouterNavLink
          to="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground btn-press transition-all"
        >
          <User className="h-5 w-5 shrink-0" />
          {!collapsed && <span>My Profile</span>}
        </RouterNavLink>
      </div>
    </aside>
  );
}
