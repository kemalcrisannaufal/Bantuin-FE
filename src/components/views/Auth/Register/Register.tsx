import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
} from "@heroui/react";
import useRegister from "./useRegister";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    control,
    errors,
    handleRegister,
    handleSubmit,
    handleToggleVisiblePassword,
    isPending,
    visiblePassword,
  } = useRegister();

  return (
    <Card className="mx-auto p-3 w-full max-w-sm" shadow="md">
      <CardHeader>
        <div>
          <h1 className="font-semibold text-primary-600 text-xl">Buat Akun</h1>
          <p className="text-foreground-600">
            Sudah punya akun?{" "}
            <Link
              href={"/auth/login"}
              className="font-semibold text-primary-600"
            >
              Masuk
            </Link>
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className={cn("flex flex-col gap-4")}
        >
          <Controller
            control={control}
            name="fullname"
            render={({ field }) => (
              <Input
                {...field}
                label="Nama Lengkap"
                autoComplete="off"
                variant="bordered"
                size="sm"
                autoFocus
                isInvalid={errors.fullname !== undefined}
                errorMessage={errors.fullname?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input
                {...field}
                label="Username"
                autoComplete="off"
                variant="bordered"
                size="sm"
                isInvalid={errors.username !== undefined}
                errorMessage={errors.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                type="email"
                autoComplete="off"
                variant="bordered"
                size="sm"
                isInvalid={errors.email !== undefined}
                errorMessage={errors.email?.message}
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
                type={visiblePassword.password ? "text" : "password"}
                endContent={
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => handleToggleVisiblePassword("password")}
                  >
                    {visiblePassword.password ? (
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                {...field}
                label="Konfirmasi kata sandi"
                autoComplete="off"
                variant="bordered"
                size="sm"
                type={visiblePassword.confirmPassword ? "text" : "password"}
                endContent={
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() =>
                      handleToggleVisiblePassword("confirmPassword")
                    }
                  >
                    {visiblePassword.confirmPassword ? (
                      <FaEye className="text-foreground-600 text-lg" />
                    ) : (
                      <FaEyeSlash className="text-foreground-600 text-lg" />
                    )}
                  </button>
                }
                isInvalid={errors.confirmPassword !== undefined}
                errorMessage={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            type="submit"
            color="primary"
            className="disabled:opacity-50 font-semibold text-md disabled:cursor-default"
            disabled={isPending}
          >
            {isPending ? <Spinner size="sm" color="white" /> : "Daftar"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default Register;
