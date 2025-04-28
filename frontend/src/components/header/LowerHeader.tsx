import { Link, NavLink } from 'react-router-dom';
import LogoIcon from '../../assets/logo-icon.svg?react';

const LowerHeader = () => {
  const options = [
    {
      path: '/',
      text: 'HOME'
    },
    {
      path: '/about',
      text: 'ABOUT'
    },
    {
      path: '/contact',
      text: 'CONTACT'
    },
  ]
  return (
    <>
      <header className='flex flex-col sm:flex-row justify-between items-center px-4 sm:px-14 py-3 flex-wrap  gap-y-12 sm:gap-y-8 '>
        <Link to='/' className="flex gap-3 items-center mr-12">
          <LogoIcon />
          <h4 className="font-bold text-txt text-2xl">Library</h4>
        </Link>

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