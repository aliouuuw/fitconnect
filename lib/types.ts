// User Types
export type UserRole = 'coach' | 'client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Class Types
export interface Class {
  id: string;
  name: string;
  description: string;
  coachId: string;
  datetime: string;
  duration: number;
  maxParticipants: number;
  enrolledClients: string[];
}

// Client Types
export interface Client {
  id: string;
  name: string;
  email: string;
  coachId: string;
  enrolledClasses: string[];
  phone?: string;
}