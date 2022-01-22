import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';



export interface IAnimeProps {
    anime: {
        mal_id: number;
        title: string;
        image_url: string;
    }
}

export default function ListItem(props: IAnimeProps) {
  return (
    <Grid item xs={12} sm={6} md={3} key={props.anime.mal_id}>
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <Link to={`/search/${props.anime.mal_id}`}>
                <CardMedia
                component="img"
                height="240"
                image={props.anime.image_url}
                alt={props.anime.title}
                />
            </Link>
            <CardContent>
            <Typography variant="body2" color="text.secondary">
                {props.anime.title}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Grid>
  );
}
