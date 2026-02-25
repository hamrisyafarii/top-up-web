import {Badge} from "@/components/ui/badge";
import type {Products} from "@/types/topup";
import {CheckCircle2, Diamond} from "lucide-react";

interface PackageSelectionProps {
  products: Products[];
  selectedPkg: string | null;
  onSelectPackage: (packageId: string) => void;
  stepNumber?: number;
}

export const PackageSelection = ({
  products,
  selectedPkg,
  onSelectPackage,
  stepNumber = 2,
}: PackageSelectionProps) => {
  return (
    <section className="surface rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          {stepNumber}
        </span>
        <h2 className="font-semibold">Select Package</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPackage(p.id)}
            className={`relative rounded-xl p-4 text-left transition-all border ${
              selectedPkg === p.id
                ? "border-primary bg-primary/10 glow-sm"
                : "border-border bg-muted hover:border-muted-foreground/30"
            }`}>
            {p.label && (
              <Badge className="absolute -top-2 left-3 bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
                {p.label}
              </Badge>
            )}
            <Diamond className="h-5 w-5 text-primary mb-2" />
            <p className="font-bold text-sm">
              {p.amount}
              {p.bonus ? <span className="text-primary"> +{p.bonus}</span> : ""}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ${p.price.toFixed(2)}
            </p>
            {selectedPkg === p.id && (
              <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
