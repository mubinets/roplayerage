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

// Get the URL of the RoPlayerAge Banner in PNG.
let roplayerBannerPNG : string = chrome.runtime.getURL("assets/roplayerage_banner.png")

let roplayerageBannerDIVElement : HTMLDivElement = document.createElement("div")
roplayerageBannerDIVElement.innerHTML = `<div class="roplayerage-banner-container"><img class="roplayerage-banner" src="${roplayerBannerPNG}"></div>`
let donateLabelsContainerDIVElement : HTMLDivElement = document.createElement("div")
donateLabelsContainerDIVElement.innerHTML = `<div class="roplayerage-donate-labels-container"><div class="content roplayerage-donate-title-label">Thank you for your support!</div><div class="content roplayerage-donate-description-label">Thank you for considering donations. All funding from donations will be used for future development projects. If you can't donate, you can always share the extension with your friends!</div>`
let donateButtonsContainerDIVElement : HTMLDivElement = document.createElement("div")
donateButtonsContainerDIVElement.innerHTML = `<div class="roplayerage-buttons-container-wrapper"><div class="roplayerage-donate-buttons-container"><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088356028';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">100</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088358990';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">250</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088365127';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">500</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088365127';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">1,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088366643';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">2,500</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088369706';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">5,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088371666';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">7,500</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088372814';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">10,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088373970';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">25,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088375672';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">50,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088376506';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">100,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088377789';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">150,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088378739';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">300,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088381438';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">500,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088382906';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">750,000</div></div></div><div class="roplayerage-donate-buttons-container roplayerage-donate-button" onclick="window.location.href = 'https://www.roblox.com/catalog/17088384716';"><div class="roplayerage-donate-button roplayerage-donate-button-labels-container"><div class="roblox-icon"><div class="icon-robux-28x28 roplayerage-donate-button-robux-label"></div></div><div class="roplayerage-donate-button-labels-container roplayerage-donate-button-robux-amount-label">1,000,000</div></div></div></div></div>`
let donateDisclaimerContainerDIVElement : HTMLDivElement = document.createElement("div")
donateDisclaimerContainerDIVElement.innerHTML = `<div class="roplayer-donate-disclaimer-container"><span class="roplayerage-donate-disclaimer-note-label">Note: </span><span class="roplayerage-donate-disclaimer-label">Upon clicking on any donation button, the robux donation prompt will not be shown. Instead, you will be redirected to the Roblox gamepass page to finalize your donation.</span></div>`


// Get the reference DIV element.
let robloxContent : HTMLDivElement = document.getElementsByClassName("content")[0] as HTMLDivElement

if (robloxContent) {
    robloxContent.appendChild(roplayerageBannerDIVElement)
    robloxContent.appendChild(donateLabelsContainerDIVElement)
    robloxContent.appendChild(donateButtonsContainerDIVElement)
    robloxContent.appendChild(donateDisclaimerContainerDIVElement)
}