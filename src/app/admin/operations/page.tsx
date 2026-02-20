"use client";

import React from "react";
import {
  CheckCircle2,
  Truck,
  Waves,
  AlertCircle,
  MoreVertical,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "READY" | "RENTED" | "TRANSIT" | "CLEANING" | "MAINTENANCE" | "RETIRED";

interface Item {
  id: string;
  sku: string;
  name: string;
  size: string;
  status: Status;
  rentals: number;
}

const ITEMS: Item[] = [
  { id: "1", sku: "SUIT-NAVY-52R", name: "Costume 3-pièces Bleu Nuit", size: "52R", status: "READY", rentals: 12 },
  { id: "2", sku: "SUIT-GREY-50S", name: "Costume Gris Anthracite", size: "50S", status: "CLEANING", rentals: 18 },
  { id: "3", sku: "SUIT-BLACK-48T", name: "Smoking Noir Satin", size: "48T", status: "TRANSIT", rentals: 5 },
  { id: "4", sku: "SUIT-NAVY-54R", name: "Costume 3-pièces Bleu Nuit", size: "54R", status: "MAINTENANCE", rentals: 22 },
  { id: "5", sku: "SUIT-BEIGE-50R", name: "Costume Lin Beige", size: "50R", status: "RETIRED", rentals: 25 },
];

const statusConfig: Record<Status, { label: string; icon: any; color: string }> = {
  READY: { label: "Prêt", icon: CheckCircle2, color: "bg-green-100 text-green-700 border-green-200" },
  RENTED: { label: "Loué", icon: Truck, color: "bg-blue-100 text-blue-700 border-blue-200" },
  TRANSIT: { label: "En Transit", icon: Truck, color: "bg-purple-100 text-purple-700 border-purple-200" },
  CLEANING: { label: "Pressing", icon: Waves, color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  MAINTENANCE: { label: "Maintenance", icon: AlertCircle, color: "bg-amber-100 text-amber-700 border-amber-200" },
  RETIRED: { label: "Déclassé", icon: AlertCircle, color: "bg-red-100 text-red-700 border-red-200" },
};

export default function OperationsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-serif text-3xl font-bold">Opérations Logistiques</h1>
          <p className="text-muted-foreground">Gestion de l&apos;inventaire et suivi du cycle de vie des costumes.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un SKU ou modèle..."
            className="rounded-full border bg-background py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">Modèle & SKU</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">Taille</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider">Statut</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-center">Locations</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {ITEMS.map((item) => {
              const config = statusConfig[item.status];
              const Icon = config.icon;
              const isWarning = item.rentals > 20 && item.status !== 'RETIRED';

              return (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold">{item.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{item.sku}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.size}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                      config.color
                    )}>
                      <Icon className="h-3.5 w-3.5" />
                      {config.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "font-semibold",
                      isWarning ? "text-amber-600" : "text-foreground"
                    )}>
                      {item.rentals}
                    </span>
                    {isWarning && (
                      <div className="text-[10px] text-amber-600 font-medium">Seuil atteint</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-md p-1 hover:bg-muted transition-colors">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-background p-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">À traiter aujourd&apos;hui</h4>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">8</span>
            <Waves className="h-8 w-8 text-cyan-500 opacity-20" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground font-medium">Retours attendus pour pressing</p>
        </div>
        <div className="rounded-xl border bg-background p-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">En Transit</h4>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">14</span>
            <Truck className="h-8 w-8 text-purple-500 opacity-20" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground font-medium">Livraisons en cours vers clients</p>
        </div>
        <div className="rounded-xl border bg-background p-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Alerte Maintenance</h4>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold">3</span>
            <AlertCircle className="h-8 w-8 text-amber-500 opacity-20" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground font-medium">Articles nécessitant une attention</p>
        </div>
      </div>
    </div>
  );
}
