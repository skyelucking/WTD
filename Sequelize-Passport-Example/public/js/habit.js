$(document).ready(() => {
  let dataOptions;
  let userId;
  let habits = [];
  let habitsDisplay = $("<div>").addClass('row text-center');

  // grabbing the user id 
  $.get("/api/user_data").then(data => {
    userId = data.id;
  });

  // getting all the habits from database to render on page
  $.get("/api/all").then(data => {
      habits = data;
      console.log(habits)

    displayHabits(habits); 
  })

  function displayHabits(arr){
      arr.forEach((item) => {
        if(userId === item.userID){
        let eachHabit = $('<a>').text(item.habitName).addClass('col-3').attr("data-habitID", item.habitID)
        habitsDisplay.append(eachHabit)
      }
      });
    $("body").append(habitsDisplay);
  
  }
  
  // grabbing the category they hover over
  $(".category").hover(function() {
    const contentAsset = $(this).attr("data-info");
    dataOptions = JSON.parse(contentAsset);
  });


  // making a new object for habits 
  $(".option").click(function () {
    let obj;
    obj = {
      habitName: $(this).attr("data-habit-option"),
      categoryID: dataOptions.value,
      userID: userId
    };
    // rendering the items to the page
    $.post("/api/add_habit", obj)
      .then(() => {
        let item = $('<a>').text(obj.habitName).addClass('col-3')
        $(habitsDisplay).append(item)
        // need to reload page so habitID can generate
        window.location.reload();
    });

  });

  // we need to create a route to delete items 
  // also to prevent them from adding a habit that is already being tracked 
  // each link should allow them to check if they want to add it to the tracker
  

});// end of doc ready