var curDayRef = $("#currentDay");
var colorBoxes = $(".color-box").map(function () { return this; }).get(); // Gets all dom elements with the class .color-box 

var dateAndColor = function () {
  var currentTime = moment();

  currentTime.add(-5, "hours"); // this allows me to test it past 5

  curDayRef.text(currentTime.format("dddd, MMMM Do")); // Sets the hidden text under the main header to be the current date

  var tempTime = moment(); // gets us a simulated 9am for todays date, used for checking below
  tempTime.startOf('day').add(9, 'hours');

  var tempTime2 = moment(); // same simulated time but we increment it 1 additionl hour for use in the below if statement
  tempTime2.startOf('day').add(10, 'hours');

  for (x = 0; x < colorBoxes.length; x++) {
    if (currentTime.isAfter(tempTime) && currentTime.isBefore(tempTime2)) { // Is the current time between the blocks time and blocks time +1 hour?
      colorBoxes[x].classList.add("present");
    }
    else if (currentTime.isAfter(tempTime)) // Is the current time after the temporary time?
    {
      colorBoxes[x].classList.add("past");
    }
    else {
      colorBoxes[x].classList.add("future");
    }
    tempTime.add(1, 'hours'); // adding time to our temp time
    tempTime2.add(1, 'hours');
  }
}

var saveTasks = function () {
  for (x = 0; x < colorBoxes.length; x++) {
    console.log(colorBoxes[x].textContent);
  }
}

$(".color-box").click(function (event) { // triggers when we click on any of the colored boxes with the planner text in them
  var tempDiv = event.target;
  tempDiv.contentEditable = 'true';
  tempDiv.focus();
});

$(".save-box").click(function (event) { // triggers when we click on the save button
  saveTasks();
});

dateAndColor();

