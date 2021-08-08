
import React from 'react'
import {AppBar, Toolbar,Typography, CssBaseline, Button} from '@material-ui/core'
import useStyles from './style'
import { Link } from 'react-router-dom'
import {useUserContext} from '../context/userContext'
export default function Navbar() {
    const classes = useStyles()
    const {user} = useUserContext()
    console.log(user)
    return (
        <>
            <AppBar>
                <Toolbar >
                    <Typography variant='body2'>
                        ConverX
                    </Typography>
                   {!user&&<Button component={Link} to={'/login'} className={classes.nav_links}>Login</Button>}
                   {!user&&<Button component={Link} to={'/signup'} className={classes.nav_links}>Signup</Button>}
                   {user && <Button  className={classes.nav_links}>Add Room</Button>}
                   {/* {user&&<Button component={Link} className={classes.nav_links}>c</Button>} */}
                </Toolbar>
            </AppBar> 
            <Toolbar /> 
            
        </>
    )
}
