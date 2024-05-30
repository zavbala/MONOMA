import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import FieldSet from "./FieldSet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { GlobalContext } from "@/context/Main";

const schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name must be at most 100 characters long")
    .regex(/^[a-zA-Z\s]*$/, "Full name must contain only letters"),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10)
    .max(15)
    .regex(
      /^\+?[0-9]+$/,
      "Phone number must contain only numbers and no spaces"
    ),
});

interface Props {
  fullName: string;
  email: string;
  phoneNumber: string;
}

const Personal = (defaultValues: Props) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const {
    step,
    setStep,
    data: parentData,
    setData,
  } = useContext(GlobalContext);

  const onSubmit = (data: any) => {
    console.log(data);
    setStep(step + 1), setData({ ...parentData, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <FieldSet
              label="Full Name"
              error={errors.fullName?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FieldSet label="Email" error={errors.email?.message} {...field} />
          )}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <FieldSet
              label="Phone Number"
              error={errors.phoneNumber?.message}
              {...field}
              type="tel"
              inputMode="tel"
            />
          )}
        />
      </div>

      <div className="flex space-x-2 stepper">
        <button
          type="button"
          disabled={step === 1}
          className="btn btn-secondary flex-1"
          onClick={() => setStep(step - 1)}
        >
          Previous
        </button>

        <button type="submit" className="btn flex-1">
          Next
        </button>
      </div>

      {process.env.NODE_ENV === "development" &&
        JSON.stringify(watch(), null, 2)}
    </form>
  );
};

export default Personal;
