import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-between p-2">
      <Image src="/avatar.svg" width={200} height={140} alt="Logo" />
      <Image src="/competicao_invert.svg" width={200} height={140} alt="Logo" />
      <Image src="/icon.svg" width={200} height={140} alt="Logo" />
    </div>
  );
}

export default Footer;
