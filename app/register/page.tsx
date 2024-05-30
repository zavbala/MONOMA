"use client";

import { useState, createContext } from "react";
import PersonalData from "@/components/Personal";
import Address from "@/components/Address";
import Details from "@/components/Details";
import Preferences from "@/components/Preferences";

export const GlobalContext = createContext({
  step: 1,
  setStep: (step: number) => {},
  data: {},
  setData: (data: any) => {},
});

const Register = () => {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    fullName: "John Doe",
    email: "john.doe@gmail.com",
    phoneNumber: "5555555555",
    address: "1234 Main St",
    city: "Chicago",
    zipCode: "60601",
    country: "USA",
    username: "johndoe",
    password: "Password!9",
    confirmPassword: "Password",
    userProfile: "personal",

    // Business
    companySize: "11-50",
    companyName: "Company",
    roleInCompany: "Developer",

    // Personal
    dateOfBirth: new Date().toISOString().split("T")[0],
    gender: "female",

    referrer: "social-media",
    receiveNotificationsByEmail: true,
    termsAndConditions: false,
  });

  const { address, country, city, zipCode, ...personalData } = data;
  const { fullName, email, phoneNumber, ...addressData } = data;

  const detailsData = {
    username: data.username,
    password: data.password,
    confirmPassword: data.confirmPassword,
    userProfile: data.userProfile,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    companyName: data.companyName,
    roleInCompany: data.roleInCompany,
    companySize: data.companySize,
  };

  return (
    <section className="flex min-h-screen justify-center items-center">
      <div className="card">
        <GlobalContext.Provider value={{ step, setStep, data, setData }}>
          {step === 1 && <PersonalData {...personalData} />}
          {step === 2 && <Address {...addressData} />}
          {step === 3 && <Details {...detailsData} />}
          {step === 4 && <Preferences {...data} />}
        </GlobalContext.Provider>
      </div>
    </section>
  );
};

export default Register;
