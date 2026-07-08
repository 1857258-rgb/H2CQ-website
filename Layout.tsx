import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Layout() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/components", label: "Components" },
    { to: "/build", label: "Build Specs" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded border border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-sm font-700 tracking-widest text-foreground uppercase">
              H2CQ
            </span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm tracking-wider uppercase transition-all duration-200 border ${
                    isActive
                      ? "text-primary border-primary/30 bg-primary/5"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border bg-card px-6 py-4 flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm tracking-wider uppercase transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-border mt-24 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-xs tracking-widest uppercase text-primary/60">
            H2CQ Build
          </span>
          <span className="text-xs tracking-wide">Custom AI Drone Platform · All rights reserved</span>
        </div>
      </footer>
    </div>
  );
}
