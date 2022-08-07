import React from 'react'
import {Grid, Container} from '@mui/material'
import Form from './Form'
import Liste from './Liste'
import {useAuthContext} from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import './Home.module.css'
export default function Home() {
    const {user}=useAuthContext()
    const {belgeler,error}=useCollection('harcamalar',["uid","==",user.uid],["olusturulmaTarih","desc"])
    return (
        <Container sx={{mt:8}}>
            <Grid container spacing={10}>
                <Grid item md={8} sm={2} xs={12}>
                    {error && <p>{error}</p>}
                    {
                        belgeler && <Liste harcamalar={belgeler}></Liste>
                    }
                </Grid>
                <Grid item md={4} sm={2} xs={12}>
                    <Form uid={user.uid}/>
                </Grid>
            </Grid>
        </Container>
    )
}
