
class AnalyticsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToAnalyticsPage() {
        try {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/analytics")
            await this.selenium.validURL("analytics")
        }
        catch (error) {
            console.log(`something went wrong with navigateToAnalyticsPage:${error}`)
        }

    }

    /*the function recieves "email" or "outstanding" and returns that number corresponding with the keyword */
    async satisticInfo(subject) {

        try {
            if (subject == "email") {
                let emailNum = await this.selenium.findElementBy("css", ".badges>.badge:nth-child(2)>.badge-val")
                emailNum = await this.selenium.getTextFromElement(null, null, emailNum);//used selenium getext to wait a second to load
                console.log(`${subject} number:${emailNum}`)
                return emailNum;
            }
            else if (subject == "outstanding") {
                let outstandingNum = await this.selenium.findElementBy("css", '.badges>.badge:nth-child(3)>.badge-val')
                outstandingNum = await this.selenium.getTextFromElement(null, null, outstandingNum)
                console.log(`${subject} number:${outstandingNum}`)
                return outstandingNum;
            }
        }

        catch (error) {
            console.log(`something went wrong with satisticInfo:${error}`)
        }



    }
    async colorChangeValidation() {
        console.log("starting validation of color")
        let previousColor = await this.selenium.findElementBy("className", "color-btn")
        previousColor = await previousColor.getText();
        console.log(previousColor)
        await this.selenium.clickElement("className", "color-btn")
        let currentColor = await this.selenium.findElementBy("className", "color-btn")
        currentColor = await currentColor.getText();
        console.log(currentColor)
        if (currentColor != previousColor) {
            console.log(`succesfuly changed from ${currentColor} to ${previousColor}`)
        }

    }

}



module.exports = AnalyticsPage


