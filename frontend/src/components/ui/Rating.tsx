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
        stars.push(<StarFullIcon />);
    if (hasEmptyStar)
        stars.push(<StarHalfIcon />);
    for (let i = 0; i < emptyStars; i++)
        stars.push(<StarEmptyIcon />)

    return (
        <div className="flex flex-row gap-x-2">
            {stars.map((star, index) => { 
                return <span key = {index}>{star}</span>
            }) }
            <p className="font-bold text-dark">{rating ? rating : "N/A"}</p>
        </div>
    )
}

export default Rating