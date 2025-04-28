import UpperHeader from './UpperHeader'
import LowerHeader from './LowerHeader'


const Header = () => {
    return (
        <>
            <UpperHeader />
            <div className="border-txt-darker border-[1px]"></div>
            <LowerHeader />
        </>
    )
}

export default Header

