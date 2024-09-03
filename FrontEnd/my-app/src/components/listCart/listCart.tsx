import React, { useState, useEffect, useRef } from 'react';
import { OrderList } from 'primereact/orderlist';
import api from '@/config/api';
import { AxiosError } from 'axios';
import { Toast } from 'primereact/toast';
import baseUrl from '@/config/baseUrl';
import { jwtDecode } from 'jwt-decode';
import { Button } from 'primereact/button';

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const ListCart: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
    const [products, setProducts] = useState<any[]>([]);
    const toast: any = useRef(null)

    const apiGetCartByUId = async () => {
        try {
            const token: any = sessionStorage.getItem('token');
            if(!token) return;
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
    
    if (!isOpen) return null;

    const itemTemplate = (item: any) => {
        return (
            <>
                <div className="flex flex-wrap p-2 align-items-center gap-3">
                    <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`${baseUrl}/file?productId=${item.product?.id}&token=${sessionStorage.getItem('token')}`} alt={item.product?.name} />
                    <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                        <span className="font-bold">{item.product?.name}</span>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag text-sm"></i>
                            <span>quantidade: {item.quantity}</span>
                        </div>
                    </div>
                    <span className="font-bold text-900">${item.value}</span>
                </div>
                {children}
            </>
            
        );
    };
    
    return (
        <div className="card xl:flex xl:justify-content-center">
            <OrderList dataKey="id" value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header={`Carrinho, quantidade ${products.length}`}></OrderList>
        </div>
    )
}

export default ListCart;