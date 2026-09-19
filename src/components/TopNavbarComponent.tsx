import React from "react";
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {type RootState} from "../store.ts";
import {logout} from "../features";
import {
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react';
import {useAuth} from "react-oidc-context";

interface TopNavbarComponentProps {
    onToggleSidebar: () => void;
}

const TopNavbarComponent: React.FC<TopNavbarComponentProps> = props => {
    const dispatch = useAppDispatch();
    const login = useAppSelector((state: RootState) => state.login);
    const auth = useAuth();
    return (
        <nav className={'navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top'}>
            <CContainer fluid={true}>
                <button
                    className={'btn btn-link d-md-none rounded-circle me-3'}
                    id={'sidebarToggleTop'}
                    onClick={props.onToggleSidebar}
                    type={'button'}>
                    <i className={'fas fa-bars'}/>
                </button>
                <ul className={'navbar-nav flex-nowrap ms-auto'}>
                    <div className={'d-none d-sm-block topbar-divider'}>
                        <CDropdown variant={'nav-item'}>
                            <CDropdownToggle caret={false}>
                                <span className={'d-none d-lg-inline me-2 text-gray-600 small'}>
                                    {login.user.nombre_usuario}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="fa-fw border rounded-circle img-profile"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem onClick={() => {
                                    dispatch(logout());
                                    void auth.removeUser();
                                }}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400" />
                                    Cerrar Session
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                </ul>
            </CContainer>
        </nav>
    );
};

export default TopNavbarComponent;