import LogoIcon from '../../assets/logo-icon.svg?react';
type AuthType = {
    text1: string;
    text2: string;
}

const AuthHeader = ({ text1, text2 }: AuthType) => {
    return (
        <div className='flex flex-col justify-center items-center gap-y-2 mb-10'>
            <LogoIcon className='mb-3 w-18 h-18' />
            <p className='text-light-100 font-semibold text-2xl'>{text1}</p>
            <p className='text-light-100 font-light'>{text2}</p>

        </div>
    )
}

export default AuthHeader