import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.svg';
import signupBackgroundImage from '../assets/sign-up.jpg';
import signinBackgroundImage from '../assets/sign-in.jpg';
import GoogleIcon from '../assets/GoogleLogo.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const navigate = useNavigate()
    const [currState, setCurrState] = useState<String>("sign_in");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, SetShowPass] = useState(false);
    const { isAuthenticated, login, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currState === "sign_in") {
            await login(username, password);
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        }
    }, [isAuthenticated])
    return (
        <div className="main max-w-screen-2xl mx-auto min-h-screen  sm:h-[110vh] flex-col sm:flex-row flex justify-between">
            <div className="left w-full sm:w-1/2 mdd:w-[48%] xlg:w-[40%]">

                <div className="main-contant duration-300 transition-all px-8 xlg:px-16 py-8">
                    <img src={Logo} alt="logoipsum" className='w-[170px] h-auto' />
                    <div className="bottom-main mt-[52px]">
                        <h1 className='text-[#222B33] text-[40px] xsm:text-[54px] mdd:text-[64px] font-sora font-semibold leading-[60px] tracking-[-1.5%]'> {currState !== "sign_in" ? "Get started with Blank" : "Welcome back"} </h1>
                        <p className=' text-[16px] mdd:text-lg font-light font-public_sans mt-3 text-[#3B4752]'> {currState !== "sign_in" ? "Join Blank for free today. No credit card required." : "You need to be signed in to access the project dashboard."} </p>

                        <form onSubmit={handleSubmit} className='mt-8'>

                            {/* .email username  */}
                            <div className="flex gap-2 flex-col">
                                <label className='text-[#222B33] text-sm mdd:text-[16px] font-medium font-public_sans'> {currState !== "sign_in" ? "Email" : "Email or username"}</label>
                                <input required value={username}
                                    onChange={(e) => setUsername(e.target.value)} type="text" name="email" className='border border-[#CFD8E1] bg-[#f9fbfb] rounded-sm px-3 py-[10px] outline-none text-[#3B4752] text-sm mdd:text-[16px] font-[320]' />
                            </div>

                            {/* password  */}
                            <div className="flex gap-2 mt-2 flex-col">
                                <label className='text-[#222B33] text-sm mdd:text-[16px] font-medium font-public_sans'>Password</label>
                                <div className='relative border border-[#CFD8E1] bg-[#f9fbfb] rounded-sm px-3 py-[10px] outline-none text-[#3B4752] w-full text-sm mdd:text-[16px]  font-[320] flex items-center justify-between'>
                                    <input required value={password}
                                        onChange={(e) => setPassword(e.target.value)} type={showPass ? "text" : "password"} name="password" className='w-full bg-transparent h-full outline-none' />

                                    {
                                        showPass ? <FiEye onClick={() => SetShowPass(false)} className='text-[#6D7B88] cursor-pointer' size={24} /> : <FiEyeOff onClick={() => SetShowPass(true)} className='text-[#6D7B88] cursor-pointer' size={24} />

                                    }
                                </div>

                            </div>

                            <div className='flex items-center mt-6 justify-between gap-2'>
                                {
                                    currState === "sign_in" ?
                                        <>

                                            <div className='flex items-center  gap-2'>
                                                <label className="relative tb-checkbox w-5 h-5">
                                                    <input required
                                                        className="absolute w-full block opacity-0 h-full"
                                                        type="checkbox"
                                                    />
                                                    <span className="absolute block w-full h-full cursor-pointer"></span>
                                                </label> <p className='text-[#222b33] font-[360] text-sm mdd:text-[16px] '>Keep me signed in</p>
                                            </div>
                                            <Link to={'/'} className='text-black underline text-sm mdd:text-[16px]  font-medium'>Forgot password?</Link>
                                        </>
                                        : <div className='flex items-center  gap-2'>
                                            <label className="relative tb-checkbox w-5 h-5">
                                                <input required
                                                    className="absolute w-full block opacity-0 h-full"
                                                    type="checkbox"
                                                />
                                                <span className="absolute block w-full h-full cursor-pointer"></span>
                                            </label>  <p className='text-[#222b33]  font-[360] text-[16px]'>I agree to the <b className='underline'> terms of use</b> and <b className='underline'>
                                                privacy statement</b></p>
                                        </div>
                                }

                            </div>
                            <button disabled={isLoading} type='submit' className={`bg-[#50F89A] font-sora px-3 text-center w-full rounded-sm text-[#005237] mt-8 font-medium border border-[#00E687] py-[14px] ${isLoading && "opacity-20"}`}>{currState !== "sign_in" ? "Continue" : "Sign in"}</button>


                            <button className={`bg-[#ffffff] mt-3 flex items-center justify-center gap-[10px] px-3 text-center w-full rounded-sm text-[#3B4752] font-sora font-medium border border-[#CFD8E1] mb-6 py-[14px]`}> <img src={GoogleIcon} alt="Google logo icon " /> {currState !== "sign_in" ? "Continue with Google" : "Sign in with Google"} </button>

                            {
                                currState !== "sign_in" ?
                                    <p className='text-center font-normal'>Already have an account? <b className='underline cursor-pointer font-medium' onClick={() => setCurrState("sign_in")}>Log in</b></p>
                                    :
                                    <p className='text-center font-normal'>Haven’t joined yet? <b className='underline cursor-pointer font-medium' onClick={() => setCurrState("sign_up")}>Sign in</b></p>
                            }
                        </form>
                    </div>

                </div>

            </div>



            <div className="flex-1 flex items-start sm:items-center justify-center  min-h-full sm:min-h-screen  relative">

                {
                    currState !== "sign_in" ? (
                        <>
                            <img src={signupBackgroundImage} alt="Background" className="w-full h-full grayscale object-top object-cover" />
                            <div
                                className="absolute inset-0 flex flex-col items-start justify-end p-8 opacity-65"
                                style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 40.63%, #000000 68.75%)' }}
                            >
                            </div>

                            <div className='w-full h-full absolute top-0 left-0 flex items-start px-6 xlg:px-12 py-16 z-10  justify-end flex-col'>
                                <p className=" text-3xl mdd:text-4xl xlg:text-5xl font-sora relative z-20 heading mb-4">
                                    Blank is the ultimate time saver for small business owners like me.
                                </p>
                                <p className="text-white font-sora text-2xl mdd:text-3xl xlg:text-4xl">
                                    Brittany Stone
                                </p>
                                <p className="text-white font-public_sans text-[22px] font-[280] mt-1">
                                    SnapVision
                                </p>
                            </div>
                        </>
                    ) : (
                        <img src={signinBackgroundImage} alt="Background" className="w-full h-full grayscale object-top object-cover" />
                    )
                }
            </div>
        </div>
    )
}

export default Login