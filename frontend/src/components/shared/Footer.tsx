import {
  Gamepad2,
  Shield,
  Lock,
  Instagram,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <Gamepad2 className="h-5 w-5 text-primary" />
              <span className="font-bold">TopUpZone</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Fast, secure, and reliable game top-up platform.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["All Games", "Top Up", "Vouchers", "Gift Cards"],
            },
            {
              title: "Support",
              links: ["Help Center", "Contact Us", "FAQ", "Report Issue"],
            },
            {
              title: "Company",
              links: ["About Us", "Privacy Policy", "Terms of Service", "Blog"],
            },
          ].map((section) => (
            <div key={section.title}>
              <p className="font-semibold text-sm mb-3">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" /> Secured
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-primary" /> SSL Encrypted
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[Instagram, Twitter, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-8 w-8 rounded-lg surface flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            © 2026 TopUpZone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
