var curDayRef = $("#currentDay");
var taskText = $("#modalTaskDescription").val();

var currentTime = moment();

curDayRef.text(currentTime.format("dddd, MMMM Do")); // Sets the hidden text under the main header to be the current date

var colorBoxes = $(".color-box").map(function () { return this; }).get(); // Gets all dom elements with the class .color-box 



var tempTime = moment(); // gets us a simulated 9am for todays date, used for checking below
tempTime.startOf('day').add(9, 'hours');

var tempTime2 = moment(); // same simulated time but we increment it 1 additionl hour for use in the below if statement
tempTime2.startOf('day').add(10, 'hours');


for (x = 0; x < colorBoxes.length; x++) {
  if (currentTime.isAfter(tempTime) && currentTime.isBefore(tempTime2)) { // Is the current time after or before the temporary time? (temp time starts at 9am and increments one hour per loop)
    colorBoxes[x].style.backgroundColor = "red";
  }
  else if (currentTime.isAfter(tempTime))
  {
    colorBoxes[x].style.backgroundColor = "grey";
  }
  else {
    colorBoxes[x].style.backgroundColor = "green";
  }
  tempTime.add(1, 'hours'); // adding time to our temp time
  tempTime2.add(1, 'hours');
}
