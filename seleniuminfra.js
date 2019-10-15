const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

class SelenuimInfra {
  constructor() {
    this.driver = new Builder().forBrowser('chrome').build();
  }


  async getURL(URL) { // Open browser
    await this.driver.get(URL)
    await this.driver.sleep(100);
  }

  async close() { // Close browser
    // setTimeout(() => {
    this.driver.quit()
    // }, 1000)
  }
  async sleep(num) {
    await this.driver.sleep(num)
  }


  async check(element) {
    if (this.driver.wait(until.elementIsVisible(element), 10000)) {
      console.log(`This Is The element :${element}`)
      return true
    }
    else {
      console.log(`Wrong! This Is Wrong :${element} not selected`)
      return false
    }
  }

  async validURL(pageName) {
    if (this.driver.wait(until.urlContains(pageName), 10000)) {
      console.log(`This Is The Right URL that contains the keyword:${pageName}`)
      return true
    }
    else {
      console.log(`Wrong! This Is Wrong URL it does NOT contain the keyword:${pageName}`)
      return false
    }
  }

  // Click on element
  async clickElement(locatorType = "id", locatorValue = " ", element, fromElement) {
    try {
      if (!element) {
        if (fromElement) {
          element = await fromElement.findElement(By[locatorType](locatorValue))
        } else {
          element = await this.driver.findElement(By[locatorType](locatorValue))
        }
      }
      await this.driver.sleep(500)
      await element.click()
      await this.driver.sleep(500)

      console.log(`Clicked on element with ${locatorType} = ${locatorValue}`)
    }
    catch (error) {
      console.error(`Got error while trying to click on element with ${locatorType} = ${locatorValue}`)
    }
  }


  // Send Keys To Element
  async write(data, locatorType, locatorValue, element, fromElement) {
    try {
      if (!element) {
        if (fromElement) {
          element = await fromElement.findElement(By[locatorType](locatorValue))
        } else {
          element = await this.driver.findElement(By[locatorType](locatorValue))
        }
      }
      await element.sendKeys(data)
      console.log(`Send Keys to element with ${locatorType} = ${locatorValue} `)
    }
    catch (error) {
      console.error(`Got error while trying to send keys to element with ${locatorType} = ${locatorValue}`)
    }
  }

  // Get text from element
  async getTextFromElement(locatorType, locatorValue, element, fromElement) {
    await this.driver.sleep(500)
    try {
      if (!element) {
        if (fromElement) {
          element = await fromElement.findElement(By[locatorType](locatorValue))
        } else {
          element = await this.driver.findElement(By[locatorType](locatorValue))
        }
        console.log(`Get text from element with ${locatorType} = ${locatorValue} `)
      }
      console.log(`Get text from element ${element} `)
      return await element.getText()
    }
    catch (error) {
      console.error(`Got error while trying to get text from element with ${locatorType} = ${locatorValue}`)
      console.log(error)
      return ""
    }
  }

  // Clear element field
  async clearElementField(locatorType, locatorValue, element, fromElement) {
    try {
      if (!element) {
        if (fromElement) {
          element = await fromElement.findElement(By[locatorType](locatorValue))
        } else {
          element = await this.driver.findElement(By[locatorType](locatorValue))
        }
      }
      await element.clear()
      console.log(`Clear text from element with ${locatorType} = ${locatorValue} `)
    }
    catch (error) {
      console.error(`Got error while trying to Clear text from element with ${locatorType} = ${locatorValue}`)
    }
  }

  // Check if element exists
  async isElementExists(locatorType, locatorValue) {
    let element
    try {
      element = await this.driver.findElement(By[locatorType](locatorValue))
      return true
    }
    catch{
      return false
    }
  }

  // Find and return element by type and value
  async findElementBy(locatorType, locatorValue, fromElement) {
    let element
    await this.driver.sleep(500)
    try {
      if (fromElement) {
        element = await fromElement.findElement(By[locatorType](locatorValue))
      }
      else {


        element = await this.driver.findElement(By[locatorType](locatorValue))
      }
      console.log(`Find element with ${locatorType} = ${locatorValue} `)
    }
    catch{
      console.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
    }
    return element
  }

  // Find all the elements with the same type and value and return array(list)
  async findElementListBy(locatorType, locatorValue, fromElement) {
    let element

    try {
      if (fromElement) {
        element = await fromElement.findElements(By[locatorType](locatorValue))
      }
      else {
        element = await this.driver.findElements(By[locatorType](locatorValue))
      }
      return element
    }
    catch{
      console.error(`Got error while trying to find element with ${locatorType} = ${locatorValue}`)
    }
  }

}

module.exports = SelenuimInfra
