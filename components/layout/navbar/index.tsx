import { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import SearchField from "../../shared/search-field";
import "./style.scoped.scss";

const Navbar: NextComponentType = (): React.JSX.Element => {
  return (
    <nav className="navbar">
      <Link href="/">
        <Image src="/images/logo.jpg" alt="Logo" width={60} height={70} />
      </Link>
      <Suspense>
        <SearchField />
      </Suspense>
      <Link href="/" className="user">
        Jhon Doe
      </Link>
    </nav>
  );
};

export default Navbar;
