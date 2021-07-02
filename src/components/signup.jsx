import React, { useState , useContext} from 'react'
import { TextField, Button } from '@material-ui/core'
import {useUserContext} from '../context/userContext'
import {Redirect} from 'react-router-dom'
import useStyles from './style'
const ENDPOINT= process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001/'
export default function Signup() {
    const classes = useStyles()
    const [formData,setFormData] = useState({email:'',password:'',name:''})
    const [errors,setErrors] = useState({})
    const {user,setUser} = useUserContext()
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formData);
        
        fetch(ENDPOINT+'signup',{
            method:'POST',
            mode:'cors',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
        }).then(res=>{ 
           return res.json()
        }).then(res=>{
            console.log(res)
            setFormData({name:'',email:'',password:''})
            if(res.errors){
                setErrors({...res.errors})
            }
            if(res.user){
                const {name,_id,email,password} = res.user
                setUser({name,email,password,user_id:_id})
            }
        }).catch(err=>{
            console.log(err.message);
            
        })
        // console.log(formData)
    }
    const handleChange = (e)=>{

        setFormData({ ...formData ,[e.target.name]:e.target.value})
    }
    if(user){
        console.log('should redirect')
       return <Redirect to="/" />
    }
    return (
        <>
            <h1>Signup</h1>
            <form className={classes.login_container} onSubmit={handleSubmit}>
                <TextField name='name' value={formData.name} onChange={handleChange} label='Name' className={classes.text_input} ></TextField>
               {
                   errors.name&&<div style={{color:'red'}}>{errors.name}</div>
               }
                <TextField name='email' value={formData.email} label='Email' onChange={handleChange} className={classes.text_input} ></TextField>
                {
                   errors.email&&<div style={{color:'red'}}>{errors.email}</div>
               }
                <TextField name='password' value={formData.password} label='Password' onChange={handleChange} className={classes.text_input} ></TextField>
                {
                   errors.password&&<div style={{color:'red'}}>{errors.password}</div>
               }
                <Button type='submit' variant='outlined'>submit</Button>
            </form>
        </>
    )
}