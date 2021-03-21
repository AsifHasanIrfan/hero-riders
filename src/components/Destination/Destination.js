import React, { useState } from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import fakeData from '../../fakeData/fakeData.json';
import './destination.css';
import { useForm } from "react-hook-form";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'

const Destination = () => {
    const { id } = useParams()
    const vehicles = fakeData.find(ride => ride.id === id);
    const { image, name, capacity, price } = vehicles;

    const [search, setSearch] = useState(false)
    const [searchResult, setSearchResult] = useState({})
    const {pick_form, pick_to} = searchResult;

    const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    setSearchResult(data)
      setSearch(true);
  };

    return (
        <div className="container destination-bg">
            <div className="row">
                <div className="col-md-4">
                    {search ? <div className="search-form">
                        <div className="location-bg">
                        <h5>From: {pick_form}</h5>
                        <h5>To: {pick_to}</h5>
                        </div>
                        <div className="des-info">
                            <img src={image} alt="" />
                            <h6>{name}</h6>
                            <h6><FontAwesomeIcon icon={faUserFriends} /> :{capacity} </h6>
                            <h6>${price}</h6>
                        </div>
                        <div className="des-info">
                            <img src={image} alt="" />
                            <h6>{name}</h6>
                            <h6><FontAwesomeIcon icon={faUserFriends} /> :{capacity} </h6>
                            <h6>${price}</h6>
                        </div>
                        <div className="des-info">
                            <img src={image} alt="" />
                            <h6>{name}</h6>
                            <h6><FontAwesomeIcon icon={faUserFriends} /> :{capacity} </h6>
                            <h6>${price}</h6>
                        </div>
                    </div>
                    :
                    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
                        <p>Data: <DatePickerComponent placeholder="Enter Date"></DatePickerComponent></p>
                        <p>Pick From</p>
                    <input name="pick_form" ref={register({ required: true })} />
                    {errors.pick_form && <span style={{color: 'red'}}>This field is required</span>}
                        <p>Pick To</p>
                    <input name="pick_to" ref={register({ required: true })} />
                    {errors.pick_to && <span style={{color: 'red'}}>This field is required</span>}
                    <input className="btn" type="submit" />
                    </form>
                    }
                </div>
                <div className="col-md-8 map-img">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.0097778199!2d90.34928576871451!3d23.780777744581084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1616332311134!5m2!1sen!2sbd" width="600" height="450" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    );
};

export default Destination;