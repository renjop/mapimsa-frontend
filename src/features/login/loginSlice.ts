import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {type LoginState, type LoginResponse} from './types';
import {client} from "../../api/client";
import {properties} from "../../properties.tsx";

const initialState: LoginState = {
    error: "",
    user: {
        id_usuario: 0,
        nombre_usuario: "",
        nombres: "",
        apellidos: "",
        roles: [],
        empresas: []
    },
    loggedIn: false,
    performLogout: false,
};

export const login = createAsyncThunk(
    'login',
    async () => {
        const response = await client.get(properties.AUTH);
        return response as LoginResponse;
    }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        reset: (state) => {
            state.loggedIn = false;
            state.performLogout = false;
        },
        logout: (state) => {

            state.loggedIn = false;
            state.performLogout = true;
            state.user = {
                ...state.user,
            };
        },
        restore: (state, action: PayloadAction<LoginState>) => {
            state.user = action.payload.user;
            state.performLogout = false;
        }
    },
    extraReducers: (builder => {
            builder.addCase(login.pending, (state) => {
                state.status = 'loading';
            });
            builder.addCase(login.rejected, (state) => {
                state.status = 'failed';
                state.error = "Usuario o contraseña incorrecta";
                toast.error(state.error);
            });
            builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                if (action.payload.data.id_usuario > 0) {
                    state.status = 'succeeded';
                    state.user = action.payload.data;
                    state.loggedIn = true;
                    state.performLogout = false;
                } else {
                    state.status = 'failed';
                    state.error = "Usuario o contraseña incorrecta";
                    toast.error(state.error);
                }
            });
        }
    )
});

export const {
    logout,
    restore,
    reset
} = loginSlice.actions;
