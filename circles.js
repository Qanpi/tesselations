const circles = []

class Circle {
  //Starting up the class
  constructor(x, y, r=5){
    //Drawing variables
    this.x = x
    this.y = y
    this.r = r
    //Dragging variables
    this.xTrans = 0
    this.yTrans = 0
    this.X = x
    this.Y = y
    //Adding to the circles array
    circles.push(this)
  }
  //Moving the circle according to the user's dragging
  move(){
    //The "amount" of drag
    let xDrag = posX - event.clientX 
    let yDrag = posY - event.clientY
    //The translation of the circle
    this.xTrans -= xDrag
    this.yTrans -= yDrag
    //Resetting to mouse's position
    posX = event.clientX
    posY = event.clientY
    //Checking if mouse goes out of borders
    if(this.xTrans >= 50)
      this.xTrans = 49
    else if(this.xTrans <= -50)
      this.xTrans = -49
    if(this.yTrans >= 50)
      this.yTrans = 49
    else if(this.yTrans <= -50)
      this.yTrans = -49
    //Setting the offset to the translation
    this.X = this.x + this.xTrans
    this.Y = this.y + this.yTrans
    drawCCvs()
  }
  //Stopping the movement of the circle
  stop(){
    //Clearing the events
    cCvs.onmousemove = null
    cCvs.onmouseleave = null
    cCvs.onmouseup = null
    loop()
  }
}


/*Check if clicked on the popup*/
function clickedOnPopup(event){
  //Mouse position
  let mX = event.clientX - (window.innerWidth - popup.clientWidth) / 2
  let mY = event.clientY - (window.innerHeight - popup.clientHeight) / 2 - 40
  //Iterating over all subclasses of Circle 
  for(el of circles){
    //Circle position
    let x = el.X + 100
    let y = el.Y + 75
    //Checking if hits the circle
    if(mX >= x - 5 && mX <= x + 5){
      if(mY >= y - 5 && mY <= y + 5){
        //Set to mouse position
        posX = event.clientX 
        posY = event.clientY
        //Set dragging events
        cCvs.onmousemove = el.move.bind(el)
        cCvs.onmouseleave = el.stop
        cCvs.onmouseup = el.stop
      }
    }
  }
}
