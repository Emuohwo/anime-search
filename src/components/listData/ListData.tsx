import  "./listData.css";
import React, { useCallback, useEffect, useState } from 'react'
import { Container, Grid,  TablePagination } from "@material-ui/core";
import { LinearProgress } from '@material-ui/core';
import ListItem from './ListItem';
import axios from 'axios';
const { useDebounce } =  require("use-lodash-debounce")


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },
//   appBarSpacer: {
//     minHeight: theme.spacing(13),
//     [theme.breakpoints.up("sm")]: {
//       minHeight: theme.spacing(14),
//     },
//   },
//   content: {
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto",
//   },
//   container: {
//     minHeight: "77vh",
//     paddingTop: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//     [theme.breakpoints.up("sm")]: {
//       paddingTop: theme.spacing(4),
//       padding: theme.spacing(4),
//     },
//   },
// }));

export interface anime {
  mal_id: number;
  image_url: string;
  title: string;
}


const ListData = () => {
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('air')
    const [searchResult, setSearchResult] = useState([]);

    const debouncedValue = useDebounce(searchText, 2500);
    // 
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const getSearchResults = async () => {
        try {
            const {data: { results }} = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${searchText}&page=${page}`);
            setLoading(false)
            setSearchResult(results)
            console.log('hey result')
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(()=> {
        getSearchResults()
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
