import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: null,
    timeSlot: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available slots when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(format(formData.date, 'yyyy-MM-dd'));
    }
  }, [formData.date]);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await axios.get(`${API}/bookings/availability?date=${date}`);
      setAvailableSlots(response.data.available_slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast.error('Failed to load available slots');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.date || !formData.timeSlot) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        customer_name: formData.name,
        phone: formData.phone,
        date: format(formData.date, 'yyyy-MM-dd'),
        time_slot: formData.timeSlot
      };

      const response = await axios.post(`${API}/bookings`, bookingData);

      if (response.data.success) {
        toast.success('Booking confirmed! We look forward to seeing you.');
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          date: null,
          timeSlot: ''
        });
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.detail || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50">
        <CardTitle className="text-2xl text-center text-gray-800">Book Your Nail Session</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-gray-300 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-gray-300 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-700">Select Time Slot (90 minutes)</Label>
            {formData.date ? (
              availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                  {availableSlots.map((slot, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant={formData.timeSlot === slot ? 'default' : 'outline'}
                      className={`text-sm transition-all ${
                        formData.timeSlot === slot
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-50 border-gray-300'
                      }`}
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {slot.split(' - ')[0]}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4 border border-gray-200 rounded-lg">
                  No slots available for this date
                </p>
              )
            ) : (
              <p className="text-center text-gray-400 py-4 border border-gray-200 rounded-lg">
                Please select a date first
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 text-lg font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Confirm Booking'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;