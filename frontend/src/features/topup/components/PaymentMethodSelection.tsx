import type {PaymentMethods} from "@/types/topup";
import {CheckCircle2} from "lucide-react";

interface PaymentMethodSelectionProps {
  paymentMethods: PaymentMethods[];
  selectedPayment: string | null;
  onSelectPayment: (paymentId: string) => void;
  stepNumber?: number;
}

export const PaymentMethodSelection = ({
  paymentMethods,
  selectedPayment,
  onSelectPayment,
  stepNumber = 3,
}: PaymentMethodSelectionProps) => {
  return (
    <section className="surface rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
          {stepNumber}
        </span>
        <h2 className="font-semibold">Payment Method</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {paymentMethods.map((pm) => (
          <button
            key={pm.id}
            onClick={() => onSelectPayment(pm.id)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
              selectedPayment === pm.id
                ? "border-primary bg-primary/10 glow-sm"
                : "border-border bg-muted hover:border-muted-foreground/30"
            }`}>
            <img
              src={pm.icon}
              alt={pm.name}
              className="size-10 w-10 object-cover"
            />
            <span className="text-sm font-medium flex-1 text-left">
              {pm.name}
            </span>
            {selectedPayment === pm.id && (
              <CheckCircle2 className="top-2 right-2 h-4 w-4 text-primary" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
