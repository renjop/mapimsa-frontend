import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import {AuthProvider} from "react-oidc-context";
import awsmobile from "./aws-exports.ts";
import store from "./store";
import {Provider} from 'react-redux'

const router = createBrowserRouter([
    {
        path: '*',
        element:
            <AuthProvider {...awsmobile}>
                <App/>
            </AuthProvider>
    }
]);

createRoot(document.getElementById('wrapper')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>,
)
