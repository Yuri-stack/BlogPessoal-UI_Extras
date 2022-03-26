import React from 'react'
import { Grid } from '@material-ui/core'
import CarouselComponent from '../../components/Carousel/CarouselComponent'
import Lista from '../../components/Lista/Lista'

import "./Home.css"

function Home() {
  return (
    <Grid container className='grid-home'>
      <Grid item xs={12}>
        {/* <Lista /> */}
        <CarouselComponent />
      </Grid>
    </Grid>
  )
}

export default Home