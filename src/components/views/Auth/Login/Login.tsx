import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    control,
    errors,
    handleLogin,
    handleSubmit,
    handleToggleVisiblePassword,
    isPending,
    visiblePassword,
  } = useLogin();
  return (
    <>
      <Card className="mx-auto p-3 w-full max-w-sm" shadow="md">
        <CardHeader>
          <div>
            <h1 className="font-semibold text-primary-600 text-xl">Masuk</h1>
            <p className="text-foreground-600">
              Belum punya akun?{" "}
              <Link
                href={"/auth/register"}
                className="font-semibold text-primary-600"
              >
                Daftar
              </Link>
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className={cn("flex flex-col gap-4")}
          >
            <Controller
              control={control}
              name="identifier"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Username atau Email"
                  autoComplete="off"
                  variant="bordered"
                  size="sm"
                  autoFocus
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Kata sandi"
                  autoComplete="off"
                  variant="bordered"
                  size="sm"
                  type={visiblePassword ? "text" : "password"}
                  endContent={
                    <button
                      className="cursor-pointer"
                      type="button"
                      onClick={handleToggleVisiblePassword}
                    >
                      {visiblePassword ? (
                        <FaEye className="text-foreground-600 text-lg" />
                      ) : (
                        <FaEyeSlash className="text-foreground-600 text-lg" />
                      )}
                    </button>
                  }
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              type="submit"
              color="primary"
              className="disabled:opacity-50 font-semibold text-md disabled:cursor-default"
              disabled={isPending}
            >
              {isPending ? <Spinner size="sm" color="white" /> : "Masuk"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Login;
