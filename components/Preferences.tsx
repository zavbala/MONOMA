import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/Main";
import { useRouter } from "next/navigation";

const schema = z.object({
  referrer: z.string().optional(),
  termsAndConditions: z.boolean(),
  receiveNotificationsByEmail: z.boolean().default(false),
});

const Mocky = {
  personal: "892bc38b-c7e2-4432-a478-2eac4df57942",
  business: "e1724715-51d4-4ed2-b20f-cd3c59659e47",
};

const Referrals = [
  { value: "online-ads", label: "Online Ads" },
  { value: "friend-referral", label: "Friend Referral" },
  { value: "social-media", label: "Social Media" },
  { value: "other", label: "Other" },
];

const Preferences = (data: any) => {
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const defaultValues = {
    referrer: data.referrer,
    termsAndConditions: data.termsAndConditions,
    receiveNotificationsByEmail: data.receiveNotificationsByEmail,
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const { push } = useRouter();

  const {
    step,
    setStep,
    data: parentData,
    setData,
  } = useContext(GlobalContext);

  const onSubmit = async (data: any) => {
    console.log(parentData), setData({ ...parentData, ...data });

    let url =
      "https://run.mocky.io/v3/" +
      // @ts-ignore
      Mocky[parentData.userProfile as keyof typeof Mocky];

    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify(parentData),
      headers: { "Content-Type": "application/json" },
    });

    if (result.ok) {
      console.log("Data sent successfully");
      setWasSubmitted(true);
    }
  };

  useEffect(() => {
    if (wasSubmitted) {
      const encoded = btoa(JSON.stringify(parentData));
      push("/summary/" + "?key=" + encoded);
    }
  }, [wasSubmitted]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3">
        <div className="space-x-3">
          <label htmlFor="receiveNotificationsByEmail">
            Receive Notifications By Email
          </label>

          <input
            type="checkbox"
            id="receiveNotificationsByEmail"
            {...register("receiveNotificationsByEmail")}
          />
        </div>

        <div className="flex space-x-3">
          {Referrals.map((referral) => (
            <fieldset key={referral.value} className="space-x-2">
              <label htmlFor={referral.value}>{referral.label}</label>
              <input
                type="radio"
                id={referral.value}
                {...register("referrer")}
                value={referral.value}
              />
            </fieldset>
          ))}
        </div>

        <div className="space-x-3">
          <label htmlFor="termsAndConditions">
            I agree to the terms and conditions
          </label>

          <input
            type="checkbox"
            id="termsAndConditions"
            {...register("termsAndConditions")}
          />

          {errors.termsAndConditions && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="btn btn-secondary flex-1"
        >
          Previous
        </button>

        <button
          type="submit"
          className="btn flex-1"
          disabled={watch("termsAndConditions") === false}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Preferences;
