import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader.jsx";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice.js";

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [registerUser, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector(state => state.auth || {});

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') ? sp.get('redirect') : '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            toast.error('Password do not match!')
        }
        else{
            try{
                const res = await registerUser({username, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate(redirect)
                toast.success('User successfully registered');
            }
            catch(err){
                console.log(err)
                toast.error(err.data.message)
            }
        }
    }

    return(
        <section className="pl-[10rem] flex flex-wrap justify-center items-center">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4 text-white">Register</h1>

                <form onSubmit={submitHandler} className="container w-[54] w-[40rem]">
                    <div className="my-[2rem]">
                        <label 
                        htmlFor="name"
                        className="block text-sm font-medium text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            className="mt-1 p-2 border-2 w-full bg-white rounded-xl"
                            value={username}
                            placeholder="Enter Your Name"
                            id="name"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    {/* for email */}
                    <div className="my-[2rem]">
                        <label 
                        htmlFor="email"
                        className="block text-sm font-medium text-white">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 border-2 w-full bg-white rounded-xl"
                            value={email}
                            placeholder="Enter Your E-mail"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* for password */}
                    <div className="my-[2rem]">
                        <label 
                        htmlFor="password"
                        className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Your Password"
                            className="mt-1 p-2 border-2 w-full bg-white rounded-xl"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* for confirm password */}
                    <div className="my-[2rem]">
                        <label
                        htmlFor="confirmPassword" 
                        className="block text-sm font-medium text-white">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Enter Confirm Password"
                            className="mt-1 p-2 border-2 w-full bg-white rounded-xl"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button disabled={isLoading} 
                    type="submit"
                    className="bg-blue-500 text-white px-4
                    py-2 rounded-2xl hover:bg-blue-700 cursor-pointer my-[1rem]">
                        {isLoading ? "Registering.." : "Register"}
                    </button>

                    {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                    <p className="text-white">
                        Already have an account ? {" "}
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Register;