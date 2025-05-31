import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';
import './Layout.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/register' || location.pathname === '/admin/login' || location.pathname === '/login' || location.pathname === '/cart';
  const showAdminNavbar = location.pathname.startsWith('/admin/') && location.pathname !== '/admin/login';
  const noScroll = location.pathname === '/register';

  useEffect(() => {
    if (noScroll) {
      document.body.classList.add('no-scroll-body');
    } else {
      document.body.classList.remove('no-scroll-body');
    }

    return () => {
      document.body.classList.remove('no-scroll-body');
    };
  }, [noScroll]); 

  return (
    <div className="layout">
      {!hideNavbar && !showAdminNavbar && <Navbar pathname={location.pathname} />}
      {showAdminNavbar && <AdminNavbar />}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default Layout; 