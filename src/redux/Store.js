import { configureStore } from '@reduxjs/toolkit';
import { rootReducers } from './RootReducers';
import createSagaMiddleware from 'redux-saga'
import saga from './saga/Sagas';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1,
    whitelist: ['fligthReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducers,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga);