'use client'

import UserProvider from '@/app/context/user/UserProvider';
import SideNav from '@/app/ui/dashboard/sidenav';
import { BrowserRouter } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <UserProvider>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}