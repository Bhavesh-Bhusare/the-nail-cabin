"use client";

import * as React from "react";
import axios, { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

/* ----------------------------------
   ENV
----------------------------------- */
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

/* ----------------------------------
   Types
----------------------------------- */
type BookingFormValues = {
  name: string;
  phone: string;
  date: Date | undefined;
  timeSlot: string;
};

type AvailabilityResponse = {
  available_slots: string[];
};

type BookingResponse = {
  success: boolean;
};

export default function BookingForm() {
  const [availableSlots, setAvailableSlots] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<BookingFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      date: undefined,
      timeSlot: "",
    },
  });

  const selectedDate = form.watch("date");

  /* ----------------------------------
     Fetch available slots
  ----------------------------------- */
  React.useEffect(() => {
    if (!selectedDate) return;

    const fetchSlots = async () => {
      try {
        const response = await axios.get<AvailabilityResponse>(
          `${API}/bookings/availability?date=${format(
            selectedDate,
            "yyyy-MM-dd"
          )}`
        );
        setAvailableSlots(response.data.available_slots);
      } catch {
        toast.error("Failed to load available slots");
      }
    };

    fetchSlots();
  }, [selectedDate]);

  /* ----------------------------------
     Submit
  ----------------------------------- */
  const onSubmit = async (values: BookingFormValues) => {
    setLoading(true);

    try {
      const payload = {
        customer_name: values.name,
        phone: values.phone,
        date: format(values.date!, "yyyy-MM-dd"),
        time_slot: values.timeSlot,
      };

      const response = await axios.post<BookingResponse>(
        `${API}/bookings`,
        payload
      );

      if (response.data.success) {
        toast.success("Booking confirmed! We look forward to seeing you.");
        form.reset();
        setAvailableSlots([]);
      }
    } catch (error) {
      const err = error as AxiosError<{ detail?: string }>;
      toast.error(err.response?.data?.detail ?? "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-linear-to-r from-rose-50 to-pink-50">
        <CardTitle className="text-2xl text-center">
          Book Your Nail Session
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9+\s-]{8,15}$/,
                  message: "Enter a valid phone number",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 XXXXX XXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              rules={{ required: "Please select a date" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Slots */}
            <FormField
              control={form.control}
              name="timeSlot"
              rules={{ required: "Please select a time slot" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Time Slot (90 minutes)</FormLabel>

                  {selectedDate ? (
                    availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                        {availableSlots.map((slot) => (
                          <Button
                            key={slot}
                            type="button"
                            variant={
                              field.value === slot ? "default" : "outline"
                            }
                            onClick={() => field.onChange(slot)}
                            className="text-sm"
                          >
                            <Clock className="mr-1 h-3 w-3" />
                            {slot.split(" - ")[0]}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500 py-4 border rounded-lg">
                        No slots available for this date
                      </p>
                    )
                  ) : (
                    <p className="text-center text-gray-400 py-4 border rounded-lg">
                      Please select a date first
                    </p>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg font-semibold"
            >
              {loading ? "Confirming..." : "Confirm Booking"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
