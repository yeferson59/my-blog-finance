// src/components/Newsletter.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";

export default function Newsletter() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el email al servidor
    console.log('Suscribiendo:', email);
    setEmail('');
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <Button variant="outline" onClick={() => setIsOpen(!isOpen)} aria-haspopup="true" aria-expanded={isOpen}>
        <Icons.google className="mr-2 h-4 w-4" />
        Newsletter
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg">
          <form className="p-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50 mb-2"
            />
            <Button type="submit" className="w-full">Suscribirse</Button>
          </form>
        </div>
      )}
    </div>
  );
}