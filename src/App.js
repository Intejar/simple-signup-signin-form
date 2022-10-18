import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Main/Main';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Register></Register>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
    ]

  }
]);



function App() {
  return (
    <div className="">
       <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
