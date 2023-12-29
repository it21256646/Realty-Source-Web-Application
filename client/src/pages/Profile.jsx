import { useSelector } from "react-redux";
import { useRef, useState, useEffect,Fragment } from "react";
import {getStorage, ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage';


import { app } from '../firebase';
import { useDispatch } from 'react-redux';


import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  
} from '../redux/user/userSlice';
import { Link } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const {currentUser,loading, error} = useSelector((state)=> state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  
  
  const dispatch = useDispatch();
  console.log(file);
  console.log(updateSuccess);
  
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };



  
  return (
    <Fragment>
      <h1 className='font-bold text-4xl flex flex-wrap mt-2'>
            <span className='text-cyan-950 m-auto'>Profile</span>
            
          </h1>
    <div className=' w-full h-[100vh] flex items-center justify-center p-6'>
      
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bf-primary rounded-xl overflow-hidden shadow-xl'>
        
        {/* LEFT */}
        <div className='w-full lg:w-full h-full 2xl:px-20 flex flex-col justify-center'>
          
          <div className='w-full flex gap-2 items-center'>
            
          
          </div>
          
          
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-transparent'>
            
            <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'/>
            <img
            onClick={()=>fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt='Bg-Image'
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
            />
            <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-cyan-950'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-800'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

                <input type="text" placeholder="username"
                className='border p-3 rounded-lg' id='username'defaultValue={currentUser.username}  onChange={handleChange}/>

                <input type="email" placeholder="email"
                className='border p-3 rounded-lg' id='email'defaultValue={currentUser.email}  onChange={handleChange}/>

                <input type="password" placeholder="password"
                className='border p-3 rounded-lg' id='password' onChange={handleChange}/>

                <button disabled={loading}className="bg-[#083344] text-white p-3 rounded-lg uppercase hover:opacity-85">{loading ? 'Loading..' :'UPDATE'}</button>
                <button onClick={handleDeleteUser} className="bg-[#dc2626] text-white p-3 rounded-lg uppercase hover:opacity-85">DELETE</button>
               
              
              
            </form>
            <Link className="bg-cyan-950 mt-4 text-white font-semibold p-3 rounded-lg uppercase text-center hover:opacity-80 mb-3" to={"/create-listing"} >
            Your Listing
          </Link>
            <div className="flex justify-center mt-3">
              
            <span onClick={handleSignOut} className="text-cyan-950 cursor-pointer text-m font-bold">Sign Out</span>
            
                {/* {<alert className="text-green-700 mt-5 duration-75 self-center" >{updateSuccess ? 'User Updated' : ''}</alert>} */}
              
            
            
            <p className="text-red-700 mt-5 duration-75 self-center">{error?error:''}</p>
          
            
            </div>
            
            
        </div>
        

      </div>
    </div>
    
    
   
    </Fragment>
  )
}

export default Profile;





























//firebase rules 

// allow read, 
// write: if
// request.resource.size < 2 * 1024 * 1024 &&
// request.resource.contentType.matches('image/.*')