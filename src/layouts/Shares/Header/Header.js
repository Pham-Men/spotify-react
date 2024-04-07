import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";

import "./Header.css"

function Header () {

    return (
        <>
        <Grid container spacing={2} sx={{marginTop: '40px', marginBottom: '40px'}}>
            <Grid item xs={3}>
                <Box sx={{paddingBottom: '12px', fontSize: '18px'}}>Công ty</Box>
                <Box sx={{paddingBottom: '12px'}}><Link href="#" color="inherit" underline="hover">Giới thiệu</Link></Box>
                <Box sx={{paddingBottom: '12px'}}><Link href="#" color="inherit" underline="hover">Việc làm</Link></Box>
                <Box sx={{paddingBottom: '12px'}}><Link href="#" color="inherit" underline="hover">For the Record</Link></Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{paddingBottom: '12px', fontSize: '18px'}}>Cộng đồng</Box>
                <Box sx={{paddingBottom: '12px'}}><Link href='#' color="inherit" underline="hover">Dành cho các nghệ sĩ</Link></Box>
                <Box sx={{paddingBottom: '12px'}}><Link href='#' color="inherit" underline="hover">Nhà phát triển</Link></Box>
                <Box sx={{paddingBottom: '12px'}}><Link href='#' color="inherit" underline="hover">Quảng cáo</Link></Box>
                <Box sx={{paddingBottom: '12px'}}><Link href='#' color="inherit" underline="hover">Nhà đầu tư</Link></Box>
                <Box sx={{paddingBottom: '12px'}}><Link href='#' color="inherit" underline="hover">Nhà cung cấp</Link></Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{paddingBottom: '12px', fontSize: '18px'}}>Liên kết hữu ích</Box>
                <Box sx={{paddingBottom: '12px'}}><Link href='#' color="inherit" underline="hover">Hỗ trợ</Link></Box>
                <Box sx={{paddingBottom: '12px'}}><Link href='#' color="inherit" underline="hover">Ứng dụng Di động Miễn phí</Link></Box>
            </Grid>
            <Grid item xs={3}>
                <IconButton>
                    <InstagramIcon/>
                </IconButton>
                <IconButton>
                    <TwitterIcon/>
                </IconButton>
                <IconButton>
                    <FacebookIcon/>
                </IconButton>
            </Grid>
        </Grid>
        <hr/>
        <Box sx={{marginBottom: '60px', marginTop: '60px'}}>
            <Link
            sx={{marginRight: '20px'}}
            underline="none"
            >
                Pháp lý
            </Link>
            <Link
            sx={{marginRight: '20px'}}
            underline="none"
            >
                Trung tâm an toàn và quyền riêng tư
            </Link>
            <Link
            sx={{marginRight: '20px'}}
            underline="none"
            >
                Chính sách quyền riêng tư
            </Link>
            <Link
            sx={{marginRight: '20px'}}
            underline="none"
            >
                Cookie
            </Link>
            <Link
            sx={{marginRight: '20px'}}
            underline="none"
            >
                Giới thiệu Quảng cáo
            </Link>
            <Link
            sx={{marginRight: '20px'}}
            underline="none"
            >
                Hỗ trợ tiếp cận
            </Link>
        </Box>

        </>
    )
}

export default Header