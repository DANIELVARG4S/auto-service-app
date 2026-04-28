import { Link } from "react-router-dom";
import { InputField } from "../components/InputField";
import { useLoginForm } from "../hooks/useLoginForm";

const INITIAL_STATE = {
  email: "",
  password: ""
};

export const Login = () => {

  const { formData, handleChange, handleSubmit, loading } = useLoginForm(INITIAL_STATE);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}  className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-800">
                Email address
              </label>
              <div className="mt-2">
                {/* <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1
                  outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                /> */}
                <InputField 
                  type="email"
                  value={formData.email} 
                  onChange={handleChange('email')} 
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-800">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                {/* <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                /> */}

                <InputField
                  id="password"
                  type="password"
                  value={formData.password}
                  required
                  autoComplete="current-password"
                  onChange={handleChange('password')}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
                ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'} 
                transition-colors`}
                >
                 {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an account?{' '}
            {/* <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Register here
            </a> */}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
