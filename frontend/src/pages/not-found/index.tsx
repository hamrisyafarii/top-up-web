import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {HomeIcon, SearchXIcon} from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col items-center text-center max-w-md w-full glass p-8 rounded-2xl animate-in fade-in zoom-in duration-500">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <SearchXIcon className="h-24 w-24 text-primary relative z-10" />
        </div>

        <h1 className="text-7xl font-bold text-foreground mb-2 drop-shadow-sm">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-foreground/90 mb-4">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mb-8 text-sm md:text-base">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        <div className="w-full relative">
          <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-accent/50 rounded-lg blur opacity-40"></div>
          <Button
            asChild
            className="w-full relative py-6 text-base font-medium">
            <Link to="/" className="flex items-center justify-center gap-2">
              <HomeIcon className="h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
