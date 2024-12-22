// src/components/MobileMenu.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import SignOut from "@/components/SignOut";
import { ModeToggle } from "@/components/ModeToggle";
import type { User } from "lucia";
import { MENU } from "@/utils/header";

const MobileMenu = ({ isAuthenticated }: { isAuthenticated: User | null }) => {
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
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Icons.x className="h-6 w-6" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 mt-6">
              {MENU.map(({ name, href }) => (
                <a
                  className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                  href={href}
                >
                  {name}
                </a>
              ))}
              <div className="pt-4 pb-6">
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
              <div className="flex flex-col space-y-4">
                <ModeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
