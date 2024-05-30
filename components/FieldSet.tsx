import { forwardRef, useState } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
}

const FieldSet = forwardRef<HTMLInputElement, Props>(
  ({ name, label, error, ...props }, ref) => {
    const [toggle, setToggle] = useState(false);

    return (
      <fieldset className="relative">
        <label className="font-bold text-sm" htmlFor={name}>
          {label}
        </label>

        <input
          ref={ref}
          name={name}
          className="relative block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          {...props}
          type={props.type === "password" && toggle ? "text" : props.type}
        />

        {props.type === "password" && (
          <button
            onClick={() => setToggle(!toggle)}
            className="absolute top-1/2 right-2 transform -translate-y-1/12 text-sm text-blue-500"
            type="button"
          >
            {toggle ? "Hide" : "Show"}
          </button>
        )}

        {error && (
          <small className="block mt-1 text-red-600 text-xs">{error}</small>
        )}
      </fieldset>
    );
  }
);

FieldSet.displayName = "FieldSet";

export default FieldSet;
