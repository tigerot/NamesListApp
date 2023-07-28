import { ACTION_TYPES } from "../actions/NamesListAction";
const initialState = {
    list: []
}


export const NamesListReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [ ...state.list, action.payload ]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(updateState => updateState.id == action.payload.id ? action.payload : updateState)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(deleteState => deleteState.id != action.payload)
            }

        case ACTION_TYPES.COUNTER_INCREMENT:
            return {
                ...state,
                list: state.list.map(incrementState => incrementState.id == action.payload.id ? {...incrementState, count: action.payload.count} : incrementState)
            }
        case ACTION_TYPES.CHANGE_GROUP:
            return {
                ...state,
                list: state.list.map(changeGroupState => changeGroupState.id == action.payload.id ? {...changeGroupState, group: action.payload.group} : changeGroupState)
            }
            
        case ACTION_TYPES.CHANGE_NAME:
            return {
                ...state,
                list: state.list.map(changeNameState => changeNameState.id == action.payload.id ? {...changeNameState, name: action.payload.name} : changeNameState)
            }    
        default:
            return state
    }
}