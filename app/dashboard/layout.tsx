import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-background">
          <h1 className="text-xl font-semibold">Painel de Controle</h1>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 bg-muted/5 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
