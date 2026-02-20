"use client";

import React, { useState, useMemo } from "react";
import { format, addDays, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, Truck, RotateCcw, PartyPopper, Info } from "lucide-react";
import { calculateLogisticsDates, isAvailable, DateRange } from "@/lib/availability";
import { cn } from "@/lib/utils";

// Mock existing rentals for demonstration
const MOCK_EXISTING_RENTALS: DateRange[] = [
  { start: addDays(new Date(), 5), end: addDays(new Date(), 8) },
];

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const logistics = useMemo(() => {
    if (!selectedDate) return null;
    const date = new Date(selectedDate);
    return calculateLogisticsDates(date);
  }, [selectedDate]);

  const availabilityStatus = useMemo(() => {
    if (!logistics) return null;
    const range = { start: logistics.deliveryDate, end: logistics.returnDate };
    return isAvailable(range, MOCK_EXISTING_RENTALS);
  }, [logistics]);

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-sm">
      <h3 className="mb-6 font-serif text-2xl font-bold">Réservez votre tenue</h3>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Date de votre événement
          </label>
          <div className="relative">
            <input
              type="date"
              min={format(addDays(startOfToday(), 7), "yyyy-MM-dd")} // J+7 minimum lead time
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-md border bg-transparent p-3 pl-10 outline-none focus:ring-2 focus:ring-primary/20"
            />
            <CalendarIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {logistics && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="rounded-lg bg-secondary/50 p-6">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">Timeline de votre location</h4>
              <div className="relative flex flex-col space-y-8 before:absolute before:left-4 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-primary/20">

                <div className="relative flex items-center pl-10">
                  <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary shadow-sm">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Livraison à domicile (J-2)</p>
                    <p className="text-xs text-muted-foreground">{format(logistics.deliveryDate, "EEEE d MMMM yyyy", { locale: fr })}</p>
                  </div>
                </div>

                <div className="relative flex items-center pl-10">
                  <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <PartyPopper className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Le jour J (Mariage)</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(selectedDate), "EEEE d MMMM yyyy", { locale: fr })}</p>
                  </div>
                </div>

                <div className="relative flex items-center pl-10">
                  <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary shadow-sm">
                    <RotateCcw className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Retour par transporteur (J+1)</p>
                    <p className="text-xs text-muted-foreground">{format(logistics.returnDate, "EEEE d MMMM yyyy", { locale: fr })}</p>
                  </div>
                </div>

              </div>
            </div>

            <div className={cn(
              "flex items-start gap-4 rounded-lg p-4",
              availabilityStatus ? "bg-green-50 text-green-800 border border-green-100" : "bg-red-50 text-red-800 border border-red-100"
            )}>
              <Info className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">
                  {availabilityStatus ? "Disponible pour ces dates" : "Non disponible pour ces dates"}
                </p>
                <p className="text-xs opacity-90">
                  {availabilityStatus
                    ? "Nous avons un costume prêt à votre taille. Le pressing est déjà inclus."
                    : "Ce modèle est déjà réservé ou en cours de nettoyage à ces dates. Veuillez choisir une autre date."}
                </p>
              </div>
            </div>

            {availabilityStatus && (
              <button className="w-full rounded-full bg-primary py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90 shadow-lg">
                Confirmer la réservation
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
