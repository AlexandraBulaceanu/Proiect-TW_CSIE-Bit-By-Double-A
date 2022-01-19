function Review (props){
    const{item} = props

    return (
        <div className='review'>
             <div className='departureTime'>
                 {item.departureTime}
             </div>
             <div className='ArrivalTime'>
                 {item.ArrivalTime}
             </div>
             <div className='comfortRating'>
                 {item.comfortRating}
             </div>
             <div className='trafficRating'>
                 {item.trafficRating}
             </div>
             <div className='generalRating'>
                 {item.generalRating}
             </div>
             <div className='notes'>
                 {item.notes}
             </div>            
             
        </div>
    )
}