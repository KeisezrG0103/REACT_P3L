import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducer_karyawan from "../slicer/slicer_karyawan";
import reducer_customer from "../slicer/slicer_customer";
import reducer_modal from "../slicer/slicer_modal";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import reducer_isEdit from "../slicer/produk/slicer_Editproduk";

const persistConfig = {
    key: 'root',
    storage,
}





const rootReducer = combineReducers({
    karyawan : persistReducer(persistConfig, reducer_karyawan),
    customer : persistReducer(persistConfig, reducer_customer),
    isEditProduk : persistReducer(persistConfig, reducer_isEdit),
    modal : reducer_modal,
});


export const store = configureStore({
    reducer: rootReducer,

    devTools: process.env.NODE_ENV !== 'production',

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
            },
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
