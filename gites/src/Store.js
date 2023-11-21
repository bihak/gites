import { legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Store

const initStore = {
    profil: ''
};

// Actions creators

const setProfil = (value) => ({
    type: "setProfil",
    payload: value,
});

// Reducer
const rootReducers = (state = initStore, action) => {
    switch (action.type) {
        case "setProfil":
            return {
                ...state,
                profil: action.payload,
            };
        default:
            return state;
    }
};

// Create the Redux store
const persistConfig = {
    key: 'root', // La clé racine pour le stockage local
    storage, // Utilisez le stockage local (vous pouvez changer cela en sessionStorage ou tout autre stockage)
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = legacy_createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor, setProfil };