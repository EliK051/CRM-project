const SeleniumInfra = require("./seleniuminfra");

class BasePage {
  constructor() {
    this.selenium = new SeleniumInfra();
  }
}
module.exports = BasePage;
