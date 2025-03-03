import { ReactNode } from "react";

const ParkingInfoLayout = ({ children }: { children: ReactNode }) => {
 return (
  <aside className="fixed top-0 right-0 shadow-aside w-80 h-full bg-white z-50">{children}</aside>
 );
};

export default ParkingInfoLayout;
