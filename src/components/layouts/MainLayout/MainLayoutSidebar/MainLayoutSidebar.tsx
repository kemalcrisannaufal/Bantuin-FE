import Image from "next/image";
import { NAV_ITEMS } from "../mainLayout.constants";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

interface Proptypes {
  isOpen: boolean;
}

const MainLayoutSidebar = (props: Proptypes) => {
  const { isOpen } = props;
  const router = useRouter();

  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "top-0 fixed md:sticky flex flex-col justify-between bg-neutral-200 p-5 w-full max-w-[300px] h-screen z-50",
          !isOpen && "hidden md:flex"
        )}
      >
        <div>
          <div className="flex justify-center items-center mt-8">
            <Image
              src={"/images/general/logo-no-bg.png"}
              alt="logo"
              width={150}
              height={150}
            />
          </div>

          <Listbox
            aria-label="dashboard-menu"
            className="mt-5 w-full"
            variant="solid"
          >
            {NAV_ITEMS.map((item) => (
              <ListboxItem
                key={`nav-item-${item.name}`}
                as={Link}
                href={item.href}
                className={cn("h-12 my-1 px-5", {
                  "bg-primary text-white": router.pathname.startsWith(
                    item.href
                  ),
                })}
                color="primary"
                startContent={item.icon}
                textValue={item.name}
              >
                <p className="text-base">{item.name}</p>
              </ListboxItem>
            ))}
          </Listbox>
        </div>

        <Button
          color="primary"
          fullWidth
          onPress={() => signOut()}
          variant="flat"
        >
          Logout
        </Button>
      </motion.div>
    </>
  );
};

export default MainLayoutSidebar;
