import {Badge} from "@/components/ui/badge";
import type {Transaction} from "@/types/transaction";
import {CheckCircle2, Copy} from "lucide-react";
import {toast} from "sonner";

interface ReceiptDetailProps {
  tx: Transaction;
  onClose: () => void;
}

const Row = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground">{label}</span>
    {children || <span className="font-medium">{value}</span>}
  </div>
);

export const ReceiptDetail = ({tx}: ReceiptDetailProps) => {
  const date = new Date(tx.createdAt);

  const copyId = () => {
    navigator.clipboard.writeText(tx.id);
    toast.success("Copied !", {
      className: " flex justify-center items-center",
      description: "Transaction ID copied to clipboard.",
    });
  };

  return (
    <div className="relative">
      {/* Receipt header */}
      <div className="text-center pb-4 border-b border-dashed border-border">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
        <p className="text-lg font-bold">Payment Successful</p>
        <p className="text-xs text-muted-foreground mt-1">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {" · "}
          {date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Receipt body */}
      <div className="py-4 space-y-3 border-b border-dashed border-border">
        <Row label="Game" value={tx.game.title} />
        <Row
          label="Player ID"
          value={`${tx.playerId}${tx.zoneId ? ` (${tx.zoneId})` : ""}`}
        />
        <Row
          label="Package"
          value={`${tx.productAmount}${tx.productBonus ? ` +${tx.productBonus}` : ""} 💎`}
        />
        <Row label="Payment" value={tx.paymentMethod.name} />
        <Row label="Status">
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px] px-2">
            {tx.status}
          </Badge>
        </Row>
      </div>

      {/* Total */}
      <div className="py-4 border-b border-dashed border-border">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Paid</span>
          <span className="text-2xl font-bold text-primary">
            ${Number(tx.price).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Transaction ID */}
      <div className="pt-4">
        <p className="text-[10px] text-muted-foreground text-center mb-1">
          Transaction ID
        </p>
        <button
          onClick={copyId}
          className="flex items-center justify-center gap-1.5 mx-auto text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
          {tx.id.slice(0, 8)}...{tx.id.slice(-4)}
          <Copy className="h-3 w-3" />
        </button>
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-4">
        Thank you for your purchase! 🎮
      </p>
    </div>
  );
};
