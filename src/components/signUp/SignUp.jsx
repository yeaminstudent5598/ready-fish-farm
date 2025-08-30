import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUp = () => {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUserProfile } = useAuth();
    const [imageLoading, setImageLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password", "");

    const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    const onSubmit = async (data) => {
        try {
            setImageLoading(true);

            // 1. Upload image to ImgBB
            const imageFile = { image: data.photo[0] };
            const res = await axiosPublic.post(imageHostingApi, imageFile, {
                headers: { 'content-type': 'multipart/form-data' },
            });
            const imgURL = res.data.data.display_url;

            // 2. Create user in Firebase
            const result = await createUser(data.email, data.password);

            // 3. Update Firebase profile
            await updateUserProfile(data.name, imgURL);

            // 4. Create user entry in your database (with UID and Phone)
            const userInfo = {
                uid: result.user.uid, // Firebase থেকে পাওয়া ইউনিক আইডি
                name: data.name,
                email: data.email,
                phone: data.phone, // নতুন ফোন নম্বর
                image: imgURL,
                role: 'user',
            };

            await axiosPublic.post('/api/users', userInfo);
            
            toast.success('Account created successfully!');
            navigate('/');

        } catch (error) {
            console.error(error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('This email is already registered.');
            } else {
                toast.error('Signup failed. Please try again.');
            }
        } finally {
            setImageLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20 flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-orange-300">
                <h2 className="text-3xl font-bold text-center text-[#f97316] mb-6">Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name</label>
                        <input
                            {...register('name', { required: 'Name is required' })}
                            type="text"
                            placeholder="John Doe"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
                        <input
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            placeholder="example@mail.com"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* ✅ ফোন নম্বর ফিল্ড যোগ করা হয়েছে */}
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Phone Number</label>
                        <input
                            {...register('phone', { 
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                                    message: 'Please enter a valid Bangladeshi number'
                                }
                            })}
                            type="tel"
                            placeholder="01xxxxxxxxx"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                pattern: {
                                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                    message: 'Password must have an uppercase, a number, and a special character'
                                }
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 cursor-pointer">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Confirm Password</label>
                        <input
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value => value === password || "Passwords do not match"
                            })}
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700">Profile Picture</label>
                        <input
                            {...register('photo', { required: 'Photo is required' })}
                            type="file"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                        />
                        {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={imageLoading}
                        className="w-full bg-[#f97316] text-white font-semibold py-2 rounded-lg hover:bg-[#ea6a10] transition duration-300 disabled:bg-gray-400"
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