import PageHead from "@/components/common/PageHead";
import { ReactNode, useState } from "react";
import MainLayoutSidebar from "./MainLayoutSidebar";
import HamburgerMenu from "@/components/ui/HamburgerMenu";

interface Proptypes {
  children: ReactNode;
  description?: string;
  title: string;
}

const MainLayout = (props: Proptypes) => {
  const { children, description, title } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />

      <div className="flex">
        <MainLayoutSidebar isOpen={isSidebarOpen} />

        <div className="px-8 py-10 w-full">
          <div className="flex justify-between items-center mb-5 md:mb-10">
            <div className="w-[80%]">
              <h1 className="font-bold text-primary text-3xl">{title}</h1>
              <p className="mt-1 text-foreground-600 text-xs md:text-base">
                {description}
              </p>
            </div>

            <HamburgerMenu
              isOpen={isSidebarOpen}
              setIsOpen={setIsSidebarOpen}
            />
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
