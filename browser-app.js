
//you might create classes (each class represent a thing like a book or keyboard) that link related functions together
// then create an object that will have when initilized these functions and you just call the functions on the object

// DOM Elements
const containerDOM = document.querySelector('.container')

const coffeeContainerDOM = document.querySelector('.js-coffee-container');
const coffeeCupDOM = document.querySelector('.js-coffee-mug');
const cameraContainerDOM = document.querySelector('.js-camera-container');
const glassesContainerDOM = document.querySelector('.js-glasses-container');

const pencilContainerDOM = document.querySelector('.js-pencil-container');
const keyboardDOM = document.querySelector('.js-keyboard')

const phoneBtn = document.querySelector('.js-phone-btn')
const phoneLockScreenDOM = document.querySelector('.js-phone .lock-screen')
const phoneScreenDOM = document.querySelector('.js-phone .screen')

const bookContainerDOM = document.querySelector('.js-book-container')
const bookContainerDOMShadow = document.querySelector('.js-book-container .shadow')
const bookPrevBtns = document.querySelectorAll('.js-book .back')
const bookNextBtns = document.querySelectorAll('.js-book .front')
const papersDOM = document.querySelectorAll('.js-book .paper')

const bigShadeDOM = document.querySelector('.big-shade')

const keysDOM = generateKeyboardKeys(keyboardDOM)

const switchThemeBtn = document.querySelector('.switch-theme')

// Global Variables
const switchTheme = {   
color: document.documentElement.className,
redCameraHTML: cameraContainerDOM.innerHTML,
blueCameraHTML: `<div class="camera-body"></div><div class="info info-camera">
<img src="https://avatars.githubusercontent.com/u/102017139?s=400&u=145e2f4d3c3c3bda79ea2d67d90e69edfb142c77&v=4" alt="">
</div>`
}
const book = {
    pageCurrentLocation: 1, //being changed, obviously. duh...
    numOfPapers: papersDOM.length,
    maxLocation: papersDOM.length + 1
}
const coffee = {
    infoDisplayed: false
}
const pencil = {
    infoDisplayed: false
}
const camera = {
    infoDisplayed: false
}
const glasses = {
    infoDisplayed: false
}
//present your name in the middle and it will have an animation typing from the keyboard or keyboard we have
//when presenting the name after loading the page the name will be revealed by having type animation, and the keys of my name letter will be pressed on the keyboard when my name is typed (thier color will change to maybe white) (just do a keyboard without keyboard like this https://www.vecteezy.com/vector-art/3222500-top-view-of-working-table-with-space-for-text-with-accessory-on-desk)
// say in the middle click on anyhting, its interactive, and make everything interactive

//coffee cup if clicked the halo fading if will be doubled each click on the cup

//book will be not rotated and will hardly appear (slightly from the top) from the bottom of page, only appearing headers, it will have read more then the book will be held to cover almost mostly the screen https://www.vecteezy.com/vector-art/3222491-top-view-of-working-table-with-space-for-text-with-accessory-on-desk

// a note book (have a To: typed in it) beside the keyboard will be input and when clicked it will send an email to me (so its a message but the input will look like something is written on it dynamically when typing on keyboard) https://www.vecteezy.com/vector-art/3222525-flat-design-top-view-of-working-table-with-accessory-on-desk

//pencil when clicked will have a dropdown like an abajora sheet containing my degree

//add shadow like in this link https://www.vecteezy.com/vector-art/1750515-keyboard-apple-cup-a-coffee-on-the-desk

//add for the book hold me btn
//add the phone beside the book
//add the twigles to the background
//create shadow for html elements


// Event Listeners

bookPrevBtns.forEach(prevBtn => {
    prevBtn.addEventListener('click',function() {goPrevPage(book)})
})
bookNextBtns.forEach(nextBtn => {
    nextBtn.addEventListener('click',function() {goNextPage(book)})
})
bookContainerDOM.addEventListener('dblclick',()=> {
    bigShadeDOM.classList.toggle('show-by-opacity')
    bookContainerDOM.classList.toggle('move-book')
    document.body.classList.toggle('bg')
})
coffeeContainerDOM.addEventListener('click',function() {
    dropOnCup(coffeeContainerDOM,coffeeCupDOM)
    displayInfo(coffeeContainerDOM, coffee)
})
pencilContainerDOM.addEventListener('click',function() {
    displayInfo(pencilContainerDOM,pencil)
})
cameraContainerDOM.addEventListener('click',()=>{
    displayInfo(cameraContainerDOM,camera)
})
glassesContainerDOM.addEventListener('click',()=>{
    displayInfo(glassesContainerDOM,glasses)
})
phoneLockScreenDOM.addEventListener('click',()=>{
    phoneLockScreenDOM.classList.add('remove-lock-screen')
    phoneScreenDOM.classList.add('open-screen')
})
phoneBtn.addEventListener('click',()=>{
    phoneLockScreenDOM.classList.toggle('remove-lock-screen')
    phoneScreenDOM.classList.toggle('open-screen')
})
switchThemeBtn.addEventListener('click',()=>switchThemeColor(switchTheme))

generateBookPageszIndex() //to arrange book papers on top of each other in the right order, and to flip the pages correctly
generateRandomPressingOnKeyboardKeys(keysDOM) //when window load this is what we will get
switchThemeBtn.click()

//Book functions
function generateBookPageszIndex() {
    papersDOM.forEach((paper,index) => {
        paper.style.zIndex = papersDOM.length - index
    })
}

function openBook() {
    // bookContainerDOM.style.margin = "0 20px 0 150px"
    bookContainerDOMShadow.style.transition = 'width 0.5s ease 0.3s'
    bookContainerDOMShadow.style.width = "200%"
}

function closeBook(isAtBeginning) {
    if(!isAtBeginning) return
    
    bookContainerDOMShadow.style.width = "100%"
    // bookContainerDOM.style.margin = "0 50px 0 0"
    bookContainerDOMShadow.style.transition = 'width 0.3s ease-in'
   
}

function goNextPage(book) {
    let pageCurrentLocation = book.pageCurrentLocation
    if(pageCurrentLocation < book.maxLocation - 1) {
        const paper = document.querySelector(`.paper:nth-child(${pageCurrentLocation})`)
        if(pageCurrentLocation === 1) {openBook()}
        // console.log(paper)
        paper.classList.add('flipped')
        paper.style.zIndex = pageCurrentLocation
        book.pageCurrentLocation++;
    }
    // console.log(book.pageCurrentLocation)
}

function goPrevPage(book) {
    let pageCurrentLocation = book.pageCurrentLocation
    if(pageCurrentLocation > 1) {
        const paper = document.querySelector(`.paper:nth-child(${pageCurrentLocation-1})`)
        if(pageCurrentLocation === 2) {closeBook(true)}
        // console.log(paper)
        paper.classList.remove('flipped')
        // console.log(maxLocation - pageCurrentLocation - 1)
        paper.style.zIndex = book.maxLocation - (pageCurrentLocation - 1)
        book.pageCurrentLocation--;
        // console.log(pageCurrentLocation)

    }
}

// Keyboard functions
function generateKeyboardKeys(keyboard) {
    let columns = keyboard.querySelectorAll('.column')
    let key = `<span class="key"></span>`
    let bigKey = `<div class="big-key"></div>`
    let html = ``
    let columnKeys = [60,15,18]
    let bigKeys = [14,15,29,41,42,53,54,55,56,57,58,59,60]
    // let middle = [3,3,0,1,3]
    // let righty = [4,4,4,4,4]
    let numOfKeys = 21+21+17+17+13
    columns.forEach((column,index) => {
        for(let i = 1; i<=columnKeys[index]; i++) {
            // if(index == 1 && i )
            if(bigKeys.includes(i)) {
                column.innerHTML += bigKey
            } else {
                column.innerHTML += key
            }
        }
        bigKeys = []
    })
    
    let keys = document.querySelectorAll('.keyboard .column-1 .key, .keyboard .column-1 .big-key')

    return keys
}

function generateRandomPressingOnKeyboardKeys(keys) {
        
    keys.forEach(key => {
        pressKey(key)
    })

    let randomKey = Math.floor(Math.random()*keys.length) 
    
    let wholeAnimationDuration = 5600 //magic number! dont get lazy and change it bruh change it to get the sum of all typing animation duration

    let keyboardPressInterval = setInterval(function(){
        clearKeyClass(keys[randomKey])
        randomKey = Math.floor(Math.random()*keys.length)
        if(randomKey < keys.length/5 && randomKey != 56) randomKey = 56
        keys[randomKey].click()
    },200) //changed based on preference

    setTimeout(()=>{
        clearInterval(keyboardPressInterval)
        keys.forEach(key => {
            clearKeyClass(key)
        })
    },wholeAnimationDuration)

}

function clearKeyClass(key) {
    key.classList.remove('animate-key')
    key.classList.remove('animate-colored-key')
}

function pressKey(key) {
    key.addEventListener('click',(e)=>{
        if(e.isTrusted) return //so when user clicks we don't add the class
        if(getComputedStyle(key).backgroundColor != 'rgb(255, 255, 255)') {
            key.classList.add('animate-colored-key')
            return
        }
        key.classList.add('animate-key')
    })
}

//coffee functions
function dropOnCup(coffeeContainerDOM, coffeeCupDOM) {
    let drop = document.createElement('div')
    drop.classList.add('drop')
    drop.classList.add('drop2')
    coffeeCupDOM.appendChild(drop)

    setTimeout(()=>{
        coffeeCupDOM.removeChild(coffeeCupDOM.lastChild)
    },3500)

    // let randomDuration = Math.random()*3 + 1

}

function displayInfo(elementDOM,element) {

    const info = elementDOM.querySelector('.info')
    // console.log(info)
    if(element.infoDisplayed) {
    // console.log(getComputedStyle(info).clipPath)
    info.classList.add('close-info')

    // console.log(getComputedStyle(info).clipPath)
        info.classList.remove('open-info')
    // console.log(getComputedStyle(info).clipPath)
        
        elementDOM.classList.add('unclickable')
        element.infoDisplayed = false
        info.addEventListener('animationend',()=>{
            elementDOM.classList.remove('unclickable')
        })
        return
    } 
    info.classList.add('open-info')
    info.classList.remove('close-info')
    elementDOM.classList.add('unclickable')
    element.infoDisplayed = true

    info.addEventListener('animationend',()=>{
        elementDOM.classList.remove('unclickable')
    })

}

//but here we modify it to just highlight the text if only the text is being click on not any other stuff
function disableselect(e) {
    if(e.target !== e.currentTarget) {
        return true
    }
    return false  
  }  
  containerDOM.onselectstart = disableselect  
  containerDOM.onmousedown = disableselect


function switchThemeColor(switchTheme) {
    
    if(switchTheme.color == 'blue') {
        cameraContainerDOM.innerHTML = switchTheme.redCameraHTML
        switchTheme.color = 'red'
        document.documentElement.className = switchTheme.color
        return
    }
    if(switchTheme.color == 'red') {
        cameraContainerDOM.innerHTML = switchTheme.blueCameraHTML 
        switchTheme.color = 'blue'
        document.documentElement.className = switchTheme.color
        return
    }

}

const loader = document.querySelector('.loader-container')

window.addEventListener('load',()=>{
    loader.classList.add('hide-loader')
})