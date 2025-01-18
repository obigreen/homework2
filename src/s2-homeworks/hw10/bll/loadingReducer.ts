
const initState = {
    isLoading: false,
}

type LoadingState = {
    isLoading: boolean,
}

export const loadingReducer = (state: LoadingState = initState, action: ActionType): LoadingState => { // fix any
    switch (action.type) {
        case 'CHANGE_LOADING' : {
            return {...state, isLoading: action.isLoading}
        }

        default:
            return state
    }
}

// type LoadingActionType = {
//     type: 'CHANGE_LOADING'
//     isLoading: boolean
// }

export const loadingAC = (isLoading: boolean) => ({
    type: 'CHANGE_LOADING',
    isLoading,
})




type LoadingActionType = ReturnType<typeof loadingAC>

type ActionType = LoadingActionType
