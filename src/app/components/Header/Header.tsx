'use client';

import Image from 'next/image';

import { CURRENCIES, ECurrencies } from '@/constants/constants';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/registry/new-york-v4/ui/navigation-menu';

import ThemeSwitch from '../ThemeSwitcher/ThemeSwitch';

const Header = ({
  selectedCurrency,
  setSelectedCurrency
}: {
  selectedCurrency: ECurrencies;
  setSelectedCurrency: (currency: ECurrencies) => void;
}) => {
  return (
    <header className='grid h-[74px] grid-cols-[auto_1fr_auto_auto] items-center justify-between gap-3 border-b border-[#92A3C740] bg-white px-4 dark:bg-[#0a0a0a] dark:border-[#92A3C740]'>
      <Image
        className='dark:invert'
        src='/images/foodelity-logo.png'
        alt='Foodelity  logo'
        width={20}
        height={20}
        priority
      />
      <h1 className='title font-bold text-[#5A626D]'>Foodelity Fund 1</h1>
      <ThemeSwitch />
      <NavigationMenu className={navigationMenuTriggerStyle()}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='font-semibold text-[#0078FA] hover:cursor-pointer hover:text-[#0078FA]'>
              {selectedCurrency}
            </NavigationMenuTrigger>
            <NavigationMenuContent className='right-auto left-0'>
              <ul className='grid gap-2'>
                <li>
                  {CURRENCIES.map((currency) => (
                    <NavigationMenuLink
                      className='w-max px-8 py-2 hover:cursor-pointer'
                      key={currency}
                      onClick={() => setSelectedCurrency(currency as ECurrencies)}>
                      {currency}
                    </NavigationMenuLink>
                  ))}
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
