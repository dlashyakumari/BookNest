import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';

const Uitem = () => {
    const [item, setItem] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/item/${id}`)
            .then((resp) => {
                setItem(resp.data);
            })
            .catch(() => {
                console.log("Did not get data");
            });
    }, [id]);

    return (
        <div>
            <Unavbar />
            <br />
            {item && (
                <div>
                    <div style={{ display: "flex", justifyContent: "center", height: "450px" }}>
                        <img src={`http://localhost:4000/${item?.itemImage}`} alt={`${item.title} Image`} />
                    </div>

                    <h1 className='text-center'>{item.title}</h1>

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ width: '38%', marginLeft: "150px" }}>
                            <h2 style={{ color: "grey" }}><strong>Description</strong></h2>
                            <hr style={{ height: "3px", backgroundColor: "black" }} />
                            <p style={{ fontSize: "20px" }}>{item.description}</p>
                        </div>
                        <div style={{ marginRight: '300px' }}>
                            <h2 style={{ color: "grey" }}><strong>Info</strong></h2>
                            <hr style={{ height: "3px", backgroundColor: "black" }} />
                            <p style={{ fontSize: "20px" }}>Title: {item.title}</p>
                            <p style={{ fontSize: "20px" }}>Author: {item.author}</p>
                            <p style={{ fontSize: "20px" }}>Genre: {item.genre}</p>
                            <p style={{ fontSize: "20px" }}>Price: {item.price}</p>
                            <p style={{ fontSize: "20px" }}>Seller: {item.userName}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center" style={{ marginTop: "20px", marginBottom: "40px" }}>
                        <button
                            type="button"
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700">
                            <Link to={`/orderitem/${item._id}`} style={{ color: "white", textDecoration: "none" }}>
                                Buy Now
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Uitem;