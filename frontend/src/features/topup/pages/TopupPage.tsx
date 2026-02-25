import {BackNavigation} from "@/components/shared/BackNavigation";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {useAuth} from "@/hooks/useAuth";
import {useCreateTransaction} from "@/hooks/useCreateTransaction";
import {usePaymentMethods} from "@/hooks/usePaymentMethods";
import {useProducts} from "@/hooks/useProducts";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UserIdInput} from "../components/UserIdInputt";
import {PackageSelection} from "../components/PackageSelection";
import {PaymentMethodSelection} from "../components/PaymentMethodSelection";
import {OrderSummary} from "../components/OrderSummary";

const TopupPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug as string;

  const {user} = useAuth();
  const {paymentMethods} = usePaymentMethods();
  const {products} = useProducts(slug);
  const {mutateAsync, isPending} = useCreateTransaction();

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedPayment || !selectedPkg) return;

    try {
      const res = await mutateAsync({
        playerId: userId,
        zoneId,
        productId: selectedPkg,
        paymentMethodId: selectedPayment,
      });

      const invoiceUrl = res.transaction.invoiceUrl;

      if (invoiceUrl) {
        window.location.href = invoiceUrl;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Back nav */}
          <BackNavigation />

          {/* Game header */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src={products?.game.image}
              alt={products?.game.title}
              className="h-16 w-16 rounded-xl object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{products?.game.title}</h1>
              <p className="text-sm text-muted-foreground">
                {products?.game.developer}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column - Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: User ID */}
              <UserIdInput
                onUserIdChange={setUserId}
                onZoneIdChange={setZoneId}
                userId={userId}
                zoneId={zoneId}
              />

              {/* Step 2: Select Package */}
              {products && (
                <PackageSelection
                  products={products.products}
                  selectedPkg={selectedPkg}
                  onSelectPackage={setSelectedPkg}
                />
              )}

              {/* Step 3: Payment */}
              {paymentMethods && (
                <PaymentMethodSelection
                  paymentMethods={paymentMethods}
                  selectedPayment={selectedPayment}
                  onSelectPayment={setSelectedPayment}
                />
              )}
            </div>

            {/* Right column - Order summary */}
            <div className="lg:col-span-1">
              {products && paymentMethods && (
                <OrderSummary
                  game={products.game}
                  userId={userId}
                  zoneId={zoneId}
                  selectedPkg={selectedPkg}
                  selectedPayment={selectedPayment}
                  paymentMethods={paymentMethods}
                  products={products.products}
                  isPending={isPending}
                  onSubmit={handleSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopupPage;
