export type CommunicationRequest = {
    backgroundAPI       : string,
    parameters          : unknown[] | null
}

export enum Status {
    "Resolved",
    "Rejected"
}

export enum ErrorMessages {
    BackgroundAPIInvaild,
    CannotCacheTwice,
    NoCacheToFetch
}

export type UserRobloxCreationDate = {
    year    : number,
    month   : number,
    day     : number,
    hour    : number
}

export type UserCache = {
    userId  : number,
    cache   : UserRobloxCreationDate
}

export type CacheLocalStorage = {
    caches: UserCache[]
}

export type CommunicationResponse = {
    statusCode  : Status,
    results     : unknown[]  | null
}

export type ErrorCommunicationResponse = {
    message: ErrorMessages
}