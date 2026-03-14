import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ArrowDownToLine, Truck, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNav = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Products", path: "/products", icon: Package },
  { title: "Receipts", path: "/receipts", icon: ArrowDownToLine },
  { title: "Deliveries", path: "/deliveries", icon: Truck },
  { title: "Transfers", path: "/transfers", icon: ArrowLeftRight },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {mobileNav.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <RouterNavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium transition-all btn-press min-w-[56px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "drop-shadow-sm")} />
              <span>{item.title}</span>
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
}
