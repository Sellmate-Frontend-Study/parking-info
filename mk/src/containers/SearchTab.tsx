"use client";

import Hr from "@/components/Hr";
import { SearchType } from "@/types/search";
import { Button, FormControl, HStack, Input, Select } from "@chakra-ui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SEARCH_OPTIONS = [
 {
  label: "목적지 검색",
  value: "destination",
 },
 {
  label: "주차장 검색",
  value: "parking",
 },
];

const SearchTab = ({ onChange }: { onChange?: (type: SearchType) => void }) => {
 const [searchType, setSearchType] = useState<SearchType>("destination");

 useEffect(() => {
  onChange?.(searchType);
 }, [onChange, searchType]);

 return (
  <>
   <div className="flex flex-nowrap bg-white">
    {SEARCH_OPTIONS.map((opt) => (
     <div
      key={opt.label}
      className={clsx(
       "w-full cursor-pointer py-3 text-center transition-all",
       searchType === opt.value ? "font-bold text-blue-500" : "text-gray-400"
      )}
      onClick={() => setSearchType(opt.value as SearchType)}
     >
      {opt.label}
     </div>
    ))}
   </div>

   <Hr />

   <FormControl className="py-2 px-2 bg-gray-100">
    <HStack spacing={1}>
     {searchType === "destination" ? (
      <Input colorScheme="gray" placeholder="목적지 검색" isRequired className="!bg-white" />
     ) : (
      <>
       <Select colorScheme="gray" className="!bg-white" />
      </>
     )}
     <Button colorScheme="blue" className="!p-0">
      <IoIosSearch className="text-2xl" />
     </Button>
    </HStack>
   </FormControl>
  </>
 );
};
export default SearchTab;
