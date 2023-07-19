import React, { useState } from 'react'
import InputComponent from '../../common/Input'
import Button from '../../common/Button'
import { toast } from 'react-toastify';
import { auth, db } from '../../../firebase';
import {
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleOnClick() {
    console.log("Loging in ...")
    setLoading(true)
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth, email, password
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        console.log(userData)

        //saving user in redux state 
        dispatch(
          setUser({
            name: userData.name,
            email: user.email,
            uid: user.uid
          })
        )
        toast.success('Login Successfull !')
        setLoading(false)
        navigate('/profile')

      } catch (e) {
        toast.error(e.message)
        setLoading(false)
        console.log("Error in auth ", e)
      }
    } else {
      setLoading(false);
      toast.error('Make sure email and password should not empty !')
    }
  }

  return (
    <>
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder='Email'
        type="email"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder='Password'
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Login"}
        onClick={handleOnClick}
        disabled={loading}
      />
    </>
  )
}

export default LoginForm