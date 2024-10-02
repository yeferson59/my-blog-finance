// src/components/SignOut.tsx
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export default function SignOut() {
  return (
    <form action="/api/auth/logout" method="POST">
      <Button variant="ghost">
        <Icons.logOut className="mr-2 h-4 w-4" />
        Cerrar Sesión
      </Button>
    </form>
  );
}