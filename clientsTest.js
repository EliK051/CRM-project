const BasePage=require("./BasePage")
const ClientPage=require("./ClientsPage")
const HomePage=require("./HomePage")
const ActionPage=require("./ActionsPage")

class clientTest{
    constructor(){
        this.selenium=new BasePage().selenium
        this.clientpage=new ClientPage(this.selenium)
        this.homepage=new HomePage(this.selenium)
        this.actionspage=new ActionPage(this.selenium)

    }

    async navigateToClientsPage(){
        await this.clientpage.navigateToClientsPage();
    }

    async searchAndValidateClient(name){
        await this.clientpage.searchAndValidateClient(name)
    }

    async addCheck(name){//checks that a user doesn't exists ,then adding it, and making sure it appears    
        let before=await this.clientpage.searchAndValidateClient(name,"name");
        await this.homepage.clickActions();
        name=name.split(" ");
        await this.actionspage.addClient(name[0],name[1],"India","Janice Alvarado","C")
        await this.homepage.clickClients();
        let after=await this.clientpage.searchAndValidateClient(`${name[0]} ${name[1]}`);
        if(before!=after){
            console.log(`SUCCESS: the client ${name} has been added`)
        }
        else{
            console.log(`ERROR: the client ${name} failed to add`)
        }

    }


}


// let test=new clientTest();
// test.navigateToClientsPage();
// test.searchAndValidateClient("Chukri Bukri")//test 1
// test.addCheck("Chukri Bukri")//test 2
// test.searchAndValidateClient("Chukri Takari")//test 3
// test.clientpage.countProperty("Sold","No")



