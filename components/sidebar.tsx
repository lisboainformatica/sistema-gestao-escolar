import Link from "next/link"
import { Users, GraduationCap, BookOpen, CreditCard, LayoutDashboard, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  const links = [
    { name: "Painel", href: "/dashboard", icon: LayoutDashboard },
    { name: "Alunos", href: "/dashboard/students", icon: Users },
    { name: "Professores", href: "/dashboard/teachers", icon: GraduationCap },
    { name: "Acadêmico", href: "/dashboard/academics", icon: BookOpen },
    { name: "Financeiro", href: "/dashboard/financial", icon: CreditCard },
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r bg-muted/20 flex flex-col justify-between hidden md:flex min-h-screen">
      <div>
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight text-primary">EduSaaS</h2>
        </div>
        <nav className="space-y-1 px-4">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="p-4">
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-muted"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Link>
      </div>
    </aside>
  )
}
