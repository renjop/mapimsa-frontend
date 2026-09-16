import {useAuth} from "react-oidc-context";
import awsmobile from "./aws-exports.ts";
import "./css/styles.scss";

function App() {
    const auth = useAuth();
    const signOutRedirect = () => {
        const clientId = awsmobile.client_id;
        const logoutUri = awsmobile.redirect_uri;
        const cognitoDomain = `${awsmobile.authority}`;
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    const testApiCall = async () => {
        const response = await window.fetch("http://localhost:8006/api/auth/token", {
            headers: {
                Authorization: `Bearer ${auth.user?.access_token}`,
            },
            method: "GET",
        })
        console.log(response);
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }
    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }
    if (auth.isAuthenticated) {
        return (
            <div>
                <pre> Hello: {auth.user?.profile.email} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>

                <button onClick={() => {
                    auth.removeUser().then((response) => {
                        console.log(response);
                    }).catch(err => {
                        console.log(err);
                    })
                }}>Sign out
                </button>
                <br/>
                <button onClick={() => {
                    testApiCall().then((response) => {
                        console.log(response)
                    }).catch((err) => {
                        console.log(err)
                    })
                }}>Call API
                </button>
            </div>
        );
    }
    return (
        <div>
            <button onClick={() => {
                auth.signinRedirect().then((result) => {
                    console.log(result)
                }).catch(err => {
                    console.log(err)
                })
            }}>Sign in
            </button>
            <button onClick={() => signOutRedirect()}>Sign out</button>
            <br/>

        </div>
    );
}

export default App
