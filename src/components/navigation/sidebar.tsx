import { useState } from "react";
import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import type { SidebarProps } from "./types";

export default function Sidebar(props: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MobileNav {...props} open={open} setOpen={setOpen} />
      <DesktopNav {...props} />
    </>
  );
}