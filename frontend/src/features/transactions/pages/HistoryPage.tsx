import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {Badge} from "@/components/ui/badge";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {useTransaction} from "@/hooks/useTransaction";
import type {Transaction} from "@/types/transaction";
import {ArrowLeft, CheckCircle2, Copy, Diamond, Receipt} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "sonner";

const ReceiptDetail = ({tx}: {tx: Transaction; onClose: () => void}) => {
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

const HistoryPage = () => {
  const {transactions, isLoading: loading} = useTransaction();
  const [selected, setSelected] = useState<Transaction | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Games
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <Receipt className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Transaction History</h1>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : transactions?.length === 0 ? (
            <div className="surface rounded-xl p-8 text-center">
              <p className="text-muted-foreground">
                No transactions yet. Start by topping up a game!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions?.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => setSelected(tx)}
                  className="w-full surface rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 border border-transparent transition-all text-left">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Diamond className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{tx.game.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.productAmount}
                      {tx.productBonus ? ` +${tx.productBonus}` : ""} 💎 · ID:{" "}
                      {tx.playerId}
                      {tx.zoneId ? ` (${tx.zoneId})` : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-sm text-primary">
                      ${Number(tx.price).toFixed(2)}
                    </p>
                    <Badge variant="default" className="text-[10px]">
                      {tx.status}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground shrink-0 hidden sm:block">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Transaction Receipt</DialogTitle>
          {selected && (
            <ReceiptDetail tx={selected} onClose={() => setSelected(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HistoryPage;
