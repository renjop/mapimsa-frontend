import React from "react";
import {useAppSelector} from "../hooks.ts";
import type {RootState} from "../store.ts";


const HomepageContainer: React.FC = () => {
    const login = useAppSelector((state: RootState) => state.login);
    return (
        <div>
            Bienvenido {login.user.nombre_usuario}
        </div>
    );
}
export default HomepageContainer;