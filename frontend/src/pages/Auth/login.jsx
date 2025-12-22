// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
// import { setCredentials } from "../../redux/features/auth/authSlice.js";
// import { toast } from "react-toastify";


// function Login() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [login, {isLoading}] = useLoginMutation();
//     const {userInfo} = useSelect(state => state.auth);

//     const { search } = useLocation();
//     const sp = new URLSearchParams(search);

//     const redirect = sp.get('redirect') || '/';
//     useEffect(() => {
//         if (userInfo) {
//             navigate(redirect);
//         }   
//     }, [navigate, userInfo, redirect]);

//     return(
//         <>
//             <section className="pl-[10rem] flex flex-wrap">
//                 <div className="mr-[4rem] mt-[5rem]">
//                     <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

//                     <form className="container w-[40rem]">
//                         {/* for email */}
//                         <div className="my-[2rem]">
//                             <label
//                             htmlFor="email" 
//                             className="block text-sm font-medium text-white"
//                             >
//                                 Email Address
//                             </label>

//                             <input type="email" 
//                             id="email" 
//                             className="mt-1 p-2 border rounded-w-full"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)} />
//                         </div>
//                         {/* for password */}
//                         <div className="my-[2rem]">
//                             <label
//                             htmlFor="password" 
//                             className="block text-sm font-medium text-white"
//                             >
//                                 Password
//                             </label>

//                             <input type="email" 
//                             id="password" 
//                             className="mt-1 p-2 border rounded-w-full"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)} />
//                         </div>
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default Login;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector(state => state.auth || {});

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault(); 
        try {
            const res = await loginUser({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }   
    };

    return (
        <section className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
            <div className="ml-[4%] px-16 pt-24">
                <h1 className="text-2xl font-semibold mb-4 text-white">Sign In</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    {/* for email */}
                    <div className="my-[2rem]">
                        <label className="block text-sm font-medium text-white">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="mt-1 p-2 border-2 w-full bg-white rounded-xl"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* for password */}
                    <div className="my-[2rem]">
                        <label className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="mt-1 p-2 border-2 w-full bg-white rounded-xl"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button disabled={isLoading} type="submit" 
                    className="mt-4 font-medium bg-blue-500 text-white px-4 py-2
                    hover:bg-blue-700 rounded-2xl cursor-pointer my-[1rem]">
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>

                    {isLoading && <Loader />}

                </form>

                <div className="mt-4">
                    <p className="text-white">
                        New Customer ? {' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`} className="text-blue-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;
