import {Gamepad2} from "lucide-react";
import {Link} from "react-router-dom";

type AuthLayoutProps = {
  isLogin: boolean;
  children: React.ReactNode;
};

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <Link to="/" className="flex items-center justify-center gap-2 mb-2">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight">
            Top<span className="text-gradient">Up</span>Zone
          </span>
        </Link>

        <div className="surface rounded-xl p-6">
          <h2 className="text-xl font-bold text-center mb-6">
            {props.isLogin ? "Welcome back" : "Create account"}
          </h2>

          {props.children}

          <p className="text-sm text-muted-foreground text-center mt-4">
            {props.isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link to={props.isLogin ? "/register" : "/login"}>
              <button className="text-primary hover:underline font-medium">
                {props.isLogin ? "Sign Up" : "Sign In"}
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
