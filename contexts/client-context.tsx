"use client"

import React, { createContext, useContext, useState } from 'react';
import { Client } from '@/lib/types';
import { mockClients } from '@/lib/mock-data';

interface ClientContextType {
  clients: Client[];
  addClient: (clientData: Omit<Client, 'id'>) => void;
  updateClient: (id: string, clientData: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [clients, setClients] = useState<Client[]>(mockClients);

  const addClient = (clientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      ...clientData,
      id: Math.random().toString(36).substr(2, 9),
    };
    setClients([...clients, newClient]);
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients(clients.map(c => 
      c.id === id ? { ...c, ...clientData } : c
    ));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
}