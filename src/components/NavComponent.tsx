import React from "react";
import {useAppSelector} from "../hooks.ts";
import type {RootState} from "../store.ts";
import {CButton, CNavGroup, CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav} from "@coreui/react";
import {CIcon} from "@coreui/icons-react";
import {cilSidebarClose, cilSidebarOpen} from "@coreui/icons";
import {Link} from 'react-router-dom';

interface CustomPermission {
    name: string;
    route: string;
    id: number;
}

interface NavComponentProps {
    visible: boolean;
    onVisibleChange: (visible: boolean) => void;
}

const NavComponent: React.FC<NavComponentProps> = props => {
    const [unfoldable, setUnfoldable] = React.useState(false);
    const login = useAppSelector((state: RootState) => state.login);
    const permisos_comerciales: CustomPermission[] = [];
    const permisos_fabricacion: CustomPermission[] = [];
    const permisos_operaciones: CustomPermission[] = [];
    const permisos_compras: CustomPermission[] = [];
    const permisos_tesoreria: CustomPermission[] = [];
    const permisos_contabilidad: CustomPermission[] = [];
    const permisos_rrhh: CustomPermission[] = [];
    const permisos_configuraciones: CustomPermission[] = [];
    login.user.roles
        .slice()
        .forEach(role => {
            role.permisos.slice()
                .filter(permission => permission.estado)
                .forEach((permission) => {
                    let permission_name: string | undefined;
                    let permission_route: string | undefined;
                    let permissions: CustomPermission[] | undefined;
                    if (permission.nombre_permiso === 'empresas.list') {
                        permission_name = "Empresas";
                        permission_route = '/empresas';
                        permissions = permisos_configuraciones;
                    }
                    if (permission_route
                        && permission_name
                        && permissions
                        && !permissions.find(p => permission.id_permiso === p.id)) {
                        permissions.push({
                            name: permission_name,
                            route: permission_route,
                            id: permission.id_permiso,
                        });
                    }
                })
        });
    return (
        <>
            <CSidebar
                className={'border-end h-100'}
                colorScheme={'dark'}
                position={'fixed'}
                visible={props.visible}
                onVisibleChange={props.onVisibleChange}
                unfoldable={unfoldable}>
                <CSidebarHeader>
                    <CSidebarBrand href="/">
                        <div className={'d-sidebar-narrow-none'}>{import.meta.env.VITE_WEBSITE_NAME}</div>
                        <div className={'d-sidebar-narrow'}><i className={'fa fa-home'}/></div>
                    </CSidebarBrand>
                    <CButton
                        className="d-flex d-sidebar-narrow-none"
                        size="sm"
                        variant="ghost"
                        onClick={() => setUnfoldable(!unfoldable)}
                    >
                        <CIcon className="icon icon-lg d-sidebar-narrow-unfoldable" icon={cilSidebarOpen}/>
                        <CIcon className="icon icon-lg d-sidebar-narrow-unfoldable-none" icon={cilSidebarClose}/>
                    </CButton>
                </CSidebarHeader>
                <CSidebarNav variant={'tree'}>
                    {permisos_comerciales.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fa fa-user'}/> Comerciales
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_comerciales.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}
                    {permisos_fabricacion.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fas fa-hard-hat'}/> Fabricación
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_fabricacion.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}
                    {/*    */}
                    {permisos_operaciones.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fas fa-tag'}/> Operaciones
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_operaciones.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}
                    {permisos_compras.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fas fa-inbox'}/> Compras
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_compras.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}
                    {permisos_tesoreria.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fa fa-bank'}/> Tesorería
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_tesoreria.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}
                    {permisos_contabilidad.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fas fa-th-list'}/> Contabilidad
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_contabilidad.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}
                    {permisos_rrhh.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fa fa-users'}/> Recursos Humanos
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_rrhh.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}
                    {permisos_configuraciones.length > 0 && (
                        <CNavGroup compact={true} toggler={({visible}) => (
                            <>
                                <i className={'nav-icon fa fa-cog'}/> Configuraciones
                                <span className={'nav-group-toggle-indicator'}>
                                    &nbsp;<i className={visible ? 'fa fa-minus' : 'fa fa-plus'}/>
                                </span>
                            </>
                        )}>
                            {permisos_configuraciones.map((permission) => (
                                <Link to={{
                                    pathname: permission.route
                                }}
                                      className={'nav-link'}
                                      key={`permission_${permission.id}`}
                                >
                                    <span>{permission.name}</span>
                                </Link>
                            ))}
                        </CNavGroup>
                    )}


                </CSidebarNav>
            </CSidebar>
        </>
    );
}

export default NavComponent;