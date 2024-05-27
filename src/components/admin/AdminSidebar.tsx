import React, { ChangeEvent, useEffect, useState } from 'react';

import { AiFillFileText } from 'react-icons/ai';
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from 'react-icons/fa';
import { HiMenuAlt4 } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io';
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from 'react-icons/ri';
import { Link, Location, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import { FaXmark } from 'react-icons/fa6';

const AdminSidebar = () => {
  const location = useLocation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100,
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  const handleClickOutsideModal = (event) => {
    const modal = document.querySelector('.admin-container');
    if (modal && !modal.contains(event.target)) {
      setShowModal(false);
    }
  };

  window.addEventListener('click', handleClickOutsideModal);
  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          <HiMenuAlt4 />
        </button>
      )}
      <aside
        style={
          phoneActive
            ? {
                width: '20rem',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: showModal ? '0' : '-20rem',
                transition: 'all 0.5s',
              }
            : {}
        }
      >
        <h2>Logo.</h2>

        <div className="relative">
          {phoneActive ? (
            <>
              <button
                className="admin-sidebar-close"
                onClick={() => setShowModal(false)}
              >
                <FaXmark />
              </button>
            </>
          ) : (
            ''
          )}
        </div>

        <DivOne location={location} />
        <DivTwo location={location} />
        <DivThree location={location} />

        {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({ location }: { location: Location }) => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      <Li
        url="/admin/dashboard"
        text="Dashboard"
        Icon={RiDashboardFill}
        location={location}
      />
      <Li
        url="/admin/product"
        text="Product"
        Icon={RiShoppingBag3Fill}
        location={location}
      />
      <Li
        url="/admin/customer"
        text="Customer"
        Icon={IoIosPeople}
        location={location}
      />
      <Li
        url="/admin/transaction"
        text="Transaction"
        Icon={AiFillFileText}
        location={location}
      />
      <Li
        url="/admin/coupon"
        text="Coupons"
        Icon={RiCoupon3Fill}
        location={location}
      />
    </ul>
  </div>
);

const DivTwo = ({ location }: { location: Location }) => (
  <div>
    <h5>Charts</h5>
    <ul>
      <Li
        url="/admin/chart/bar"
        text="Bar"
        Icon={FaChartBar}
        location={location}
      />
      <Li
        url="/admin/chart/pie"
        text="Pie"
        Icon={FaChartPie}
        location={location}
      />
      <Li
        url="/admin/chart/line"
        text="Line"
        Icon={FaChartLine}
        location={location}
      />
    </ul>
  </div>
);

const DivThree = ({ location }: { location: Location }) => (
  <div>
    <h5>Apps</h5>
    <ul>
      <Li
        url="/admin/app/stopwatch"
        text="Stopwatch"
        Icon={FaStopwatch}
        location={location}
      />
      <Li
        url="/admin/app/coupon"
        text="Coupon"
        Icon={RiCoupon3Fill}
        location={location}
      />
      <Li
        url="/admin/app/toss"
        text="Toss"
        Icon={FaGamepad}
        location={location}
      />
    </ul>
  </div>
);

interface LiProps {
  url: string;
  text: string;
  location: Location;
  Icon: IconType;
}
const Li = ({ url, text, location, Icon }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? 'rgba(0,115,255,0.1)'
        : 'white',
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? 'rgb(0,115,255)' : 'black',
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
