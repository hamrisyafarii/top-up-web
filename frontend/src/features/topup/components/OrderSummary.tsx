import {Button} from "@/components/ui/button";
import type {Games} from "@/types/games";
import type {PaymentMethods, Products} from "@/types/topup";

interface OrderSummaryProps {
  game: Games;
  userId: string;
  zoneId: string;
  selectedPkg: string | null;
  selectedPayment: string | null;
  paymentMethods: PaymentMethods[];
  products: Products[];
  isPending: boolean;
  onSubmit: () => void;
}

export const OrderSummary = ({
  game,
  userId,
  zoneId,
  selectedPkg,
  selectedPayment,
  paymentMethods,
  products,
  isPending,
  onSubmit,
}: OrderSummaryProps) => {
  const pkg = products.find((p) => p.id === selectedPkg);
  const selectedPaymentMethod = paymentMethods.find(
    (p) => p.id === selectedPayment,
  );

  return (
    <div className="surface rounded-xl p-6 lg:sticky lg:top-20">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Game</span>
          <span className="font-medium">{game.title}</span>
        </div>
        {userId && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">User ID</span>
            <span className="font-medium">
              {userId}
              {zoneId ? ` (${zoneId})` : ""}
            </span>
          </div>
        )}
        {pkg && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Package</span>
            <span className="font-medium">
              {pkg.amount}
              {pkg.bonus ? ` +${pkg.bonus}` : ""} 💎
            </span>
          </div>
        )}
        {selectedPaymentMethod && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium capitalize">
              {selectedPaymentMethod.name}
            </span>
          </div>
        )}
        <div className="border-t border-border pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">
              Rp{pkg ? pkg.price : "0"}
            </span>
          </div>
        </div>
      </div>
      <Button
        className="w-full mt-6 bg-primary hover:bg-primary/90"
        disabled={isPending || !userId || !selectedPkg || !selectedPayment}
        size="lg"
        onClick={onSubmit}>
        {isPending ? "Processing..." : "Buy now"}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center mt-3">
        By purchasing, you agree to our Terms of Service
      </p>
    </div>
  );
};
