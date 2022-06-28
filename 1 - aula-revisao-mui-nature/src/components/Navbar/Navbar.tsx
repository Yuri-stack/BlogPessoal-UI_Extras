import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Box } from '@mui/material'

import './Navbar.css'

function Navbar() {
    return (
        <>
            <AppBar position="static" className='back'>
                <Toolbar className='toolbar'>
                    <Typography className='title' variant="h6">
                        XPTO
                    </Typography>

                    <Box>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Typography className='title' variant="h6">
                                Home
                            </Typography>
                        </IconButton>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Typography className='title' variant="h6">
                                Sobre
                            </Typography>
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar