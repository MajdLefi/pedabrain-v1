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
import EditKid from './modals/EditKid';

// ----------------------------------------------------------------------

export default function UserTableRow({
  _id,
  selected,
  firstName,
  lastName,
  gender,
  age,
  parentId,
  token,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [parentFullName, setParentFullName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; 
    const fetchParent = async () => {
      if (parentId) {
        try {
          const result = await dispatch(fetchUserById({ userId: parentId, token }));

          if (fetchUserById.fulfilled.match(result)) {
            const parent = result.payload.data; // Adjust based on your response structure
            setParentFullName(`${parent.firstName} ${parent.lastName}`);
          } else {
            setParentFullName('Error loading name');
          }
        } catch (error) {
          // console.error('Error fetching parent data:', error.message);
          // setParentFullName('Error loading name');
        }
      }
    };

    fetchParent();
  }, [parentId, dispatch, token]);

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
              {gender === 'male' ? (
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
              {firstName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{lastName}</TableCell>
        <TableCell>{age}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{parentFullName}</TableCell>

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
            firstName={firstName}
            lastName={lastName}
            age={age}
            gender={gender}
          />
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  _id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  parentId: PropTypes.string,
  token: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
