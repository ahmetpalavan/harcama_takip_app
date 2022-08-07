import { useState } from 'react'
import { auth } from '../firebase/config'

import { signOut } from 'firebase/auth'
import {useAuthContext} from './useAuthContext'

export const useLogout = () => {

const {dispatch} = useAuthContext()  
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)

const logout = async () => {

    setError(null)
    setLoading(true)

    try {

    await signOut(auth)
    dispatch ({type:'LOGOUT'})
    setLoading(false)
    setError(null)   
    } 
    catch(err) {
    console.log(err.message)
    setError(err.message)
    setLoading(false)
    }
}

return { logout, error, loading }
}