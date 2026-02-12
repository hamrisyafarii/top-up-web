import {ArrowRight, Zap, Shield, Clock} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {useGames} from "@/hooks/useGames";

const HeroSection = () => {
  const {games} = useGames();

  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-4 relative">
        {/* Main headline */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-sm text-muted-foreground mb-6">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Instant delivery · 24/7 Support
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Top Up Your Games
            <br />
            <span className="text-primary">Fast & Secure</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            The most trusted platform for in-game currency top-ups. Instant
            delivery, competitive prices, and 24/7 support.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 gap-2"
              asChild>
              <Link to="/topup/mobile-legends">
                Start Top Up <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary">
              Browse Games
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {[
            {icon: Zap, text: "Instant Delivery"},
            {icon: Shield, text: "Secure Payment"},
            {icon: Clock, text: "24/7 Support"},
          ].map(({icon: Icon, text}) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4 text-primary" />
              {text}
            </div>
          ))}
        </div>

        {/* Trending Games */}
        <div className="relative">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-4">
            Trending Games
          </p>
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-background to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-background to-transparent" />
            <div className="flex gap-4 animate-[marquee_30s_linear_infinite] w-max">
              {[...games, ...games].map((game, i) => (
                <Link
                  key={`${game.id}-${i}`}
                  to={`/topup/${game.id}`}
                  className="flex items-center gap-3  rounded-xl px-4 py-3 shrink-0 card-lift bg-card cursor-pointer">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="h-10 w-10 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold">{game.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {game.developer}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
