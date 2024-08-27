import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="w-full border-border border-b">
      <div className="container h-[60px] flex items-center justify-between">
      <span>LOGO</span>
      <Button title="Logar" className="bg-primary text-white">
        Logar
      </Button>
      </div>
    </header>
  );
};

export default Header;
