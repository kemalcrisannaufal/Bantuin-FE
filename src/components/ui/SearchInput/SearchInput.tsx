import { Input } from "@heroui/react";
import { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

interface Proptypes {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = (props: Proptypes) => {
  const { placeholder = "Cari .....", onChange } = props;
  return (
    <Input
      placeholder={placeholder}
      variant="bordered"
      onChange={onChange}
      startContent={<CiSearch className="text-xl" />}
      size="lg"
    />
  );
};

export default SearchInput;
