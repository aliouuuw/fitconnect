"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Video, Clock } from "lucide-react"
import { useClasses } from "@/contexts/class-context"
import { useClients } from "@/contexts/client-context"
import { useAuth } from "@/contexts/auth-context"
import { format, isToday } from "date-fns"
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { classes } = useClasses()
  const { clients } = useClients()
  const { user } = useAuth()
  const router = useRouter()

  // Calculate statistics
  const todayClasses = classes.filter(class_ => 
    isToday(new Date(class_.datetime))
  ).length

  const activeClients = clients.length

  const totalHours = classes.reduce((acc, class_) => 
    acc + (class_.duration / 60), 0
  )

  const averageSessionLength = classes.length > 0
    ? Math.round(classes.reduce((acc, class_) => 
        acc + class_.duration, 0
      ) / classes.length)
    : 0

  const upcomingClasses = classes
    .filter(class_ => new Date(class_.datetime) > new Date())
    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .slice(0, 3)
    .map(class_ => ({
      id: class_.id,
      name: class_.name,
      time: format(new Date(class_.datetime), "h:mm a"),
      clients: class_.enrolledClients.length
    }))

  const handleStartClass = (classId: string) => {
    router.push(`/classroom/${classId}`)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Welcome back, {user?.name || "Coach"}</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Today&apos;s Classes</p>
                <h3 className="text-2xl font-bold">{todayClasses}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Active Clients</p>
                <h3 className="text-2xl font-bold">{activeClients}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Video className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Hours Coached</p>
                <h3 className="text-2xl font-bold">{Math.round(totalHours)}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
                <h3 className="text-2xl font-bold">{averageSessionLength}m</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.length > 0 ? (
                upcomingClasses.map((class_) => (
                  <div
                    key={class_.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold">{class_.name}</h4>
                      <p className="text-sm text-muted-foreground">{class_.time}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">{class_.clients}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStartClass(class_.id)}
                      >
                        Start Class
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No upcoming classes scheduled
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}