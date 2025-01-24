"use client"

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Video, Clock, Loader2 } from "lucide-react"
import { useClasses } from "@/contexts/class-context"
import { useClients } from "@/contexts/client-context"
import { useAuth } from "@/contexts/auth-context"
import { format, isToday } from "date-fns"
import { useRouter } from 'next/navigation'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const tClasses = useTranslations('classes');
  const { classes } = useClasses()
  const { clients } = useClients()
  const { user } = useAuth()
  const router = useRouter()
  const client = useStreamVideoClient()
  const { toast } = useToast()
  const [loadingClassId, setLoadingClassId] = useState<string | null>(null)

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

  const handleStartClass = async (classId: string) => {
    if (!client || !user) {
      console.error('Client or user not found: ', client, user);
      toast({
        title: "Error",
        description: "Failed to start the class. Please try again.",
        variant: "destructive"
      })
      return;
    }
    
    setLoadingClassId(classId)
    try {
      const classData = classes.find(c => c.id === classId);
      const role = user.role === 'coach' ? 'admin' : 'client';

      const id = crypto.randomUUID()

      const call = await client.call('default', id).getOrCreate({
        data: {
          starts_at: new Date(classData?.datetime || '').toISOString(),
          members: [{ user_id: user.id, role }],
          custom: {
            description: classData?.description || '',
          },
        }
      });

      router.push(`/classroom/${call.call.id}`)
      toast({
        title: "Class Started",
        description: "You are now in the class. Enjoy!",
        variant: "default"
      })
    } catch (error) {
      console.error('Failed to create call:', error)
      toast({
        title: "Error",
        description: "Failed to start the class. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoadingClassId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">
          {t('welcome', { name: user?.name || "Coach" })}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">{t('stats.todayClasses')}</p>
                <h3 className="text-2xl font-bold">{todayClasses}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">{t('stats.activeClients')}</p>
                <h3 className="text-2xl font-bold">{activeClients}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Video className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">{t('stats.hoursCoached')}</p>
                <h3 className="text-2xl font-bold">{Math.round(totalHours)}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center p-6">
              <Clock className="h-8 w-8 text-primary mr-4" />
              <div>
                <p className="text-sm text-muted-foreground">{t('stats.avgSession')}</p>
                <h3 className="text-2xl font-bold">{averageSessionLength}m</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>{t('upcomingClasses.title')}</CardTitle>
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
                        disabled={loadingClassId === class_.id}
                      >
                        {loadingClassId === class_.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          tClasses('actions.start')
                        )}
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  {t('upcomingClasses.noClasses')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}