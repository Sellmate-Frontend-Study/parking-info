'use client'

import SearchIcon from "@/assets/SearchIcon";
import { useState } from "react";

const MainSearchInput = (/* { value, onChange }: MainSearchInputProps */) => {
  const [value, setValue] = useState('')
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-2/5 z-10 min-w-[450px]"
    >
      <SearchIcon className="w-3 h-3 absolute top-1/2 -translate-y-1/2 right-2 " />
      <input
        value={value}
        onChange={(event) => {
          if (event.target.value) setValue(event.target.value);
        }}
        className="h-8 text-4 rounded-1 w-full focus:outline-none pl-5 bg-white rounded-md"
        style={{boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'}}
      />
    </div>
  );
};

export default MainSearchInput;
