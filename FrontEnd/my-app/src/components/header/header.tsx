import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import "../../styles/_globals.css";
import "./styles.css";
import { Button } from 'primereact/button';
import api from '@/config/api';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';
import { PrimeIcons } from 'primereact/api';

import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';

interface IHeaderProps {
    children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
    const toast: any = useRef(null)

    return (
        <header>
            <div className='main-header'>
                <div className='logo'>Logo</div>
                <div className='user-info'>
                    <div id="cart">
                        <i className="pi pi-shopping-cart" style={{ fontSize: '2rem' }}></i>
                        <div id="quantity">2</div>
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
