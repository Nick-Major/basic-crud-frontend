export type Note = {
    id: number;
    content: string;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";

export interface CreateRequestProps<T = unknown> {
    url: string;
    method: HttpMethod;
    data?: T;
    options?: Omit<RequestInit, 'method' | 'body'>;
}