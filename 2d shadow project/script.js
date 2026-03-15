var shadowcount = 0;


function createLineBetweenDivs(div1, div2) {
    console.log(parseInt(div2.slice(4)))
    //$('#shadow' + parseInt((div2).at(-1), 10)).remove();
    // Get the positions of the two divs (center positions)
    const rect1 = $(div1).get(0).getBoundingClientRect();
    const rect2 = $(div2).get(0).getBoundingClientRect();
    
    // Calculate the center points of the divs
    const centerX1 = rect1.left + rect1.width / 2;
    const centerY1 = rect1.top + rect1.height / 2;
    const centerX2 = rect2.left + rect2.width / 2;
    const centerY2 = rect2.top + rect2.height / 2;
    
    // Calculate the distance between the centers of the two divs
    const dx = centerX2 - centerX1
    const dy = centerY2 - centerY1
    const distance1 = Math.sqrt(
  Math.pow(dx + rect2.width / 2, 2) +
  Math.pow(dy + rect2.height / 2, 2)
);

const distance2 = Math.sqrt(
  Math.pow(dx - rect2.width / 2, 2) +
  Math.pow(dy + rect2.height / 2, 2)
);

const distance3 = Math.sqrt(
  Math.pow(dx + rect2.width / 2, 2) +
  Math.pow(dy - rect2.height / 2, 2)
);

const distance4 = Math.sqrt(
  Math.pow(dx - rect2.width / 2, 2) +
  Math.pow(dy - rect2.height / 2, 2)
);
    
    // Calculate the angle between the two divs in radians
    const angle1 = Math.atan2(dy + rect2.height/2, dx + rect2.width/2);
    const angle2 = Math.atan2(dy + rect2.height/2, dx - rect2.width/2);
    const angle3 = Math.atan2(dy - rect2.height/2, dx + rect2.width/2);
    const angle4 = Math.atan2(dy - rect2.height/2, dx - rect2.width/2);
    // Create a new div that will represent the line
    
    console.log((Math.atan2((centerY2 - centerY1), (centerX2 - centerX1)))*57.2958)
    let list = [{angle:angle1, dis:distance1},
      {angle:angle2, dis:distance2},
      {angle:angle3, dis:distance3},
      {angle:angle4, dis:distance4}]
    list.sort((a,b) => a.angle-b.angle)
    console.log(list)


    //(how it used to work)  alright so theres 8 possible states that the shadow could be in, because the 2 edges of the shadow are the ends of the lines

    //this section finds the biggest gap, chatgpt made some other changes but this is the biggest one. I ran with it because it fixes the shadow clpping issue.
let biggestGap = 0;
let gapIndex = 0;

for (let i = 0; i < list.length; i++) {

  let next = (i + 1) % list.length;

  let diff = list[next].angle - list[i].angle;

  if (diff < 0) diff += Math.PI * 2;

  if (diff > biggestGap) {
    biggestGap = diff;
    gapIndex = i;
  }

}

const edge1 = list[(gapIndex + 1) % list.length];
const edge2 = list[gapIndex];
    //scratch that, find the 2 extreme angles and go from there  
    
    
    if (!($('#shadow' + (parseInt(div2.slice(4)))).length)) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
      svg.id = ('shadow' + parseInt(parseInt(div2.slice(4))));
      svg.class = 'shadow';
      svg.style.position = "absolute";
      svg.style.left = "0px";
      svg.style.top = "0px";
      svg.style.width = "100vw";
      svg.style.height = "100vh";
      svg.style.zIndex = '-1'
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  //line1 is red
  //line2 is blue
  //line3 is green
  //line4 is white
  
  //this part makes the svg
  poly.setAttribute("points", `
    `+ (centerX1 + Math.cos(edge1.angle) * edge1.dis) +`,`+ (centerY1 + Math.sin(edge1.angle) * edge1.dis) +`
    `+ (centerX1 + Math.cos(edge2.angle) * edge2.dis) +`,`+ (centerY1 + Math.sin(edge2.angle) * edge2.dis) +`
    `+ (centerX1 + Math.cos(edge2.angle) * (edge2.dis + 5000)) +`,`+ (centerY1 + Math.sin(edge2.angle) * (edge2.dis + 5000)) +`
    `+ (centerX1 + Math.cos(edge1.angle) * (edge1.dis + 5000)) +`,`+ (centerY1 + Math.sin(edge1.angle) * (edge1.dis + 5000)) +`
  `);
  console.log(shadowcount)
  poly.setAttribute("fill", "black");
  
  svg.appendChild(poly);
  document.body.appendChild(svg);
    }else{
     document.querySelector('#shadow' + (parseInt(div2.slice(4))) + ' polygon').setAttribute("points", `
${centerX1 + Math.cos(edge1.angle) * edge1.dis},${centerY1 + Math.sin(edge1.angle) * edge1.dis}
${centerX1 + Math.cos(edge2.angle) * edge2.dis},${centerY1 + Math.sin(edge2.angle) * edge2.dis}
${centerX1 + Math.cos(edge2.angle) * (edge2.dis + 5000)},${centerY1 + Math.sin(edge2.angle) * (edge2.dis + 5000)}
${centerX1 + Math.cos(edge1.angle) * (edge1.dis + 5000)},${centerY1 + Math.sin(edge1.angle) * (edge1.dis + 5000)}
`);
    }

}

$(document).ready(function() {
let a;
let posX;
let posY;

$("#light_source").on('mousedown', function() {
    console.log("mousedown")
    a = setInterval(function() {
    let pos = {
    'top': (posY) + 'px',
    'left': (posX) + 'px'
    } 
$("#light_source").css(pos)

for (let index = 1; index <= shadowcount; index++) {
  console.log(index)
  createLineBetweenDivs("#light_source", ("#box" + index))
  
}
       },60)
       
})


document.addEventListener('mousemove', function(event) {
    posX = event.clientX;
    posY = event.clientY;       
})

document.addEventListener('mouseup', function() {
    console.log("mouseup")
clearInterval(a)
})

$("#button").on('click',function() {
    console.log("ive been clicked")
    shadowcount = shadowcount + 1
    $("body").append( "<span class='box' id='box" + shadowcount + "'></span>" );
    let tempnum = shadowcount
    
    let pos2 = {
  top: "300px",
  left: "300px",
  width: (parseInt($("#width").val()) + "px"),
  height: (parseInt($("#height").val()) + "px")
};
$("#box" + shadowcount).css(pos2);
    $("#box" + shadowcount).on('mousedown', function() {
      
    console.log("this is:" + tempnum)
    console.log("mousedown")
    a = setInterval(function() {
    let pos = {
    'top': (posY) + 'px',
    'left': (posX) + 'px',
    } 
  $("#box" + tempnum).css(pos)
createLineBetweenDivs("#light_source", ("#box" + tempnum))
       },60)
       
})
    console.log(shadowcount)
})

$("#button2").on('click',function() {
    console.log("ive been clicked")
    if((shadowcount > 0)){
    $("#box" + shadowcount).remove()
    $("#shadow" + shadowcount).remove()
    shadowcount = shadowcount - 1
    }
    console.log(shadowcount)
    
})

});