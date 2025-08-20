import PageHead from "@/components/common/PageHead";
// import Image from "next/image";
import { ReactNode } from "react";

interface Proptypes {
  title: string;
  children: ReactNode;
}

const AuthLayout = (props: Proptypes) => {
  const { title, children } = props;
  return (
    <div className="flex flex-col justify-center items-center md:px-10 min-h-screen">
      <PageHead title={title} />
      <div className="flex md:flex-row flex-col justify-center items-center xl:gap-5 w-full">
        <div className="flex flex-col justify-center items-start w-[250px] md:w-[350px] h-[250px] md:h-[350px]">
          <span className="font-bold text-blue-700 text-3xl md:text-5xl">
            Bantuin
          </span>
          <p className="font-medium text-neutral-700 md:text-lg">
            Atur Harimu, Gampang Bareng Bantuin
          </p>

          {/* <Image
            src={"/images/general/logo.png"}
            alt="logo"
            width={350}
            height={350}
            className="w-[250px] md:w-[350px] h-[250px] md:h-[350px] object-cover"
          /> */}
        </div>

        <div className="p-5 w-full md:max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
