import { ReactElement } from 'react';
import { SvgIconComponent } from '@mui/icons-material';

export interface Navigation {
    label: string;
    path: string;
    icon?: SvgIconComponent; // Optional icon property

  }