import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import {contactDelete, favoriteChangeStatus, fetchData} from '../../actions';
import UpdateContactPopup from '../update-contact-popup';

import './contacts-list.css';

const ContactsList = () =>{


    useEffect(() => {
        fetchData(dispatch);
    }, []);


    const [popupStatus, setPopupStatus] = useState(false);
    const [idOfEditingContact, setIdOfEditingContact] = useState(0);
    const contacts = useSelector((state)=>state.contacts);
    const dispatch = useDispatch();

    const togglePopup = (id=0) =>{
        setIdOfEditingContact(id);
        setPopupStatus(!popupStatus);
    };



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
                    <button onClick={()=>dispatch(contactDelete(uid))}
                            className="btn btn-outline-danger btn-sm float-right">
                        <i className="fa fa-trash-o" />
                    </button>

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
            <h1 className="contact-list-table-title">Contacts</h1>
            <button onClick={()=>togglePopup()}
                    className="btn btn-success contact-list-table-add">Add contact</button>
            <table className="table">
                {
                    contacts.length===0?
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
                    contacts.map(renderRow)
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

export default ContactsList;