/*global browser */

const manifest = browser.runtime.getManifest();
const extname = manifest.name;

async function invertTabSelection(/*info, tab*/) {
    // Previously highlighted tabs not included in tabs will stop being highlighted. The first tab in tabs will become active.
    // ref. https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/highlight
    const tabs = (await browser.tabs.query({highlighted:false, currentWindow: true})).map( t => t.index);
    browser.tabs.highlight({tabs});
}

browser.menus.create({
	title: extname,
	contexts: ["tab"],
    command: "_execute_browser_action"
});

browser.browserAction.onClicked.addListener(invertTabSelection);

