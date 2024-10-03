// src/components/SignOut.tsx
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function SignOut() {
  return (
    <form action="/api/auth/logout" method="POST" className="w-full">
      <Button variant="ghost" className="w-full">
        <Icons.logOut className="mr-2 h-4 w-4" />
        Cerrar Sesión
      </Button>
    </form>
  );
}