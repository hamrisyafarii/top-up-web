import type { Transaction } from "@/types/transaction";
import {TransactionItem} from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onSelectTransaction: (tx: Transaction) => void;
}

export const TransactionList = ({
  transactions,
  onSelectTransaction,
}: TransactionListProps) => {
  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx.id}
          tx={tx}
          onClick={() => onSelectTransaction(tx)}
        />
      ))}
    </div>
  );
};
