
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import api from '@/config/api';
import Header from '@/components/header/header';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';
import "../../styles/_globals.css";
import "./styles.css";
import baseUrl from '@/config/baseUrl';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

const ProductPage = () => {
    const toast: any = useRef(null)
    const router = useRouter();
    const [quantity, setQuantity]: any = useState();
    const [product, setProduct]: any = useState({});
    const [selectedModality, setSelecModality]: any = useState(null);
    const [listModality, setListModality]: any = useState([]);

    const apiGetProductById = async () => {
        try {
            const url = window.location.href;
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 1];
            if(!id) return
            const response = await api.get(`/product/find?id=${id}`);
            const data = response.data;
            setProduct(data);
        } catch (error) {
            const axiosObjectError = error as AxiosError
            const err: any = JSON.stringify(axiosObjectError.response?.data); 
            toast.current.show({ severity: 'error', summary: 'Erro', detail: JSON.parse(err).error, life: 5000 });
        }
    }

    const apiGetModality = async () => {
        try {
            const response = await api.get(`/modality/all`);
            const data = response.data;
            setListModality(data);
        } catch (error) {
            const axiosObjectError = error as AxiosError
            const err: any = JSON.stringify(axiosObjectError.response?.data); 
            toast.current.show({ severity: 'error', summary: 'Erro', detail: JSON.parse(err).error, life: 5000 });
        }
    }

    const apiPostCart = async (body: any) => {
        try {
            const response = await api.post(`/cart/insert`, body);
            const data = response.data;
            if(data.message)
                toast.current.show({ severity: 'success', summary: 'Success', detail: data.message, life: 4000 });
        } catch (error) {
            const axiosObjectError = error as AxiosError
            const err: any = JSON.stringify(axiosObjectError.response?.data); 
            toast.current.show({ severity: 'error', summary: 'Erro', detail: JSON.parse(err).error, life: 5000 });
        }
    }


    const handleAddCart = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!quantity || !selectedModality || !product){
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Necessario preencher todos os campos.', life: 5000 });
            return
        }
            
        const data = {
            product_id: product.id,
            modality_id: selectedModality.id,
            quantity: quantity,
            value: product.value * quantity,
            promotion: product.promotion,
            porcent: product.porcent,
            rule: product.rule
        }

        await apiPostCart(data);
    };

    useEffect(() => {
        const isAuthenticated = Boolean(sessionStorage.getItem('token'));
        if (!isAuthenticated)
            router.push('/login');

        apiGetProductById();
        apiGetModality();
    }, [router]);

    return (
        <>
            <Header />
                <article>
                    <div className='main-box-product'>

                    <div className="col-12">
                            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">

                                <img className="w-9 sm:w-36rem xl:w-30rem shadow-2 block xl:block mx-auto border-round" src={`${baseUrl}/file?productId=${product.id}&token=${sessionStorage.getItem('token')}`} alt={product.name} />
                                <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                                    <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                                        <div className="flex flex-column gap-1">
                                            <div className="text-2xl font-bold text-900">{product.name}</div>
                                            <div className="text-700">{product.description}</div>
                                        </div>
                                        <div className="flex flex-column gap-2">
                                            <Rating value={5} readOnly cancel={false}></Rating>
                                            <span className="flex align-items-center gap-2">
                                                <i className="pi pi-tag product-category-icon"></i>
                                                <span className="font-semibold">Oferta</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                                        <span className="text-2xl font-semibold">${product.value}</span>
                                        <Button icon="pi pi-shopping-cart" onClick={handleAddCart} label="Adicionar Carrinho"></Button>
                                    </div>
                                </div>

                               
                            </div>
                             <div className="box-input-values">
                                    <div className='input-qtd'>
                                        <label htmlFor="minmax-buttons" className="font-bold block mb-2">Quantidade</label>
                                        <InputNumber inputId="minmax-buttons" value={quantity} onValueChange={(e) => setQuantity(e.value)} mode="decimal" showButtons min={0} max={100} />
                                    </div>
                                    <div className='select-mod' >
                                        <Dropdown value={selectedModality} onChange={(e) => setSelecModality(e.value)} options={listModality} optionLabel="name" 
                                        placeholder="Selecione Modalidade" className="w-full md:w-14rem" />
                                    </div>
                             </div>
                    </div>

                    </div>
                </article>
            <Toast ref={ toast } />
        </>
    );
};

export default ProductPage;
