import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div style={{ background: "green" }}>header</div>
      {children}
      <div style={{ background: "green" }}>footer</div>
    </>
  );
};

export default Layout;
