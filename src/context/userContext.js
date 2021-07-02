import React, { Component,useContext } from 'react'
import {createContext} from  'react'
 const UserContext = createContext();
export const useUserContext = ()=>(useContext(UserContext))
const ENDPOINT= 'http://localhost:3001/' ||  process.env.REACT_APP_API_ENDPOINT 
export default class UserContextProvider extends Component {
   
    state = {
        user:''
    }
    componentDidMount(){
        fetch(ENDPOINT+'verify-user',{
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
          }).then(res=>{
            return res.json()
          }).then(data=>{
              
            this.setUser({user_id:data._id, name:data.name, email:data.email,password:data.password })
          }).catch(err=>{
              console.log('error verifying jwt',err.message)
          })
    }
   
        setUser = (user)=>{
            this.setState({user})
        }
    render() {
        return (
            <UserContext.Provider value={{...this.state,setTom:this.setTom,setJohn:this.setJohn,setUser:this.setUser}}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}
