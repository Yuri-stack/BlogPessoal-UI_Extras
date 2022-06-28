import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import "./NavBar.css"

function NavBar() {
    return (
        <>
            <AppBar position="static" className='class-AppBar'>
                <Toolbar className='class-ToolBar'>
                    <Typography className='title' variant="h6">
                        Arcane
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar