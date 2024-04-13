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

async function removeErrorContent() {
    let currentInterval : NodeJS.Timeout = setInterval(() => {
        let errorContentDivElement : HTMLDivElement = document.getElementsByClassName("request-error-page-content")[0] as HTMLDivElement;

        // Checking if the error content exists in the document.
        if (errorContentDivElement) {
            errorContentDivElement.remove();
            clearInterval(currentInterval)
        }
    }, 0)
}

(async () => {
    await removeErrorContent()
})();