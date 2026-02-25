import {ArrowLeft} from "lucide-react";
import {Link} from "react-router-dom";

interface BackNavigationProps {
  to?: string;
  label?: string;
}

export const BackNavigation = ({
  to = "/",
  label = "Back to Games",
}: BackNavigationProps) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
      <ArrowLeft className="h-4 w-4" /> {label}
    </Link>
  );
};
