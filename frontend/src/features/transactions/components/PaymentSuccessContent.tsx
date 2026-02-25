import {Button} from "@/components/ui/button";
import {CheckCircle2, Home, Receipt} from "lucide-react";
import {Link} from "react-router-dom";

export const PaymentSuccessContent = () => {
  return (
    <div className="surface rounded-xl p-8 text-center max-w-md mx-auto">
      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>

      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-muted-foreground mb-6">
        Thank you! Your top-up has been successfully processed. The items will
        be added to your account shortly.
      </p>

      <div className="space-y-3">
        <Button asChild className="w-full" size="lg">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full" size="lg">
          <Link to="/history-transaction">
            <Receipt className="h-4 w-4 mr-2" />
            View Transaction History
          </Link>
        </Button>
      </div>

      <p className="text-[11px] text-muted-foreground mt-6">
        If you have any questions, please contact our support team.
      </p>
    </div>
  );
};
