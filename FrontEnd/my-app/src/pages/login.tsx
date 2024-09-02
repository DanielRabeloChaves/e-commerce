import { useState } from 'react';
import { useRouter } from 'next/router';
import "../styles/_globals.css";
import "../styles/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const router = useRouter();

  const clearFields = () => {
    setUsername('');
    setPassword('');
    setToken('');
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const isAuthenticated = true;

    if (isAuthenticated) {
      router.push('/home');
    } else {
      clearFields();
      alert('Invalid credentials');
    }
  };

  return (
    <div>
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" >Login</button>
            </form>
        </div>
    </div>
  );
};

export default LoginPage;
