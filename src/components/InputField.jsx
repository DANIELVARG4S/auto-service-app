// src/components/InputField.jsx
export const InputField = ({ label, id, type = "text", value, onChange, className = "", autoComplete }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
        // className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"

        required
     />
    </div>
  );
};