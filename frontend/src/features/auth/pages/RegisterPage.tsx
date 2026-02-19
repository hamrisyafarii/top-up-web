import AuthLayout from "../components/AuthLayout";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth";
import {Controller, useForm} from "react-hook-form";
import {registerFormSchema, type RegisterFormSchema} from "../forms/register";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
  const {register, isLoading, user} = useAuth();
  const navigate = useNavigate();

  if (user && !isLoading) {
    navigate("/");
  }

  const formRegister = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const handleSubmitForm = async (values: RegisterFormSchema) => {
    try {
      const res = await register(values);

      if (res.statusCode === 201) {
        toast.success(res.message);
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response.data.statusCode === 409) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <AuthLayout isLogin={false}>
      <form
        onSubmit={formRegister.handleSubmit(handleSubmitForm)}
        className="space-y-4">
        <FieldGroup>
          <Controller
            name="username"
            control={formRegister.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...field}
                  id="username"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                  autoComplete="off"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={formRegister.control}
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
            control={formRegister.control}
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
          {isLoading ? "loading..." : "Sign Up"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
