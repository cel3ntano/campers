import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import { Toaster } from 'react-hot-toast';
import CamperDetails from './pages/CamperDetails/CamperDetails.jsx';
import Features from './components/Features/Features.jsx';
import Reviews from './components/Reviews/Reviews.jsx';

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CamperDetails />}>
          <Route index element={<Navigate to="features" replace />} />
          <Route path="features" element={<Features />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
