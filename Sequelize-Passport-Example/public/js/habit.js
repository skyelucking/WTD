// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(() => {
  $(".change-completed").on("click", function(event) {
    const id = $(this).data("id");
    const newcompleted = $(this).data("newcompleted");

    const newcompletedState = {
      completed: newcompleted
    };

    // Send the PUT request.
    $.ajax("/api/habits/" + id, {
      type: "PUT",
      data: newcompletedState
    }).then(() => {
      console.log("changed completed to", newcompleted);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", event => {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newHabit = {
      habitName: $("#ca")
        .val()
        .trim(),
      completed: $("[name=completed]:checked")
        .val()
        .trim(),
      categoryId: $("[name=category_id]:checked")
        .val()
        .trim()
    };

    // Send the POST request.
    $.ajax("/api/habits", {
      type: "POST",
      data: newHabit
    }).then(() => {
      console.log("created new habit");
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
