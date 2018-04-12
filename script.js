$(document).ready( function(){

//prevent illegitimate grid size inputs
if (($("#input_height").val() || $("#input_width").val()) > 80) {
    alert('Grid height and width values must not exceed 80!');
}

//define node for canvas
const grid = $("#pixel_canvas");

//first, a function to erase any pre-existing grid
function eraseGrid() {
    grid.find('tr').remove();
}

//then a function to create a grid
function makeGrid() {
    let height = $("#input_height").val();
    let width = $("#input_width").val();
    for (let r = 0; r < height; r++) {
        let row = $("<tr></tr>");       
        grid.append(row);                       //add rows to the grid
            for (let c = 0; c < width; c++){
                let column = $("<td></td>");
                row.append(column);             //add cells to each row
            }
    }
};


//call the erase and make grid functions when the button is clicked
$('#gridbutton').click(function (event) {
    eraseGrid();
    event.preventDefault(); //so the page doesn't reload and erase the grid every time we click
    makeGrid();
});
    

    
const colorPicker = $("#colorPicker");
const paletteButton = $(".palette-button");
    
//Function to change the value of the color picker to the color of the palette button clicked
function pickPalette(paletteButton, selectedColor) {
		selectedColor = $(paletteButton).attr("data-color");
		//console.log("hex : " + selectedColor);
		colorPicker.val(selectedColor);
	}
    
//Select that specific color when a palette button is clicked
paletteButton.on("click", paletteButton, function() {
    pickPalette(this);
	});
    
//change the pixel colour to whatever the color picker value is when a cell is clicked
grid.on("click", "td", function colorPixel () {
    let chosenColor = $("#colorPicker").val();
    $(this).css("background-color", chosenColor);
});

//change the pixel colour when the mouse is dragged
grid.on("mouseover", "td",function colorDrag (e) {  //when the mouse passes over a cell
    if (e.buttons == 1) {                     //if the button is pressed
        let dragColor = $("#colorPicker").val();
        $(this).css("background-color", dragColor); //then change the cell colour
    };
});
    
//erase a cell when double clicked
grid.on("dblclick","td", function eraseColor (e) {
   $(this).css("background-color","white"); 
});
    
});