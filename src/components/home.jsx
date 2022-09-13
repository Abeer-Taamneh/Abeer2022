import React, { useState, useEffect } from "react";
import registerdUsersService from "../service/registerdUsersService";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
function UserCard({user}){
    return(
        <div >
        <div className="col-4">
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={user.logo}
              alt=""
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.publishednameen}
              </Typography>
              <Typography variant="body2" color="text.secondary">
               
                {user.contactinfoen}
              </Typography>
            </CardContent>
          </Card>
        </div>
     
    </div>
    )
}

export default function Home({ user }) {
  const [users, setusers] = useState([]);

  console.log("samah user", user);
  useEffect(() => {
    update();
  }, [user]);
  const update = async () => {
    const _users = await registerdUsersService._get(user);
    setusers(_users);
  };
  return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
        <Box container spacing={3}>
            {users.map((e) => (<UserCard user={e}/>))}
            </Box>
          </Box>
        </div>
     
  );
}
