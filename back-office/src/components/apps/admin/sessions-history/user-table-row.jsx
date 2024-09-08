import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchUserById } from 'src/store/reducers/userSlice'; // Adjust the import path as needed

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import Iconify from 'src/components/iconify';
import { Avatar, Box } from '@mui/material';
import EditKid from './modals/UpdateSession';
import { fetchKidById } from 'src/store/reducers/kidSlice';

// ----------------------------------------------------------------------

export default function UserTableRow({
  _id,
  selected,
  kidId,
  sessionDate,
  status,
  age,
  problem,
  token,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [kidFullName, setKidFullName] = useState('');
  const [kidGender, setGender] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; 
    const fetchKid = async () => {
      if (kidId) {
        try {
          const result = await dispatch(fetchKidById({ kidId: kidId, token }));

          if (fetchKidById.fulfilled.match(result)) {
            const kid = result.payload.data; // Adjust based on your response structure
            setKidFullName(`${kid.firstName} ${kid.lastName}`);
            setGender(`${kid.gender}`);
          } else {
            setKidFullName('Error loading name');
          }
        } catch (error) {
          // console.error('Error fetching kid data:', error.message);
          // setKidFullName('Error loading name');
        }
      }
    };

    fetchKid();
  }, [problem, dispatch, token]);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <Box sx={{ mr: '50px', ml: '10px', pt: '15px' }}>
          <TableCell component="th" scope="row" padding="none">
            <Stack direction="row" alignItems="center" spacing={2}>
              {kidGender === 'male' ? (
                <Avatar alt="avatar" src={`/assets/images/avatars/avatar_${2}.jpg`} />
              ) : (
                <Avatar alt="avatar" src={`/assets/images/avatars/avatar_${1}.jpg`} />
              )}
              {/* <Avatar alt="avatar" src={`/assets/images/avatars/avatar_${2}.jpg`} /> */}
            </Stack>
          </TableCell>
        </Box>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {kidFullName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{sessionDate}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{problem}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 190 },
        }}
      >
        <MenuItem>
          <EditKid
            _id={_id}
            kidId={kidId}
            sessionDate={sessionDate}
            age={age}
            status={status}
          />
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  _id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  kidId: PropTypes.string.isRequired,
  sessionDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  problem: PropTypes.string,
  token: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
