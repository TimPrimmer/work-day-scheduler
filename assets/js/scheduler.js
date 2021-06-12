var curDayRef = $("#currentDay");
var colorBoxes = $(".color-box").map(function () { return this; }).get(); // Gets all dom elements with the class .color-box 
var tempTasks = [];

var dateAndColor = function () {
  var currentTime = moment();
  //currentTime.add(-5, "hours"); // this allows me to test it past 5pm in real life
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
  loadTasks();
}

var saveTasks = function (element) {
  var keyList = [
    { hour: "9AM", index: 0 },
    { hour: "10AM", index: 1 },
    { hour: "11AM", index: 2 },
    { hour: "12PM", index: 3 },
    { hour: "1PM", index: 4 },
    { hour: "2PM", index: 5 },
    { hour: "3PM", index: 6 },
    { hour: "4PM", index: 7 },
    { hour: "5PM", index: 8 }];
  // used to map the hour to an index number for our array containing all the tasks

  if (element) { // checking if we pass in a parameter/hour
    for (b = 0; b < keyList.length; b++) {
      if (element === keyList[b].hour) {
        tempTasks[keyList[b].index] = colorBoxes[keyList[b].index].textContent;
      }
    }
  }
  else { // if for whatever reason we just call this function, save all tasks
    for (x = 0; x < colorBoxes.length; x++) {
      tempTasks[x] = colorBoxes[x].textContent;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tempTasks));
}

var loadTasks = function () {
  if (localStorage.getItem("tasks")) {
    tempTasks = localStorage.getItem("tasks");  // Getting the item in local storage
    tempTasks.replace(/'/g, '"'); // stripping certain characters from it
    tempTasks = JSON.parse(tempTasks); // parsing it back into an array
    for (x = 0; x < colorBoxes.length; x++) {
      colorBoxes[x].textContent = tempTasks[x];
    }
  }
  else {
    for (x = 0; x < 9; x++) {
      tempTasks.push(""); // create an empty array for our temptasks if we dont have anything saved already
    }
  }
}

$(".color-box").click(function (event) { // triggers when we click on any of the colored boxes with the planner text in them
  var tempDiv = event.target;
  tempDiv.contentEditable = 'true';
  tempDiv.focus();
});

$(".save-box").click(function (event) { // triggers when we click on the save button
  if (event.target.classList.contains("save-button")) {
    saveTasks(event.target.parentElement.parentElement.id);
  }
  else {
    saveTasks(event.target.parentElement.id);
  }
});

dateAndColor();

