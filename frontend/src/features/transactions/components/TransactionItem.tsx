import {Badge} from "@/components/ui/badge";
import type {Transaction} from "@/types/transaction";
import {Diamond} from "lucide-react";

interface TransactionItemProps {
  tx: Transaction;
  onClick: () => void;
}

export const TransactionItem = ({tx, onClick}: TransactionItemProps) => {
  return (
    <button
      key={tx.id}
      onClick={onClick}
      className="w-full surface rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 border border-transparent transition-all text-left">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Diamond className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{tx.game.title}</p>
        <p className="text-xs text-muted-foreground">
          {tx.productAmount}
          {tx.productBonus ? ` +${tx.productBonus}` : ""} 💎 · ID: {tx.playerId}
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
  );
};
