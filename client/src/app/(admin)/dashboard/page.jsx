"use client"
import { useAdminAuth } from '@/app/hooks/useAdminAuth';
import DashboardHome from './DashboardHome';

export default function DashboardPage() {
  
  useAdminAuth()
  return <DashboardHome />;
}