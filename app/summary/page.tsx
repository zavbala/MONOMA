// @ts-nocheck

"use client";

import { redirect, useSearchParams } from "next/navigation";

const Summary = () => {
  const searchParams = useSearchParams();
  const key = searchParams.get("key") as string;

  if (!key) redirect("/");

  const decodeKey = atob(key);
  const userProfile = JSON.parse(decodeKey).userProfile;

  return (
    <div className="max-w-2xl mx-auto flex flex-col min-h-screen items-center justify-center md:px-0 px-10">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        {"We've"} sent your data to the server. {"Here's"} what we sent:
      </h1>

      <div className="w-full mt-10">
        {Object.entries(JSON.parse(decodeKey)).map(([key, value]) => {
          if (key === "password" || key === "confirmPassword")
            value = value.replace(/./g, "*");

          if (
            userProfile === "personal" &&
            ["companyName", "companySize", "roleInCompany"].includes(key)
          )
            return null;

          if (
            userProfile === "business" &&
            ["dateOfBirth", "gender"].includes(key)
          )
            return null;

          return (
            <div key={key}>
              <strong className="capitalize">{key}</strong>:{` `}
              {typeof value == "boolean" ? (value ? "Yes" : "No") : value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
