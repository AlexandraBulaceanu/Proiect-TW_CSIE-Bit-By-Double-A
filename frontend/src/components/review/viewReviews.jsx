import {useEffect, useState} from 'react'
import {reviews} from "./index";

const SERVER='http://localhost:3001'

function ReviewList() {
    const [reviews, setReviews] = useState([])

    const getReviews = async () =>{
        const response = await fetch(`${SERVER}/reviews`)
        const data = await response.json()
        setReviews(data)
    }

    useEffect(() => {
        getReviews()
    }, [])

    return(
        <div className='review-list'>
            {
                reviews.map(e=> <Review key={e.id} item ={e}/>)
            }
        </div>
    )
}

export default ReviewList
