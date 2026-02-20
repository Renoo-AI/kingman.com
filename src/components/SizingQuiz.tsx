"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Fit = "Slim" | "Regular" | "Tailored";

interface Measurements {
  chest: number;
  waist: number;
  inseam: number;
  height: number;
}

export default function SizingQuiz() {
  const [step, setStep] = useState(0);
  const [measurements, setMeasurements] = useState<Measurements>({
    chest: 100,
    waist: 85,
    inseam: 80,
    height: 180,
  });
  const [recommendation, setRecommendation] = useState<Fit | null>(null);

  const steps = [
    { title: "Vos Mesures", description: "Commençons par votre tour de poitrine et de taille." },
    { title: "Longueur & Stature", description: "Précisez votre entrejambe et votre taille totale." },
    { title: "Résultat", description: "Notre recommandation personnalisée." },
  ];

  const handleNext = () => {
    if (step === 1) {
      calculateFit();
    }
    setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => s - 1);

  const calculateFit = () => {
    const ratio = measurements.chest / measurements.waist;
    if (ratio > 1.2) setRecommendation("Slim");
    else if (ratio > 1.05) setRecommendation("Regular");
    else setRecommendation("Tailored");
  };

  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-card p-8 shadow-sm">
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span>Étape {step + 1} sur 3</span>
          <span>{steps[step].title}</span>
        </div>
        <div className="mt-2 h-1 w-full bg-secondary">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "33%" }}
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium">Tour de poitrine (cm)</label>
              <input
                type="number"
                value={measurements.chest}
                onChange={(e) => setMeasurements({ ...measurements, chest: +e.target.value })}
                className="mt-1 block w-full rounded-md border bg-transparent p-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Tour de taille (cm)</label>
              <input
                type="number"
                value={measurements.waist}
                onChange={(e) => setMeasurements({ ...measurements, waist: +e.target.value })}
                className="mt-1 block w-full rounded-md border bg-transparent p-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium">Entrejambe (cm)</label>
              <input
                type="number"
                value={measurements.inseam}
                onChange={(e) => setMeasurements({ ...measurements, inseam: +e.target.value })}
                className="mt-1 block w-full rounded-md border bg-transparent p-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Stature totale (cm)</label>
              <input
                type="number"
                value={measurements.height}
                onChange={(e) => setMeasurements({ ...measurements, height: +e.target.value })}
                className="mt-1 block w-full rounded-md border bg-transparent p-2 outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-4 flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold">Votre Coupe Idéale : {recommendation}</h3>
            <p className="mt-2 text-muted-foreground">
              Basé sur vos mesures, la coupe <span className="font-semibold">{recommendation}</span> vous offrira une silhouette élégante et un confort optimal pour votre événement.
            </p>
            <button
              onClick={() => setStep(0)}
              className="mt-8 text-sm font-semibold uppercase tracking-widest underline decoration-primary/30 underline-offset-4"
            >
              Recommencer le quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 2 && (
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={cn(
              "flex items-center text-sm font-semibold uppercase tracking-widest",
              step === 0 ? "opacity-30" : "hover:text-primary/70"
            )}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Retour
          </button>
          <button
            onClick={handleNext}
            className="flex items-center rounded-full bg-primary px-6 py-2 text-sm font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
          >
            {step === 1 ? "Voir mon résultat" : "Suivant"} <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
