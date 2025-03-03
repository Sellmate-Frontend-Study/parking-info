"use client";

import { useState } from "react";
import SearchInput from "./SearchInput";

const MainLeftNav = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div className="fixed w-200pxr h-full bg-Main_Grey p-12pxr left-0 top-0">
      <SearchInput value={searchValue} onChange={setSearchValue} />
    </div>
  );
};

export default MainLeftNav;
