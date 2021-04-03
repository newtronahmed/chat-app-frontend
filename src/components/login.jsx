import React,{useState,useContext} from 'react'
import { TextField, Button } from '@material-ui/core'
import {useUserContext} from '../context/userContext'
import useStyles from './style'
import { Redirect } from 'react-router-dom'
const ENDPOINT =  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001'
export default function Login() {
const classes = useStyles()
    const [formData,setFormData] = useState({email:'',password:''})
    const [errors,setErrors] = useState({})
    const {user,setUser} = useUserContext()
   const handleSubmit = (e)=>{
       e.preventDefault()
        fetch(ENDPOINT+'login',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        }).then(res=>{
            return res.json()
        }).then(res=>{
            console.log(res);
            if(res.errors){
                setErrors({...res.errors})
            }
            if(res.user){
                const {email,password,name,_id} = res.user
                
                setUser({email,password,name,user_id:_id})
            }
            
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    if(user){
        return <Redirect to='/' />
    }
    return (
        <>
            <h1>Login</h1>
            <form className={classes.login_container} onSubmit={handleSubmit}>
                <TextField name='email' label='Email' onChange={handleChange} className={classes.text_input} ></TextField>
                {
                    errors.email && <div style={{color:'red'}}>{errors.email}</div>
                }
                <TextField name='password' label='Password' onChange={handleChange} className={classes.text_input}></TextField>
                {
                    errors.password && <div style={{color:'red'}}>{errors.password}</div>
                }
                <Button variant='outlined' type='submit' >submit</Button>
            </form>
        </>
    )
}
