import Link from 'next/link';

import NavigationLinks from '@/app/(examples)/NavigationLinks';
import ThemeSwitch from '@/app/(examples)/ThemeSwitch';

const NavigationBar = () => {
    return (
        <div className='mx-auto mt-3 flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-6 px-3 sm:flex-row sm:px-0 lg:mt-6'>
            <NavigationLinks />
            <ThemeSwitch />
        </div>
    );
};

export default NavigationBar;
