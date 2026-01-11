"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MapPin, Clock, Plus, X, Bike, User, ShieldCheck, Navigation } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Ride {
  id?: number;
  origin: string;
  destination: string;
  price: number;
  time_of_dept: string;
}

interface OfferRideModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function TransportPage() {
  const [activeTab, setActiveTab] = useState<"passenger" | "driver">("passenger");

  // Driver Mode State
  const [rides, setRides] = useState<Ride[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Passenger Mode State
  const [bookingState, setBookingState] = useState<"input" | "searching" | "confirmed">("input");
  const [selectedVehicle, setSelectedVehicle] = useState<"moto" | "auto" | "cab" | null>(null);
  const [rideDetails, setRideDetails] = useState({
    from: "Main Gate",
    to: "Hostel",
  });

  const fetchRides = useCallback(async () => {
    try {
      const res = await axios.get("/api/transport");
      setRides(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching rides:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  const handleBookRide = () => {
    if (!selectedVehicle) return;
    setBookingState("searching");
    // Simulate searching delay
    setTimeout(() => {
      setBookingState("confirmed");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-cyan-500/30 font-sans">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[130px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300">
            &larr; Dashboard
          </Link>
          {/* Mode Toggle */}
          <div className="flex bg-white/10 p-1 rounded-full backdrop-blur-md">
            <button
              onClick={() => setActiveTab("passenger")}
              className={cn(
                "ox-6 py-2 px-6 rounded-full text-sm font-medium transition-all",
                activeTab === "passenger" ? "bg-cyan-500 text-black shadow-lg" : "text-gray-400 hover:text-white"
              )}
            >
              Book Ride
            </button>
            <button
              onClick={() => setActiveTab("driver")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                activeTab === "driver" ? "bg-cyan-500 text-black shadow-lg" : "text-gray-400 hover:text-white"
              )}
            >
              Offer Ride
            </button>
          </div>
        </div>

        {activeTab === "passenger" ? (
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {bookingState === "input" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
                >
                  <h2 className="text-2xl font-bold mb-6">Where to?</h2>

                  <div className="space-y-4 mb-8">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500/50" />
                      <input
                        value={rideDetails.from}
                        onChange={e => setRideDetails({ ...rideDetails, from: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Pickup Location"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500/50" />
                      <input
                        value={rideDetails.to}
                        onChange={e => setRideDetails({ ...rideDetails, to: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Dropoff Location"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Choose a ride</h3>
                    <div
                      onClick={() => setSelectedVehicle("moto")}
                      className={cn("flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all", selectedVehicle === "moto" ? "bg-cyan-500/10 border-cyan-500" : "bg-white/5 border-transparent hover:bg-white/10")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                          <Bike className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold">Moto</div>
                          <div className="text-xs text-gray-400">Fast & Affordable</div>
                        </div>
                      </div>
                      <div className="font-bold">₹25</div>
                    </div>

                    <div
                      onClick={() => setSelectedVehicle("auto")}
                      className={cn("flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all", selectedVehicle === "auto" ? "bg-cyan-500/10 border-cyan-500" : "bg-white/5 border-transparent hover:bg-white/10")}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold">Auto</div>
                          <div className="text-xs text-gray-400">No Bargaining</div>
                        </div>
                      </div>
                      <div className="font-bold">₹45</div>
                    </div>
                  </div>

                  <button
                    onClick={handleBookRide}
                    disabled={!selectedVehicle}
                    className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-cyan-500/20"
                  >
                    Confirm Booking
                  </button>
                </motion.div>
              )}

              {bookingState === "searching" && (
                <motion.div
                  key="searching"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center min-h-[400px] flex flex-col items-center justify-center"
                >
                  <div className="relative w-32 h-32 mb-8">
                    <span className="absolute inset-0 rounded-full border-4 border-cyan-500/30 animate-ping" />
                    <span className="absolute inset-2 rounded-full border-4 border-cyan-500/50 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Navigation className="w-12 h-12 text-cyan-500 animate-bounce" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Finding your ride...</h3>
                  <p className="text-gray-400">Connecting you to nearby drivers</p>
                </motion.div>
              )}

              {bookingState === "confirmed" && (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-green-400">Driver Found!</h2>
                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs">2 min away</span>
                  </div>

                  <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                      <User className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Rohan Das</h3>
                      <div className="flex items-center gap-2 text-yellow-500 text-sm">
                        <span>★ 4.8</span>
                        <span className="text-gray-500">• Splendor Plus</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">WB 32 A 4509</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Otp for ride</span>
                      <span className="font-mono font-bold text-2xl tracking-widest text-cyan-500">4590</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">Call Driver</button>
                    <button
                      onClick={() => setBookingState("input")}
                      className="flex-1 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Available Requests</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-2.5 font-bold text-black hover:bg-cyan-400"
              >
                <Plus className="h-5 w-5" />
                Offer Ride
              </button>
            </div>

            {/* Rides Grid (Driver View) */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {rides.map((ride, index) => (
                  <RideCard key={ride.id || index} ride={ride} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {loading && (
              <div className="mt-12 text-center text-gray-500">Loading rides...</div>
            )}

            {!loading && rides.length === 0 && (
              <div className="mt-12 text-center text-gray-500">
                No requests available. Wait for bookings!
              </div>
            )}
          </div>
        )}

      </div>

      {/* Offer Ride Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <OfferRideModal
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setIsModalOpen(false);
              fetchRides();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RideCard({ ride, index }: { ride: Ride; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-white/10"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
          <Car className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
          ₹{ride.price}
        </span>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-3 text-gray-300">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span className="font-medium text-white">{ride.origin}</span>
          <span className="text-gray-600">to</span>
          <span className="font-medium text-white">{ride.destination}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>Leaving at {ride.time_of_dept}</span>
        </div>
      </div>

      <button className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-500 hover:text-black">
        Accept Request
      </button>
    </motion.div>
  );
}

function OfferRideModal({ onClose, onSuccess }: OfferRideModalProps) {
  const [formData, setFormData] = useState({
    origin: "Main Gate",
    destination: "Hostel",
    time_of_dept: "",
    price: "",
  });

  const locations = ["Main Gate", "Hostel", "Library", "Canteen", "Sports Complex"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/transport", {
        driver_id: 1,
        ...formData,
      });
      onSuccess();
    } catch (err) {
      console.error("Error posting ride:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-neutral-900 p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-white">Offer a Ride</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">From</label>
              <select
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-cyan-500 focus:outline-none"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-neutral-900">
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-gray-400">To</label>
              <select
                className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:border-cyan-500 focus:outline-none"
                value={formData.destination}
                onChange={(e) =>
                  setFormData({ ...formData, destination: e.target.value })
                }
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-neutral-900">
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Departure Time</label>
            <input
              type="text"
              placeholder="e.g. 10:30 AM"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none"
              value={formData.time_of_dept}
              onChange={(e) =>
                setFormData({ ...formData, time_of_dept: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-400">Price (₹)</label>
            <input
              type="number"
              placeholder="50"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white placeholder-gray-600 focus:border-cyan-500 focus:outline-none"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Post Ride
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
