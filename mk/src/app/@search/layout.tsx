import { ReactNode } from "react";

const SearchLayout = ({ children }: { children: ReactNode }) => {
 return (
  <aside className="fixed top-0 left-0 shadow-aside w-70 h-full bg-white z-50">{children}</aside>
 );
};

export default SearchLayout;
