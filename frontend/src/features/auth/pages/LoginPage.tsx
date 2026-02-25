import {Input} from "@/components/ui/input";
import AuthLayout from "../components/AuthLayout";
import {toast} from "sonner";
import {Controller, useForm} from "react-hook-form";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {loginFormSchema, type LoginFormSchema} from "../forms/login";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LoginPage = () => {
  const {login, isLoading, user, isError} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitForm = async (values: LoginFormSchema) => {
    const res = await login(values);

    if (res?.statusCode === 200) {
      toast.success(res.message);
      navigate("/");
      return;
    }

    if (isError?.response?.data?.statusCode === 401) {
      toast.error(isError?.response?.data?.message);
      return;
    }

    return;
  };

  return (
    <AuthLayout isLogin>
      <form
        onSubmit={loginForm.handleSubmit(handleSubmitForm)}
        className="space-y-4">
        <FieldGroup>
          <Controller
            name="email"
            control={loginForm.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="user@example.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={loginForm.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="******"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          disabled={isLoading}
          type="submit"
          className="w-full bg-primary hover:bg-primary/50">
          {isLoading ? "loading..." : "Sign In"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
