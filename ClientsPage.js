
class ClientsPage {
    constructor(selenium) {
        this.selenium = selenium
    }

    async navigateToClientsPage() {
        try {
            await this.selenium.getURL("https://lh-crm.herokuapp.com/client")
            await this.selenium.validURL("client")
        }
        catch (error) {
            console.log(`something went wrong with navigateToClientsPage :${error}`)
        }
    }

    /*This method gets an input to search client name 
    Return value: true if client exist, false otherwise
    */
    async searchAndValidateClient(input) {// suppose to validate by other types of search
        try {

            await this.selenium.write("name", "css", ".search-clients>.select-css")
            await this.selenium.write(input, "css", ".search-clients>input[type='text']")
            if (!await this.selenium.isElementExists("css", ".clientDetails>th")) {//checks whether any client comes up to search
                console.log(`The client ${input} is not found`);
                return false;
            }

            let firstRowList = await this.selenium.findElementListBy("css", ".clientDetails>th")
            let firstName = await firstRowList[0].getText();
            let lastName = await firstRowList[1].getText();
            let fullName = `${firstName} ${lastName}`
            console.log(`about to compare ${fullName} with ${input}`)

            if (fullName.toLowerCase() == input.toLowerCase()) {
                console.log(`The client ${input} exists`)
                return true;
            } 
            else{
                console.log(`The client ${input} is not found`)
            }
        }
        catch (error) {
            console.log(`Something went wrong with SearchAndValidateClient:${error}`)
        }
    }

    async searchOwner(input) {
        try {
            await this.selenium.write("name", "css", ".search-clients>.select-css")
            await this.selenium.write(input, "css", ".search-clients>input[type='text']")
            if (!await this.selenium.isElementExists("css", ".clientDetails>th")) {//checks whether any client comes up to search
                console.log(`The client ${input} is not found`);
                return false;
            }
            let firstRowList = await this.selenium.findElementListBy("css", ".clientDetails>th")//.clientDetails>th:first-child
            return await firstRowList[4].getText()
        }
        catch (error) {
            console.log(`Something went wrong with searchOwner:${error}`)
        }
    }

    async soldStatus(input) {//checks sold status on a specific client
        try {

            await this.selenium.write("name", "css", ".search-clients>.select-css")
            await this.selenium.write(input, "css", ".search-clients>input[type='text']")
            if (!await this.selenium.isElementExists("css", ".clientDetails>th")) {//checks whether any client comes up to search
                console.log(`The client ${input} is not found`);
                return false;
            }

            let firstRowList = await this.selenium.findElementListBy("css", ".clientDetails>th")
            console.log(await firstRowList[5].getText())
            return await firstRowList[5].getText()
        }
        catch (error) {
            console.log(`Something went wrong with soldStatus:${error}`)
        }

    }

    /*
    the functions counts the total number of clients with SOLD:no
    or counts the total number of email
    searchType:Either sold or email type
    searchDetail:What to search for
    */
    async countProperty(searchType, searchDetail) {
        try {

            await this.selenium.write(searchType, "css", ".search-clients>.select-css")
            await this.selenium.write(searchDetail, "css", ".search-clients>input[type='text']")
            if (!await this.selenium.isElementExists("css", ".clientDetails>th")) {
                console.log(`The property ${searchDetail} of ${searchType} is not found`);
                return false;
            }

            let totalPages = await this.selenium.findElementBy("css", ".page-numbers>.page:nth-child(4)")
            totalPages = await totalPages.getText();
            totalPages = parseInt(totalPages, 10)
            console.log(totalPages)
            let currentPageListNum = 0;
            let holder
            console.log(currentPageListNum)
            for (let i = 0; i < totalPages; i++) {
                holder = await this.selenium.findElementListBy("css", ".clientDetails")
                currentPageListNum += await holder.length;
                console.log(`counting ${searchType} : ${currentPageListNum1}`)
                await this.selenium.clickElement("css", "img[name='next']")
            }
            return currentPageListNum;
        }
        catch (error) {
            console.log(`Something went wrong with countProperty:${error}`)
        }
    }






}

module.exports = ClientsPage
