'use client'

import MenuIcon from "@/assets/MenuIcon";
import clsx from "clsx";
import { useState } from "react";

const MainLeftNav = () => {
  const [isOpen, setIsOpen]=useState(false);
  
  return (
    <div className={clsx("fixed left-0 top-0 z-10 p-4", isOpen ? '': 'w-14')}>
      {
        isOpen ? 
          <div className="w-[200px] h-[400px] relative" 
          style={{backgroundColor:'rgba(240, 240, 240, 0.8)'}}>
            <div>filter</div>
            <div className="absolute text-[#222] right-3 top-3 cursor-pointer" onClick={()=>setIsOpen(false)}>X</div>
          </div> 
          : <MenuIcon className="w-5 h-5" onClick={()=>setIsOpen(true)}/>
      }
    </div>
  );
}

export default MainLeftNav;