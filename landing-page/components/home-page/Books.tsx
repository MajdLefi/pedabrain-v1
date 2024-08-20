import { Button, Container, Typography } from '@mui/material'
import React from 'react'

export default function BooksList() {
  return (
    <Container sx={{ textAlign:"center",mb:"50px"}}>
        <Typography sx={{fontSize:"56px", textAlign:"center", color:"black", fontWeight:"bold", mb:"15px", ml:'10px'}}>
            NOTRE COLLECTION DE <span style={{color:"#ffd328", }}> LIVRES</span> 
        </Typography>
        <Button variant="contained" sx={{backgroundColor:"primary.light", textTransform:"none",}}>Voir Tout</Button>
    </Container>
  )
}
