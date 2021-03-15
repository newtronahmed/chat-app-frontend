import {makeStyles} from '@material-ui/core/styles'
export default makeStyles((theme)=>({
    room_card:{
        marginTop:theme.spacing(3),
    },
    chat_container:{
        // marginLeft:'auto',
        // marginRight:'auto',
        // width:'50%', 
        // position:'relative',
        // height:'100%',
        // backgroundColor:'steelblue',

    },
    chat_seperator :{
        height:theme.spacing(3),
    },
    // message_container:{
    //     // display:'flex',
    //     // position:'relative',
    //     // width:'100%',
    // },
    messages_container:{
        paddingLeft:theme.spacing(1),
        paddingRight:theme.spacing(1),
        paddingTop:theme.spacing(1),
        
        // marginTop:theme.spacing(3)
        // overflowY:'scroll',
        // backgroundColor:'steelblue',

    },
    nav_links:{
        display:'inline-block',
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
    },

    owner:{
        background:'green',
        display:'inline-block',
        // textAlign:'left',
        // justifyContent:'flex-end',
       
        borderRadius:'10px 2px',
        // justifySelf:'end',
        color:'white',
        float:'right',
        clear:'both',
        padding:theme.spacing(1),
        marginBottom:theme.spacing(1),
       
    },
    received:{
        background:'grey',
        // textAlign:'right',
       float:'left',
       clear:'both',
        color:'white',
        display:'inline-block',
        borderRadius:'5px',
        // justifySelf:'start',
        // justifyContent:'flex-start',
        padding:theme.spacing(1),
        marginBottom:theme.spacing(1)
    },
    message_form:{
        clear:'both',
        display:'flex',
        // position:'absolute',
        // left:10,
        // bottom:'0px',
    },
    text_input:{
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1)
    },
    login_container:{
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
        border:'2px solid steelblue',
        display:'flex',
        flexDirection:'column',
        padding:theme.spacing(3),
    },
    chat_navbar:{
        
        padding:theme.spacing(3),
        // position:'fixed',
        // top:'50px',
        
    }

}))