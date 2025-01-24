"use client"

import { useTranslations } from 'next-intl';
import { useState } from "react"
import { useClients } from "@/contexts/client-context"
import { useClasses } from "@/contexts/class-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, Calendar, Trash2, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ClientsPage() {
  const t = useTranslations('clients');
  const { clients, addClient, deleteClient } = useClients()
  const { classes } = useClasses()
  const { user } = useAuth()
  const { toast } = useToast()

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleAddClient = () => {
    if (!user) return;

    addClient({
      ...newClient,
      coachId: user.id,
      enrolledClasses: [],
    });

    toast({
      title: "Success",
      description: t('success.added'),
    });

    setNewClient({
      name: "",
      email: "",
      phone: "",
    })
  }

  const handleDeleteClient = (id: string) => {
    deleteClient(id)
    toast({
      title: "Success",
      description: "Client has been removed.",
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">{t('title')}</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                {t('addNew')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t('addNew')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('form.fullName')}</Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                </div>
                <Button onClick={handleAddClient} className="mt-4">Add Client</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold">{client.name}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {client.email}
                        </span>
                      </div>
                      {client.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {client.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Enrolled Classes</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {client.enrolledClasses.map((classId) => {
                      const classDetails = classes.find((c) => c.id === classId)
                      return classDetails ? (
                        <div
                          key={classId}
                          className="text-sm bg-muted px-2 py-1 rounded-md"
                        >
                          {classDetails.name}
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}