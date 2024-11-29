import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLogo } from "./nav-logo";
import { NavItem } from "./nav-item";
import { mainNavItems } from "./constants";
import type { SidebarProps } from "./types";

type MobileNavProps = SidebarProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function MobileNav({ currentView, setCurrentView, open, setOpen }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed left-4 top-4 z-40"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>
            <NavLogo
              onClick={() => {
                setCurrentView('dashboard');
                setOpen(false);
              }}
              className="h-12 w-12 relative group"
            />
          </SheetTitle>
        </SheetHeader>
        <nav className="p-6 space-y-2">
          {mainNavItems.slice(1).map((item) => (
            <NavItem
              key={item.name}
              item={item}
              isActive={currentView === item.view}
              onClick={() => {
                setCurrentView(item.view);
                setOpen(false);
              }}
              variant="full"
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}