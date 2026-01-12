import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/app/modules/dashboard/ui/components/dashboard-sidebar";
import { DashboardNavBar } from "@/app/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1">
        <DashboardNavBar />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default Layout;
