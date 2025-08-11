import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        navigate(from, { replace: true });
        Swal.fire({
          title: 'সফলভাবে লগইন হয়েছে!',
          text: 'আপনি এখন আপনার অ্যাকাউন্টে প্রবেশ করেছেন।',
          icon: 'success',
          confirmButtonText: 'ঠিক আছে',
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'ত্রুটি!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'ঠিক আছে',
        });
      });
  };

  if (user) {
    return navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden grid md:grid-cols-2">
        {/* Left side - welcome text */}
        <div className="bg-[#f97316] text-white p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg">
            Login to your account and continue exploring amazing products!
          </p>
          <div className="mt-6">
            <p className="text-sm">Don’t have an account?</p>
            <Link to="/signup" className="text-white underline text-base font-medium">
              Register Now
            </Link>
          </div>
        </div>

        {/* Right side - form */}
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">Login to Your Account</h3>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
              />
              <div className="text-right text-sm mt-1">
                <a href="#" className="text-orange-500 hover:underline">Forgot password?</a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
