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
import EditKid from './modals/CreateTest';
import { fetchKidById } from 'src/store/reducers/kidSlice';
import EditStatus from './modals/EditStatus';
import Label from 'src/components/label';
import EditSession from './modals/EditSession';
import CreateTest from './modals/CreateTest';
import TestDetails from './modals/TestDetails';

// ----------------------------------------------------------------------

export default function UserTableRow({
  _id,
  selected,
  kidId,
  sessionDate,
  status,
  testSkills,
  testObservations,
  sessionPlan,
  problem,
  doctor,
  token,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [kidFullName, setKidFullName] = useState('');
  const [kidGender, setGender] = useState('');

  const dispatch = useDispatch();
  console.log(token);

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
        {/* <TableCell>{status}</TableCell> */}
        <TableCell>
          <Label
            color={
              (status === 'accepted' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'rejected' && 'error') ||
              'default' // Fallback for other statuses
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell sx={{}}>
          <TestDetails
            _id={_id}
            problem={problem}
            kidFullName = {kidFullName}
            testSkills={testSkills}
            testObservations={testObservations}
            sessionPlan={sessionPlan}
          />
        </TableCell>
        <TableCell sx={{}}>
          {' '}
          {doctor ? (
            doctor
          ) : (
            <Typography color="textSecondary" display="flex" alignItems="center">
              <Iconify icon="eva:close-circle-fill" sx={{ marginRight: 1 }} />
              Non assigné
            </Typography>
          )}
        </TableCell>

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
          <EditSession
            _id={_id}
            status={status}
            kidId={kidId}
            sessionDate={sessionDate}
            problem={problem}
            doctor={doctor}
          />
        </MenuItem>
        <MenuItem>
          <EditStatus _id={_id} status={status} />
        </MenuItem>
        <MenuItem>
          <CreateTest _id={_id} token={token} status={status} />
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
  testSkills: PropTypes.string,
  testObservations: PropTypes.string,
  sessionPlan: PropTypes.string,
  doctor: PropTypes.string,
  token: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
