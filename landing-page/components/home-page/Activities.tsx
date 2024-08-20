import { Box, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function Activities() {
  return (
    <Container maxWidth="xl" >
       <Typography sx={{fontSize:"56px", textAlign:"center", color:"black", fontWeight:"bold", mb:"15px", ml:'10px'}}>Nos <span style={{color:"#ffd328", }}> Activités</span> </Typography>
        <Grid container>
        <Grid item md={2} xs={6}>
          <Box sx={{ height:{xs:"250px", md:"320px"}, padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/girl.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Compétitions</Typography>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box sx={{height:{xs:"250px", md:"320px"},padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/bricolage.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Bricolage</Typography>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box sx={{ height:{xs:"250px", md:"320px"},padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/ecriture.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Ateliers d'écriture</Typography>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box sx={{ height:{xs:"250px", md:"320px"},padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/dessin.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Dessin</Typography>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box sx={{ height:{xs:"250px", md:"320px"},padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/stimulation.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Stimulation sensorielle</Typography>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box sx={{ height:{xs:"250px", md:"320px"},padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/construction.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Activité de construction</Typography>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box sx={{ height:{xs:"250px", md:"320px"},padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/lettres.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Apprentissage des lettres</Typography>
          </Box>
        </Grid>
        <Grid item md={2} xs={6}>
          <Box sx={{ height:{xs:"250px", md:"320px"},padding: '3rem 2rem', textAlign: 'center', boxShadow: 'var(--box-shadow)', borderRadius: '2rem', outline: '.1rem solid rgba(0, 0, 0, .1)', outlineOffset: '-1rem',}}>
            <Box>
              <Image src="/assets/activities/chiffres.png" width={200} height={250} alt="character-about-us" />
            </Box>
            <Typography sx={{fontWeight:"bold"}}>Apprentissage des chiffres</Typography>
          </Box>
        </Grid>
        </Grid>
    </Container>
  )
}
