import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut } from 'lucide-react';
import AppointmentsList from './AppointmentsList';
import EarningsReport from './EarningsReport';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const storedUsername = localStorage.getItem('admin_username');
    
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    setUsername(storedUsername || 'Admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {username}</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-gray-300 hover:bg-gray-100"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="appointments" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              Earnings Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsList />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;