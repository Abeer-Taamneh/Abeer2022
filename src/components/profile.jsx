import React, { useState, useEffect } from 'react';
import registerdUsersService from "../service/registerdUsersService"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//===========================================================================================================================
function Profile({ user }) {
    const [profile, setProfile] = useState({})

    console.log('user_from profile page', user)
    const [publishednameen, setPublishednameen] = useState("")
    const [publishednamear, setPublishednamear] = useState("")
    const [logo, setLogo] = useState("")
    useEffect(() => {
        update()
    }, [user])
    const update = async () => {
        const _profile = await registerdUsersService.getUserProfile(user)
        if (!_profile) return;

        setPublishednameen(_profile.publishednameen);
        setPublishednamear(_profile.publishednamear);
        setLogo(_profile.logo);

        setProfile(_profile)
        // setLogo(brand.logo);


    }

    return (
        <div style={{ marginTop: "100px" }}>
            {(user && (user.authorization == 'user')) &&
                <div className='container' >
                    <div className='row'>
                        <div className='col'>
                            <img src={logo} width={100} height={100} alt={logo} />
                        </div>
                        <div className='col'>
                            <Box
                                sx={{
                                    width: 500,
                                    maxWidth: "100%",
                                    marginBottom: "5%",
                                }}
                            >
                                <TextField fullWidth label={"published name English"} variant="outlined" onChange={(e) => setPublishednameen(e.target.value)} value={publishednameen} />
                            </Box>
                            <Box
                                sx={{
                                    width: 500,
                                    maxWidth: "100%",
                                    marginBottom: "5%",
                                }}
                            >
                                <TextField fullWidth label={"published name Arabic"} variant="outlined" onChange={(e) => setPublishednamear(e.target.value)} value={publishednamear} />
                            </Box>
                            <Box
                                sx={{
                                    width: 500,
                                    maxWidth: "100%",
                                    marginBottom: "5%",
                                }}
                            >
                                <TextField fullWidth label={"Logo"} variant="outlined" onChange={(e) => setLogo(e.target.value)} value={logo} />
                            </Box>
                            <Button variant="contained" onClick={async () => {
                                const _newProfile = { ...profile }
                                _newProfile.publishednameen = publishednameen;
                                _newProfile.publishednamear = publishednamear;
                                _newProfile.logo = logo;
                                console.log(_newProfile);
                                await registerdUsersService._save(_newProfile);
                                await update();
                            }}>Save</Button>

                        </div>
                    </div>
                </div>
            }
            {(user && (user.authorization != 'user')) &&
                <div>
                    Unregistered user
                </div>}
        </div>
    );
}

export default Profile;



