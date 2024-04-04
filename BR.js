
const puppeteer = require("puppeteer");
let page;
console.log("before");
const browseropenpromise = puppeteer.launch({headless:false});
browseropenpromise
.then(function(browser){
    const pagearrpromise = browser.pages();
    return pagearrpromise;
}).then(function(browserpages){  
    page = browserpages[0];
    let gotopromise = page.goto("https://www.google.com/");
    return gotopromise;
})//.then(function(){
    //let elementwaitpromise = page.waitforselector("input[type='text']",{visible: true});
    //return elementwaitpromise;
//})
.then (function(){
    let keywillsendpromise = page.type("input[type='text']","pepcoding");
    return keywillsendpromise;
}).then (function(){
    let enterwillbepressed = page.keyboard.press("Enter");
    return enterwillbepressed;
})
 .then (function(){
     let elementwaitpromise = page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md",{visible:true});
     return elementwaitpromise;
 })
.then (function(){
    let keyswillbesendpromise = page.click("h3.LC20lb.MBeuO.DKV0Md");
    return keyswillbesendpromise;
})
.catch(function(err){
    console.log(err);
})

console.log("after");