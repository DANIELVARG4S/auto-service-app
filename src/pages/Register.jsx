// src/pages/Register.jsx
import { useRegisterForm } from "../hooks/useRegisterForm";
import { InputField } from "../components/InputField";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  secondLastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: ""
};

export const Register = () => {
  const { formData, handleChange, handleSubmit, loading } = useRegisterForm(INITIAL_STATE);

  return (
    <div className="isolate  px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Register</h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          
          <InputField 
            label="First name" 
            value={formData.firstName} 
            onChange={handleChange('firstName')} 
            
          />
          
          <InputField 
            label="Last name" 
            value={formData.lastName} 
            onChange={handleChange('lastName')} 
          />

          <InputField 
            label="Second Last name" 
            value={formData.secondLastName} 
            onChange={handleChange('secondLastName')} 
          />

          <InputField 
            label="Email" 
            type="email"
            value={formData.email} 
            onChange={handleChange('email')} 
            autoComplete="email"
          />
          
          <InputField 
            label="Phone number" 
            className="sm:col-span-2"
            value={formData.phoneNumber} 
            onChange={handleChange('phoneNumber')} 
          />

          <InputField 
            label="Password" 
            type="password"
            className="sm:col-span-2"
            value={formData.password} 
            onChange={handleChange('password')} 
          />

          <InputField 
            label="Confirm Password" 
            type="password"
            className="sm:col-span-2"
            value={formData.confirmPassword} 
            onChange={handleChange('confirmPassword')} 
          />

        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
              ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'} 
              transition-colors`}
          >
            {loading ? "Register" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};