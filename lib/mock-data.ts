import { User, Class, Client } from './types';
import { addHours } from 'date-fns';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'coach@example.com',
    name: 'John Trainer',
    role: 'coach',
  },
  {
    id: '2',
    email: 'client@example.com',
    name: 'Alice Student',
    role: 'client',
  },
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Morning HIIT',
    description: 'High-intensity interval training to start your day',
    coachId: '1',
    datetime: addHours(new Date(), 1).toISOString(),
    duration: 45,
    maxParticipants: 10,
    enrolledClients: ['2'],
  },
  {
    id: '2',
    name: 'Strength Training',
    description: 'Build muscle and improve strength',
    coachId: '1',
    datetime: addHours(new Date(), 2).toISOString(),
    duration: 60,
    maxParticipants: 8,
    enrolledClients: ['2'],
  },
];

export const mockClients: Client[] = [
  {
    id: '2',
    name: 'Alice Student',
    email: 'client@example.com',
    coachId: '1',
    enrolledClasses: ['1', '2'],
  },
];