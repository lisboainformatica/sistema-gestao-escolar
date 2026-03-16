import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap, DollarSign } from "lucide-react"

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions)

  const stats = [
    { title: "Total de Alunos", value: "1.240", icon: Users, trend: "+12% mês passado" },
    { title: "Turmas Ativas", value: "42", icon: BookOpen, trend: "Estável" },
    { title: "Professores", value: "86", icon: GraduationCap, trend: "+3 novos neste semestre" },
    { title: "Receita", value: "R$ 45.231,89", icon: DollarSign, trend: "+20.1% mês passado" },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Visão Geral</h2>
        <p className="text-muted-foreground">
          Bem-vindo de volta, {session?.user?.name || "Administrador"}. Veja o que está acontecendo hoje.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 transition-all hover:shadow-sm">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed border-muted rounded-lg mx-4 mb-4">
              [Gráfico de Atividades]
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 transition-all hover:shadow-sm">
          <CardHeader>
            <CardTitle>Próximas Aulas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-4"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Matemática 101 - Grau {i+5}</p>
                    <p className="text-sm text-muted-foreground">
                      Sala 402 • 10:00
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-sm text-primary bg-primary/10 px-2 py-1 rounded-md">Em 30 min</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
