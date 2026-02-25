import {BackNavigation} from "@/components/shared/BackNavigation";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {useTransaction} from "@/hooks/useTransaction";
import type {Transaction} from "@/types/transaction";
import {Receipt} from "lucide-react";
import {useState} from "react";
import {EmptyState} from "../components/EmptyState";
import {TransactionList} from "../components/TransactionList";
import {ReceiptDetail} from "../components/ReceiptDetail";

const HistoryPage = () => {
  const {transactions, isLoading: loading} = useTransaction();
  const [selected, setSelected] = useState<Transaction | null>(null);

  const handleSelectTransaction = (tx: Transaction) => {
    setSelected(tx);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <BackNavigation />

          <div className="flex items-center gap-3 mb-8">
            <Receipt className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Transaction History</h1>
          </div>

          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : transactions?.length === 0 ? (
            <EmptyState />
          ) : (
            <TransactionList
              transactions={transactions!}
              onSelectTransaction={handleSelectTransaction}
            />
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
