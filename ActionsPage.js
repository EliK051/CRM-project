
class ActionsPage {
    constructor(selenium) {
        this.selenium =selenium
    }

    async navigateToActionsPage() {
        try {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/Actions")
            await this.selenium.validURL("Actions")
        }
        catch (error) {
            console.log(`something went wrong with navigateToClientsPage :${error}`)
        }
    }
/* fills update form with given category and detail
client: full name of client ,updateCategory:either transfer,
emailType or sold,updateDetail:The detail of update*/
    async updateFormFill(client, updateCategory, updateDetail) {

        try {
            await this.selenium.write(client, "css", ".client-input>input[list='names']")
            if (updateCategory == "transfer") {
                await this.selenium.write(updateDetail, "css", "input[list='owner']")
                await this.selenium.clickElement("css", 'input[type="button"][value="Transfer"]')
                console.log(`attempted to transfer ${client} to ${updateDetail}:`)
            }
            else if (updateCategory == "emailType") {
                await this.selenium.write(updateDetail, "css", 'input[list="emailType"]')
                await this.selenium.clickElement("css", 'input[type="button"][value="Send"]')
                console.log(`attempted to update emailType to ${updateDetail}:`)
            }
            else {
                await this.selenium.clickElement("css", "input[type='button'][value='Sold']")
                console.log("attempted click 'sold' button:")
            }

            let updateMsg = await this.selenium.findElementBy("css", 'div[class*="pop-up"]')
            console.log(await updateMsg.getText())
        }
        catch (error) {
            console.log(`something went wrong with updateFormFill:${error}`)
        }
    }

/* fills add client form with given details in order:
Full name,Last name,Country,Owner,Email*/

    async addClient(fName, lName, country, owner, email) {

        try {
            await this.selenium.write(fName, "id", "firstName")
            await this.selenium.write(lName, "id", "lastName")
            await this.selenium.write(country, "id", "country")
            await this.selenium.write(owner, "css", `input[id="owner"]`)
            await this.selenium.write(email, "id", "email")
            await this.selenium.clickElement("css", `input[class="add-client-btn"]`)
            console.log(`attempted click 'add' button with the following details: ${fName},${lName},${country},${owner},${email}:`)

            let updateMsg = await this.selenium.findElementBy("css", 'div[class*="pop-up"]')
            console.log(await updateMsg.getText())
        }
        catch (error) {
            console.log(`something went wrong with addClient:${error}`)
        }

    }




}

module.exports = ActionsPage

