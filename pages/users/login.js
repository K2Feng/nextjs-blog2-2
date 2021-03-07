import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import LayoutLogin from '../../components/layoutLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .catch((err) => {
        console.log(err.code, err.message)
        setNotification(err.message)
        setTimeout(() => {
          setNotification('')
        }, 2000)
      })

    setUsername('');
    setPassword('');
    router.push("/");
  }

  return (
    <LayoutLogin>
    <div>
      {notify}
      <form className='container' onSubmit={handleLogin}>
        <h1 className='item-header'>Login</h1>
        Email<input type="text" value={username} onChange={
          ({target}) => setUsername(target.value)} />
        Password<input type="password" value={password} onChange={
          ({target}) => setPassword(target.value)} />
        <button type="submit">Login</button>
      </form>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 40px 40px auto;
          align-items: center;
          width: 350px;
          padding: 10px;
          margin: 40px 0px;
          background: hsla(0, 0%, 90%, 0.6);
          box-shadow:
             inset 0 -3em 3em rgba(0,0,0,0.2),
             0 0  0 1px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.5);
        }
        .item-header {
          grid-column: 1 / span 2;
        }
      `}</style>
    </div>
    </LayoutLogin>
  )
}

export default Login;
