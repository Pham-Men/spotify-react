import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Singer({topArtist}) {

    const [artist, setArtist] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        if(topArtist.images){
            setArtist(topArtist.images[0])
        }
    }, [])

    const handleGetIdArtist = (id, url, name) => {
        navigate('/playlist/' + id, { state: 
            { 
                id: id,
                img: url,
                name: name
            } })
    }

    return (
        <>
            {artist && (
                <Grid item xs={3} md={3} >
                    <Card sx={{maxWidth: 250}} 
                    onClick={() => 
                        handleGetIdArtist(topArtist.id, topArtist.images[0].url, topArtist.name)
                            }
                        >
                        <CardActionArea>
                            <CardContent>
                                <CardMedia
                                    sx={{height: 200, borderRadius: '10px', mb: 4}}
                                    image={artist.url}
                                    title="green iguana"
                                />
                                <Typography gutterBottom variant="h6" component="div">
                                    {topArtist.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Nghệ sĩ
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>)}
            </>
    )
}