import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import "../../styles/_globals.css";
import "./styles.css";
import { Button } from 'primereact/button';
import api from '@/config/api';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';
import 'primeicons/primeicons.css';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import IProductListDto from '@/interfaces/IProductListDto';
import { InputText } from 'primereact/inputtext';

interface IHeaderProps {
    children?: React.ReactNode;
}

const ListProduct: React.FC<IHeaderProps> = ({ children }) => {
    const [products, setProducts] = useState<IProductListDto[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const apiAllProducts = async () => {
        try {
          const result = await api.get("/product/all");
          const data = JSON.stringify(result.data);
          setProducts(JSON.parse(data));
        } catch (error) {
            const axiosObjectError = error as AxiosError
            const err: any = JSON.stringify(axiosObjectError.response?.data); 
            toast.current.show({ severity: 'error', summary: 'Erro', detail: JSON.parse(err).error, life: 5000 });
        }
    }

    useEffect(() => {
        apiAllProducts();
    }, []); 

    const toast: any = useRef(null);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemTemplate = (data: IProductListDto) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${data.photo}`} alt={data.name} />
                    <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.name}</div>
                                <div className="text-700">{data.description}</div>
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
                            <span className="text-2xl font-semibold">${data.value}</span>
                            <Button icon="pi pi-shopping-cart" label="Visualizar"></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
             <div className="card">
                <div className="p-inputgroup flex-1">
                    <InputText 
                        type="text" 
                        placeholder="Buscar produtos..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="p-inputtext p-component" 
                    />
                    <Button icon="pi pi-search"/>
                </div>
                <DataScroller value={filteredProducts} itemTemplate={itemTemplate} rows={5} inline scrollHeight="80vh" header="Lista de Produtos" />
            </div>
            <Toast ref={ toast } />
        </>
    );
};

export default ListProduct;
