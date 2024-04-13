/*

	Author  :  Mubinet (@mubinets | 5220307661)
	Date    :  4/3/2024
	Version :  1.0.0a
    
    --- [  NOTE  ] ---
    * RoPlayerAge is a Roblox extension developed by Mubinet for the purpose of allowing you to view the age of accounts of players live.
    * For any question, issue, and/or suggestion, please contact me on the following platforms:
    
    Discord: Mubinet
    Twitter: @mubinets
    
*/

import { CACHE_DATA_KEY, TARGET_DONATECONTENT_URL } from "../constant/constant"
import { UserCache, CacheLocalStorage, Status, CommunicationResponse, ErrorMessages, ErrorCommunicationResponse, CommunicationRequest, UserRobloxCreationDate } from "../types/types"
import { isCommunicationResponse, isErrorCommunicationResponse } from "../utilities/TypeGuard"

/*
------------ [ EXECUTE CONTENT SCRIPTS ] ------------
*/
chrome.tabs.onUpdated.addListener((tabId : number, changeInfo : chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    if (tab.url && changeInfo.status === 'loading') {
        if (tab.url == TARGET_DONATECONTENT_URL) {
            let tabScriptTarget : chrome.scripting.InjectionTarget = {
                tabId: tabId
            }

            let scriptConfig : chrome.scripting.ScriptInjection<any[], unknown> = {
                target: tabScriptTarget,
                files: ["src/contents/removeErrorContent.js"],
                injectImmediately: true
            }

            chrome.scripting.executeScript(scriptConfig)
        }
    }
})

/*
------------ [ BACKGROUND FUNCTION APIS ] ------------
*/
async function cacheUserCreationDateAPI(parameters : [number, UserRobloxCreationDate]) : Promise<CommunicationResponse | ErrorCommunicationResponse> {
    // Fetch local storage data, create new data if it doesn't exist.
    let data = await chrome.storage.local.get(CACHE_DATA_KEY)
    let bytesInUse = await chrome.storage.local.getBytesInUse(Object.keys(data))

    function createCache() : UserCache {
        // Creating a cache.
        let userCache : UserCache = {
            userId  : parameters[0],
            cache   : parameters[1]
        }

        return userCache
    }

    // If the amount of bytes in use is zero, it means that the data fetched is empty.
    if (bytesInUse == 0) {
        let userCache : UserCache = createCache()

        let cacheLocalStorage : CacheLocalStorage = {
            caches: []
        }

        // Appending the user cache to the local storage caches.
        cacheLocalStorage.caches.push(userCache)

        // Setting the new data in the local storage.
        await chrome.storage.local.set({[CACHE_DATA_KEY]: cacheLocalStorage})

        // Return the new resolved communication response.
        return createCommunicationResponse(Status.Resolved, null)
    }
    // The data exists. Appending the new user cache to it.
    // The user must only be cached once. Rejecting if there is already the cache for the user.
        
    let cacheLocalStorage = data[CACHE_DATA_KEY] as CacheLocalStorage
    let foundCache = cacheLocalStorage.caches.find((userCacheInstance : UserCache) => userCacheInstance.userId == parameters[0])

    if (foundCache) {
        return createErrorMessage(ErrorMessages.CannotCacheTwice)
    }

    let userCache : UserCache = createCache()

    cacheLocalStorage.caches.push(userCache)

    await chrome.storage.local.set({[CACHE_DATA_KEY]: cacheLocalStorage})

    return createCommunicationResponse(Status.Resolved, null)
}

async function isUserCreationDateCachedAPI(parameters : [number]) : Promise<CommunicationResponse | ErrorCommunicationResponse> {
    let data = await chrome.storage.local.get(CACHE_DATA_KEY)
    let bytesInUse = await chrome.storage.local.getBytesInUse(Object.keys(data))

    if (bytesInUse == 0) {
        return createCommunicationResponse(Status.Resolved, [false])
    }

    let cacheLocalStorage = data[CACHE_DATA_KEY] as CacheLocalStorage
    let foundCache = cacheLocalStorage.caches.find((userCacheInstance : UserCache) => userCacheInstance.userId == parameters[0])

    if (foundCache) {
        return createCommunicationResponse(Status.Resolved, [true])
    }

    return createCommunicationResponse(Status.Resolved, [false])
}

async function getUserCreationDateCacheAPI(parameters : [number]) : Promise<CommunicationResponse | ErrorCommunicationResponse> {
    let data = await chrome.storage.local.get(CACHE_DATA_KEY)
    let bytesInUse = await chrome.storage.local.getBytesInUse(Object.keys(data))

    if (bytesInUse == 0) {
        return createErrorMessage(ErrorMessages.NoCacheToFetch)
    }

    let cacheLocalStorage = data[CACHE_DATA_KEY] as CacheLocalStorage
    let foundCache : UserCache | undefined = cacheLocalStorage.caches.find((userCacheInstance : UserCache) => userCacheInstance.userId == parameters[0])

    if (foundCache) {
        return createCommunicationResponse(Status.Resolved, [foundCache])
    }

    return createCommunicationResponse(Status.Resolved, [false])
}

/*
------------ [ UTILITY ] ------------
*/

async function createCommunicationResponse(newStatus : Status, newResults : unknown[] | null) : Promise<CommunicationResponse> {
    let communicationResponse : CommunicationResponse = {
        statusCode: newStatus,
        results: newResults
    }

    return communicationResponse
}

async function createErrorMessage(errorMessage : ErrorMessages) : Promise<ErrorCommunicationResponse> {
    let errorCommunicationResponse : ErrorCommunicationResponse = {
        message: errorMessage
    }

    return errorCommunicationResponse
}

let backgroundAPIList = new Map<string, (...parameters: any[]) => Promise<CommunicationResponse | ErrorCommunicationResponse>>();
backgroundAPIList.set("CacheUserCreationDate", cacheUserCreationDateAPI);
backgroundAPIList.set("IsUserCreationDateCached", isUserCreationDateCachedAPI);
backgroundAPIList.set("GetUserCreationDateCache", getUserCreationDateCacheAPI);

/*
------------ [ BACKGROUND COMMUNICATION ] ------------
*/
chrome.runtime.onMessage.addListener((communicationRequest: CommunicationRequest, _sender, sendResponse) => {
    // Check guards.
    let areBackgroundAPIsMatched : boolean = false;

    backgroundAPIList.forEach((backgroundAPICallBack, backgroundAPI) => {
        if (communicationRequest.backgroundAPI == backgroundAPI) {
            areBackgroundAPIsMatched = true;
        }
    })

    if (!areBackgroundAPIsMatched) {
        createErrorMessage(ErrorMessages.BackgroundAPIInvaild)
        return
    }

    // Call the background API.
    let callbackBackgroundAPI = backgroundAPIList.get(communicationRequest.backgroundAPI)!;

    (async () => {
        let communicationResponse : CommunicationResponse | ErrorCommunicationResponse = await callbackBackgroundAPI(communicationRequest.parameters)

        if (isCommunicationResponse(communicationResponse)) {
            sendResponse(communicationResponse)
        } else if (isErrorCommunicationResponse(communicationResponse)) {
            sendResponse(communicationResponse)
        }
    })()

    return true
})