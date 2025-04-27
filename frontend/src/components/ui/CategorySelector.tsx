type PropsType = {
    category: string;
    setCategory: (arg0: string) => void;
}

const CategorySelector = ({ category, setCategory }: PropsType) => {
    const categories = ['All', 'Computers & Accessories', 'Mobiles', 'Appliances', 'Audio'];
    return (
        <div className="my-4 sm:my-8 flex flex-col justify-center items-center gap-x-16 gap-y-3 sm:flex-row sm:items-end">
            {categories.map((cat, index) => ( //index is fine as a key cause of a static list
                <p key = {index} className={`text-md sm:text-md md:text-xl cursor-pointer transition-all duration-100  
                    ${cat === category ?
                        "underline scale-120 text-accent1" :
                        "hover:text-accent2 hover:scale-105 text-dark"}`}
                    onClick={() => setCategory(cat)}
                >{cat}</p>
            ))}
        </div>
    )
}

export default CategorySelector