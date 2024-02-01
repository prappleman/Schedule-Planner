$(function () {
  // Function to dynamically generate time blocks for all 24 hours
  function generateTimeBlocks() {
    var container = $(".container-fluid");
    
    for (var hour = 0; hour < 24; hour++) {
      var timeBlockId = "hour-" + hour;
      var formattedHour = dayjs().hour(hour).format("ha");

      var timeBlock = $('<div class="row time-block" id="' + timeBlockId + '">');
      timeBlock.append('<div class="col-2 col-md-1 hour text-center py-3">' + formattedHour + '</div>');
      timeBlock.append('<textarea class="col-8 col-md-10 description" rows="3"></textarea>');
      timeBlock.append('<button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button>');

      container.append(timeBlock);
    }
  }
  generateTimeBlocks();

  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Add code to apply the past, present, or future class to each time block. (Adds color.)
  function updateHourClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      $(this).removeClass("past present future");

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateHourClasses();
  setInterval(updateHourClasses, 60000);

  // Add code to get any user input that was saved in localStorage and set the values of corresponding textarea elements.
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedUserInput = localStorage.getItem(timeBlockId);
    $(this).find(".description").val(savedUserInput);
  });

  $("#currentDay").text(dayjs().format("MMMM D, YYYY"));

});
