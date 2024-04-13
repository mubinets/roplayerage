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

import { UserRobloxCreationDate, CommunicationRequest, CommunicationResponse, ErrorCommunicationResponse, UserCache } from "../types/types";
import { isCommunicationResponse, isErrorCommunicationResponse } from "../utilities/TypeGuard"

const ROBLOX_ID_URL_PATTERN         : string    = "[a-zA-Z]+\\.roblox\\.com/users/(\\d+)/profile"
const ROBLOX_URL                    : string    = location.href
const ROBLOX_USERS_ENDPOINT         : string    = "https://users.roblox.com/v1/users/"

/*
    @param      string    url    |   the profile link to be used.
    @return     number
    
    Get the user ID of the roblox user by the roblox profile url (roblox.com/profile/ID).
*/
function getUserIdByRobloxUrl(url : string) : number | null {
    let regExPattern = new RegExp(ROBLOX_ID_URL_PATTERN);
    let result : RegExpMatchArray | null = url.match(regExPattern);
    
    // Return -1 if the result is null, otherwise returning the user ID.
    if (result) {
        let userId : number = parseInt(result[1]);
        return userId;
    }

    return null;
}

async function getCreationDateByUserId(userId : number) : Promise<UserRobloxCreationDate | null> {
     // Inserting the returned user ID in the endpoint.
     let fetchRobloxUsersEndpoint    : string = ROBLOX_USERS_ENDPOINT + userId;
     let joinDate                    : Date | null = null;
     let userRobloxCreationDate          : UserRobloxCreationDate | null = null;
     
    if (userId) {
        let response : Response = await fetch(fetchRobloxUsersEndpoint);

        let responseBody = await response.json();

        joinDate = new Date(responseBody.created);

        let newUserRobloxCreationDate : UserRobloxCreationDate = {
            year    : joinDate.getUTCFullYear(),
            month   : joinDate.getUTCMonth() + 1,
            day     : joinDate.getUTCDate(),
            hour    : joinDate.getUTCHours()
        }

        userRobloxCreationDate = newUserRobloxCreationDate;
        return userRobloxCreationDate;
    }

    return null;
}

async function isUserCreationDateCached(userId : number) {
    let communicationRequest : CommunicationRequest = {
        backgroundAPI: "IsUserCreationDateCached",
        parameters: [
            userId
        ]
    }

    let communicationResponse : CommunicationResponse | ErrorCommunicationResponse = await chrome.runtime.sendMessage(communicationRequest);
    if (isCommunicationResponse(communicationResponse)) {
        if (communicationResponse.results) {
            return communicationResponse.results[0];
        }
    }
}

async function cacheUserCreationDate(userRobloxCreationDate : UserRobloxCreationDate) : Promise<void> {
    let communicationRequest : CommunicationRequest = {
        backgroundAPI: "CacheUserCreationDate",
        parameters: [
            userId,
            userRobloxCreationDate
        ]
    }
    
    await chrome.runtime.sendMessage(communicationRequest);
}

async function getUserCreationDateCache(userId : number) : Promise<UserCache | null> {
    let communicationRequest : CommunicationRequest = {
        backgroundAPI: "GetUserCreationDateCache",
        parameters: [
            userId
        ]
    }
    
    let communicationResponse : CommunicationResponse = await chrome.runtime.sendMessage(communicationRequest);

    if (isCommunicationResponse(communicationResponse)) {
        if (communicationResponse.results) {
            return (communicationResponse.results[0] as UserCache);
        }
    }
    
    return null
}

// Get the user ID.
let userId = getUserIdByRobloxUrl(ROBLOX_URL);

if (userId) {

    function displayAgeContent(userCreationDate : UserRobloxCreationDate) {
        let newUserCreationDate : Date = new Date()

        // Setting up the date
        newUserCreationDate.setUTCFullYear(userCreationDate.year)
        newUserCreationDate.setUTCMonth(userCreationDate.month - 1)
        newUserCreationDate.setUTCDate(userCreationDate.day)
        newUserCreationDate.setUTCHours(userCreationDate.hour)

        // Subtraction
        let todayDate      : Date  = new Date()
        let differenceDateInMilliseconds : number = todayDate.getTime() - newUserCreationDate.getTime()

        let ageDate = new Date(differenceDateInMilliseconds)

        let ProfileAgeContainerElement : HTMLDivElement = document.createElement("div")
        ProfileAgeContainerElement.innerHTML = `<div class="profile-account-age-container"><div class="profile-account-age-container profile-account-age-title">Account Age</div><div class="section-content"><div class="profile-account-age-label-container"></div><div class="profile-account-age-container profile-account-age-tip-container"><div class="profile-account-age-container profile-account-age-tip">Loving RoPlayerAge and want to support?</div><a href="https://www.roblox.com/roplayerage/donate"><div class="profile-account-age-container profile-account-age-tip-link">Donate To The Developer!</div></a></div></div></div>`

        let profileContainer : HTMLCollectionOf<Element> = document.getElementsByClassName("btr-profile-about profile-about ng-scope")
        let parentContainer : ParentNode | null = profileContainer[0].parentNode

        let timeLabels : HTMLDivElement[] = []

        if ((ageDate.getUTCFullYear() - 1970) >= 1) {
            let yearLabelDIVElement : HTMLDivElement = document.createElement("div")
            yearLabelDIVElement.className = "profile-account-age-container profile-account-age-labels"
            yearLabelDIVElement.textContent = `${ageDate.getUTCFullYear() - 1970} Years`

            timeLabels.push(yearLabelDIVElement)
        }

        if ((ageDate.getUTCMonth()) >= 1) {
            let monthLabelDIVElement : HTMLDivElement = document.createElement("div")
            monthLabelDIVElement.className = "profile-account-age-container profile-account-age-labels"
            monthLabelDIVElement.textContent = `${ageDate.getUTCMonth()} Months`

            timeLabels.push(monthLabelDIVElement)
        }

        if ((ageDate.getUTCDate() - 1) >= 1) {
            let dayLabelDIVElement : HTMLDivElement = document.createElement("div")
            dayLabelDIVElement.className = "profile-account-age-container profile-account-age-labels"
            dayLabelDIVElement.textContent = `${ageDate.getUTCDate()} Days`

            timeLabels.push(dayLabelDIVElement)
        }
        
        if (parentContainer) {
            parentContainer.insertBefore(ProfileAgeContainerElement, profileContainer[0].nextSibling)

            let AgeLabelsContainerElement : HTMLDivElement = document.getElementsByClassName("profile-account-age-label-container")[0] as HTMLDivElement
            
            timeLabels.forEach((timeLabel) => {
                AgeLabelsContainerElement.appendChild(timeLabel)
            })

            let hourLabelDIVElement : HTMLDivElement = document.createElement("div")
            hourLabelDIVElement.className = "profile-account-age-container profile-account-age-labels"
            hourLabelDIVElement.textContent = `${ageDate.getUTCHours()} Hours`

            AgeLabelsContainerElement.appendChild(hourLabelDIVElement)
        }
    }

    (async () => {
        if (!await isUserCreationDateCached(userId)) {
            let userCreationDate = await getCreationDateByUserId(userId)

            if (userCreationDate) {
                await cacheUserCreationDate(userCreationDate)
                displayAgeContent(userCreationDate)
                return
            }
        }

        // Get the userCreationDate date.
        let userCache : UserCache | null = await getUserCreationDateCache(userId)

        if (userCache) {
            displayAgeContent(userCache.cache)
            return
        }
    })()
}