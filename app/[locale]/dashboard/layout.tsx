import DashBoardHeader from "@/components/DashBoardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashBoardHeader />
      <main>{children}</main>
    </div>
  );
}
