import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction } from "react";

interface Proptypes {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const HamburgerMenu = (props: Proptypes) => {
  const { isOpen, setIsOpen } = props;
  return (
    <button
      aria-label="hamburger-menu-button"
      className="lg:hidden relative w-10 h-6 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span
        className={cn(
          "block top-0 absolute bg-primary w-full h-1 transition-all duration-300 ease-in-out",
          {
            "rotate-45 top-3": isOpen,
          }
        )}
      />
      <span
        className={cn(
          "block top-3 absolute bg-primary w-full h-1 transition-all duration-300 ease-in-out",
          {
            "opacity-0": isOpen,
          }
        )}
      />
      <span
        className={cn(
          "block top-6 absolute bg-primary w-full h-1 transition-all duration-300 ease-in-out",
          {
            "-rotate-45 top-3": isOpen,
          }
        )}
      />
    </button>
  );
};

export default HamburgerMenu;
