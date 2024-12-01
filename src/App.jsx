import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Loader from './components/Loader/Loader.jsx';
import Header from './components/Header/Header.jsx';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Catalog = lazy(() => import('./pages/Catalog/Catalog.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));
const Features = lazy(() => import('./components/Features/Features.jsx'));
const Reviews = lazy(() => import('./components/Reviews/Reviews.jsx'));
const CamperDetails = lazy(() =>
  import('./pages/CamperDetails/CamperDetails.jsx')
);

export default function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<CamperDetails />}>
            <Route index element={<Navigate to="features" replace />} />
            <Route
              path="features"
              element={
                <Suspense fallback={<Loader />}>
                  <Features />
                </Suspense>
              }
            />
            <Route
              path="reviews"
              element={
                <Suspense fallback={<Loader />}>
                  <Reviews />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
