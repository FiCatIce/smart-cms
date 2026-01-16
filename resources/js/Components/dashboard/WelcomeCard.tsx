import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";

export function WelcomeCard() {
  return (
    <div className="dashboard-card flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 bg-muted border border-border">
          <AvatarFallback className="bg-muted text-muted-foreground text-lg font-medium">
            A
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-foreground font-semibold text-lg">Welcome</h3>
          <p className="text-muted-foreground text-sm">admin</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="gap-2 border-border text-foreground hover:bg-muted"
      >
        <LogOut size={16} />
        Sign out
      </Button>
    </div>
  );
}
