$(document).ready(() => {
  let dataOptions;
  let userId;

  $(".category").hover(function() {
    const contentAsset = $(this).attr("data-info");
    dataOptions = JSON.parse(contentAsset);
  });

  $.get("/api/user_data").then(data => {
    userId = data.id;
  });

  // making a new chirp object
  
  $(".option").click(function () {
    let obj;
    obj = {
      habitName: $(this).attr("data-habit-option"),
      categoryID: dataOptions.category,
      userID: userId
    };

    console.log(obj)

    $.post("/api/add_habit", obj)
      .then(() => {
        alert("created")
        // var row = $("<div>");
        // row.addClass("habits");

        // row.append("<p>" + obj.habitName + " </p>")

        // $(".container").append(row)
    });

  });


 


});
