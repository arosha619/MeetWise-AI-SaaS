import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/app/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavBar } from "@/app/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <DashboardNavBar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};
export default Layout;
