import MembershipIcon from "../assets/membership-icon.svg?react"
import RefundIcon from "../assets/refund-icon.svg?react"
import SupportIcon from "../assets/support-icon.svg?react"
import Feature from "./ui/Feature"

const featureData = [
    {
        Icon: MembershipIcon,
        title: "EXCLUSIVE MEMBERSHIPS",
        desc: "Become a member and enjoy discounts, early access to new releases, and more!",
    },
    {
        Icon: RefundIcon,
        title: "NO LATE FEES",
        desc: "Enjoy peace of mind with no late fees, just extend your rental period for as long as needed."
    },
    {
        Icon: SupportIcon,
        title: "BOOK SUPPORT 24/7",
        desc: "Need recommendations or assistance? We're here to help anytime."
    }
];

const FeaturesInfo = () => {
    return (
        <div className='flex flex-col sm:flex-row items-center justify-center gap-15 mx-10 my-16'>
            {featureData.map((data, index) => (
                <Feature
                    key={index}
                    Icon={data.Icon}
                    title={data.title}
                    desc={data.desc}
                />
            ))}
        </div>
    )
}

export default FeaturesInfo