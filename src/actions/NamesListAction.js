import api from "../apis/NameListAPI";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    COUNTER_INCREMENT: 'COUNTER_INCREMENT',
    CHANGE_GROUP: 'CHANGE_GROUP',
    CHANGE_NAME: 'CHANGE_NAME'
}

export const fetchAll = () => dispatch => {
    api.apiRequests().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(error => console.log(error))
}

export const create = (data, onSuccess) => dispatch => {
    api.apiRequests().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(error => console.log(error))
}

export const update = (data, id, onSuccess) => dispatch => {
    const newUpdate = { ...data, id };
    api.apiRequests().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: newUpdate
            })

        })
        .catch(error => console.log(error))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.apiRequests().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(error => console.log(error))
}

export const counterIncrement = (data, onSuccess) => dispatch => {
    const newData = { ...data, count: data.count + 1 };
    api.apiRequests().incrementCount(newData)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.COUNTER_INCREMENT,
                payload: newData
            })
        })
        .catch(error => console.log(error))
}

export const changeGroup = (data, onSuccess) => dispatch => {
    const newGroup = { ...data, group: data.group };
    api.apiRequests().changeGroup(newGroup)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CHANGE_GROUP,
                payload: newGroup
            })
        })
        .catch(error => console.log(error))
}

export const changeName = (data, onSuccess) => dispatch => {
    const newName = { ...data, name: data.name };
    api.apiRequests().changeName(newName)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CHANGE_NAME,
                payload: newName
            })
        })
        .catch(error => console.log(error))
}