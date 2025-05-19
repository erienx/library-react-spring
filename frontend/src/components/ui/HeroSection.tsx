import { useEffect, useState } from 'react'
import { Trans } from 'react-i18next';

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentImage((img) => (img + 1) % images.length);
        setFade(true);
      }, 700);
    }, 5000);

    return () => { clearInterval(id); }
  }, [images.length]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto h-[300px] relative flex items-center justify-center overflow-hidden">
        <img src={images[currentImage]} alt="Book Banner" className={`max-h-full w-auto object-contain drop-shadow-md transition-opacity duration-1000 ease-in-out rounded-md ${fade ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <h1 className='mx-auto max-w-4xl text-center text-5xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px]'>
        <Trans
          i18nKey="heroText"
          components={[
            <> <br /> </>,
            <span className="text-gradient-header" />,
          ]}
        />
      </h1>
    </>
  )
}

export default HeroSection