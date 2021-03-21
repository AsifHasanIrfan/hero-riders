import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './vehicles.css';

const Vehicles = (props) => {
    const {name, image, id} = props.ride;
    const history = useHistory();

    const handleDestination = () => {
        history.push("/destination");
    }

    return (
        <div className="col-lg-3 col-md-6 vehicles-bg">
            <Link onClick={handleDestination} to={`/destination/${id}`}>
            <div className="card mt-4">
            <img src={image
            } className="card-img-top p-4" alt="..." />
            <div className="card-body text-center">
                <h3>{name}</h3>
            </div>
            </div>
            </Link>
        </div>
    );
};

export default Vehicles;