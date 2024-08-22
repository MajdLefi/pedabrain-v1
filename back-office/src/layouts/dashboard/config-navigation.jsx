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
    title: 'seance',
    path: '/seance',
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
    title: 'parents',
    path: '/parents',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'kids',
  //   path: '/kids',
  //   icon: icon('ic_user'),
  // },
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
  {
    title: 'seance',
    path: '/seance',
    icon: icon('ic_lock'),
  },
]

// export default navConfig;
