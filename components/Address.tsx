import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import FieldSet from "./FieldSet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { GlobalContext } from "@/app/register/page";
import Selector from "./Selector";

const schema = z.object({
  address: z.string().min(1, "Address must be at least 1 character long"),
  city: z.string().min(1, "City must be at least 1 character long"),
  country: z.string(),
  zipCode: z.string().regex(/^\d{5}$/, "Zip code must be 5 digits long"),
});

interface Props {
  address: string;
  country: string;
  city: string;
  zipCode: string;
}

const Address = (defaultValues: Props) => {
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

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
          name="address"
          rules={{ required: "Address is required" }}
          control={control}
          render={({ field }) => (
            <FieldSet
              label="Address"
              error={errors.address?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FieldSet label="City" error={errors.city?.message} {...field} />
          )}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Selector
              label="Country"
              options={[
                { label: "Canada", value: "CA" },
                { label: "United States", value: "US" },
                { label: "United Kingdom", value: "UK" },
              ]}
              {...field}
            />
          )}
        />

        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <FieldSet
              label="Zip Code"
              error={errors.zipCode?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex space-x-2 stepper">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => setStep(step - 1)}
          className="btn btn-secondary flex-1"
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

export default Address;
