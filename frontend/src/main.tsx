import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./util/i18n/i18n.ts"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import LoginPage from './pages/LoginPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import AuthProvider from './components/providers/AuthProvider.tsx'
import ProtectedRoute from './components/providers/ProtectedRoute.tsx'
import { BookPage } from './pages/BookPage.tsx'
import CartPage from './pages/CartPage.tsx'
import Home from './pages/Home.tsx'
import SearchBooksAuthor from './pages/SearchBooksAuthor.tsx'
import SearchBooksPublisher from './pages/SearchBooksPublisher.tsx'
import ManageRentalsPage from './pages/admin/ManageRentalsPage.tsx'
import AddBookPage from './pages/admin/AddBookPage.tsx'
import OrdersPage from './pages/OrdersPage.tsx'


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
        path: 'book/:id',
        element: <BookPage />,
      },
      {
        path: 'author',
        element: <SearchBooksAuthor />
      },
      {
        path: 'publisher',
        element: <SearchBooksPublisher />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'orders',
        element: <OrdersPage />
      },
      {
        path: 'admin/manage-rentals',
        element: (<ProtectedRoute allowedRoles={['admin']}>
          <ManageRentalsPage />
        </ProtectedRoute>)
      },
      {
        path: 'admin/add-book',
        element: (<ProtectedRoute allowedRoles={['admin']}>
          <AddBookPage />
        </ProtectedRoute>)
      },
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
