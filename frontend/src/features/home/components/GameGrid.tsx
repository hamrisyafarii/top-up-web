import {Link, useSearchParams} from "react-router-dom";
import {Badge} from "@/components/ui/badge";
import {useGames} from "@/hooks/useGames";
import Pagination from "./Pagination";

const GameGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const {games, meta} = useGames({
    search,
    page,
    limit: 4,
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All Games</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a game to top up
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {games.map((game, i) => (
            <Link
              key={game.slug}
              to={`/topup/${game.slug}`}
              className="group relative surface rounded-xl overflow-hidden card-lift"
              style={{animationDelay: `${i * 80}ms`}}>
              <div className="aspect-3/4 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {game.popular && (
                  <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 text-xs">
                    Popular
                  </Badge>
                )}
                <h3 className="font-semibold text-sm">{game.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {game.developer}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          meta={meta}
          setSearchParams={setSearchParams}
          search={search}
        />
      </div>
    </section>
  );
};

export default GameGrid;
