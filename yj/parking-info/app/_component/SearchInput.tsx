import SearchIcon from "@/assets/searchIcon";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="relative">
      <SearchIcon className="w-12pxr h-12pxr absolute top-1/2 -translate-y-1/2 left-4pxr " />
      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value || "");
        }}
        className="h-24pxr text-primary text-12pxr bg-Sub_Grey rounded-4pxr w-full focus:outline-none pl-20pxr"
      />
    </div>
  );
};

export default SearchInput;
