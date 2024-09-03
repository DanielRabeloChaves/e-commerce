import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../../styles/_globals.css";
import "./styles.css";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import api from '../../config/api';
import { Toast } from 'primereact/toast';
import { AxiosError } from 'axios';
import Header from '@/components/header/header';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import ListProduct from '@/components/listProduct/listProduct';

const Home = () => {
  const toast: any = useRef(null)
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = Boolean(sessionStorage.getItem('token'));
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <div className="main-home">
          <Header />
          <article>
            <div className='main-box-product'>
                <div className='filter-product'></div>
                <div className='list-product'>
                    < ListProduct />
                </div>
            </div>
          </article>
        <Toast ref={ toast } />
      </div>
    </>
  );
};

export default Home;
