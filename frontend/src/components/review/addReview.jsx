import React, {useEffect,useState } from "react";

function ReviewAddForm (props) {
    const { onAdd } = props
    const [departureTime, setDepartureTime] = useState('')
    const [arrivalTime, setArrivalTime] = useState('')
    const [comfortRating, setComfortRating] = useState('')
    const [trafficRating, setTrafficRating] = useState('')
    const [generalRating, setGeneralRating] = useState('')
    const [notes, setNotes] = useState('')


    const add = (evt) => {
        onAdd({
            departureTime, 
            arrivalTime, 
            comfortRating, 
            trafficRating, 
            generalRating, 
            notes
        })
      }

//render(){
    return (
        <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Adauga Review</div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="id">Route id</label>
                        <select name="id" placeholder="id">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                     </div>

                    <div className="form-group">
                        <label htmlFor="wayOfTransport">Way of transport</label>
                        <input type="text" name="wayOfTransport" placeholder="wayOfTransport" />
                     </div>

                     <div className="form-group">
                        <label htmlFor="departureTime">Departure time</label>
                        <input type="time" name="departureTime" placeholder="departureTime" onChange={(evt) => setDepartureTime(evt.target.value)}/>
                     </div>

                     <div className="form-group">
                        <label htmlFor="arrivalTime">Arrival time</label>
                        <input type="time" name="arrivalTime" placeholder="arrivalTime" onChange={(evt) => setArrivalTime(evt.target.value)}/>
                     </div>

                     <div className="form-group">
                        <label htmlFor="comfortRating">Comfort rating</label>
                        <input type="number" name="comfortRating" placeholder="comfortRating"  onChange={(evt) => setComfortRating(evt.target.value)} />
                     </div>

                     <div className="form-group">
                        <label htmlFor="trafficRating">Traffic rating</label>
                        <input type="number" name="trafficRating" placeholder="trafficRating" onChange={(evt) => setTrafficRating(evt.target.value)}/>
                     </div>

                     <div className="form-group">
                        <label htmlFor="generalRating">General rating</label>
                        <input type="number" name="generalRating" placeholder="generalRating" onChange={(evt) => setGeneralRating(evt.target.value)}/>
                     </div>

                     <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <input type="text" name="notes" placeholder="notes" onChange={(evt) => setNotes(evt.target.value)}/>
                     </div>                     
                </div>
            </div>

            <div className="footer">
                <button type="button" className="btn" onClick={add}>
                    Adauga
                </button>
            </div>
            
        </div>
    );
}
//}
export default ReviewAddForm
//}