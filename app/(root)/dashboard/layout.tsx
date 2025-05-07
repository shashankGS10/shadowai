import React, { ReactNode } from "react";
import Navbar from "../../../components/Navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-6"> {children}</main>
    </>
  );
};

export default layout;
