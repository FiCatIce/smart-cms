import { Book, Github } from "lucide-react";

export function FilamentCard() {
  return (
    <div className="filament-card">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-foreground font-serif italic text-2xl tracking-tight">
            filament
          </h3>
          <p className="text-muted-foreground text-sm mt-1">v3.3.45</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <a
            href="#"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
          >
            <Book size={16} />
            Documentation
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-foreground hover:text-foreground/80 transition-colors text-sm"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
