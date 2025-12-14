import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { IndianRupee, TrendingUp, Calendar, CreditCard } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EarningsReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get(
        `${API}/admin/earnings?month=${selectedMonth}&year=${selectedYear}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setReport(response.data);
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Failed to load earnings report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [selectedMonth, selectedYear]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-gray-600">Loading earnings report...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-600" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-4 py-2 border rounded-md"
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border rounded-md"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <Button onClick={fetchReport} variant="outline">
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm mb-1">Total Earnings</p>
                <h3 className="text-3xl font-bold">₹{report?.total_earnings || 0}</h3>
              </div>
              <IndianRupee className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Bookings</p>
                <h3 className="text-3xl font-bold">{report?.bookings_count || 0}</h3>
              </div>
              <TrendingUp className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Average per Booking</p>
                <h3 className="text-3xl font-bold">
                  ₹{report?.bookings_count > 0 ? Math.round(report.total_earnings / report.bookings_count) : 0}
                </h3>
              </div>
              <CreditCard className="h-12 w-12 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Mode Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          {report?.payment_breakdown && Object.keys(report.payment_breakdown).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(report.payment_breakdown).map(([mode, amount]) => (
                <div key={mode} className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                  <p className="text-sm text-gray-600 mb-1">{mode}</p>
                  <p className="text-2xl font-bold text-gray-900">₹{amount}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {((amount / report.total_earnings) * 100).toFixed(1)}% of total
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No payment data available</p>
          )}
        </CardContent>
      </Card>

      {/* Daily Earnings */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          {report?.daily_earnings && report.daily_earnings.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {report.daily_earnings.map((day) => (
                <div
                  key={day.date}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-700 font-medium">{day.date}</span>
                  <span className="text-lg font-bold text-green-600">₹{day.amount}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No daily earnings data</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsReport;
