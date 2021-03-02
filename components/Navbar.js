import React from 'react';
import Link from 'next/link';

const Navbar = ({loggedIn}) => {
  return (
    <nav style={{height: "30px", background: "red", borderBottom: "1px solid black",}}>
      {!loggedIn && (
        <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link> |
          <Link href="/users/login">
            <a> Login</a>
          </Link>
        </div>)}
    </nav>
  )
}

export default Navbar;
