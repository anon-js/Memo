import { getMemos } from "@/app/actions/memo";
import { auth } from "@/auth";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { prisma } from "@/lib/prisma";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  const [freshUser, memos] = await Promise.all([
    prisma.user.findUnique({ where: { id: session!.user.id } }),
    getMemos()
  ]);

  return (
    <SidebarProvider>
      <div className="flex h-screen p-2 overflow-hidden">
        <Sidebar user={freshUser!} memos={memos} />
        <div className="flex-4 flex flex-col min-w-0">
          <main className="flex-1 overflow-auto bg-white">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}