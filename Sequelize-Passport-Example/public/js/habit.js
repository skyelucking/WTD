$(document).ready(() => {
  // Getting references to our form and input
  const habitSelect = $("form.habit_select_form");
  const habitName = $(data-habitName);
  const categoryID = $(data - categoryID);

  // When the signup button is clicked, we validate the email and password are not blank

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    habitSelect.on("click", (event) => {
      // habitSelect.on("submit", event => {
      event.preventDefault();
      const habitData = {
        habitName: habitName.val().trim(),
        categoryID: categoryID.val().trim(),
      };

      // Does a post to the signup route. If successful, we are redirected to the members page
      // Otherwise we log any errors
      function addHabit(habitData) {
        $.post("/api/add_habit", habitData)
          .then(() => {
            window.location.replace("/members");
            // If there's an error, handle it by throwing up a bootstrap alert
          })
          .catch(handleLoginErr);
      }

      function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
    });
  });
});
