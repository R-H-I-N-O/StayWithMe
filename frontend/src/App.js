import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Registration from './pages/Registration';
import SignIn from './pages/sign-in';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';

function App() {
  const { isLoggedIn } = useAppContext();
  const routes = createRoutesFromElements(
    <>
      <Route path='/' element={<Layout>HomePage</Layout>}></Route>
      <Route path='/registration' element={<Layout><Registration /></Layout>}></Route>
      <Route path='/sign-in' element={<Layout><SignIn /></Layout>}></Route>
      {isLoggedIn && (<><Route path='/add-hotel' element={<Layout><AddHotel /></Layout>}></Route>
        <Route path='/my-hotels' element={<Layout><MyHotels /></Layout>}></Route>
        <Route path='/edit-hotel/:hotelId' element={<Layout><EditHotel /></Layout>}></Route>
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
