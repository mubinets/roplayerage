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

import { CommunicationResponse, ErrorCommunicationResponse } from "../types/types";

export function isCommunicationResponse(variable : any): variable is CommunicationResponse  {
    return typeof variable === "object" && variable !== null && "statusCode" in variable && "results" in variable;
}

export function isErrorCommunicationResponse(variable : any): variable is ErrorCommunicationResponse  {
    return typeof variable === "object" && variable !== null && "message" in variable;
}