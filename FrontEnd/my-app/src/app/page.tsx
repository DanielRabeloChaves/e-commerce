"use client";

import Login from "../pages/login";
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

export default function Home() {
  return (
    <main>
      <Login />
    </main>
  );
}