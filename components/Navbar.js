import React from 'react';
import navStyle from './Navbar.module.css';
import Link from 'next/link';

const Navbar = ({loggedIn}) => {
  return (
    <nav className={`${navStyle.navbar} ${navStyle.navbarSticky}`}>
      {!loggedIn && (
        <ul className={navStyle.navbarLink}>
          <Link className={navStyle.navbarLinkItem} href="/users/register">
            Register
          </Link> {` | `}
          <Link className={navStyle.navbarLinkItem} href="/users/login">
             Login
          </Link>
        </ul>)}
    </nav>
  )
}

//      <style jsx>{`
//        .navbar {
//          color: #fff;
//          height: 30px;
//          padding-top: 5px;
//          padding-right: 23px;
//          padding-left: 23px;
//          background-color: gray;
//          border-bottom: 3px solid black;
//        }
//      `}</style>
export default Navbar;
