import { Container, Typography } from '@mui/material'
import React from 'react'

export default function Activities() {
  return (
    <Container maxWidth="xl">
       <Typography sx={{fontSize:"56px", textAlign:"center", color:"black", fontWeight:"bold", mb:"15px", ml:'10px'}}>Nos <span style={{color:"#ffd328", }}> Activités</span> </Typography>
    </Container>
  )
}
