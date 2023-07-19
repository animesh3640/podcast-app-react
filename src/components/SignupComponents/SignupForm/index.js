import React, { useState } from 'react'
import InputComponent from '../../common/Input'
import Button from '../../common/Button'
import {toast} from 'react-toastify'
//firebase
import { auth, db } from '../../../firebase';
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import {setUser} from '../../../slices/userSlice'
import { useNavigate } from 'react-router-dom';

function SignupForm() {

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading,setLoading] =useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleOnClick() {
    console.log("Signing up ...")
    setLoading(true)
    if (password.trim() === confirmPassword.trim()) {
      if (password.trim().length >= 6) {
        try {

          // creating user's Account 
          const userCredential = await createUserWithEmailAndPassword(
            auth, email, password
          );
          const user = userCredential.user;
          console.log("user is ", user)

          // saving user's details in db
          await setDoc(doc(db, 'users', user.uid), {
            name: fullname,
            email: user.email,
            uid: user.uid
          });

          //saving user in redux state 
          dispatch(
            setUser({
              name: fullname,
              email: user.email,
              uid: user.uid
            })
          )
          toast.success('User Has been Created !');
          setLoading(false)
          navigate('/profile')
        } catch (e) {
          setLoading(false)
          toast.error(e.message)
        }
      } else {
        setLoading(false)
        toast.error('Password length must be greator than equal to six !')
      }
    } else {
      setLoading(false)
      toast.error('Password Does not match !')
    }
  }

  return (
    <>

      <InputComponent
        state={fullname}
        setState={setFullname}
        placeholder='Full Name'
        type="text"
        required={true}
      />
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
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder='Confirm Password'
        type="password"
        required={true}
      />
      <Button
        text={loading?"Loading..":"Signup"}
        onClick={handleOnClick}
        disabled={loading}
      />
    </>
  )
}

export default SignupForm