import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { changeTrackCurrentInAlbum } from '../../redux/features/isPlayingSlice';
import { SpotifySevises } from '../../service/spotify.sevice';

import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';


function AlbumTracks () {

    const dispatch = useDispatch()
    const {state} = useLocation()
    console.log(state)
    const [isHoveredAddSingerId, setIsHoveredAddSingerId] = useState(-1)
    const [albumTracks, setAlbumTracks] = useState([])
    const [isHoveredPlay, setIsHoveredPlay] = useState(false)
    const [isHoveredMoreHoriz, setIsHoveredMoreHoriz] = useState(false)
    const [isHoveredAdd, setIsHoveredAdd] = useState(false)
    const [totalMinute, setTotalMinute] = useState()
    const [gradient, setGradient] = useState('')

    const year = state.date.slice(0, 4)

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

      const handleGetTrackCurrent = (trackInfo) => {
        // console.log(trackInfo)
        localStorage.setItem('idTrack', trackInfo.id)
        // console.log(trackInfo)
        dispatch(changeTrackCurrentInAlbum(trackInfo))
      }

      const ButtonListCustom = styled(Button)(({ theme }) => ({
        color: theme.palette.common.white
      }));

      const msToMinute = (total_ms) => {
        const minute = Math.floor((total_ms/(60*1000)))
        return `${minute} phút`
      }

      useEffect(() => {
        SpotifySevises.GetAlbumTracks(state.id)
        .then(res => {
            setAlbumTracks(res.data.items)
            // console.log(res.data.items)
            const totalTime = res.data.items.reduce((totalTime, track) => (totalTime + track.duration_ms), 0)
            console.log(totalTime)
            setTotalMinute(msToMinute(totalTime))
        })
        .catch()
        setGradient(getGradient())
      }, [])

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
        <Container
        sx={{background: gradient}}
        >
            <Grid container sx={{paddingTop: '40px'}}>
                <Grid item xs={3}>
                    <Card>
                        <CardMedia 
                        sx={{height: 260, borderRadius: 5}}
                        image={state.url}
                        />
                    </Card>
                </Grid>
                <Grid 
                item 
                xs={9}
                sx={{paddingLeft: "30px"}}
                >
                    <Typography variant="h6">Album</Typography>
                    <Typography variant="h1">{state.name}</Typography>
                    {albumTracks.length > 0 && <Typography variant="h6">{albumTracks[0].artists[0].name} . {year} . {totalMinute} </Typography>}
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
                {albumTracks.length > 0 && albumTracks.map((albumTrack, ind) => (
                    <TableRow
                    sx={{}}
                    onClick={() => handleGetTrackCurrent(albumTrack)}
                    hover
                    onMouseEnter={() => setIsHoveredAddSingerId(albumTrack.id)}
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
                                image={state.url}
                            />
                            <Box>
                                <Typography>{albumTrack.name}</Typography>
                                <Typography>{albumTrack.artists[0].name}</Typography>
                            </Box>
                        </Stack>
                        
                    </TableCell>
                    <TableCell 
                    align="left"
                    sx={{width: '25%'}}
                    >
                        {state.name}
                    </TableCell>
                    <TableCell 
                    align="center" 
                    sx={{width: '10%'}}
                    >
                        {state.date}
                    </TableCell>
                    <TableCell 
                    align="center" 
                    sx={{width: '15%'}} 
                    spacing={2}
                    >
                        <span hidden={albumTrack.id !== isHoveredAddSingerId}>
                            <TooltipCustom
                            title='Thêm vào Bài hát đã thích' 
                            placement="top">
                                <IconButton>
                                <AddIcon sx={{ fontSize: 16 }}/>
                                </IconButton>
                            </TooltipCustom>
                        </span>
                        {albumTrack.duration_ms}
                        <span hidden={albumTrack.id !== isHoveredAddSingerId}>
                            <TooltipCustom  
                            title={`Các tùy chọn khác cho ${albumTrack.name} của ${albumTrack.artists[0].name}`} 
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

export default AlbumTracks