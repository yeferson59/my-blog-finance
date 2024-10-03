// src/components/MobileMenu.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import SignOut from './SignOut';
import Newsletter from './Newsletter';
import type { User } from 'lucia';

interface MobileMenuProps {
  isAuthenticated: User | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <Icons.menu className="h-6 w-6" />
        <span className="sr-only">Abrir menú</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-end">
              <Button variant="outline" size="icon" onClick={() => setIsOpen(false)}>
                <Icons.x className="h-6 w-6" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 mt-6">
              <a className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400" href="/#inicio">Inicio</a>
              <a className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400" href="/#tecnologia">Tecnología</a>
              <a className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400" href="/#finanzas">Finanzas</a>
              <a className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400" href="/sobre-nosotros">Sobre Nosotros</a>
              <a className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400" href="/blog">Posts</a>
              <div className="pt-4 pb-10">
                {isAuthenticated ? (
                  <SignOut />
                ) : (
                  <a href="/auth/signin" className="w-full">
                    <Button variant="outline" className="w-full">
                      <Icons.logIn className="mr-2 h-4 w-4" />
                      Iniciar Sesión
                    </Button>
                  </a>
                )}
              </div>
              <div className=" w-full flex justify-end items-center">
                <Newsletter />
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;