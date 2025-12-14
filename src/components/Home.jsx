import React, { useState } from 'react';
import { Phone, Mail, MapPin, Star, Sparkles, Palette, Heart, Gem, Leaf, Shield, Instagram, Facebook, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import BookingForm from './BookingForm';
import { services, reviews, galleryImages, features, businessInfo } from '../mock';

const Home = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  const iconMap = {
    Sparkles: Sparkles,
    Palette: Palette,
    Heart: Heart,
    Gem: Gem,
    Leaf: Leaf,
    Shield: Shield
  };

  const scrollToBooking = () => {
    setShowBookingForm(true);
    setTimeout(() => {
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {businessInfo.name}
            </h1>
            <p className="text-sm text-gray-600">{businessInfo.nameHindi}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-semibold text-gray-800">{businessInfo.rating}</span>
              <span className="ml-1 text-sm text-gray-600">({businessInfo.reviewCount})</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-pink-100/30 to-purple-100/50" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Where Art Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Elegance</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
              Experience premium nail artistry in the heart of Malad West. Your nails deserve the best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                onClick={scrollToBooking}
                size="lg"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
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
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-50" />
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">About Us</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto" />
            <p className="text-lg text-gray-700 leading-relaxed">
              At The Nail Cabin, we believe that every nail tells a story. Our passionate team of skilled nail artists combines creativity, precision, and hygiene to deliver exceptional nail care services. Located in the vibrant neighborhood of Malad West, we've created a sanctuary where elegance meets artistry.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With over {businessInfo.reviewCount} five-star reviews, we pride ourselves on delivering personalized attention to every client. From classic manicures to intricate nail art, we're here to make your nail dreams a reality.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-pink-200">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 text-rose-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{service.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Us</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div key={feature.id} className="text-center space-y-3 p-6 rounded-lg hover:bg-rose-50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Star className="h-8 w-8 text-white fill-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-white to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Explore our stunning nail art creations</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Nail art design ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{review.text}"</p>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      {showBookingForm && (
        <section id="booking-section" className="py-20 bg-gradient-to-b from-white to-rose-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Book Your Appointment</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Choose your preferred date and time slot</p>
            </div>
            <BookingForm />
          </div>
        </section>
      )}

      {/* Location & Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visit Us</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-700">{businessInfo.address}</p>
                      <p className="text-sm text-gray-500 mt-1">{businessInfo.plusCode}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-700">{businessInfo.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-rose-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Timings</h4>
                      <p className="text-gray-700">{businessInfo.timings}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
                  onClick={() => window.open(`https://wa.me/${businessInfo.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                >
                  WhatsApp Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-gray-800 hover:bg-gray-800 hover:text-white"
                  onClick={() => window.open(`https://maps.google.com/?q=${businessInfo.address}`, '_blank')}
                >
                  Get Directions
                </Button>
              </div>
            </div>

            <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="The Nail Cabin Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.5!2d72.8388!3d19.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDEwJzQ4LjAiTiA3MsKwNTAnMTkuNyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h3 className="text-4xl md:text-5xl font-bold">Ready for Beautiful Nails?</h3>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Book your nail session today and experience the art of elegance
          </p>
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold transition-all transform hover:scale-105 shadow-xl"
          >
            Book Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold mb-4">{businessInfo.name}</h4>
              <p className="text-gray-400 mb-2">{businessInfo.nameHindi}</p>
              <p className="text-gray-400">Premium Nail Art Studio</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <div className="flex gap-4">
                <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href={businessInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 The Nail Cabin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;