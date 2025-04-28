import StarFullIcon from '../../assets/stars/star-full-icon.svg?react'
import StarHalfIcon from "../../assets/stars/star-half-icon.svg?react"
import StarEmptyIcon from "../../assets/stars/star-empty-icon.svg?react"
import { JSX } from 'react';

const Rating = ({ rating }: { rating: number }) => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasEmptyStar = (rating % 1) >= 0.5;
    const emptyStars = 5 - fullStars - (hasEmptyStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++)
        stars.push(<StarFullIcon className="text-accent2 saturate-85"/>);
    if (hasEmptyStar)
        stars.push(<StarHalfIcon className="text-accent2 saturate-85"/>);
    for (let i = 0; i < emptyStars; i++)
        stars.push(<StarEmptyIcon />)

    return (
        <div className="flex flex-row gap-x-2 items-center">
            {stars.map((star, index) => { 
                return <span key = {index}>{star}</span>
            }) }
            <span className="text-white font-semibold text-lg">{rating.toFixed(1)} / 5</span>
        </div>
    )
}

export default Rating