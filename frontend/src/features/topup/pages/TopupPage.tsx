import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useAuth} from "@/hooks/useAuth";
import {axiosInstance} from "@/lib/axios";
import type {PaymentMethods, TopUpType} from "@/types/topup";
import {ArrowLeft, CheckCircle2, Diamond} from "lucide-react";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

const TopupPage = () => {
  const params = useParams();
  const {user} = useAuth();
  const slug = params.slug as string;
  const navigate = useNavigate();
  const [products, setProducts] = useState<TopUpType | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const {data} = await axiosInstance.get("/payment-methods");

        setPaymentMethods(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {data} = await axiosInstance.get(`/games/${slug}/products`);

        console.log(data);

        setProducts(data.data);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  const handleSubmit = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    alert("Success");
  };

  const pkg = products?.products.find((p) => p.id === selectedPkg);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Back nav */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Games
          </Link>

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
              <section className="surface rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h2 className="font-semibold">Enter User ID</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      User ID
                    </label>
                    <Input
                      placeholder="Enter your User ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      Zone ID
                    </label>
                    <Input
                      placeholder="Enter your Zone ID"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      className="bg-secondary border-border"
                    />
                  </div>
                </div>
              </section>

              {/* Step 2: Select Package */}
              <section className="surface rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h2 className="font-semibold">Select Package</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {products?.products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPkg(p.id)}
                      className={`relative rounded-xl p-4 text-left transition-all border ${
                        selectedPkg === p.id
                          ? "border-primary bg-primary/10 glow-sm"
                          : "border-border bg-muted hover:border-muted-foreground/30"
                      }`}>
                      {p.label && (
                        <Badge className="absolute -top-2 left-3 bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
                          {p.label}
                        </Badge>
                      )}
                      <Diamond className="h-5 w-5 text-primary mb-2" />
                      <p className="font-bold text-sm">
                        {p.amount}
                        {p.bonus ? (
                          <span className="text-primary"> +{p.bonus}</span>
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ${p.price.toFixed(2)}
                      </p>
                      {selectedPkg === p.id && (
                        <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </section>

              {/* Step 3: Payment */}
              <section className="surface rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <h2 className="font-semibold">Payment Method</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {paymentMethods.map((pm) => {
                    return (
                      <button
                        key={pm.id}
                        onClick={() => setSelectedPayment(pm.id)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 border transition-all ${
                          selectedPayment === pm.id
                            ? "border-primary bg-primary/10 glow-sm"
                            : "border-border bg-muted hover:border-muted-foreground/30"
                        }`}>
                        <img
                          src={pm.icon}
                          alt=""
                          className="size-10 w-10 object-cover"
                        />
                        <span className="text-sm font-medium flex-1 text-left">
                          {pm.name}
                        </span>

                        {selectedPayment === pm.id ? (
                          <CheckCircle2 className="top-2 right-2 h-4 w-4 text-primary" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right column - Order summary */}
            <div className="lg:col-span-1">
              <div className="surface rounded-xl p-6 lg:sticky lg:top-20">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Game</span>
                    <span className="font-medium">{products?.game.title}</span>
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
                  {selectedPayment && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment</span>
                      <span className="font-medium capitalize">
                        {
                          paymentMethods.find((p) => p.id === selectedPayment)
                            ?.name
                        }
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
                  disabled={!userId || !selectedPkg || !selectedPayment}
                  size="lg"
                  onClick={handleSubmit}>
                  Buy Now
                </Button>
                <p className="text-[11px] text-muted-foreground text-center mt-3">
                  By purchasing, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TopupPage;
