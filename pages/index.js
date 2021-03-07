import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';
import CreatePost from '../components/CreatePost.js';
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Link from 'next/link';
import Navbar from '../components/Navbar.js';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  fire.auth()
    .onAuthStateChanged((user) => {
      if(user){
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    });

  useEffect(() => {
    fire.firestore()
      .collection('blog')
      .onSnapshot(snap => {
        const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogs);
      });
  }, []);

  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        setNotification('Logged out')
        setTimeout(() => {
          setNotification('')
        }, 2000)
      });
  }

  return (
    <div>
      <Navbar loggedIn={loggedIn}/>
      <Layout home>
      <Head>
        <title>Blog App</title>
      </Head>
      {notification}
      {!loggedIn
        ?
          <div>
          <Link href="/users/register">
            <a>Register</a>
          </Link>
          <Link href="/users/login">
            <a>  Login</a>
          </Link>
          </div>
        :
          <button onClick={handleLogout}>Logout</button>
      }
    <div className='grid'>
        {blogs.map(blog =>
          <li key={blog.id} className='item'>
            <Link href="/blog/[id]" as={'/blog/' + blog.id}>
              <a>{blog.title}</a>
            </Link>
            <p>{blog.content}</p>
          </li>
        )}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          color: #fff;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-right: 5px;
          padding-left: 5px;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          margin-top: 20px;
        }
        .item {
          background-color: hsla(0, 100%, 30%, 0.15);
          margin: 10px;
        }
      `}</style>
    </div>
      {loggedIn && <CreatePost />}
      </Layout>
    </div>
  )
}
export default Home;
