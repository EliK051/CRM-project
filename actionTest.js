const BasePage = require("./BasePage")
const ClientPage = require("./ClientsPage")
const ActionsPage = require("./ActionsPage")
const HomePage = require("./HomePage")

class actionsTest {
    constructor() {
        this.selenium = new BasePage().selenium
        this.clientpage = new ClientPage(this.selenium)
        this.homepage = new HomePage(this.selenium)
        this.actionspage = new ActionsPage(this.selenium)

    }

    async navigateToActionsPage() {
        await this.actionspage.navigateToActionsPage();
    }

    async updateFormFill(client, updateCategory, updateDetail) {//checks web update form correct pop-up message 
        await this.actionspage.updateFormFill(client, updateCategory, updateDetail);
    }

    async changeOwnerTest(cName, oName) {//checks owner transfer functionality
        await this.homepage.clickClients()
        let previous = await this.clientpage.searchOwner(cName)
        await this.homepage.clickActions();
        await this.actionspage.updateFormFill(cName, "transfer", oName);
        await this.homepage.clickClients()
        let current = await this.clientpage.searchOwner(cName)
        if (current.toLowerCase() == oName.toLowerCase()) {
            console.log(`succesfully transfered ${cName} from ${previous} to ${current}`)
        }
        else {
            console.log(`transfer failed for ${cName} from ${previous} to ${current}`)
        }
    }

    async changeSaleStatus(name) {
        await this.homepage.clickClients();
        let previous = await this.clientpage.soldStatus(name);
        console.log(`${name}'s sold status is: ${previous}`)
        console.log(`starting change of sold status`)
        await this.homepage.clickActions();
        await this.actionspage.updateFormFill(name, "sold", true)
        await this.homepage.clickClients();
        let current = await this.clientpage.soldStatus(name)
        console.log(`${name}'s sold status is: ${current}`)
        if(previous!=current){
            console.log("SUCCESS: succesfuly changed sale status")
        }
        else{
            console.log("ERROR: update sale status failed")
        }
    }


}

// const test = new actionsTest()
// test.navigateToActionsPage();
// test.changeOwnerTest("Larson Kemp","leila Howe")//test 1
// test.updateFormFill("buri chuki","transfer","Leila Howe")//test 2
// test.changeSaleStatus("Halag Or");//test 3
