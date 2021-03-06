$(document).ready(() => {
  let dataOptions;
  let userId;
  let habits = [];
   
  let habitsDisplay = $("<div>").addClass("container text-center ")
  .css("width", "90%")
  .css("padding", "0px")
  .css("align-content", "left")
  .css("border-style", "solid")
  .css( "border-color", "white")
  .css("color", "#D99830")
  .css( "margin-bottom", "20px");

  let addAHabit = $("#addAHabit");

  // grabbing the user id
  $.get("/api/user_data").then((data) => {
    userId = data.id;
  });

  renderHabits();

  function displayHabits(arr) {
    habitsDisplay.empty();
        
    let listHeader = $("<div>")
    .html('<img src="./img/list_header2.png" text-align="center" width="100%" margin="0px" padding="0px">');
        
    arr.forEach((item) => {
      if (userId === item.userID) {
        
        let eachHabit = $("<div>")
          .text(item.habitName)
          .attr("data-habitID", item.habitID)
          .css("width", "100%", )
          .css( "background-color", "white")
          .css("font-family", "Quicksand")
          .css("font-size", "1.25em", )
          .css("padding", "0px", )
          .css("margin", "0px", )
          ;
        
          let deleteHabit= $("<div>")
          .html('<i class="fas fa-trash-alt"></i>')
          .addClass("btn")
          .css("color", "#DDA797")
          .attr("data-habitID", item.habitID);
          
         

          deleteHabit.click(function () {
          $.ajax({
            url: "api/delete_habit",
            type: "DELETE",
            data: { habitID: item.habitID },
            dataType: "json",

          })
            .always(function () {
              renderHabits();
            }
            );
        });
        habitsDisplay.append(eachHabit);
        eachHabit.append(deleteHabit).append("<hr>");
        habitsDisplay.prepend(listHeader);
      }
    });
    $("#selHabs").append(habitsDisplay);
  }

  function renderHabits() {
    $.get("/api/all").then((data) => {
      habits = data;
      console.log(habits);
      displayHabits(habits);
    });
  }

  // grabbing the category they hover over
  $(".category").hover(function () {
    const contentAsset = $(this).attr("data-info");
    dataOptions = JSON.parse(contentAsset);
  });


  // making a new object for habits
  $(".option").click(function () {

    let obj;
    obj = {
      habitName: $(this).attr("data-habit-option"),
      categoryID: dataOptions.value,
      userID: userId,
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
    };

    // rendering the items to the page
    $.post("/api/add_habit", obj).then(() => {
      renderHabits();
    });
  });

 
  $("#addCustomHabit").on('click', function () {
    let customHabit;
    customHabit = {
      habitName: $("#inputHabit").val().trim(),
      categoryID: 7,
      userID: userId,
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: true,
      };

    if (!customHabit) {
      return;
    }
   
    $.post("/api/add_habit", customHabit).then(() => {
      console.log(customHabit)
      renderHabits();
    });     
    
    });





}); // end of doc ready

// Notes:

// 2) to prevent them from adding a habit that is already being tracked
// 3) a link or button to get to the tracker page
// 4) So as it is now, each item they choose will automatically be added to the tracker page. When we get the delete route going, it will delete from the tracker page. We can set it up on the tracker page so that on Sunday, all the habits delete and they have to add them again. I am unsure if we need the other database table because we are able to get all the information we need from this habits_selected table. We should think about adding the 'completed boolean' to the habits_selected table and delete the other one to save us time and headache.
