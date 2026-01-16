import { DashboardLayout } from "@/Components/layout/DashboardLayout";
import { WelcomeCard } from "@/Components/dashboard/WelcomeCard";
import { FilamentCard } from "@/Components/dashboard/FilamentCard";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <WelcomeCard />
          <FilamentCard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
