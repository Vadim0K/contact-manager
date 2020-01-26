import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import './update-contact-popup.css';

import {addContact, editContact} from "../../actions";

const UpdateContactPopup = ({closePopup, idOfContact}) => {

    const dispatch = useDispatch();
    const contact = useSelector((state) => state.contacts.find(({uid}) => uid === idOfContact));

    let name="", phone="", email="";
    if(contact){
        name=contact.name;
        phone=contact.phone;
        email=contact.email
    }

    const [nameLabel, setNameLabel] = useState(name);
    const [phoneLabel, setPhoneLabel] = useState(phone);
    const [emailLabel, setEmailLabel] = useState(email);


    const onNameLabelChange = (e) =>{
        setNameLabel(e.target.value)
    };
    const onPhoneLabelChange = (e) =>{
        setPhoneLabel(e.target.value)
    };
    const onEmailLabelChange = (e) =>{
        setEmailLabel(e.target.value)
    };

    // const updateDbContact = (contact, name, phone, email) => {
    //     const db = app.firestore();
    //     db.collection('contacts').doc(contact.id).set({
    //         ...contact, name, phone, email
    //     });
    // };

    const submitContact = (event) => {
        event.preventDefault();
        const {contactName, contactPhone, contactEmail} = event.target.elements;
        if (contact) {
            dispatch(editContact(contact.id, contact.uid, contactName.value, contactPhone.value, contactEmail.value, contact.isFavorite));
        }else
            dispatch(addContact(contactName.value, contactPhone.value, contactEmail.value));
        closePopup();
    };


    return(
        <div className="popup">
            <div className="popup-inner">

                    <h2 className="popup-inner-title">{
                        contact ?
                            "Edit contact":
                            "Add contact"
                        }
                    </h2>

                <form onSubmit={submitContact}>
                    <div className="form-group">
                        <label >Name of contact</label>
                        <input value={nameLabel} onChange={onNameLabelChange} name="contactName" type="contactName" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label >Phone</label>
                        <input value={phoneLabel} onChange={onPhoneLabelChange} name="contactPhone" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input value={emailLabel} onChange={onEmailLabelChange} name="contactEmail" className="form-control" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {
                            contact?
                                "Edit":
                                "Add"
                        }
                    </button>
                    <button className="btn btn-danger" onClick={()=>closePopup()}>Cancel</button>
                </form>
            </div>
        </div>
    )
};

export default UpdateContactPopup;