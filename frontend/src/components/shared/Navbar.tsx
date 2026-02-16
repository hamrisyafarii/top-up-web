import {Search, Gamepad2, Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {useState} from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            Top<span className="text-primary">Up</span>Zone
          </span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            className="pl-9 bg-secondary border-border focus-visible:ring-primary/50"
          />
        </div>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Link to={"/login"}>
            <Button size="sm" className="flex-1 bg-card">
              Login
            </Button>
          </Link>

          <Link to={"/register"}>
            <Button size="sm" className="flex-1 bg-primary">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground">
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border px-4 py-4 space-y-3 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-2">
            <Link to={"/login"}>
              <Button size="sm" className="flex-1 bg-card">
                Login
              </Button>
            </Link>

            <Link to={"/register"}>
              <Button size="sm" className="flex-1 bg-primary">
                Register
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
