import {UserType} from "../HW8";


type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            if (action.payload === 'up') {
                return [...state].sort((a, b) => a.name.localeCompare(b.name));
            } else if (action.payload === 'down') {
                return [...state].sort((a, b) => b.name.localeCompare(a.name));
            } else {
                return state // need to fix
            }

        }
        case 'check': {
            return state.filter(a => a.age >= 18)
        }
        default:
            return state
    }
}
