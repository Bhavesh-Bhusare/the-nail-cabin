// mock.ts
import type { IconName } from "@/lib/icons";

export type Service = {
  id: number;
  title: string;
  description: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    id: 1,
    title: "Nail Extensions",
    description:
      "Premium quality gel and acrylic extensions for beautiful, long-lasting nails",
    icon: "Sparkles",
  },
  {
    id: 2,
    title: "Creative Nail Art",
    description:
      "Custom designs, patterns, and artistic expressions on your nails",
    icon: "Palette",
  },
  {
    id: 3,
    title: "Professional Nail Care",
    description:
      "Complete manicure and pedicure services with attention to detail",
    icon: "Heart",
  },
  {
    id: 4,
    title: "Gel Polish",
    description:
      "Long-lasting, chip-resistant gel polish in a variety of colors",
    icon: "Gem",
  },
  {
    id: 5,
    title: "Nail Treatments",
    description: "Nourishing treatments for stronger, healthier nails",
    icon: "Leaf",
  },
  {
    id: 6,
    title: "Hygiene-Focused Service",
    description: "Sterilized tools and clean environment for your safety",
    icon: "Shield",
  },
];

export const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    text: "Amazing service! The staff is incredibly skilled and polite. My nails have never looked better!",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    rating: 5,
    text: "Such creative and detailed work! The nail art designs are stunning. Highly recommend!",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Sneha Patel",
    rating: 5,
    text: "Clean and welcoming salon with a relaxing vibe. The attention to detail is impressive.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Kavya Mehta",
    rating: 5,
    text: "Great service every time! The team really knows their craft. My go-to place for nails.",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Riya Gupta",
    rating: 5,
    text: "Professional, hygienic, and creative. Love the ambiance and the quality of work!",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Nisha Kumar",
    rating: 5,
    text: "Best nail salon in Malad! The staff is friendly and the results are always perfect.",
    date: "3 weeks ago",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxuYWlsJTIwYXJ0fGVufDB8fHx8MTc2NTcxMDY3NHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1720343409646-960f6dcccae3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxuYWlsJTIwYXJ0fGVufDB8fHx8MTc2NTcxMDY3NHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1571290274554-6a2eaa771e5f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwzfHxuYWlsJTIwYXJ0fGVufDB8fHx8MTc2NTcxMDY3NHww&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHw0fHxuYWlsJTIwYXJ0fGVufDB8fHx8MTc2NTcxMDY3NHww&ixlib=rb-4.1.0&q=85",
  "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg",
  "https://images.pexels.com/photos/887352/pexels-photo-887352.jpeg",
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZXxlbnwwfHx8fDE3NjU3MTA2Nzl8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1610992015762-45dca7fa3a85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxtYW5pY3VyZXxlbnwwfHx8fDE3NjU3MTA2Nzl8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1610992015732-2449b76344bc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxtYW5pY3VyZXxlbnwwfHx8fDE3NjU3MTA2Nzl8MA&ixlib=rb-4.1.0&q=85",
  "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg",
  "https://images.unsplash.com/photo-1693776528358-57530ad993ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxnZWwlMjBuYWlsc3xlbnwwfHx8fDE3NjU3MTA2ODR8MA&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1693776528478-de6fe7717333?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxnZWwlMjBuYWlsc3xlbnwwfHx8fDE3NjU3MTA2ODR8MA&ixlib=rb-4.1.0&q=85",
  "https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg",
  "https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg",
  "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg",
];

export const features = [
  {
    id: 1,
    title: "5-Star Rated Service",
    description:
      "Trusted by 42+ happy customers with consistently excellent reviews",
  },
  {
    id: 2,
    title: "Skilled & Polite Staff",
    description:
      "Our experienced team provides professional care with a friendly approach",
  },
  {
    id: 3,
    title: "Clean Atmosphere",
    description:
      "Hygiene is our priority with sterilized tools and maintained environment",
  },
  {
    id: 4,
    title: "Attention to Detail",
    description: "Every nail is treated with precision and artistic care",
  },
  {
    id: 5,
    title: "Relaxing Vibe",
    description: "Enjoy a peaceful, comfortable experience during your visit",
  },
  {
    id: 6,
    title: "Creative Designs",
    description:
      "From classic to contemporary, we bring your nail art vision to life",
  },
];

export type TimeSlot = {
  id: number;
  time: string;
  available: boolean;
};

export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  let startHour: number = 9;
  let startMinute: number = 0;

  const formatTime = (hour: number, minute: number): string => {
    const period: "AM" | "PM" = hour >= 12 ? "PM" : "AM";
    const hour12: number = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  while (startHour < 21 || (startHour === 21 && startMinute === 0)) {
    const totalMinutes = startHour * 60 + startMinute + 90;

    const endHour: number = Math.floor(totalMinutes / 60);
    const endMinute: number = totalMinutes % 60;

    slots.push({
      id: slots.length + 1,
      time: `${formatTime(startHour, startMinute)} - ${formatTime(
        endHour,
        endMinute
      )}`,
      available: true,
    });

    startMinute += 90;

    if (startMinute >= 60) {
      startHour += Math.floor(startMinute / 60);
      startMinute = startMinute % 60;
    }
  }

  return slots;
};

export const businessInfo = {
  name: "The Nail Cabin",
  nameHindi: "द नेल केबिन",
  rating: 5.0,
  reviewCount: 42,
  address:
    "No. 13, Dheeraj Platinum CHS LTD, Chincholi Bunder Rd, Malad West, Mumbai, Maharashtra 400064",
  plusCode: "5RJQ+4G Mumbai, Maharashtra",
  phone: "+91 98765 43210",
  whatsapp: "+91 98765 43210",
  email: "info@thenailcabin.com",
  timings: "Open daily, 9 AM - 9 PM",
  social: {
    instagram: "https://instagram.com/thenailcabin",
    facebook: "https://facebook.com/thenailcabin",
  },
};
