import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import {AuthProvider} from "react-oidc-context";
import awsmobile from "./aws-exports.ts";

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
        <RouterProvider router={router}/>
    </StrictMode>,
)
