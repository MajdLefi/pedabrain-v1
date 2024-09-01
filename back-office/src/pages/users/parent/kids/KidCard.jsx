import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function KidCard(props) {
  const { _id, firstName, lastName, age, gender } = props.kid;
  console.log(_id);
  console.log(_id);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ height: 140, pt:'50px', pl:'100px' }}>
        {gender === 'male' ? (
          <Avatar sx={{width:'80px', height:'80px'}} alt="avatar" src={`/assets/images/avatars/avatar_${2}.jpg`} />
        ) : (
          <Avatar sx={{width:'80px', height:'80px'}} alt="avatar" src={`/assets/images/avatars/avatar_${1}.jpg`} />
        )}
      </Box>

      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
