'use client';

import { useParams } from 'next/navigation';
import { useClasses } from '@/contexts/class-context';
export default function ClassroomPage() {
  const params = useParams();
  const classId = params.id as string;
  const { classes } = useClasses();
  
  const classDetails = classes.find(c => c.id === classId);

  if (!classDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Class Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The class you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm p-4">
        <h1 className="text-xl font-semibold">{classDetails.name}</h1>
      </div>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Classroom Meeting</h1>
      </div>
    </div>
  );
}