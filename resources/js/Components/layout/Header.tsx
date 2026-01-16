import { Avatar, AvatarFallback } from "@/Components/ui/avatar";

export function Header() {
  return (
    <header className="h-[var(--header-height)] bg-background border-b border-border flex items-center justify-end px-6">
      <Avatar className="h-8 w-8 bg-muted border border-border">
        <AvatarFallback className="bg-muted text-muted-foreground text-sm font-medium">
          A
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
