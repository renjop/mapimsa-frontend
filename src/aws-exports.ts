import {WebStorageStateStore} from "oidc-client-ts";

const awsmobile = {
    authority: "http://localhost:4566/us-east-1_AFjPSVil8",
    client_id: "CkjRQGOQq0lLaQF7hTtNBXpxdW",
    redirect_uri: "http://localhost:3005",
    response_type: "code",
    scope: "phone openid email",
    userStore: new WebStorageStateStore({store: window.localStorage}),
}

export default awsmobile;