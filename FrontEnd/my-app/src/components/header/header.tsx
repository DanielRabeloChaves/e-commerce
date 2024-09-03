import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import "../../styles/_globals.css";
import "./styles.css";
import { Button } from 'primereact/button';
import api from '@/config/api';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';
import { PrimeIcons } from 'primereact/api';
import { jwtDecode } from 'jwt-decode'
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';
import ListCart from '../listCart/listCart'

interface IHeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
    const toast: any = useRef(null)
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [dataUser, setDataUser] = useState();

    const handleOpenModal = () => {setModalOpen(true);};
    const handleCloseModal = () => {
        setModalOpen(false);
    }; 

    const apiGetCartByUId = async () => {
        try {
            const token: any = sessionStorage.getItem('token');
            if(!token) router.push(`/login`)
            const dataUser: any = jwtDecode(token)
            const response = await api.get(`/cart/all/find?uid=${dataUser.uid}`);
            const data = response.data;
            setProducts(data);
        } catch (error) {
            const axiosObjectError = error as AxiosError
            const err: any = JSON.stringify(axiosObjectError.response?.data); 
            toast.current.show({ severity: 'error', summary: 'Erro', detail: JSON.parse(err).error, life: 5000 });
        }
    }

    useEffect(() => {
        apiGetCartByUId();
        const intervalId = setInterval(apiGetCartByUId, 5000); // Atualiza a cada 5 segundos

        return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmonta
    }, []);

    return (
        <header>
            <div className='main-header'>
                <div className='logo' onClick={() =>router.push(`/home`)}>Logo</div>
                <div className='user-info'>
                    <div id="cart" onClick={handleOpenModal}>
                        <i className="pi pi-shopping-cart" style={{ fontSize: '2rem' }}></i>
                        <div id="quantity">{products.length}</div>
                        <div className='list-cart'>
                            <ListCart isOpen={isModalOpen} onClose={handleCloseModal}/>
                        </div>
                    </div>
                    <Avatar icon="pi pi-user" size="large" shape="circle" />
                </div>
                {children}
            </div>
            
            <Toast ref={ toast } />
        </header>
    );
};

export default Header;
