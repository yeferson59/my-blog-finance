import React from 'react'
import type { LucideProps } from "lucide-react"
import {
  Moon,
  SunMedium,
  Twitter,
  Github,
  // Nota: 'Google' no está disponible, usaremos 'Mail' como alternativa
  Mail,
  LogOut,
  LogIn,
  ArrowRight,
  Menu,
  X
} from "lucide-react"

export type Icon = React.ComponentType<LucideProps>

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  gitHub: Github,
  google: Mail, // Usamos Mail como alternativa para Google
  logOut: LogOut,
  logIn: LogIn,
  arrowRight: ArrowRight,
  menu: Menu,
  x: X
}