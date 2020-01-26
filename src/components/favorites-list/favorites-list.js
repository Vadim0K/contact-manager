import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import UpdateContactPopup from '../update-contact-popup';

import './favorites-list.css';
import {favoriteChangeStatus, fetchData} from "../../actions";

const FavoritesList = () =>{
    const [popupStatus, setPopupStatus] = useState(false);
    const [idOfEditingContact, setIdOfEditingContact] = useState(0);

    const dispatch = useDispatch();
    useEffect(()=>{fetchData(dispatch)}, []);

    const togglePopup = (id=0) =>{
        setIdOfEditingContact(id);
        setPopupStatus(!popupStatus);
    };


    const contacts = useSelector((state)=>state.contacts);

    const favorites = contacts.filter((item)=> item.isFavorite);


    const renderRow = (item, idx) =>{
        let classNameOfFavorite = 'btn btn-outline-success btn-sm float-right';
        if(item.isFavorite){
            classNameOfFavorite += ' activated';
        }

        const {uid, name, phone, email} = item;
        return (
            <tr key={uid}>
                <td>{idx+1}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>
                    <button onClick={()=>dispatch(favoriteChangeStatus(uid))}
                            className={classNameOfFavorite}>
                        <i className="fa fa-star" />
                    </button>

                    <button onClick={()=>togglePopup(uid)}
                        className="btn btn-outline-warning btn-sm float-right">
                        <i className="fa fa-edit" />
                    </button>
                </td>
            </tr>
        )
    };

    return(
        <div className="contact-list-table">
            <h1 className="favorites-list-table-title">Favorites</h1>
            <table className="table">
                {
                    favorites.length===0?
                        null:
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                }

                <tbody>
                {
                    favorites.map(renderRow)
                }
                </tbody>
            </table>
            {
                popupStatus ?
                    <UpdateContactPopup closePopup={togglePopup} idOfContact={idOfEditingContact}/>
                    : null
            }
        </div>
    )
};

export default FavoritesList;