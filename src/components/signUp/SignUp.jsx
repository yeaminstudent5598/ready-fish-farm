import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const [imageLoading, setImageLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

  const onSubmit = async (data) => {
    try {
      setImageLoading(true);

      const imageFile = { image: data.photo[0] };
      const res = await axiosPublic.post(imageHostingApi, imageFile, {
        headers: { 'content-type': 'multipart/form-data' },
      });

      const imgURL = res.data.data.display_url;

      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, imgURL);

      const userInfo = {
        name: data.name,
        email: data.email,
        image: imgURL,
        role: 'user',
      };

      await axiosPublic.post('/users', userInfo);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Signup failed. Try again.');
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-orange-300">
        <h2 className="text-3xl font-bold text-center text-[#f97316] mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="example@mail.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
            <input
              {...register('password', { required: 'Password is required', minLength: 6 })}
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Profile Picture</label>
            <input
              {...register('photo', { required: 'Photo is required' })}
              type="file"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            />
            {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
          </div>

          <button
            type="submit"
            disabled={imageLoading}
            className="w-full bg-[#f97316] text-white font-semibold py-2 rounded-lg hover:bg-[#ea6a10] transition duration-300"
          >
            {imageLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#f97316] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
