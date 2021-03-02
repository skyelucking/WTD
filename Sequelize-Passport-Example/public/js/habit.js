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

  const obj = [];
  $(".option").click(function() {
    obj.push({
      habitName: $(this).attr("data-habit-option"),
      categoryID: dataOptions.category,
      userID: userId
    });
    console.log(obj);
  });
});
