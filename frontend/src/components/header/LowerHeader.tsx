import {  NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import HomeButton from '../ui/HomeButton';

const LowerHeader = () => {
  const { t } = useTranslation();
  const options = [
    {
      path: '/',
      text: t('home'),
    },
    {
      path: '/author',
      text: t('authors'),
    },
    {
      path: '/publisher',
      text: t('publishers'),
    },
  ]
  return (
    <>
      <header className='flex flex-col sm:flex-row justify-between items-center px-4 sm:px-14 py-3 flex-wrap  gap-y-12 sm:gap-y-8 '>
        <HomeButton/>

        <nav className="flex gap-6 sm:gap-10 lg:gap-16 items-center ">
          {options.map((opt, index) => ( //index is fine as a key cause static array
            <NavLink key={index} to={opt.path}
              className={({ isActive }) =>
                `text-2xl sm:text-3xl transition-all duration-150 ${isActive ? "text-txt underline" : "text-txt-darker hover:text-txt"}`}
            >{opt.text}</NavLink>
          ))}
        </nav>
      </header>
    </>
  )
}

export default LowerHeader