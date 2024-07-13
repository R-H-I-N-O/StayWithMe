import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Registration from './pages/Registration';
import SignIn from './pages/sign-in';

function App() {
  const routes = createRoutesFromElements(
    <>
    <Route path='/' element={<Layout>HomePage</Layout>}></Route>
    <Route path='/registration' element={<Layout><Registration/></Layout>}></Route>
    <Route path='/sign-in' element={<Layout><SignIn/></Layout>}></Route>
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
