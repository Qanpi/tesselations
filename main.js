/*Getting the DOM elements*/
//Main canvas and its context
const cvs = document.getElementById("tesselations")
const ctx = cvs.getContext("2d")
//The customization canvas and its context
const cCvs = document.getElementById("customization")
const cCtx = cCvs.getContext("2d")
//The popup window and the buttons
const popup = document.getElementById("popup")
const colorPicker = document.getElementById("colorpicker")
const colorPicker2 = document.getElementById("colorpicker2")
const closeButton = document.getElementById("close")
const openButton = document.getElementById("open")


/*Handling the events*/
window.onresize = resize
cCvs.onmousedown = clickedOnPopup
colorPicker.oninput = setColor
colorPicker2.oninput = setColor2
closeButton.onclick = close
openButton.onclick = open


/*Resize the canvas to the window size*/
function resize(){
  //Tesselations canvas
  cvs.setAttribute("width", window.innerWidth + "px")
  cvs.setAttribute("height", window.innerHeight + "px")
  //Customization canvas
  cCvs.setAttribute("width", popup.clientWidth + "px")
  cCvs.setAttribute("height", popup.clientHeight + "px")
  cCtx.translate(100,75)
  drawCCvs()
  loop()
}


/*Square path coordinates*/
let point1 = new Circle(0, 100, 5)
let point2 = new Circle(0, 200, 5)
let point3 = new Circle(100, 300, 5)
let point4 = new Circle(200, 300, 5)


/*Set color to user's choice*/
function setColor(){
  userColor = colorPicker.value
  drawCCvs()
  loop()
}

function setColor2(){
  userColor2 = colorPicker2.value
  drawCCvs()
  loop()
}


/*Drawing the demonstration square*/
function drawSquare(){
  const x1 = point1.X, y1 = point1.Y
  const x2 = point2.X, y2 = point2.Y
  const x3 = point3.X, y3 = point3.Y
  const x4 = point4.X, y4 = point4.Y
  squareCoords = [
  0,0,
  x1,y1,
  x2,y2,
  0,300,
  x3,y3, 
  x4,y4,  
  300,300,
  300+x2,y2,
  300+x1,y1,
  300,0,
  x4,y4-300, 
  x3,y3-300,
  0,0]
  //Filling the square
  cCtx.fillStyle = userColor
  cCtx.beginPath()
  cCtx.moveTo(0, 0)
  for (let i=2; i<squareCoords.length; i+=2){
    cCtx.lineTo(squareCoords[i], squareCoords[i+1])
  }
  cCtx.fill()
  //Stroking the square
  cCtx.strokeStyle = "#000000"
  cCtx.beginPath()
  cCtx.moveTo(0, 0)
  for (let i=2; i<squareCoords.length; i+=2){
    cCtx.lineTo(squareCoords[i], squareCoords[i+1])
  }
  cCtx.stroke()
}


/*Draw the draggable circles*/
function drawCircles(){
  for(el of circles){
    cCtx.fillStyle = "#1ff0cd"
    cCtx.beginPath()
    cCtx.arc(el.X, el.Y, el.r, 0, 2*Math.PI)
    cCtx.fill()
  }
}


/*Draw elements on the main canvas*/
let xBias = -75
let yBias = -75
let userColor = "#b784e0"
let userColor2 = "#ffffff"
function loop(){
  ctx.fillStyle = "#b784e0"
  //Amount of units possible to draw
  let amountX = Math.floor(window.innerWidth / 50) + 3
  amountX += amountX % 2 == 1 ? 1 : 0
  let amountY = Math.floor(window.innerHeight / 50) + 3
  amountY += amountY % 2 == 1 ? 1 : 0
  //Iteration over Y-axis
  for(let i=-1; i<amountY; i++){
    let yTrans = yBias + i * 50 //Y coords
    if(yBias == 25) yBias = -75
    //Iteration over X-axis
    for(let i=-1; i<amountX; i++){
      let xTrans = xBias + i * 50 //X coords
      if(xBias == 25) xBias = -75
      ctx.translate(xTrans,yTrans)
      //Color style
      if(ctx.fillStyle == userColor2)
        ctx.fillStyle = userColor
      else ctx.fillStyle = userColor2
      //Drawing the individual unit
      drawElement(...squareCoords)
      //Resetting the translation
      ctx.setTransform(1, 0, 0, 1, 0, 0)
    }
  }
}


/*Draw each individual unit*/
let squareCoords = [0]
function drawElement(...squareCoords){
  ctx.beginPath()
  ctx.moveTo(0,0)
  for (let i=2; i<squareCoords.length; i+=2){
    let x = squareCoords[i] / 6
    let y = squareCoords[i+1] / 6
    ctx.lineTo(x, y)
  }
  ctx.fill()
}


/*Opening the customization menu*/
function open(){
  popup.style.display = "block"
  openButton.style.display = "none"
  cCvs.setAttribute("width", popup.clientWidth + "px")
  cCvs.setAttribute("height", popup.clientHeight + "px")
  window.cancelAnimationFrame(moveX)
  //clearInterval(hz60)
  resize()
  drawCCvs()
}


/*Closing the customization menu*/
function close(){
  popup.style.display = "none"
  openButton.style.display = "block"
  //hz60 = setInterval(animate, 1000/60)
  animate()
}

/*Startup functions*/
resize()
drawCCvs()

//Collection of customization canvas functions
function drawCCvs(){
  cCtx.clearRect(-100,-75,cCvs.width, cCvs.height)
  drawSquare()
  drawCircles()
}

/*Animate the canvas sliding to the left*/
function animate(){
  ++xBias
  loop()
  moveX = window.requestAnimationFrame(animate)
}
