import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import EditParent from './modals/EditParent';
import EditStatus from './modals/EditStatus';
import ChangePassword from './modals/ChangePassword';
import KidDetails from './modals/KIdDetails';

// ----------------------------------------------------------------------

export default function UserTableRow({
  _id,
  selected,
  firstName,
  lastName,
  phone,
  email,
  gender,
  location,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  console.log(_id);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            <Typography variant="subtitle2" noWrap>
              {firstName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{lastName}</TableCell>

        <TableCell>{phone}</TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{location}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>
          <KidDetails />
        </TableCell>

        {/* <TableCell>{role}</TableCell> */}

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
          <EditParent
            _id={_id}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            location={location}
            gender={gender}
          />
        </MenuItem>

        <MenuItem>
          <EditStatus _id={_id} status={status} />
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          {/* <Iconify icon="eva:trash-2-outline" sx={{ mr:0.5 }} /> */}
          <ChangePassword />
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  firstName: PropTypes.any,
  lastName: PropTypes.any,
  email: PropTypes.any,
  phone: PropTypes.any,
  location: PropTypes.any,
  role: PropTypes.any,
  status: PropTypes.string,
  selected: PropTypes.any,
  handleClick: PropTypes.func,
};
