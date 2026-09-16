import {User} from "oidc-client-ts"
import awsmobile from "src/aws-exports.ts";

export async function client(endpoint, {body, ...customConfig} = {}) {
    const headers = {
        'content-type': 'application/json',
    }

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    }

    if (body) {
        config.body = JSON.stringify(body)
    }

    try {
        const response = await window.fetch(endpoint, config)
        if (response.ok) {
            return await response.json()
        }
        return Promise.reject(response.status)
    } catch (err) {
        return Promise.reject(err.message)
    }
}

client.get = async function (endpoint, customConfig = {}) {
    customConfig = await setCommonHeaders(customConfig)
    return client(endpoint, {...customConfig, method: 'GET'})
}

client.post = async function (endpoint, body, customConfig = {}) {
    customConfig = await setCommonHeaders(customConfig)
    return client(endpoint, {...customConfig, body})
}

async function setCommonHeaders(customConfig = {}) {
    const user = getUser();
    if (user) {
        if (customConfig === undefined || customConfig.headers === undefined) {
            customConfig = {headers: {}}
        }
        customConfig['headers']['Authorization'] = `Bearer ${user.access_token}`
        customConfig['headers']['accept'] = 'application/json'
        customConfig['headers']['x-requested-with'] = 'XMLHttpRequest'
    }
    return customConfig
}

function getUser() {
    const oidcStorage = localStorage.getItem(`oidc.user:${awsmobile.authority}:${awsmobile.client_id}`)
    if (!oidcStorage) {
        return null;
    }

    return User.fromStorageString(oidcStorage);
}