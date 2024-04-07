import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

function Album ({topAlbum}) {

    console.log(topAlbum)

    const navigate = useNavigate()

    const year = topAlbum.release_date.slice(0, 4)

    const handleGetIdAlbum = (id, name, date, url) => {
        navigate('/album/'+id, {state: {
            id: id,
            name: name,
            date: date,
            url: url
        }})
    }

    return (
        <>
        <Grid item xs={3} md={3} >
                    <Card sx={{maxWidth: 250}} 
                    onClick={() => 
                        handleGetIdAlbum(topAlbum.id, topAlbum.name, topAlbum.release_date, topAlbum.images[0].url)
                            }
                        >
                        <CardActionArea>
                            <CardContent>
                                <CardMedia
                                    sx={{height: 200, borderRadius: '50%', mb: 4}}
                                    image={topAlbum.images[0].url}
                                    title="green iguana"
                                />
                                <Typography noWrap gutterBottom variant="h6" component="div">
                                    {topAlbum.name} 
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {year} . {topAlbum.artists[0].name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
        </>
    )
}

export default Album