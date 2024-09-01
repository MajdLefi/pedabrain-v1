import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from 'src/layouts/dashboard';

// Lazy load your pages
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ParentsPage = lazy(() => import('src/pages/users/parents'));
export const KidsPage = lazy(() => import('src/pages/users/kids'));
export const ParentKidsPage = lazy(() => import('src/pages/users/parent/kids/kidsList'));
export const TeachersPage = lazy(() => import('src/pages/users/teachers'));
export const PsychologistsPage = lazy(() => import('src/pages/users/psychologists'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// Function to check if the user is authenticated
function isAuthenticated() {
  // Check if there's a valid token in localStorage
  return !!localStorage.getItem('user');
}

// ProtectedRoute component
function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

// Router component
export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'parents', element: <ProtectedRoute element={<ParentsPage />} /> },
        { path: 'kids', element: <ProtectedRoute element={<KidsPage />} /> },
        { path: '/parent/kids', element: <ProtectedRoute element={<ParentKidsPage />} /> },
        { path: 'teachers', element: <ProtectedRoute element={<TeachersPage />} /> },
        { path: 'psychologists', element: <ProtectedRoute element={<PsychologistsPage />} /> },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated() ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: 'register',
      element: isAuthenticated() ? <Navigate to="/" /> : <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
