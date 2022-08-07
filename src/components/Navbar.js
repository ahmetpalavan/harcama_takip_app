import styles from './Navbar.module.css';
import { AppBar } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
export default function Navbar() {
    const{logout}=useLogout();
    const{user}=useAuthContext();
return (
    <Box sx={{flexGrow:1}}>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography varian="h6" component="div" sx={{flexGrow:1}}>
                    <Link component="button" to="/" className={styles.link} >Harcama Takip App</Link>
                </Typography>
                    {!user &&(
                        <>
                        <Button variant="outlined" color="inherit"> 
                        <Link component="button" className={styles.link} to="/login">GİRİŞ</Link>
                        </Button>
                        <Button variant='text' color='secondary'>
                        <Link component="button" className={styles.link} to="/signup">ÜYE OL</Link>
                        </Button>
                        </>
                    )}
                    {user && (
                        <>
                        <Typography variant='outlined' color='inherit'>Merhaba {user.displayName}</Typography>
                        <Button to="/" onClick={logout} variant='contained' color='secondary' sx={{ml:5}}>ÇIKIŞ</Button>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    </Box>
)
}
