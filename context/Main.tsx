import { useState, createContext } from "react";

type ContextType = {
  step: number;
  setStep: (step: number) => void;
  data: any;
  setData: (data: any) => void;
};

export const GlobalContext = createContext<ContextType>({
  step: 1,
  setStep: (step: number) => {},
  data: {},
  setData: (data: any) => {},
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
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

  //   const { address, country, city, zipCode, ...personalData } = data;
  //   const { fullName, email, phoneNumber, ...addressData } = data;

  //   const detailsData = {
  //     username: data.username,
  //     password: data.password,
  //     confirmPassword: data.confirmPassword,
  //     userProfile: data.userProfile,
  //     dateOfBirth: data.dateOfBirth,
  //     gender: data.gender,
  //     companyName: data.companyName,
  //     roleInCompany: data.roleInCompany,
  //     companySize: data.companySize,
  //   };

  return (
    <GlobalContext.Provider value={{ step, setStep, data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};
