
import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';
import AdminHeader from '../Header/AdminHeader';

const Layout = () => {
  return <>
  <AdminHeader/>
    <div>
        <Routers/>
    </div>
  <Footer/>
  </>
}

export default Layout