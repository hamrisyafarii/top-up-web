import {Search, Gamepad2, Menu, X, LogOut, User, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {isLoading, user, logout} = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [_searchParams, setSearchParams] = useSearchParams();

  const handleClear = () => {
    setSearchParams({});

    setSearch("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    const alertLogout = confirm("Apakah kamu yakin ingin keluar?");

    if (alertLogout) {
      logout();
    }
  };

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
        <div className="hidden md:flex flex-1 items-center max-w-md relative gap-2">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 items-center max-w-md relative">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games..."
              className="pl-9 bg-secondary border-border focus-visible:ring-primary/50"
            />
            <Button
              className="absolute right-3 size-7 "
              variant={"ghost"}
              type="submit">
              <Search />
            </Button>
          </form>
          <Button onClick={handleClear} size={"icon-sm"}>
            <TrashIcon />
          </Button>
        </div>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {!isLoading &&
            (user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  asChild>
                  <Link to="/profile" className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {user.username || user.email}
                  </Link>
                </Button>
                {/* Upcoming feature */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-block w-fit">
                      <Button variant="ghost" disabled>
                        History
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This feature is currently unavailable</p>
                  </TooltipContent>
                </Tooltip>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  size="sm"
                  className="text-red-400 hover:text-foreground">
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
                  asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            ))}
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
            {!isLoading &&
              (user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-muted-foreground"
                    asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
