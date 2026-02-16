import {Lock, Mail, UserIcon} from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const RegisterPage = () => {
  return (
    <AuthLayout isLogin={false}>
      <form className="space-y-4">
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Display name"
            className="pl-9 bg-secondary border-border"
            required
          />
        </div>
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
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
