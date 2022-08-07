import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {
const {dispatch} = useAuthContext()  
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
const[cancel, setCancel]=useState(false)
useEffect(()=>{
  return ()=>setCancel(true)
},[])
const signup = async (email, password, displayName) => {

    setError(null)
    setLoading(true)

    try {
      // signup
    const res = await createUserWithEmailAndPassword(auth,email, password)
    console.log(res.user)

    if (!res) {
        throw new Error('Üye işleminde hata oluştu')
    }

    await updateProfile(res.user,{displayName})
    dispatch ({type:'LOGIN', payload:res.user})
      if(!cancel){
      setLoading(false)
      setError(null)  
    }
    } 
    catch(err) {
      if(!cancel){
        console.log(err.message)
        setError(err.message)
        setLoading(false)
      }
    }
}

return { signup, error, loading }
}