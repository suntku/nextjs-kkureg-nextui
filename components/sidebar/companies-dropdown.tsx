"use client";

import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <AcmeIcon />,
  });
  return (
    <div className="flex items-center gap-2">
    {company.logo}
    <div className="flex flex-col gap-4">
      <h3 className="m-0 -mb-4 text-xl font-medium text-default-900 whitespace-nowrap">
        {company.name}
      </h3>
      <span className="text-xs font-medium text-default-500">
        {company.location}
      </span>
    </div>
  </div>
  );
};
