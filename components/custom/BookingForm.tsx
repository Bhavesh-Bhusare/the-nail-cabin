"use client";

import * as React from "react";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ClipLoader from "react-spinners/ClipLoader";

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

/* ---------------------------------- Types ---------------------------------- */

type BookingFormValues = {
  customerName: string;
  customerMobile: string;
  date: Date;
  timeSlot: string;
};

type Slot = {
  _id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

type SlotResponse = {
  success: boolean;
  data: {
    _id: string;
    date: string;
    slots: Slot[];
  };
};

/* -------------------------------- Utilities -------------------------------- */

const toAmPm = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const hour = h % 12 || 12;
  const suffix = h < 12 ? "AM" : "PM";
  return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
};

/* -------------------------------- Component -------------------------------- */

export default function BookingForm() {
  const today = new Date();

  const [dateId, setDateId] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<BookingFormValues>({
    defaultValues: {
      customerName: "",
      customerMobile: "",
      date: today,
      timeSlot: "",
    },
  });

  const selectedDate = form.watch("date");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ["slots", selectedDate],
    queryFn: async () => {
      if (!executeRecaptcha) throw new Error("Captcha not ready");

      const captchaToken = await executeRecaptcha("fetch_slots");

      const res = await axios.post<SlotResponse>(
        "/api/v1/bookings/get-available-slots",
        {
          date: format(selectedDate, "yyyy-MM-dd"),
          captchaToken,
        }
      );

      setDateId(res.data.data._id);
      return res.data.data.slots;
    },
    enabled: !!selectedDate && !!executeRecaptcha,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  React.useEffect(() => {
    form.setValue("timeSlot", "");
  }, [selectedDate]);

  const onSubmit = async (values: BookingFormValues) => {
    try {
      if (!executeRecaptcha) {
        toast.error("reCAPTCHA not ready. Please try again.");
        return;
      }

      setIsSubmitting(true);

      const captchaToken = await executeRecaptcha("create_booking");

      if (!captchaToken) {
        toast.error("Security check failed. Try again.");
        return;
      }

      await axios.post("/api/v1/bookings/create-booking", {
        customerName: values.customerName,
        customerMobile: values.customerMobile,
        date: format(values.date, "yyyy-MM-dd"),
        dateId,
        slotId: values.timeSlot,
        captchaToken,
      });

      toast.success("Booking confirmed!");

      form.reset({
        customerName: "",
        customerMobile: "",
        date: today,
        timeSlot: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Book Your Nail Session
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customerName"
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerMobile"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your mobile number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(field.value, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(d) => d < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeSlot"
              rules={{ required: "Please select a time slot" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  {isLoading ? (
                    <p>Loading slots...</p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {slots.map((slot) => (
                        <Button
                          key={slot._id}
                          type="button"
                          disabled={!slot.isAvailable}
                          variant={
                            field.value === slot._id ? "default" : "outline"
                          }
                          onClick={() => field.onChange(slot._id)}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {toAmPm(slot.startTime)} - {toAmPm(slot.endTime)}
                        </Button>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-lg flex items-center justify-center gap-3"
            >
              {isSubmitting && <ClipLoader size={22} />}
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
