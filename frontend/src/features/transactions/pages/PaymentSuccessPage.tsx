import {BackNavigation} from "@/components/shared/BackNavigation";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {PaymentSuccessContent} from "../components/PaymentSuccessContent";

const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <BackNavigation to="/" label="Back to Home" />

          <div className="flex justify-center items-center py-12">
            <PaymentSuccessContent />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
