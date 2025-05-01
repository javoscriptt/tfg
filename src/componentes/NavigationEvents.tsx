'use client';

import { usePathname } from 'next/navigation';

export function NavigationEvents({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const mostrarComponentes = !['/login', '/registro'].includes(pathname);

  return (
    <>
      {mostrarComponentes && children}
    </>
  );
}