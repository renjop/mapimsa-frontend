import {User} from "oidc-client-ts"
import awsmobile from "../aws-exports";

type HeaderMap = Record<string, string>

export interface ClientConfig extends Omit<RequestInit, 'body' | 'headers'> {
    body?: unknown
    headers?: HeaderMap
}

export async function client<T = unknown>(
    endpoint: string,
    {body, ...customConfig}: ClientConfig = {},
): Promise<T> {
    const headers: HeaderMap = {
        'content-type': 'application/json',
    }

    const config: RequestInit = {
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
            return await response.json() as T
        }
        return Promise.reject(response.status)
    } catch (err) {
        return Promise.reject(err instanceof Error ? err.message : String(err))
    }
}

client.get = async function <T = unknown>(
    endpoint: string,
    customConfig: Omit<ClientConfig, 'body' | 'method'> = {},
): Promise<T> {
    return client<T>(endpoint, {...setCommonHeaders(customConfig), method: 'GET'})
}

client.post = async function <T = unknown>(
    endpoint: string,
    body?: unknown,
    customConfig: Omit<ClientConfig, 'body'> = {},
): Promise<T> {
    return client<T>(endpoint, {...setCommonHeaders(customConfig), body})
}

function setCommonHeaders<C extends ClientConfig>(customConfig: C): C {
    const user = getUser()
    if (!user) {
        return customConfig
    }

    return {
        ...customConfig,
        headers: {
            ...customConfig.headers,
            'Authorization': `Bearer ${user.access_token}`,
            'accept': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
        },
    }
}

function getUser(): User | null {
    const oidcStorage = localStorage.getItem(`oidc.user:${awsmobile.authority}:${awsmobile.client_id}`)
    if (!oidcStorage) {
        return null
    }

    return User.fromStorageString(oidcStorage)
}
