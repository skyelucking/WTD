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
    $.post("/api/add_habit", obj)
      .then(() => {
        let item = $('<a>').text(obj.habitName).addClass('col-3')
        $(habitsDisplay).append(item)
        // need to reload page so habitID can generate
        window.location.reload();
    });

  });

  

});// end of doc ready

// Notes:
// 1) we need to create a route to delete items 
// 2) to prevent them from adding a habit that is already being tracked 
// 3) a link or button to get to the tracker page
// 4) So as it is now, each item they choose will automatically be added to the tracker page. When we get the delete route going, it will delete from the tracker page. We can set it up on the tracker page so that on Sunday, all the habits delete and they have to add them again. I am unsure if we need the other database table because we are able to get all the information we need from this habits_selected table. We should think about adding the 'completed boolean' to the habits_selected table and delete the other one to save us time and headache. 