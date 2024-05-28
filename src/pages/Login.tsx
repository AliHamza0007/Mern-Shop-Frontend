import { auth } from '@/firebase';
import { getUser, useLoginMutation } from '@/redux/api/userAPI';
import { userExist, userNotExist } from '@/redux/reducer/userReducer';
import { MessageResponse } from '@/types/api-types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const data = {
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: 'user',
        dob: date,
        _id: user.uid,
      };
      // console.log(data);

      const res = await login(data);
      if ('data' in res) {
        const { result, message } = await getUser(user.uid);
        dispatch(userExist(result));
        toast.success(message);
        navigate('/');
      } else {
        // If 'data' doesn't exist, it's an error response
        const error = res.error as FetchBaseQueryError;
        const message =
          (error.data as MessageResponse)?.message ?? 'An error occurred';
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error('Sign In Fail');
    }
  };

  return (
    <div className="login-page">
      <main>
        <h1 className="heading">Login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
