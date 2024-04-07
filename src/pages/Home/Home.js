import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Singer} from "../../components/Singer/Singer";
import * as React from "react";
import { useEffect } from "react";
import { SpotifySevises } from "../../service/spotify.sevice";
import { useState } from "react";

import './Home.css'
import { changeTrackCurrent } from "../../redux/features/isPlayingSlice";

import { useDispatch } from "react-redux";
import Album from "../../components/Album/Album";

function Home() {

    const[topArtists, setTopArtists] = useState([]);
    const[topAlbums, setTopAlbums] = useState([]);

    const dispatch = useDispatch()

    useEffect(()=> {
        SpotifySevises.getTopArtists(4).then(res => {
            setTopArtists(res.data.artists.items)
        }).catch(err => {
            setTopArtists([])
        })
        const id = localStorage.getItem('idTrack')
        if(id) {
            SpotifySevises.getTrackById(id)
            .then(res => {
                // console.log(res.data)
                dispatch(changeTrackCurrent(res.data))
            })
        }
        SpotifySevises.getTopAlbum(4)
        .then(res => {
            setTopAlbums(res.data.albums.items)
        })
    }, [])

    const handleShowAllArtist = () => {
        SpotifySevises.getTopArtists()
        .then(res => {setTopArtists(res.data.artists.items)
        }).catch(
            setTopArtists([])
        )
    }

    const handleShowAllAlbum = () => {
        SpotifySevises.getTopAlbum()
        .then(res => {
            setTopAlbums(res.data.albums.items)
        })
    }

    console.log(topAlbums)

    return (
        <>
            <Box container>
                <Box item>
                    <Grid item xs={12} md={12} lg={12} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px'
                    }}>
                        <Typography sx={{fontSize: 'h5.fontSize'}}>
                            Nghệ sĩ phổ biến
                        </Typography>
                        <p
                        className='showAll'
                        onClick={handleShowAllArtist}>
                            Hiển thị tất cả
                        </p>
                    </Grid>
                    <Grid container sx={{marginTop: '3px'}} spacing={2} xs={12} md={12} lg={12}>
                    {topArtists.length > 0 && topArtists.map(topArtist => (
                        <>
                            <Singer topArtist={topArtist}/>

                        </>
                    ))}
                    </Grid>
                </Box>
                
                <Box item>
                <Grid item xs={12} md={12} lg={12} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px'
                    }}>
                        <Typography sx={{fontSize: 'h5.fontSize'}}>
                            Album
                        </Typography>
                        <p
                        className='showAll'
                        onClick={handleShowAllAlbum}>
                            Hiển thị tất cả
                        </p>
                    </Grid>
                    <Grid container sx={{marginTop: '3px'}} spacing={2} xs={12} md={12} lg={12}>
                    {topAlbums.length > 0 && topAlbums.map(topAlbum => (
                        <>
                            <Album topAlbum={topAlbum}/>

                        </>
                    ))}
                    </Grid>
                </Box>
            </Box>
            
        </>
    )
}

export default Home;