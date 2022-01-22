import  "./listData.css";
import React, { useEffect, useState } from 'react'
import { Container, Grid } from "@material-ui/core";
import { LinearProgress } from '@material-ui/core';
import ListItem from './ListItem';
import axios from 'axios';
const { useDebounce } =  require("use-lodash-debounce")




export interface anime {
  mal_id: number;
  image_url: string;
  title: string;
}


const ListData = () => {
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState<string>('air')
    const [searchResult, setSearchResult] = useState([]);

    const debouncedValue = useDebounce(searchText, 2500);
    // 
    console.log('debouncedValue', debouncedValue);

    

    const getSearchResults = async () => {
        try {
            const {data: { results }} = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${searchText}`);
            setLoading(false)
            setSearchResult(results)
            console.log('hey result')
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(()=> {
        getSearchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue])

   
    if (loading) return <LinearProgress />

    return (
        <main>
            <Container>
              <div className="searchInputWrapper">
                <input 
                  type="text" 
                  value={searchText}
                  placeholder="Search for anime eg. naruto"
                  onChange={(e) => setSearchText(e.target.value)} 
                />
              </div>
                <Grid container spacing={3} >
                    {
                      loading 
                      ? <h1>LOADING...</h1>
                      : searchResult?.map((anime) => <ListItem  anime={anime} />)
                    }
                </Grid>
            </Container>
        </main>
    )
}

export default ListData
