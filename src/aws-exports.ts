import {WebStorageStateStore} from "oidc-client-ts";

interface AuthConfig {
    authority: string,
    client_id: string,
    redirect_uri: string,
    response_type: string,
    scope: string,
    userStore: WebStorageStateStore,
}

const awsmobile: AuthConfig = import.meta.env.DEV ? {
    authority: "http://localhost:4566/us-east-1_YIYtwvbnF",
    client_id: "VBIJ99mujuKjT7DKvOcTEzqdDA",
    redirect_uri: "http://localhost:3005/auth",
    response_type: "code",
    scope: "phone openid email",
    userStore: new WebStorageStateStore({store: window.localStorage}),
} : {
    authority: "http://localhost:4566/us-east-1_YIYtwvbnF",
    client_id: "VBIJ99mujuKjT7DKvOcTEzqdDA",
    redirect_uri: "http://localhost:3005/auth",
    response_type: "code",
    scope: "phone openid email",
    userStore: new WebStorageStateStore({store: window.localStorage}),
}

export default awsmobile;