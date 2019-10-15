
class HomePage {
    constructor(selenium) {
        this.selenium = selenium;
    }

    async navigateToHome() {
        
        try {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/")
        }
        catch (error) {
            console.log(`something went wrong with navigateToHome:${error}`)
        }
    };

    async clickClients() {
        try {
            await this.selenium.clickElement("css", ".nav-btn[value='Clients']")
            await this.selenium.validURL("client")
        }
        catch (error) {
            console.log(`something went wrong with clickClients:${error}`)
        }
    };
    async clickActions() {
        try {
            await this.selenium.clickElement("css", ".nav-btn[value='Actions']")
            await this.selenium.validURL("actions")
        }
        catch (error) {
            console.log(`something went wrong with clickActions :${error}`)
        }
    };
    async clickAnalytics() {
        try {
            await this.selenium.clickElement("css", ".nav-btn[value='Analytics']")
            await this.selenium.validURL("analytics")
        }
        catch (error) {
            console.log(`something went wrong with clickAnalytics:${error}`)
        }
    };
}

module.exports = HomePage


