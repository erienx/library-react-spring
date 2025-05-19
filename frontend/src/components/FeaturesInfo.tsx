import { useTranslation } from "react-i18next"
import MembershipIcon from "../assets/membership-icon.svg?react"
import RefundIcon from "../assets/refund-icon.svg?react"
import SupportIcon from "../assets/support-icon.svg?react"
import Feature from "./ui/Feature"



const FeaturesInfo = () => {
    const { t } = useTranslation();
    const featureData = [
        {
            Icon: MembershipIcon,
            title: t('feature1'),
            desc: t('feature1_desc'),
        },
        {
            Icon: RefundIcon,
            title: t('feature2'),
            desc: t('feature2_desc'),
        },
        {
            Icon: SupportIcon,
            title: t('feature3'),
            desc: t('feature3_desc'),
        }
    ];
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