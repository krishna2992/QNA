const planReducer = (state=null, action) =>{
    switch(action.type){
        case "PLANS":
            return action.payload
        default:
            return state
    }
}

export default planReducer