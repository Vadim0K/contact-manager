import uuidv4 from 'uuid/v4';

import app from '../base';

const initialState = {
    contacts: []

};

function reducer(state=initialState, action) {
    switch (action.type) {
        case 'CONTACT_DELETE': {
            const index = state.contacts.findIndex(({uid}) => uid === action.payload);
            deleteDbContact(state.contacts[index].id);

            return {
                ...state,
                contacts: [
                    ...state.contacts.slice(0, index),
                    ...state.contacts.slice(index + 1),
                ],
            }
        }

        case 'FAVORITE_CHANGE_STATUS': {
            const item = state.contacts.find(({uid}) => uid === action.payload);
            const index = state.contacts.findIndex(({uid}) => uid === action.payload);
            item.isFavorite = !item.isFavorite;
            updateDbFavoriteStatus(item);

            return {
                ...state,
                contacts: [
                    ...state.contacts.slice(0, index),
                    item,
                    ...state.contacts.slice(index+1),
                ]
            }
        }

        case 'ADD_CONTACT': {
            console.log(action.payload);
            createDbContact(action.payload);
            return {
                ...state,
                contacts: [
                    ...state.contacts,
                    {
                        uid: uuidv4(),
                        name: action.payload.contactName,
                        phone: action.payload.contactPhone,
                        email: action.payload.contactEmail,
                        isFavorite: false
                    }
                ]
            }
        }

        case 'EDIT_CONTACT': {
            const index = state.contacts.findIndex(({uid}) => uid === action.payload.contactUid);
            updateDbContact(action.payload);
            return {
                ...state,
                contacts: [
                    ...state.contacts.slice(0, index),
                    {
                        id: action.payload.contactId,
                        uid: action.payload.contactUid,
                        name: action.payload.contactName,
                        phone: action.payload.contactPhone,
                        email: action.payload.contactEmail,
                        isFavorite: action.payload.contactIsFavorite
                    },
                    ...state.contacts.slice(index + 1),
                ],
            }
        }

        case 'FETCH_CONTACTS_SUCCESS':{
            return{
                ...state,
                contacts: action.payload
            }
        }


        default:
            return state;
    }
}

const updateDbContact = (contact) => {
    const db = app.firestore();
    db.collection('contacts').doc(contact.contactId).set({
        uid: contact.contactUid,
        id: contact.contactId,
        name: contact.contactName,
        phone: contact.contactPhone,
        email: contact.contactEmail,
        isFavorite: contact.contactIsFavorite
    });
};

const updateDbFavoriteStatus = (contact) => {
    const db = app.firestore();
    db.collection('contacts').doc(contact.id).set({
        uid: contact.uid,
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        isFavorite: contact.isFavorite
    });
};

const deleteDbContact = (id) =>{
    console.log(id);
    const db = app.firestore();
    db.collection('contacts').doc(id).delete();
};

const createDbContact = (contact) =>{
    const db = app.firestore();
    db.collection('contacts').add({
        uid: uuidv4(),
        name: contact.contactName,
        phone: contact.contactPhone,
        email: contact.contactEmail,
        isFavorite: false
    });
};

export default reducer;