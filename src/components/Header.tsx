import { auth } from '@/firebase';
import { RootState } from '@/redux/store';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success('Sign Out Successfully');
      setIsOpen(false);
    } catch (error) {
      toast.error('Sign Out Fail');
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if page is scrolled down by more than 100px
      if (window.scrollY > 20) {
        setIsScrolled(true); // Set state to true if scrolled
      } else {
        setIsScrolled(false); // Set state to false if not scrolled
      }
    };

    // Add event listener for scroll event
    window.addEventListener('scroll', handleScroll);

    // Clean up function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  return (
    <nav className={`navbar ${isScrolled ? ' navbarScroll' : ''}`}>
      <div className=" header container ">
        {' '}
        <Link onClick={() => setIsOpen(false)} to={'/'}>
          HOME
        </Link>
        <Link onClick={() => setIsOpen(false)} to={'/search'}>
          <FaSearch />
        </Link>
        <Link onClick={() => setIsOpen(false)} to={'/cart'}>
          <FaShoppingBag />
        </Link>
        {user?._id ? (
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {user?.role === 'admin' && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                )}
                <Link onClick={() => setIsOpen(false)} to="/orders">
                  Orders
                </Link>
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={'/login'}>
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
