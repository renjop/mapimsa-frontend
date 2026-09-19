export interface PagerMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    path: string;
}

export interface PagerLinks {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: PagerLinks;
    meta: PagerMeta;
}
