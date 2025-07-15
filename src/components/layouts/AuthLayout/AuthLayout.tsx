import PageHead from "@/components/common/PageHead";
import Image from "next/image";
import { ReactNode } from "react";

interface Proptypes {
  title: string;
  children: ReactNode;
}

const AuthLayout = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <PageHead title={title} />
      <div className="flex md:flex-row flex-col justify-center items-center gap-5 w-full">
        <div className="relative w-[250px] md:w-[350px] h-[250px] md:h-[350px]">
          <Image
            src={"/images/general/logo.png"}
            alt="logo"
            width={350}
            height={350}
            className="w-[250px] md:w-[350px] h-[250px] md:h-[350px] object-cover"
          />
        </div>

        <div className="p-5 w-full md:max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
