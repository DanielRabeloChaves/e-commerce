import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import "../../styles/_globals.css";
import "./styles.css";
import { InputOtp } from 'primereact/inputotp';
import { Button } from 'primereact/button';
import ILogin from '@/interfaces/ILogin';
import api from '@/config/api';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';

interface IModalTokenProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    status: string;
    login: string;
    password: string;
}

const ModalToken: React.FC<IModalTokenProps> = ({ isOpen, onClose, children, login, password, status }) => {
    const [loginToken, setLoginToken] = useState<string | number | undefined | null>();
    const toast: any = useRef(null)
    
    const apiAuthentication = async (dataUser: ILogin) => {
      try {
        const response = await api.post("/user/authentication", dataUser);
        const data = response.data;
        if(data.status == "Success"){
          await sessionStorage.setItem('token', data.JWT);
          toast.current.show({ severity: 'success', summary: 'Success', detail: data.message, life: 4000 });
        }
      } catch (error) {
          const axiosObjectError = error as AxiosError
          const err: any = JSON.stringify(axiosObjectError.response?.data); 
          toast.current.show({ severity: 'error', summary: 'Erro', detail: JSON.parse(err).error, life: 5000 });
          onClose();
      }finally{
        setLoginToken('')
      }
    }

    const handleKeyUp = (value: any) => {
      const inputValue = value.toUpperCase();
      setLoginToken(inputValue);
    };

    const handleClose = (value: any) => {
      setLoginToken('')
      onClose();
    };

    const handleAuthentication = () => {
        console.log(loginToken?.toString().length)
        if(!loginToken || loginToken.toString().length != 5 || !login || !password)
          return;
        
        const dataLogin: ILogin = {
          login: login,
          password: password,
          loginToken: loginToken?.toString()
        }

        apiAuthentication(dataLogin);
    };

    if (!isOpen) return null;
  
    return (
      <div className='modalOverlay'>
        <div className='modalContent'>
          <div className='text-info'>
            <h2>Autenticação</h2>
            <p>Um token de acesso foi enviado para o endereço de e-mail cadastrado. Por favor, verifique sua caixa de entrada.</p>
            <p>Este token expirará após 15 minutos.</p>
          </div>
          <InputOtp value={loginToken} length={5} onChange={(e) => handleKeyUp(e.value)}/>
          <div className='box-button'>
              <Button 
                label="Enviar"
                type='submit'
                rounded
                onClick={handleAuthentication}
              />
              <Button 
                label="Cancelar"
                type='button'
                rounded
                onClick={handleClose}
              />
            </div>
            <Toast ref={ toast } />
          {children}
        </div>
      </div>
    );
};

export default ModalToken;
