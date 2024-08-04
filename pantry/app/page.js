'use client'

import {Box, Modal, Typography, Stack, TextField, Button, IconButton, AppBar, Toolbar, Card} from '@mui/material'
import { FaCubesStacked } from "react-icons/fa6";
import * as React from 'react';



export default function LandingPage()
{
    return(
        <>
            <Box width="100vw" height="100vh" display="flex"  alignItems="center" gap={2} flexDirection="column">
                <AppBar position="sticky" width="100%" top>
                    <Toolbar>
                        <FaCubesStacked size={30} style={{marginRight: "5px !important"}}/>
                        <Typography variant="h4" component="div" sx={{flexGrow: .35}}>Pantry Tracker</Typography>
                        <Stack direction="row" spacing = {2} display="flex" justifyContent="center" alignItems="center" sx={{transform: "translate(10%, 0%)"}}>
                            <Button variant=""  href="/"><Typography variant="h5">Home</Typography></Button>
                            <Button variant=""  href="/tracker"><Typography variant="h5">Tracker</Typography></Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Box display="flex"  alignItems="center" gap={2} flexDirection="column">
                    <Typography variant="h2" sx={{fontWeight: "bold"}}>Welcome to Pantry Tracker!!</Typography>
                    <Stack direction="row" spacing={5} width="100%" height="100%" marginTop="75px" display="flex" justifyContent={"center"} alignItems="center">
                        <Card sx={{marginLeft: "10px !important", width:"80% !important", height: "40vh", boxShadow: 5}} overflow="auto" > 
                            <Typography variant="h4" sx={{fontWeight: "bold"}}>What Is It?</Typography>
                            <Typography variant="h6">
                            A pantry management app that efficiently handles your inventory. 
                            Add or remove items easily using the text field or buttons, and use the camera feature to automatically add items based on your photos.
                            </Typography>

                        </Card>
                        <Card sx={{width:"80% !important", height: "40vh", boxShadow: 5}} overflow="auto">
                            <Typography variant="h4" sx={{fontWeight: "bold"}}>Resources Used?</Typography>
                            <Typography variant="h6">
                            This application is built with Next.js, MUI (Material-UI), and HTML. It uses Firebase for data storage and OpenAI for object recognition
                            </Typography>
                        </Card>
                        <Card sx={{marginRight: "10px !important", width:"80% !important", height: "40vh", boxShadow: 5}} overflow="auto">
                            <Typography variant="h4" sx={{fontWeight: "bold"}}>Where To Find The Code?</Typography>
                            <Typography variant="h6">
                                The source code for this project can be found in my Github Repository: <br></br>
                                <a href="https://github.com/JeremiahD9/Pantry-Tracker/blob/main/README.md" target="_blank" rel="noopener noreferrer">
                                    https://github.com/JeremiahD9/Pantry-Tracker/blob/main/README.md
                                </a>
                            </Typography>
                        </Card>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}