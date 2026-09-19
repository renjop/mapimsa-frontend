import React, {Suspense, useEffect, useRef, useState} from "react";
import {setLocale} from 'yup';
import {ScrollRestoration} from 'react-router-dom';
import "./css/styles.scss";
import {ToastContainer} from "react-toastify";
import {CContainer} from "@coreui/react";
import {Route, Routes} from 'react-router';
import {hasAuthParams, useAuth} from "react-oidc-context";
import NavComponent from "./components/NavComponent.tsx";
import TopNavbarComponent from "./components/TopNavbarComponent.tsx";
import {useAppDispatch} from "./hooks.ts";
import {login} from "./features";
import HomepageContainer from "./containers/HomepageContainer.tsx";
import NotFoundContainer from "./containers/NotFoundContainer.tsx";
import ScrollToTopComponent from "./components/ScrollToTopComponent.tsx";
import packageJson from '../package.json';

const AuthContainer = React.lazy(() => import('./containers/AuthContainer.tsx'));

function App() {
    const auth = useAuth();
    const hasTriedSignin = useRef(false);
    const [sidebarVisible, setSidebarVisible] = useState(() => window.innerWidth >= 768);
    const dispatch = useAppDispatch();

    useEffect(() => {

        if (!hasAuthParams() &&
            !auth.isAuthenticated &&
            !auth.activeNavigator &&
            !auth.isLoading &&
            !hasTriedSignin.current) {
            void auth.signinRedirect();
            hasTriedSignin.current = true;
        } else if (!hasAuthParams() &&
            auth.isAuthenticated) {
            void dispatch(login());
        }
    }, [auth, dispatch]);
    useEffect(() => {
            return auth.events.addAccessTokenExpiring(() => {
                void auth.signinSilent();
            })
        },
        [auth,
            auth.events,
            // eslint-disable-next-line @typescript-eslint/unbound-method
            auth.signinSilent,
        ]);
    setLocale({
        mixed: {
            'notType': ({path}: { path?: string }) => {
                return `${path} es inválido`;
            }
        }
    });


    return (
        <>
            <ScrollRestoration/>
            <ToastContainer position="top-right"
                            autoClose={3000}
                            theme={'colored'}
                            hideProgressBar={true}
                            newestOnTop={true}/>
            {auth.isAuthenticated && (
                <NavComponent visible={sidebarVisible}
                              onVisibleChange={setSidebarVisible}
                />
            )}
            <div className="wrapper d-flex flex-column min-vh-100">
                <div className="body flex-grow-1">
                    {auth.isAuthenticated && (
                        <TopNavbarComponent onToggleSidebar={() => setSidebarVisible((visible) => !visible)}/>
                    )}
                    <CContainer fluid={true}>
                        <Suspense fallback={<div/>}>
                            <Routes>
                                <Route path="/" element={<HomepageContainer/>}/>
                                {/*Authentication Routes*/}
                                <Route path="/auth" element={<AuthContainer/>}/>
                                <Route path="/*" element={<NotFoundContainer />} />
                            </Routes>
                        </Suspense>
                    </CContainer>
                </div>
                <footer className="bg-white sticky-footer pb-3">
                    <div className="container my-auto">
                        <div className="text-center my-auto copyright">
                            <span>Copyright © {import.meta.env.VITE_WEBSITE_NAME}</span><br />
                            <span className="text-muted small">v{packageJson.version}</span>
                        </div>
                    </div>
                </footer>
                <ScrollToTopComponent />
            </div>
        </>
    );
}

export default App
