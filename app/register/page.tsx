"use client";

import { useContext } from "react";
import PersonalData from "@/components/Personal";
import Address from "@/components/Address";
import Details from "@/components/Details";
import Preferences from "@/components/Preferences";
import { Provider, GlobalContext } from "@/context/Main";

const Register = () => {
  return (
    <section className="flex min-h-screen justify-center items-center lg:px-0 px-5">
      <div className="card">
        <Provider>
          <Parent />
        </Provider>
      </div>
    </section>
  );
};

const Parent = () => {
  const { data, step } = useContext(GlobalContext);

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
    <>
      {step === 1 && <PersonalData {...personalData} />}
      {step === 2 && <Address {...addressData} />}
      {step === 3 && <Details {...detailsData} />}
      {step === 4 && <Preferences {...data} />}
    </>
  );
};

export default Register;
