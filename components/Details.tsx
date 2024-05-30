import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import FieldSet from "./FieldSet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { GlobalContext } from "@/app/register/page";
import Selector from "./Selector";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const PASSWORD_REGEX_MESSAGE =
  "Password must contain at least 1 uppercase letter, 1 number, and 1 special character";

const schema = z
  .object({
    username: z.string(),
    password: z.string().min(8).regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
    confirmPassword: z
      .string()
      .min(8)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE),
    userProfile: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    companyName: z.string().optional(),
    companySize: z.string().optional(),
    roleInCompany: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface Props {
  username: string;
  password: string;
  confirmPassword: string;
  userProfile: "personal" | "business" | string;
  dateOfBirth: string;
  gender: string;
  companyName: string;
  companySize: string;
  roleInCompany: string;
}

const Details = (defaultValues: Props) => {
  const {
    watch,
    control,
    register,
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
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {/* {JSON.stringify(defaultValues)} */}

      <div className="space-y-3">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FieldSet
              type="text"
              label="Username"
              autoComplete="off"
              placeholder="Username"
              // error={errors.username?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FieldSet
              type="password"
              label="Password"
              autoComplete="off"
              placeholder="Password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FieldSet
              type="password"
              autoComplete="off"
              label="Confirm Password"
              placeholder="Confirm Password"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />

        <div className="flex space-x-3">
          <fieldset className="space-x-2">
            <label htmlFor="personal">Personal</label>
            <input
              type="radio"
              id="personal"
              value="personal"
              {...register("userProfile")}
            />
          </fieldset>

          <fieldset className="space-x-2">
            <label htmlFor="business">Business</label>
            <input
              type="radio"
              id="business"
              value="business"
              {...register("userProfile")}
            />
          </fieldset>
        </div>

        {watch("userProfile") === "personal" && (
          <>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <FieldSet
                  type="date"
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  error={errors.dateOfBirth?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Selector
                  label="Gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  {...field}
                />
              )}
            />
          </>
        )}

        {watch("userProfile") === "business" && (
          <>
            <Controller
              control={control}
              name="companyName"
              render={({ field }) => (
                <FieldSet
                  type="text"
                  label="Company Name"
                  placeholder="Company Name"
                  error={errors.companyName?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="companySize"
              render={({ field }) => (
                <Selector
                  label="Company Size"
                  options={[
                    { value: "1-10", label: "1-10" },
                    { value: "11-50", label: "11-50" },
                    { value: "51-200", label: "51-200" },
                    { value: "201-500", label: "201-500" },
                    { value: "500+", label: "500+" },
                  ]}
                  // error={errors.companySize?.message}
                  {...field}
                />
              )}
            />

            <Controller
              control={control}
              name="roleInCompany"
              render={({ field }) => (
                <FieldSet
                  type="text"
                  label="Role in Company"
                  placeholder="Role in Company"
                  error={errors.roleInCompany?.message}
                  {...field}
                />
              )}
            />
          </>
        )}
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

export default Details;
