"use client";

import Image from "next/image";
import { Clock, MapPin, Phone, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/custom/BookingForm";
import { iconMap } from "@/lib/icons";
import { businessInfo, galleryImages, reviews, services } from "@/mock";

export default function Home() {
  const scrollToBooking = () => {
    setTimeout(() => {
      document
        .getElementById("booking-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-rose-100/50 via-pink-100/30 to-purple-100/50" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Where Art Meets{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-pink-600">
                Elegance
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
              Experience premium nail artistry in the heart of Malad West. Your
              nails deserve the best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button onClick={scrollToBooking} size="lg" variant="nail">
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-6 text-lg font-semibold transition-all"
                onClick={() => window.open(`tel:${businessInfo.phone}`)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h3 className="text-4xl md:text-5xl font-bold">About Us</h3>
          <div className="w-24 h-1 bg-linear-to-r from-rose-500 to-pink-500 mx-auto" />
          <p className="text-lg text-gray-700">
            At The Nail Cabin, we believe that every nail tells a story. Our
            passionate team of skilled nail artists combines creativity,
            precision, and hygiene to deliver exceptional nail care services.
            Located in the vibrant neighborhood of Malad West, we&apos;ve
            created a sanctuary where elegance meets artistry.
          </p>
          <p className="text-lg text-gray-700">
            With over {businessInfo.reviewCount} five-star reviews, we pride
            ourselves on delivering personalized attention to every client. From
            classic manicures to intricate nail art, we&apos;re here to make
            your nail dreams a reality.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-linear-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Our Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card key={service.id} className="hover:shadow-xl transition">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-linear-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-rose-600" />
                    </div>
                    <h4 className="text-xl font-bold">{service.title}</h4>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-linear-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Our Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
              >
                <Image
                  src={src}
                  alt={`Nail art design ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="italic text-gray-700">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex justify-between border-t pt-2 text-sm">
                    <span className="font-semibold">{review.name}</span>
                    <span className="text-gray-500">{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      {/* {showBookingForm && (
      )} */}
      <section
        id="booking-section"
        className="py-20 bg-linear-to-b from-white to-rose-50"
      >
        <div className="container mx-auto px-4">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Book Your Appointment
          </h3>
          <BookingForm />
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6 flex gap-3">
              <MapPin className="text-rose-600" />
              <div>
                <h4 className="font-bold">Address</h4>
                <p>{businessInfo.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex gap-3">
              <Clock className="text-rose-600" />
              <div>
                <h4 className="font-bold">Timings</h4>
                <p>{businessInfo.timings}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
