import './Login.module.css'
import { useState } from 'react'
import {Container, Typography, Button, FormControl, FilledInput, InputLabel, InputAdornment, IconButton} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate=useNavigate()
  const {login,error,loading}=useLogin()
  const [values, setValues] = useState({
    email:"",
    password:"",
    showPassword:false
  })
  const handleChange=(prop)=>(event)=>{
    setValues({...values,[prop]:event.target.value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    login(values.email,values.password,values)
    navigate("/")
  }
  const handleClickShowPassword=()=>{
    setValues({
      ...values,
      showPassword:!values.showPassword
    })
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography sx={{mt:15, ml:5, fontWeight:"bold"}} variant="h4" color="darkslateblue">
          Giriş Yap
        </Typography>
        <FormControl fullWidth sx={{mt:5}}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <FilledInput value={values.email} onChange={handleChange('email')} id='email' label="Email"/>
        </FormControl>
        <FormControl fullWidth sx={{my:5}}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <FilledInput type={values.showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange('password')} id='password' label="password"
          endAdornment={
            <InputAdornment position='end'>
              <IconButton aria-label='Toggle Password' onClick={handleClickShowPassword} edge="end">
                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>
          }/>
        </FormControl>
        {!loading && <Button variant='outlined' type='submit' color='info' size="large" sx={{mt:5}}>Login</Button>}
        {loading && <Button variant='outlined' type='submit' color='info' size="large" sx={{mt:5}}>Loading</Button>}
        {error &&<p>{error}</p>}
      </form>
    </Container>
  )
}
