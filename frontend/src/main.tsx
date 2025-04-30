import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import AboutPage from './pages/AboutPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import AuthProvider from './components/providers/AuthProvider.tsx'
import ProtectedRoute from './components/providers/ProtectedRoute.tsx'
import AdminPage from './pages/AdminPage.tsx'
import { BookPage } from './pages/BookPage.tsx'
import CartPage from './pages/CartPage.tsx'
import Home from './pages/Home.tsx'
import { SearchAuthorPage } from './pages/SearchAuthorPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      },
      {
        path: 'admin',
        element: (<ProtectedRoute allowedRoles={['admin']}>
          <AdminPage />
        </ProtectedRoute>)
      },
      {
        path: 'book/:id',
        element: <BookPage />,
      },
      {
        path: 'author/:searchTerm?',
        element: <SearchAuthorPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      }

    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
