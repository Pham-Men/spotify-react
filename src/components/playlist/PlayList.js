import  React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { changeTrackCurrent } from '../../redux/features/isPlayingSlice';
import { Logo } from '../../layouts/Shares/Logo/Logo';
import { SpotifySevises } from '../../service/spotify.sevice';


function PlayList () {

    const [isHoveredPlay, setIsHoveredPlay] = useState(false)
    const [isHoveredMoreHoriz, setIsHoveredMoreHoriz] = useState(false)
    const [isHoveredAdd, setIsHoveredAdd] = useState(false)
    const [topTracks, setTopTracks] = useState([])
    const [isHoveredAddSingerId, setIsHoveredAddSingerId] = useState(-1)
    const [artistName, setArtistName] = useState('')
    const [totalTimeHour, setTotalTimehour] = useState('')
    const [totalTrack, setTotalTrack] = useState('')
    const [popularity, setPopularity] = useState('')
    const [gradient, setGradient] = useState('')

    const {state} = useLocation()
    const dispatch = useDispatch()

    const TooltipCustom = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.black,
          color: 'white',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }));

      const ButtonListCustom = styled(Button)(({ theme }) => ({
        color: theme.palette.common.white
      }));

      const msToHour = (total_ms) => {
        const hour = Math.floor(total_ms/(60*60*1000))
        const minute = Math.floor((total_ms%(60*60*1000))/(60*1000))
        return `${hour} giờ ${minute} phút`
      }

      useEffect(()=> {
        SpotifySevises.getTopTracksOfArtistById(state.id).then(res => {
            setTopTracks(res.data.tracks)
            // console.log(res.data.tracks)
            setArtistName(res.data.tracks[0].artists[0].name)
            const duration_ms = res.data.tracks.reduce((total, track) => (
                total + track.duration_ms
            ), 0)
            const popularity = res.data.tracks.reduce((totalPopularity, track) => (
                totalPopularity + track.popularity
            ), 0)
            setTotalTimehour(msToHour(duration_ms))
            setTotalTrack(res.data.tracks.length)
            setPopularity(popularity)
        }).catch()
        setGradient(getGradient())
      }, [])



      const handleGetTrackCurrent = (trackInfo) => {
        // console.log(trackInfo)
        localStorage.setItem('idTrack', trackInfo.id)
        dispatch(changeTrackCurrent(trackInfo))
      }

      const getGradient = () => {
        const gradientArr = [
            'linear-gradient(45deg, green 30%, blue 90%)',
            'linear-gradient(45deg, red 30%, pink 90%)',
            'linear-gradient(45deg, orange 30%, red 90%)',
            'linear-gradient(45deg, green 30%, white 90%)',
            'linear-gradient(45deg, yellow 30%, blue 90%)',
            'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
          ]
          const gradientInd =  Math.floor(Math.random() * gradientArr.length);
        return gradientArr[gradientInd]
      }

      


    return (
        <>
        <Container sx={{paddingBottom: '100px', background: gradient}}>
            <Grid container spacing={2} pt={5}>
                    <Grid item xs={3}>
                        <Card>
                            <CardMedia 
                            sx={{height: 260, borderRadius: 5}}
                            image={state.img}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={9}>
                        <Box>
                            <Typography variant="subtitle1" >
                                Playlist
                            </Typography>
                            <Typography variant="h1">
                                {state.name}
                            </Typography>
                            {topTracks.length > 0 &&
                                <Typography variant="subtitle1" gutterBottom>
                                    Với {artistName} và nhiều hơn nữa
                                </Typography>
                            }
                            <Stack direction='row' spacing={2}>
                                <Stack direction='row'>
                                    <Logo color='green' />
                                    <Link
                                    sx={{
                                        color: 'white', textDecorationLine: 'none',
                                    }}
                                    >
                                        Spotify
                                    </Link>
                                </Stack>
                                <Typography>
                                    {popularity} lượt thích
                                </Typography>
                                <Typography>
                                    {totalTrack} bài hát, khoảng {totalTimeHour}
                                </Typography>
                                
                            </Stack>
                        </Box>
                    </Grid>
            </Grid>
            
            <Stack direction='row' sx={{display: 'flex', justifyContent: 'space-between'}} >
                <Stack direction='row'>
                    <IconButton
                    sx={{
                        transform: isHoveredPlay ? 'scale(1.2)' : 'scale(1)',
                    }} 
                    color="success" 
                    fontSize="large" 
                    onMouseEnter={() => setIsHoveredPlay(true)} 
                    onMouseLeave={() => setIsHoveredPlay(false)}
                    >
                        <PlayCircleOutlineIcon sx={{fontSize: 60}}/>
                    </IconButton>
                    <TooltipCustom title='Lưu vào Thư viện' placement="top">
                        <IconButton
                        sx={{transform: isHoveredAdd ? 'scale(1.2)' : 'scale(1)'}} 
                        onMouseEnter={() => setIsHoveredAdd(true)} 
                        onMouseLeave={() => setIsHoveredAdd(false)}
                        >
                            <AddIcon />
                        </IconButton>
                    </TooltipCustom>
                    <TooltipCustom title='Các tùy chọn khác cho Taylor Swift Radio' placement="top">
                        <IconButton
                        sx={{transform: isHoveredMoreHoriz ? 'scale(1.2)' : 'scale(1)'}} 
                        onMouseEnter={() => setIsHoveredMoreHoriz(true)} 
                        onMouseLeave={() => setIsHoveredMoreHoriz(false)}
                        >
                            <MoreHorizIcon/>
                        </IconButton>
                    </TooltipCustom>
                </Stack>
                <Stack>
                    <ButtonListCustom  
                    endIcon={<ListIcon />}
                    >
                        Danh sách
                    </ButtonListCustom>
                </Stack>
            </Stack>

            <TableContainer sx={{width: '100%'}}>
                <Table sx={{width: '100%'}}>
                <TableHead>
                <TableRow
                sx={{}}
                >
                    <TableCell sx={{width: '10%'}} align="left">#</TableCell>
                    <TableCell sx={{width: '30%'}} align="left">Tên bài hát</TableCell>
                    <TableCell sx={{width: '25%'}} align="left">Album</TableCell>
                    <TableCell sx={{width: '10%'}} align="left">Ngày thêm</TableCell>
                    <TableCell sx={{width: '15%'}} align="center">Thời lượng</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {topTracks.length > 0 && topTracks.map((topTrack, ind) => (
                    <TableRow
                    sx={{}}
                    onClick={() => handleGetTrackCurrent(topTrack)}
                    hover
                    onMouseEnter={() => setIsHoveredAddSingerId(topTrack.id)}
                    onMouseLeave ={() =>setIsHoveredAddSingerId(-1)}
                    key={ind}

                    >
                    <TableCell sx={{width: '10%'}}>{ind}</TableCell>
                    <TableCell 
                    align="left" 
                    sx={{width: '30%'}}>
                        <Stack direction='row'>
                        <CardMedia
                            sx={{height: 40, width: 40, marginRight: 4}}
                            image={topTrack.album.images[0].url}
                        />
                        <Box>
                            <Typography>{topTrack.name}</Typography>
                            <Typography>{topTrack.artists[0].name}</Typography>
                        </Box>
                        </Stack>
                        
                    </TableCell>
                    <TableCell 
                    align="left"
                    sx={{width: '25%'}}
                    >
                        {topTrack.album.name}
                    </TableCell>
                    <TableCell 
                    align="center" 
                    sx={{width: '10%'}}
                    >
                        {topTrack.album.release_date}
                    </TableCell>
                    <TableCell 
                    align="center" 
                    sx={{width: '15%'}} 
                    spacing={2}
                    >
                        <span hidden={topTrack.id !== isHoveredAddSingerId}>
                            <TooltipCustom
                            title='Thêm vào Bài hát đã thích' 
                            placement="top">
                                <IconButton>
                                <AddIcon sx={{ fontSize: 16 }}/>
                                </IconButton>
                            </TooltipCustom>
                        </span>
                        {topTrack.duration_ms}
                        <span hidden={topTrack.id !== isHoveredAddSingerId}>
                            <TooltipCustom  
                            title={`Các tùy chọn khác cho ${topTrack.name} của ${topTrack.artists[0].name}`} 
                            placement="top-end">
                                <IconButton>
                                    <MoreHorizIcon sx={{ fontSize: 16 }}/>
                                </IconButton>
                            </TooltipCustom>
                        </span>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
         </Container>
        </>
    )
}

export default PlayList