import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Registration from './pages/Registration';
import SignIn from './pages/sign-in';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Details from './pages/Details';
import Booking from './pages/Booking';
import HomeLayout from './layout/HomeLayout'
import HomePage from './pages/HomePage';

function App() {
  const { isLoggedIn } = useAppContext();

  const routes = createRoutesFromElements(
    <>
      <Route path='/' element={<HomeLayout><HomePage/></HomeLayout>}></Route>
      <Route path='/registration' element={<Layout><Registration /></Layout>}></Route>
      <Route path='/sign-in' element={<Layout><SignIn /></Layout>}></Route>
      <Route path='/search' element={<Layout><Search /></Layout>}></Route>
      <Route path='/details/:hotelId' element={<Layout><Details /></Layout>}></Route>

      {isLoggedIn && (<><Route path='/add-hotel' element={<Layout><AddHotel /></Layout>}></Route>
        <Route path='/my-hotels' element={<Layout><MyHotels /></Layout>}></Route>
        <Route path='/edit-hotel/:hotelId' element={<Layout><EditHotel /></Layout>}></Route>
        <Route path='/hotel/:hotelId/booking' element={<Layout><Booking /></Layout>}></Route>
      </>)}
      
      <Route path='*' element={<Navigate to="/"/>}/>
    </>

  );
  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
