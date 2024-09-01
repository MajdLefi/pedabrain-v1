import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import KidCard from './KidCard';
import { Container, Grid } from '@mui/material';
import { fetchKidsByParent } from 'src/store/reducers/kidSlice';
import AddKid from 'src/components/parent/modals/AddKid';

export default function kids() {
  const dispatch = useDispatch();
  const kids = useSelector((state) => state.kidSlice.kids?.data || []);
  const user = useSelector((state) => state.authSlice.user);
  const token = user?.token;

  useEffect(() => {
    if (user && user.token) {
      dispatch(fetchKidsByParent({ parentId: user.id, token }));
    }
  }, [dispatch, user]);
  console.log(kids);

  return (
    <Container sx={{}}>
      <AddKid />
      <Grid container spacing={2}>
        {kids.map((kid, index) => (
          <Grid key={kid._id || index} xs={12} md={3} item>
            <KidCard kid={kid} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
