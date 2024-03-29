import {configureStore} from "@reduxjs/toolkit"
import rootReducer from './rootReducer';

const loggerMiddleware = storeAPI => next => action => {
    return next(action);
}


const store  = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware)
})

export default store; 
