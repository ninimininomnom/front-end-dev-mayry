import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home.jsx'
import Activity from './pages/Activity.jsx'
import Setting from './pages/Setting.jsx'
import Profile from './pages/Profile.jsx'
import PageNotFound from './pages/PageNotFound.jsx';
import ActivityCard from './pages/ActivityCard.jsx';
import './index.css'
import ActivityList from './components/ActivityList.jsx';
import ActivityListPage from './pages/ActivityListPage.jsx';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Home /> 
  },{ 
    path: '/activity',
    element: <ActivityListPage/> 
  }
  ,{
    path: '/activityform',
    element: <Activity/>
  },{ 
    path: '/setting',
    element: <Setting /> 
  },{ 
    path: '/profile',
    element: <Profile /> 
  },{
    path: '/activities/:id',
    element: <ActivityCard />
  },{ 
    path: "*",
    element: <PageNotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className="mobile">
    <RouterProvider router={router} />
  </div>
)
