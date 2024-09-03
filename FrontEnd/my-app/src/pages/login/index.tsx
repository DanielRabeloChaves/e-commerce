import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../../styles/_globals.css";
import "./styles.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import api from '../../config/api'
import ModalToken from '../../components/modalToken/modalToken';
import ILogin from '../../interfaces/ILogin'
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const toast: any = useRef(null)
  const router = useRouter();

  const apiAuthentication = async (dataUser: ILogin) => {
    try {
      const response = await api.post("/user/authentication", dataUser);
      const data = response.data;
      if(data.status == "SendEmail"){
        toast.current.show({ severity: 'success', summary: 'Success', detail: data.message, life: 4000 });
        handleOpenModal();
      }
    } catch (error) {
        const axiosObjectError = error as AxiosError
        const err: any = JSON.stringify(axiosObjectError.response?.data); 
        toast.current.show({ severity: 'error', summary: 'Erro', detail: JSON.parse(err).error, life: 5000 });
        clearFields();
    }
  }

  const clearFields = () => {
    setLogin('');
    setPassword('');
  }

  const handleOpenModal = () => {setModalOpen(true);};

  const handleCloseModal = () => {
    setModalOpen(false);
    clearFields();
  }; 

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: ILogin = {
      login: login,
      password: password,
      loginToken: ''
    }

    await apiAuthentication(data);
  };

  return (
    <>
      <div className="main-login">
          <ModalToken isOpen={isModalOpen} login={login} password={password} onClose={handleCloseModal} status="Login"/>
          <form className="login">
            <h1>Login</h1>
            <div className='box-input'>
              <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                  </span>
                  <InputText 
                    type="text"
                    placeholder="Email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
              </div>
              <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                      <i className="pi pi-key"></i>
                  </span>
                  <InputText 
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
            </div>
            <div className='box-button'>
              <Button 
                label="Logar"
                type='submit'
                rounded
                onClick={handleLogin}
              />
              <Button 
                label="Cadastrar"
                type='button'
                rounded
                onClick={handleSign}
              />
            </div>
        </form>
        <Toast ref={ toast } />
      </div>
    </>
  );
};

export default Login;
