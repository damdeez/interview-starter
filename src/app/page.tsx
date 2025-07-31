'use client';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import Header from '@/app/components/Header/Header';
import { ECurrencies } from '@/constants/constants';
import { useState } from 'react';

const Page = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<ECurrencies>(ECurrencies.USD);

  return (
    <>
      <Header selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <Dashboard selectedCurrency={selectedCurrency} />
    </>
  );
};

export default Page;
