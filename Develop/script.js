// Display current day
var newDay = moment().format("dddd. MMMM, Do");
var currentDay = $("#currentDay")
.text(newDay);

function load(){
 //load events when refresh the page
 $(".time-block").each(function() {
    var timeTex = $(this).text().trim();
    $(this).children(".description").text(localStorage.getItem(timeTex));

})
}
function updateTime() {
    //set classes (past/present/future)
    $(".hour").each(function() {
        var hoursEl = $(this).text().trim();

        var timeEL = moment(hoursEl, "LT");
        
        if (moment().isAfter(timeEL)) {
            $(this).next().addClass("past");
        }
        else if (Math.abs(moment().diff(timeEL,"hours")) === 0){
            $(this).next().addClass("present");
        }
        else {
            $(this).next().addClass("future");
        }


    }) 
   load();
}

function saveTask(event) {

    var hour = $(event.target).closest(".time-block").text();
    var task = $(event.target).siblings(".description").val();

    if (!task) {
        alert("No task inserted!")
    }
else {
    localStorage.setItem(hour,task);
}
    
    
}
//eventListener to save the event to the local storage
$(".saveBtn").on("click", saveTask);

//update for the following day
function auditTask() {
    var time = moment(newDay, "L").set("hour",19);

    if (moment().isAfter(time)) {
        localStorage.clear();
        location.reload();
    }
    
}

setInterval(function(){
    auditTask();
    updateTime();

},(1000)*60);



updateTime();
