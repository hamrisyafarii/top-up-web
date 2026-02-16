import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Lock, Mail} from "lucide-react";
import AuthLayout from "../components/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout isLogin>
      <form className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email"
            className="pl-9 bg-secondary border-border"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            type="password"
            placeholder="Password"
            className="pl-9 bg-secondary border-border"
            minLength={6}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
