import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export const parentNavConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Enfants',
    path: '/parent/kids',
    icon: icon('ic_user'),
  },
  {
    title: 'Demande de consultation',
    path: '/parent/session-demand',
    icon: icon('ic_lock'),
  },
  {
    title: 'Historique de consultation',
    path: '/parent/sessions',
    icon: icon('ic_lock'),
  },
 
];

export const adminNavConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Parents',
    path: '/parents',
    icon: icon('ic_user'),
  },
  {
    title: 'Enfants',
    path: '/kids',
    icon: icon('ic_user'),
  },
  {
    title: 'Séances',
    path: '/sessions',
    icon: icon('ic_user'),
  },
  {
    title: 'Historique des séances',
    path: '/sessions-history',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'teachers',
  //   path: '/teachers',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'psychologists',
  //   path: '/psychologists',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'seance',
  //   path: '/seance',
  //   icon: icon('ic_lock'),
  // },
]

// export default navConfig;
