import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducer_karyawan from "../slicer/slicer_karyawan";
import reducer_customer from "../slicer/slicer_customer";
import reducer_modal from "../slicer/slicer_modal";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import reducer_isEdit from "../slicer/slicer_IsEdit"
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import reducer_DetailHampers from "../slicer/slicer_DetailHampers";
import reducer_tambahEditDetailHampers from "../slicer/slicer_tambahEditDetailHampers";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import reducer_cart from "../slicer/slicer_cart";

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1
}

const rootReducer = combineReducers({
    karyawan: persistReducer(persistConfig, reducer_karyawan),
    customer: persistReducer(persistConfig, reducer_customer),
    isEdit: persistReducer(persistConfig, reducer_isEdit),
    modal: reducer_modal,
    DetailHampers: reducer_DetailHampers,
    tambahEditDetailHampers: reducer_tambahEditDetailHampers,
    cart: reducer_cart
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
}
    , applyMiddleware(thunk)
);

export const persistor = persistStore(store);
