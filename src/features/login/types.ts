export interface Empresa{
    id_empresa: number;
}
export interface Permiso{
    id_permiso: number;
    nombre_permiso: string;
    descripcion: string;
    estado: boolean;
}
export interface Rol{
    id_rol: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
    permisos: Permiso[];
}

export interface User {
    id_usuario: number;
    nombre_usuario: string;
    nombres: string;
    apellidos: string;
    roles: Rol[];
    empresas: Empresa[];
}


export interface LoginState{
    error: string;
    user: User;
    loggedIn?: boolean;
    status?: 'loading' | 'failed' | 'succeeded';
    performLogout: boolean;
}

export interface LoginResponse {
    data: User;
}
