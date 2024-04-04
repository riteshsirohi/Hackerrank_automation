const puppeteer=require('puppeteer');
const codeObj=require('./codes');
let loginlink='https://www.hackerrank.com/auth/login';
let password=''
let email=''
const BrowserOpenPromise=puppeteer.launch({headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});
let page;
BrowserOpenPromise.then(function(browser){
    const BrowserPromise=browser.newPage();
    return BrowserPromise;
}).then(function(newTab){
    page=newTab;
    let gotoPromise=page.goto(loginlink,{timeout:0});
    return gotoPromise;
//}).then(function(){
  //  let elemWaitPromise=page.waitForSelector("input['id='input-1']",{visible:true});
    //return elemWaitPromise;
}).then(function(){
    let EmailPromise=page.type("input[id='input-1']",email,{delay:100});
    return EmailPromise;
}).then(function(){
    let PasswordisEntered=page.type("input[id='input-2']",password,{delay:100})
    return PasswordisEntered;
}).then(function(){
    let loginClick=page.click('button[data-analytics="LoginPassword"]',{delay:1000})
    return loginClick
    
}).then(function(){
    let algoClickPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page, {delay:1000})
    return algoClickPromise
}).then(function(){
    let gotoWarmupPromise=waitAndClick('input[value="warmup"]',page,{delay:1000})
    return gotoWarmupPromise

}).then(function(){
    let allChallengesPromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:1000})
    return allChallengesPromise;
}).then(function(questionsArr){
    console.log('Number of Questions',questionsArr.length)
    let questionWillBeSolved=questionSolver(page,questionsArr[0],codeObj.answers[0])
    return questionWillBeSolved
})
function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModal=cPage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()   
        })
    })
}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked=question.click()
        questionWillBeClicked.then(function(){
            let editorFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs',page,{delay:1000})
            return editorFocusPromise
        }).then(function(){
            let resizePromise=page.click('.ui-icon-restore-size',{delay:1000})
            return resizePromise
        }).then(function(){
            let testAgainPromise=waitAndClick('input[type="checkbox"]',page,{delay:100})
            return testAgainPromise
        }).then(function(){
            let textAreaPromise=waitAndClick('textarea.input.text-area.custominput.auto-width',page,{delay:100})
            return textAreaPromise
        }).then(function(){
            return page.type('textarea.input.text-area.custominput.auto-width',answer,{delay:25})
        }).then(function(){
            let ctrlPress=page.keyboard.down('Control')
            return ctrlPress
        }).then(function(){
            let aIsPressed=page.keyboard.down('A',{delay:100})
            return aIsPressed
        }).then(function(){
            let xPressed=page.keyboard.down('X',{delay:100 })
            return xPressed
        }).then(function(){
            let cUp=page.keyboard.up('Control')
            return cUp
        }).then(function(){
            let editorCut=waitAndClick('.monaco-editor.no-user-select.vs',page,{delay:1000})
            return editorCut
        }).then(function(){
            let ctrlPress=page.keyboard.down('Control')
            return ctrlPress
        }).then(function(){
            let aIsPressed=page.keyboard.down('A',{delay:100})
            return aIsPressed 
        }).then(function(){
            let vIsPressed=page.keyboard.down('V',{delay:100})
            return vIsPressed
        }).then(function(){
            let cUp=page.keyboard.up('Control')
            return cUp
        }).then(function(){
            return page.click('.hr-monaco__run-code',{delay:30})
        }).then(function(){
            resolve();
        }).then(function(err){
            reject();
         })
    })
}
  