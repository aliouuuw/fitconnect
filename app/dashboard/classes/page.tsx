"use client"

import { useState } from "react"
import { useClasses } from "@/contexts/class-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Users, Trash2, Edit } from "lucide-react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

export default function ClassesPage() {
  const { classes, addClass, updateClass, deleteClass } = useClasses()
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<string | null>(null)
  const router = useRouter()

  const [newClass, setNewClass] = useState({
    name: "",
    description: "",
    datetime: "",
    duration: "45",
    maxParticipants: "10",
  })

  const [editClass, setEditClass] = useState({
    name: "",
    description: "",
    datetime: "",
    duration: "",
    maxParticipants: "",
  })

  const handleAddClass = () => {
    if (!user) return

    addClass({
      ...newClass,
      coachId: user.id,
      duration: parseInt(newClass.duration),
      maxParticipants: parseInt(newClass.maxParticipants),
      enrolledClients: [],
    })

    toast({
      title: "Success",
      description: "Class has been created successfully.",
    })

    setNewClass({
      name: "",
      description: "",
      datetime: "",
      duration: "45",
      maxParticipants: "10",
    })
  }

  const handleEditClick = (classId: string) => {
    const classToEdit = classes.find((c) => c.id === classId)
    if (classToEdit) {
      setEditClass({
        name: classToEdit.name,
        description: classToEdit.description,
        datetime: format(new Date(classToEdit.datetime), "yyyy-MM-dd'T'HH:mm"),
        duration: classToEdit.duration.toString(),
        maxParticipants: classToEdit.maxParticipants.toString(),
      })
      setEditingClass(classId)
      setIsEditDialogOpen(true)
    }
  }

  const handleUpdateClass = () => {
    if (!editingClass) return

    updateClass(editingClass, {
      name: editClass.name,
      description: editClass.description,
      datetime: editClass.datetime,
      duration: parseInt(editClass.duration),
      maxParticipants: parseInt(editClass.maxParticipants),
    })

    toast({
      title: "Success",
      description: "Class has been updated successfully.",
    })

    setIsEditDialogOpen(false)
    setEditingClass(null)
  }

  const handleDeleteClass = (id: string) => {
    deleteClass(id)
    toast({
      title: "Success",
      description: "Class has been deleted.",
    })
  }

  const handleStartClass = (classId: string) => {
    router.push(`/classroom/${classId}`)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Class Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add New Class</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Class Name</Label>
                  <Input
                    id="name"
                    value={newClass.name}
                    onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newClass.description}
                    onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="datetime">Date & Time</Label>
                  <Input
                    id="datetime"
                    type="datetime-local"
                    value={newClass.datetime}
                    onChange={(e) => setNewClass({ ...newClass, datetime: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newClass.duration}
                      onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={newClass.maxParticipants}
                      onChange={(e) => setNewClass({ ...newClass, maxParticipants: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddClass} className="mt-4">Create Class</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {classes.map((class_) => (
            <Card key={class_.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-semibold">{class_.name}</h3>
                    <p className="text-muted-foreground">{class_.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      onClick={() => handleStartClass(class_.id)}
                    >
                      Start Class
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditClick(class_.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteClass(class_.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {format(new Date(class_.datetime), "PPP")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{class_.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {class_.enrolledClients.length} / {class_.maxParticipants}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Class Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Class Name</Label>
                <Input
                  id="edit-name"
                  value={editClass.name}
                  onChange={(e) => setEditClass({ ...editClass, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editClass.description}
                  onChange={(e) => setEditClass({ ...editClass, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-datetime">Date & Time</Label>
                <Input
                  id="edit-datetime"
                  type="datetime-local"
                  value={editClass.datetime}
                  onChange={(e) => setEditClass({ ...editClass, datetime: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={editClass.duration}
                    onChange={(e) => setEditClass({ ...editClass, duration: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-maxParticipants">Max Participants</Label>
                  <Input
                    id="edit-maxParticipants"
                    type="number"
                    value={editClass.maxParticipants}
                    onChange={(e) => setEditClass({ ...editClass, maxParticipants: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleUpdateClass} className="mt-4">Update Class</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}