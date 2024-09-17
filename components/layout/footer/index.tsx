import { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./style.scoped.scss";

const Footer: NextComponentType = (): React.JSX.Element => {
  return (
    <footer className="footer">
      <Link href="/">
        <Image src="/images/logo.jpg" alt="Logo" width={80} height={80} />
      </Link>
      <p>&copy; 2024 movieapp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
