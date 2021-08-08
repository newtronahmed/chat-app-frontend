import React,{useEffect,useRef,useState} from 'react'
import io from 'socket.io-client'
import {Link,Redirect} from 'react-router-dom'
import {useUserContext} from '../context/userContext'
import {Card,CardContent, Grid, Typography, Button, TextField} from '@material-ui/core'
import ENDPOINT from '../config/endpoint'

export default function Home() {
   
    // const ENPOINT = process.env.REACT_APP_API_ENDPOINT 
    // const ENDPOINT = 'http://localhost:3000'
    // const _ENDPOINT = ENDPOINT

    const {user} = useUserContext()
    const [room,setroom] = useState('')
    const [rooms,setRooms] = useState([])
    const socketRef = useRef()
    // const rooms =[
    //     {
    //         name:'room1',
    //         id:'1'
    //     },
    //     {
    //         name:'room2',
    //         id:'2'
    //     }
    // ]

    useEffect(() => {
         socketRef.current = io(ENDPOINT);

        return () => {
            socketRef.current.disconnect()
            socketRef.current.off()
        }
    }, [ENDPOINT])
    useEffect(() => {
        socketRef.current.on('all-rooms',(allrooms)=>{
            console.log('all rooms',allrooms)
            setRooms(allrooms)
        })
        

    }, [])
    useEffect(() => {
        socketRef.current.on('room-created',(room)=>{
            // console.log(room)
            setRooms([...rooms,room])
        })
            
        },[rooms])
 
  const handleSubmit=(e)=>{
    e.preventDefault()
    socketRef.current.emit('create-room',room)
    setroom('')
   }
//    console.log('user',user);
//    if(!user){
//       return <Redirect to='/login' />
//    }
   
    return (
        <>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}  >
                <Card>
                    <CardContent>
    <Typography align='center' variant='h3'>Welcome {user?.name}</Typography>
                        <TextField name='room' value={room} onChange={(e)=>setroom(e.target.value)} fullWidth label='Room'></TextField>
                        <Button variant='outlined' onClick={handleSubmit} type='submit'> Create Room</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} >
                {
                    rooms.map(each=>{
                        return (
                            <Card key={each._id} >
                                <CardContent>
                                    <Link to={'/chat/'+each._id+'/'+each.name}>
                                        {each.name}
                                    </Link>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </Grid>
        </Grid>
       
        </>
    )
}
