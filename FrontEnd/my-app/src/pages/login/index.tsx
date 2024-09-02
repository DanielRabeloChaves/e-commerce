"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "../../styles/_globals.css";
import "../../styles/login.css";
import { InputText } from 'primereact/inputtext';

const Login = () => {
  const [emai, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const router = useRouter();

  const clearFields = () => {
    setEmail('');
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
    <>
      <div className="main-login">
        <div className="login">
            <h1>Login</h1>
            <InputText placeholder="Username" />
            <input
                type="text"
                placeholder="Email"
                value={emai}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className='box-button'>
              <button type="submit" onClick={handleLogin}>Logar</button>
              <button type="submit" onClick={handleLogin}>Cadastrar</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
