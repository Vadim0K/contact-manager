import app from "../base";

export const contactDelete = (contactId) =>{
    return {
        type: 'CONTACT_DELETE',
        payload: contactId
    }
};

export const favoriteChangeStatus = (contactId) =>{
    return{
        type: 'FAVORITE_CHANGE_STATUS',
        payload: contactId
    }
};

export const addContact = (contactName, contactPhone, contactEmail) =>{
    return{
        type: 'ADD_CONTACT',
        payload: {
            contactName,
            contactPhone,
            contactEmail
        }
    }
};

export const editContact = (contactId, contactUid, contactName, contactPhone, contactEmail, contactIsFavorite) =>{
    return{
        type: 'EDIT_CONTACT',
        payload: {
            contactId,
            contactUid,
            contactName,
            contactPhone,
            contactEmail,
            contactIsFavorite
        }
    }
};

export const contactsLoaded = (newContacts) =>{
    return{
        type: 'FETCH_CONTACTS_SUCCESS',
        payload: newContacts
    }
};

export const fetchData = async (dispatch) => {
    const db = app.firestore();
    //const data = await db.collection("contacts").get();
    const unsubscribe = db.collection("contacts").onSnapshot(snapshot=>{
        const contactsData = [];
        snapshot.forEach(doc => contactsData.push({ ...doc.data(), id: doc.id }));
        dispatch(contactsLoaded(contactsData));
        console.log(contactsData);
    })
    return unsubscribe;
    //const contacts = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

};