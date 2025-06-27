import { ILogin } from "@/type/Auth";
import { addToast } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  identifier: Yup.string().required("Email atau username wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

const useLogin = () => {
  const router = useRouter();
  const callbackUrl: string = (router.query.callbackUrl as string) || "/";
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleToggleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const login = async (data: ILogin) => {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      throw new Error("Username atau kata sandi salah!");
    }

    return result;
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onError: (error) => {
      addToast({
        title: "Login Gagal",
        description: error.message,
        color: "danger",
        variant: "bordered",
      });
    },
    onSuccess: () => {
      reset();
      router.push("/");
      addToast({
        title: "Login Sukses",
        description: "Kamu berhasil login!",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleLogin = (data: ILogin) => mutate(data);

  return {
    control,
    errors,
    handleLogin,
    handleSubmit,
    handleToggleVisiblePassword,
    isPending,
    visiblePassword,
  };
};

export default useLogin;
