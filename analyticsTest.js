const BasePage = require("./BasePage")
const ClientPage = require("./ClientsPage")
const HomePage = require("./HomePage")
const AnalyticPage = require("./AnalyticsPage")


class analyticsTest {
    constructor() {
        this.selenium = new BasePage().selenium;
        this.clientpage = new ClientPage(this.selenium);
        this.homepage = new HomePage(this.selenium);
        this.analyticpage = new AnalyticPage(this.selenium)
    }

    async navigateToAnalyticsPage() {
        await this.analyticpage.navigateToAnalyticsPage();
    }

    async confirmOutStanding() {

        let statNum = await this.analyticpage.satisticInfo("outstanding")
        console.log(`on the stat page it presents ${statNum} outstanding clients`)
        await this.homepage.clickClients();
        let statCount = await this.clientpage.countProperty("sold","no")
        console.log(`on the clients page, the count is: ${statCount} outstanding clients`)
        if (statNum == statCount) {
            console.log("SUCCESS: the data of outstanding clients is correct")
        }
        else {
            console.log("ERROR: the numbers do not match")
        }
    }

    async confirmEmailSent() {//count 'null' email and substract that from total num of clients
        let statNum = await this.analyticpage.satisticInfo("email")
        console.log(`on the stat page it presents ${statNum} email sent`)
        await this.homepage.clickClients();
        let statCount = await this.clientpage.countProperty("email type")
        await this.clientpage.navigateToClientsPage();//to reset page count
        statCount = parseInt(statCount, 10)
        let total = await this.clientpage.countProperty("name")//to get total number of clients
        total = parseInt(total, 10)
        statCount = total - statCount
        console.log(`the counted number of email sent is :${statCount}`)
        if (statNum == statCount) {
            console.log("SUCCESS: the data of email sent is correct")
        }
        else {
            console.log("ERROR: the data of email sent is NOT correct")
        }
    }

    async colorChangeValidation(){
        this.analyticpage.colorChangeValidation();
    }

}


let test = new analyticsTest();
test.navigateToAnalyticsPage();
// test.getHighestHeigh();
// test.confirmOutStanding();//test 1
// test.confirmEmailSent()//test 2
// test.colorChangeValidation();//test 3

