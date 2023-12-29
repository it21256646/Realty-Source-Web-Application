import { useState } from "react";
import { BgImage } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
      
    console.log(formData);

  return (
    <div className=' w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-[#e0f2fe] rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
          <h1 className='font-bold text-sm sm:text-4xl flex flex-wrap'>
            <span className='text-cyan-950 '>Realty</span>
            <span className='text-sky-300'>Source</span>
          </h1>
          </div>
            <p className='text-cyan-950 text-2xl text-ascent-1 font-bold'>
              Create Your Account
            </p>
          
            <form onSubmit={handleSubmit} className='py-8 flex flex-col gap-5'>
              
                <input type="text" placeholder="username"
                className='border p-3 rounded-lg' id='username' onChange={handleChange} required/>

                <input type="email" placeholder="example@gmail"
                className='border p-3 rounded-lg' id='email'onChange={handleChange} required/>

                <input type="password" placeholder="password"
                className='border p-3 rounded-lg' id='password'onChange={handleChange} required/>

                <button disabled={loading} className="bg-[#083344] text-white p-3 rounded-lg uppercase hover:opacity-85">{loading ? 'Loading' : 'Sign Up'}</button>
                <OAuth/>
              
              
            </form>
            <p className='text-ascent-2 text-sm text-center'>
              Already has an Account?
              <span> </span>
              <Link to='/sign-in'
              className='text-cyan-950  font-semibold m1-2 cursor-pointer'>
              Login
              </Link>
            </p>
            {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#083344]'>
          <div className='relative w-full flex items-center justify-center'>
            <img
            src={BgImage}
            alt='Bg-Image'
            className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />
            {/* <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14}/>
              <span className='text-s font-medium'>Share</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection/>
              <span className='text-s font-medium'>Connect</span>
            </div>
            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction/>
              <span className='text-s font-medium'>Interact</span>
            </div> */}

          </div>
          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Connect to find your Properties
            </p>
            <span className='text-sm text-white/80'>
              Get your lovely Place
            </span>

          </div>

        </div>

      </div>
    </div>
  )
}

export default SignUp;