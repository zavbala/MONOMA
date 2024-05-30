import { forwardRef } from "react";

interface Props {
  name: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Selector = forwardRef<HTMLSelectElement, Props>(
  ({ name, label, options, ...self }, ref) => {
    return (
      <div className="space-y-1">
        <label className="font-bold text-sm" htmlFor={name}>
          {label || "Select"}
        </label>

        <select id={name} className="w-full p-3 rounded-md" ref={ref} {...self}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Selector.displayName = "Selector";

export default Selector;
