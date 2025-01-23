"use client"

import React, { createContext, useContext, useState } from 'react';
import { Class } from '@/lib/types';
import { mockClasses } from '@/lib/mock-data';

interface ClassContextType {
  classes: Class[];
  addClass: (classData: Omit<Class, 'id'>) => void;
  updateClass: (id: string, classData: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  enrollClient: (classId: string, clientId: string) => void;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export function ClassProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<Class[]>(mockClasses);

  const addClass = (classData: Omit<Class, 'id'>) => {
    const newClass: Class = {
      ...classData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setClasses([...classes, newClass]);
  };

  const updateClass = (id: string, classData: Partial<Class>) => {
    setClasses(classes.map(c => 
      c.id === id ? { ...c, ...classData } : c
    ));
  };

  const deleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const enrollClient = (classId: string, clientId: string) => {
    setClasses(classes.map(c =>
      c.id === classId
        ? { ...c, enrolledClients: [...c.enrolledClients, clientId] }
        : c
    ));
  };

  return (
    <ClassContext.Provider value={{ classes, addClass, updateClass, deleteClass, enrollClient }}>
      {children}
    </ClassContext.Provider>
  );
}

export function useClasses() {
  const context = useContext(ClassContext);
  if (context === undefined) {
    throw new Error('useClasses must be used within a ClassProvider');
  }
  return context;
}