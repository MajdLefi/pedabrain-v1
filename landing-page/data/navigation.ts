import { Navigation } from '@/interfaces/navigation';
import HomeIcon from '@mui/icons-material/Home';
import ProductsIcon from '@mui/icons-material/ProductionQuantityLimits'; // Example icon
import ContactIcon from '@mui/icons-material/ContactMail';

export const navigations: Navigation[] = [
  {
    label: 'Acceuil',
    path: '/',
    icon: HomeIcon,
  },
  {
    label: 'À propos de nous',
    path: '/contact-us',
    icon: ProductsIcon,
  },
  {
    label: 'Contact',
    path: '/contact-us',
    icon: ContactIcon,
  },
];
export const footerMenuOne: Navigation[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Engagement',
    path: '/engagement',
  },
  {
    label: 'Sources',
    path: '/sources',
  },
  {
    label: 'Contact',
    path: '/contact',
  }
]

export const footerMenuTwo: Navigation[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Engagement',
    path: '/engagement',
  },
  {
    label: 'Sources',
    path: '/sources',
  },
  {
    label: 'Contact',
    path: '/contact',
  }
]

export const footerMenuThree: Navigation[] = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Engagement',
    path: '/engagement',
  },
  {
    label: 'Sources',
    path: '/sources',
  },
  {
    label: 'Contact',
    path: '/contact',
  }
]
