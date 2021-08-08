import React,{useState,useContext} from 'react'
import { TextField, Button } from '@material-ui/core'
import {useUserContext} from '../context/userContext'
import useStyles from './style'
import { Redirect } from 'react-router-dom'
import ENDPOINT from '../config/endpoint'
export default function Login(props) {
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
                'Access-Control-Allow-Origin':'https://brave-visvesvaraya-2ba0ba.netlify.app'
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
                props.history.push('/')
            }
            
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
   
    return (
        <>
            <h1>Login</h1>
            <form className={classes.login_container} onSubmit={handleSubmit}>
                <TextField name='email' type="email" label='Email' onChange={handleChange} className={classes.text_input} ></TextField>
                {
                    errors.email && <div style={{color:'red'}}>{errors.email}</div>
                }
                <TextField name='password' type='password' label='Password' onChange={handleChange} className={classes.text_input}></TextField>
                {
                    errors.password && <div style={{color:'red'}}>{errors.password}</div>
                }
                <Button variant='outlined' type='submit' >submit</Button>
            </form>
        </>
    )
}
