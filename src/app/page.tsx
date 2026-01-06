"use client"

import { useState, useEffect } from "react"
import { Activity, Dumbbell, Apple, TrendingUp, Flame, Target, Clock, Award, Droplet, Calendar, Check, CreditCard, Crown, Download, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function EalFit() {
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    // Detectar se o app já está instalado
    if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Verificar se o navegador suporta Web Share API
    if (typeof navigator !== 'undefined' && navigator.share) {
      setCanShare(true)
    }

    // Capturar evento de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      // Detectar quando o app foi instalado
      window.addEventListener('appinstalled', () => {
        setIsInstalled(true)
        setIsInstallable(false)
      })
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstallable(false)
    }
    
    setDeferredPrompt(null)
  }

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'EAL FIT',
          text: 'Confira este app incrível de fitness!',
          url: window.location.href,
        })
      } catch (err) {
        console.log('Erro ao compartilhar:', err)
      }
    }
  }

  const weightBars = [
    { id: "weight-bar-filled-1", filled: true },
    { id: "weight-bar-filled-2", filled: true },
    { id: "weight-bar-filled-3", filled: true },
    { id: "weight-bar-filled-4", filled: true },
    { id: "weight-bar-filled-5", filled: true },
    { id: "weight-bar-empty-6", filled: false },
    { id: "weight-bar-empty-7", filled: false },
    { id: "weight-bar-empty-8", filled: false }
  ]

  const workouts = [
    { id: "workout-1", name: "Peito e Tríceps", type: "Força", icon: Dumbbell, color: "pink", time: "45 min", cal: "320 kcal", status: "completed" },
    { id: "workout-2", name: "Corrida HIIT", type: "Cardio", icon: Flame, color: "orange", time: "30 min", cal: "280 kcal", status: "completed" },
    { id: "workout-3", name: "Costas e Bíceps", type: "Força", icon: Dumbbell, color: "pink", time: "50 min", cal: "340 kcal", status: "pending" },
    { id: "workout-4", name: "Yoga Flow", type: "Flexibilidade", icon: Activity, color: "purple", time: "40 min", cal: "180 kcal", status: "pending" }
  ]

  const exercises = [
    { id: "exercise-1", name: "Supino Reto", group: "Peito", reps: "4x12" },
    { id: "exercise-2", name: "Agachamento", group: "Pernas", reps: "4x10" },
    { id: "exercise-3", name: "Remada Curvada", group: "Costas", reps: "4x12" },
    { id: "exercise-4", name: "Desenvolvimento", group: "Ombros", reps: "3x12" }
  ]

  const meals = [
    { id: "meal-1", meal: "Café da Manhã", cal: "450 kcal", protein: "25g", carbs: "55g", fat: "12g" },
    { id: "meal-2", meal: "Almoço", cal: "680 kcal", protein: "45g", carbs: "70g", fat: "18g" },
    { id: "meal-3", meal: "Lanche", cal: "220 kcal", protein: "15g", carbs: "25g", fat: "8g" },
    { id: "meal-4", meal: "Jantar", cal: "500 kcal", protein: "40g", carbs: "45g", fat: "15g" }
  ]

  const progressDays = [
    { id: "progress-day-1", day: "Seg", value: 85, cal: "455 kcal" },
    { id: "progress-day-2", day: "Ter", value: 92, cal: "476 kcal" },
    { id: "progress-day-3", day: "Qua", value: 78, cal: "434 kcal" },
    { id: "progress-day-4", day: "Qui", value: 95, cal: "485 kcal" },
    { id: "progress-day-5", day: "Sex", value: 88, cal: "464 kcal" },
    { id: "progress-day-6", day: "Sáb", value: 70, cal: "410 kcal" },
    { id: "progress-day-7", day: "Dom", value: 82, cal: "446 kcal" }
  ]

  const monthlyFeatures = [
    { id: "monthly-feature-1", text: "Treinos ilimitados" },
    { id: "monthly-feature-2", text: "Planos personalizados" },
    { id: "monthly-feature-3", text: "Acompanhamento nutricional" },
    { id: "monthly-feature-4", text: "Suporte via chat" },
    { id: "monthly-feature-5", text: "Relatórios de progresso" }
  ]

  const annualFeatures = [
    { id: "annual-feature-1", text: "Tudo do plano mensal" },
    { id: "annual-feature-2", text: "Consultoria personalizada" },
    { id: "annual-feature-3", text: "Acesso a lives exclusivas" },
    { id: "annual-feature-4", text: "Receitas premium" },
    { id: "annual-feature-5", text: "Prioridade no suporte" },
    { id: "annual-feature-6", text: "Desconto em produtos parceiros" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Install Banner - Apenas se instalável e não instalado */}
      {isInstallable && !isInstalled && (
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-3 px-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5" />
              <div>
                <p className="font-semibold text-sm">Instale o EAL FIT</p>
                <p className="text-xs opacity-90">Acesse offline e tenha uma experiência melhor</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="secondary"
                onClick={handleInstallClick}
                className="bg-white text-pink-600 hover:bg-pink-50"
              >
                Instalar
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setIsInstallable(false)}
                className="text-white hover:bg-white/20"
              >
                Depois
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-pink-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-300 to-rose-400 p-2.5 rounded-xl shadow-lg shadow-pink-300/30">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                  EAL FIT
                </h1>
                <p className="text-xs text-gray-500">Seu ritmo, seu bem estar</p>
              </div>
            </div>
            <div className="flex gap-2">
              {canShare && (
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={handleShare}
                  className="border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              )}
              <Button className="bg-gradient-to-r from-pink-300 to-rose-400 hover:from-pink-400 hover:to-rose-500 text-white border-0 shadow-lg shadow-pink-300/30">
                <Crown className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Premium</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-pink-100/50 border border-pink-200 p-1 rounded-xl">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-300 data-[state=active]:to-rose-400 data-[state=active]:text-white transition-all rounded-lg"
            >
              <Activity className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Início</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workouts" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-300 data-[state=active]:to-rose-400 data-[state=active]:text-white transition-all rounded-lg"
            >
              <Dumbbell className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="nutrition" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-300 data-[state=active]:to-rose-400 data-[state=active]:text-white transition-all rounded-lg"
            >
              <Apple className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Nutrição</span>
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-300 data-[state=active]:to-rose-400 data-[state=active]:text-white transition-all rounded-lg"
            >
              <TrendingUp className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Progresso</span>
            </TabsTrigger>
            <TabsTrigger 
              value="plans" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-300 data-[state=active]:to-rose-400 data-[state=active]:text-white transition-all rounded-lg"
            >
              <CreditCard className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Planos</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Calorias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">1,850</div>
                  <p className="text-xs text-gray-600 mt-1">Meta: 2,500 kcal</p>
                  <Progress value={74} className="mt-3 h-2 bg-orange-200" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Target className="w-4 h-4 text-pink-500" />
                    Treinos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">12/20</div>
                  <p className="text-xs text-gray-600 mt-1">Este mês</p>
                  <Progress value={60} className="mt-3 h-2 bg-pink-200" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-blue-500" />
                    Hidratação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">2.1L</div>
                  <p className="text-xs text-gray-600 mt-1">Meta: 3L</p>
                  <Progress value={70} className="mt-3 h-2 bg-blue-200" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    Peso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900">75.5kg</div>
                  <p className="text-xs text-green-600 mt-1">↓ 2.5kg este mês</p>
                  <div className="mt-3 flex gap-1">
                    {weightBars.map((bar) => (
                      <div 
                        key={bar.id} 
                        className={`h-8 flex-1 rounded ${bar.filled ? 'bg-purple-400' : 'bg-purple-200'}`} 
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Iniciar Treino</CardTitle>
                <CardDescription>Escolha seu treino de hoje</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-orange-300/50 transition-all">
                  <Flame className="w-6 h-6" />
                  <span className="text-sm font-medium">Cardio</span>
                </Button>
                <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white border-0 shadow-lg hover:shadow-pink-300/50 transition-all">
                  <Dumbbell className="w-6 h-6" />
                  <span className="text-sm font-medium">Força</span>
                </Button>
                <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-purple-300/50 transition-all">
                  <Activity className="w-6 h-6" />
                  <span className="text-sm font-medium">Yoga</span>
                </Button>
                <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0 shadow-lg hover:shadow-green-300/50 transition-all">
                  <Clock className="w-6 h-6" />
                  <span className="text-sm font-medium">HIIT</span>
                </Button>
              </CardContent>
            </Card>

            {/* Today's Plan */}
            <Card className="bg-white border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-pink-500" />
                  Plano de Hoje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                  <div className="w-2 h-12 bg-gradient-to-b from-pink-400 to-rose-500 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Treino de Peito</h4>
                    <p className="text-sm text-gray-600">45 minutos • 320 kcal</p>
                  </div>
                  <Badge className="bg-pink-200 text-pink-700 border-pink-300">Agendado</Badge>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-12 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Cardio Leve</h4>
                    <p className="text-sm text-gray-600">30 minutos • 180 kcal</p>
                  </div>
                  <Badge className="bg-green-200 text-green-700 border-green-300">Opcional</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts" className="space-y-4">
            <Card className="bg-white border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Treinos da Semana</CardTitle>
                <CardDescription>Seu plano personalizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {workouts.map((workout) => {
                  const IconComponent = workout.icon
                  return (
                    <div key={workout.id} className={`p-4 rounded-lg border ${workout.status === "completed" ? "bg-green-50 border-green-200" : "bg-pink-50 border-pink-200"} transition-all hover:scale-[1.02]`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${workout.color === 'pink' ? 'bg-pink-200' : workout.color === 'orange' ? 'bg-orange-200' : 'bg-purple-200'}`}>
                            <IconComponent className={`w-5 h-5 ${workout.color === 'pink' ? 'text-pink-600' : workout.color === 'orange' ? 'text-orange-600' : 'text-purple-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                            <p className="text-sm text-gray-600">{workout.type}</p>
                          </div>
                        </div>
                        <Badge className={workout.status === "completed" ? "bg-green-500 hover:bg-green-600 text-white" : ""} variant={workout.status === "completed" ? "default" : "secondary"}>
                          {workout.status === "completed" ? "Concluído" : "Pendente"}
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {workout.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          {workout.cal}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="bg-white border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Exercícios Principais</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="p-3 bg-pink-50 rounded-lg border border-pink-200 hover:border-pink-400 transition-all">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                        <p className="text-sm text-gray-600">{exercise.group}</p>
                      </div>
                      <Badge variant="outline" className="text-pink-600 border-pink-300">{exercise.reps}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-4">
            <Card className="bg-white border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Resumo Nutricional</CardTitle>
                <CardDescription>Suas macros de hoje</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg border border-orange-200">
                    <div className="text-2xl font-bold text-gray-900">125g</div>
                    <div className="text-sm text-gray-600">Proteína</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-gray-900">195g</div>
                    <div className="text-sm text-gray-600">Carboidratos</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-gray-900">53g</div>
                    <div className="text-sm text-gray-600">Gorduras</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {meals.map((meal) => (
                    <div key={meal.id} className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{meal.meal}</h4>
                        <span className="text-lg font-bold text-pink-600">{meal.cal}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-orange-100 rounded">
                          <div className="font-medium text-gray-900">{meal.protein}</div>
                          <div className="text-xs text-gray-600">Proteína</div>
                        </div>
                        <div className="text-center p-2 bg-blue-100 rounded">
                          <div className="font-medium text-gray-900">{meal.carbs}</div>
                          <div className="text-xs text-gray-600">Carbs</div>
                        </div>
                        <div className="text-center p-2 bg-purple-100 rounded">
                          <div className="font-medium text-gray-900">{meal.fat}</div>
                          <div className="text-xs text-gray-600">Gordura</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <Card className="bg-white border-pink-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900">Evolução Semanal</CardTitle>
                <CardDescription>Últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressDays.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-12 text-sm font-medium text-gray-600">{item.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Progress value={item.value} className="h-3 bg-pink-100" />
                          <span className="text-sm text-gray-600">{item.cal}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-white/50 rounded">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl">
                      🏆
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Sequência de 7 dias</div>
                      <div className="text-xs text-gray-600">Continue assim!</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white/50 rounded">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-xl">
                      💪
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">50 treinos completos</div>
                      <div className="text-xs text-gray-600">Impressionante!</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total de treinos</span>
                    <span className="text-xl font-bold text-gray-900">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Horas treinadas</span>
                    <span className="text-xl font-bold text-gray-900">78h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Calorias totais</span>
                    <span className="text-xl font-bold text-gray-900">45.2k</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu Plano</h2>
              <p className="text-gray-600">Invista na sua saúde e bem-estar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Plano Mensal */}
              <Card className="bg-white border-pink-200 shadow-xl hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">Plano Mensal</CardTitle>
                  <CardDescription className="text-base mt-2">Flexibilidade total</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">R$ 49</span>
                    <span className="text-gray-600">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {monthlyFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-pink-300 to-rose-400 hover:from-pink-400 hover:to-rose-500 text-white border-0 shadow-lg h-12 text-base">
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>

              {/* Plano Anual */}
              <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300 shadow-2xl hover:scale-105 transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-1 text-sm shadow-lg">
                    <Crown className="w-3 h-3 mr-1 inline" />
                    Mais Popular
                  </Badge>
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">Plano Anual</CardTitle>
                  <CardDescription className="text-base mt-2">Economize 40%</CardDescription>
                  <div className="mt-6">
                    <div className="text-lg text-gray-500 line-through">R$ 588</div>
                    <span className="text-5xl font-bold text-gray-900">R$ 29</span>
                    <span className="text-gray-600">/mês</span>
                    <div className="text-sm text-pink-600 font-medium mt-2">R$ 348 cobrado anualmente</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {annualFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-pink-200 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-pink-700" />
                        </div>
                        <span className="text-gray-900 font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0 shadow-xl h-12 text-base font-semibold">
                    Assinar Agora
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Garantia */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 max-w-2xl mx-auto">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Garantia de 7 dias</h3>
                <p className="text-gray-600">
                  Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
