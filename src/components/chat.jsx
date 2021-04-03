import React ,{ useRef, useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import {useUserContext} from '../context/userContext'
import {ListItem, ListItemText, } from '@material-ui/core'
import io from 'socket.io-client'
import useStyles from './style'
import { TextField, Button, Typography, Paper, Container, Grid } from '@material-ui/core';
let socket; 
function ListItemLink (props){
  return <ListItem button component={Link}  {...props}></ListItem>
}
const ENPOINT =  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3001'
export default function Chat() {
 
  let {room_id,room_name} = useParams();
  const [messages,setMessages] = useState([])
  const [rooms,setRooms] = useState([])
  const [selectedRoom,setSelectedRoom] = useState('6038d884b50f6e02b851e0c6')
  const [members,setMembers] = useState()
  const {user} =  useUserContext()
const [message,setMessage] = useState('')

  // console.log(room_name,room_id)
  useEffect(() => {
    socket = io(ENPOINT)
    // console.log(socket)

    socket.emit('join',{name:user.name,room_id,user_id:user.user_id})
    // socket.on('all-messages',function(data){
    //   setMessages(data)
    // })
    socket.on('all-members',function(data){
      // console.log(data)
        setMembers(data)
    })
    return ()=>{
      console.log('disconnected')
      // console.log(messages);
      
      // setMessages([])

      // socket.off()
      socket.disconnect()
      
    }
  }, [ENPOINT,room_id,user])
  useEffect(() => {
    socket.on('all-rooms',(allrooms)=>{
      console.log('all rooms',allrooms)
      setRooms(allrooms)

  })
   console.log('all room') 
  }, [])
  
  useEffect(() => {
    socket.on('message',function(msg){
      // console.log('fetch messages')
      setMessages([...messages,msg]);
    })
    console.log(messages)
    
  }, [messages,room_id])
  const submitHandler =(e)=>{
    e.preventDefault()
   
      socket.emit('send-message',message,room_id,()=>{
        setMessage('')
      })

    
  }
  const classes = useStyles()
  const roomMessages = messages.filter(each=>{
   return each.room_id === selectedRoom
  })
    return (
        <> 
          {/* <h1>Chat {room_name}</h1> */}
          {/* <Link to={'/'}>home</Link> */}
          {/* <h3>{JSON.stringify(user)}</h3>  */}
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <Typography variant='h4'>Groups</Typography>
                {
                 rooms&& rooms.map((eachRoom,i)=>{
                    return(
                  <ListItemLink selected={selectedRoom === eachRoom._id} onClick={()=>setSelectedRoom(eachRoom._id)} to={'/chat/'+eachRoom._id+'/'+eachRoom.name} >
                    <ListItemText primary={'#'+eachRoom.name}></ListItemText>
                  </ListItemLink>
                    )
                  })
                }
                
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography variant='h4' align='center'>Messages</Typography>
              <div className={classes.chat_container} style={{background:'#f4f4f4'}}>
            {/* <Paper variant='outlined'className={classes.chat_navbar}>
              <Typography variant='h4' >{room_name}</Typography>
            </Paper> */}
            {/* <div className={classes.chat_seperator} /> */}
            <div className={classes.messages_container} >
            {roomMessages.map(each=>{
             
              return (
                <div className={classes.message_container}>
                  <div className={each.name === user.name ? classes.owner : classes.received}>{each.text}</div>
                </div>
             
              )
            })}
            </div>
            <form  onSubmit={submitHandler} className={classes.message_form}>
              <TextField name='messageInput' variant="filled" onChange={(e)=>setMessage(e.target.value)} value={message} label='message' fullWidth />
              <Button variant='outlined' type='submit' align='center'  color='primary' >submit</Button>
            </form> 
          </div>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant='h4' >Memebers</Typography>
                {
                 members && members.map(eachMember=><ListItem ><ListItemText primary={eachMember.name} secondary={socket?.connected? 'online':'offline'}></ListItemText> </ListItem>)
                }
              </Grid>
            </Grid>
          </Container>
          
          


        </>
    )
}
