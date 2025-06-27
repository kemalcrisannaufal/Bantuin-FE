import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import authServices from "@/services/auth.service";
import { IRegister } from "@/type/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { addToast } from "@heroui/react";

const registerSchema = Yup.object().shape({
  fullname: Yup.string().required("Nama lengkap wajib diisi"),
  username: Yup.string()
    .min(6, "Username minimal 6 karakter")
    .required("Username wajib diisi"),
  email: Yup.string().required("Email wajib diisi"),
  password: Yup.string()
    .required("Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
  confirmPassword: Yup.string()
    .required("Konfirmasi password wajib diisi")
    .oneOf([Yup.ref("password"), ""], "Konfirmasi Password tidak sesuai"),
});

const useRegister = () => {
  const { push } = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleToggleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const register = async (payload: IRegister) => {
    const { data } = await authServices.register(payload);
    return data;
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onError: (error: IApiError) => {
      addToast({
        title: "Registrasi Gagal!",
        description: error.response?.data?.meta?.message,
        color: "danger",
        variant: "bordered",
      });
    },
    onSuccess: () => {
      reset();
      push("/auth/login");
      addToast({
        title: "Registrasi Sukses!",
        description: "Akun kamu berhasil didaftarkan",
        color: "success",
        variant: "bordered",
      });
    },
  });

  const handleRegister = (payload: IRegister) => mutate(payload);

  return {
    control,
    errors,
    handleRegister,
    handleSubmit,
    handleToggleVisiblePassword,
    isPending,
    visiblePassword,
  };
};
export default useRegister;
