import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData/fakeData.json'
import './home.css';
import Vehicles from '../vehicles/Vehicles';

const Home = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        setVehicles(fakeData)
    }, [])
    return (
        <div className="bg-img">
            <div className="container">
                <div className="row">
                    {
                        vehicles.map(ride => <Vehicles ride={ride} key={ride.id}></Vehicles>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;