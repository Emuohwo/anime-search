import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Grid, CardMedia, Typography, LinearProgress } from "@material-ui/core";
import "./animeById.css";
import Header from '../header/Header';


function AnimeById() {
    const initialAnimeState = {
        title: '',
        image_url: '',
        synopsis: '',
        popularity: '',
        members: '',
    }
    const {id } = useParams()
    const [animeDetails, setAnimeDetails] = useState(initialAnimeState);
    const [isLoading, setIsLoading] = useState(true)

    const getAnimeDetails = async () => {
        try {
            const {data} = await axios.get(`https://api.jikan.moe/v3/anime/${id}`)
            setAnimeDetails(data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            
        }
    }
    
    useEffect(() => {
        getAnimeDetails()
    }, [id]);


    if (isLoading) return <LinearProgress />
    
    
    return (
        <div>
            <Header />
            <Container>
                <Grid container spacing={3}>
                    <Grid item md={3}>
                        {/* <Card xs={{ maxWidth: 345 }}>
                            
                        </Card> */}
                        <CardMedia
                          component="img"
                          height="240"
                          image={animeDetails.image_url}
                          alt={animeDetails.title}
                        />
                    </Grid>
                    <Grid item md={8}>
                        <Typography variant='h4' style={{ marginBottom: 18}}>Synopsis</Typography>
                        <Typography variant='body2' style={{ marginBottom: 18}}>
                            {animeDetails.synopsis}
                        </Typography>
                        <div className='metric-wrapper' style={{ textAlign: 'center'}}>
                            <div  className='metric users'>
                                <Typography variant='body1'>#285</Typography>
                                <Typography variant='body2'>users</Typography>
                            </div>
                            <div  className='metric shared'>
                                <Typography variant='body1'>#285</Typography>
                                <Typography variant='body2'>shared</Typography>
                            </div>
                            <div  className='metric popularity'>
                                <Typography variant='body1'>#{animeDetails.popularity}</Typography>
                                <Typography variant='body2'>Popularity</Typography>
                            </div>
                            <div  className='metric members'>
                                <Typography variant='body1'>#{animeDetails.members}</Typography>
                                <Typography variant='body2'>members</Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <a href="/" className='goBack'>
                            <span>Back</span>
                        </a>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default AnimeById
