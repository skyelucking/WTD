$(document).ready(() => {
  let dataOptions;
  let userId;
  let habits = []

  $(".category").hover(function() {
    const contentAsset = $(this).attr("data-info");
    dataOptions = JSON.parse(contentAsset);
  });

  $.get("/api/user_data").then(data => {
    userId = data.id;
  });

  // making a new object
  
  
  $(".option").click(function () {
 
    let obj;
    obj = {
      habitName: $(this).attr("data-habit-option"),
      categoryID: dataOptions.value,
      userID: userId
    };

    console.log(obj)

    $.post("/api/add_habit", obj)
      .then(() => {
        var row = $("<div>");
        let item = $('<div>')
        row.addClass("habits");
        item.text(obj.habitName)
        
        row.append(item)

        $("body").append(row)
    });

  });

  $.get("/api/all").then(data => {
    habits = data
    console.log(habits)
  });



});