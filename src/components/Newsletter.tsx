// src/components/Newsletter.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";

export default function Newsletter() {
  return (
    <div className="relative inline-block">
      <a href="#newsletter">
        <Button variant="outline" aria-haspopup="true">
          <Icons.google className="mr-2 h-4 w-4" />
          Newsletter
        </Button>
      </a>
    </div>
  );
}
