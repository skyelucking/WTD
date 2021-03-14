$(document).ready(() => {
  let refresh_button = $("#refresh_button");
  let userId;
  let habits = [];
  $.get("/api/user_data").then((data) => {
    userId = data.id;
  });
  $.get("/api/all").then((data) => {
    habits = data;
    generateRows(habits);
  });
  // need a function to create a row into the body of the table

  function generateRows(arr) {
    arr.forEach((item) => {
      if (userId === item.userID) {
        //table row
        let tableRow = $("<tr>");
        $("tbody").append(tableRow);

        const categoryMap = {
          1: "#F1dadc",
          2: "#Fee5c1",
          3: "#E5e1df",
          4: "#f5b2ba",
          5: "#A59793",
          6: "#F9d499",
          7: "#Efd1d1",
        };

        // create table head
        let tableHead = $("<th>")
          .attr("scope", "row")
          .text(item.habitName)
          .css("color", "#424242")
          .css("background-color", categoryMap[item.categoryID]);
        tableRow.append(tableHead);

        console.log(item);

        const dayMap = {
          0: item.Sunday,
          1: item.Monday,
          2: item.Tuesday,
          3: item.Wednesday,
          4: item.Thursday,
          5: item.Friday,
          6: item.Saturday,
        };

        const dayMapNames = {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday",
        };

        // create table data
        for (let i = 0; i < 7; i++) {
          let box_value;
          let count = i;
          let tableData = $("<td>").css("text-align", "center");
          let form = $("<div>").addClass("form-check");
          let input = $("<input>")
            .addClass("form-check-input")
            .attr("id", "check_id" + item.habitID + dayMapNames[i])
            .attr("data-weekday", dayMapNames[i])
            .attr("data-habitID", item.habitID)
            .attr("type", "checkbox")
            .prop("checked", dayMap[i])
            .css("align-text", "center");

          input.change(function() {
            console.log({
              habitID: $(this).attr("data-habitID"),
            });

            console.log({
              checkbox: $(this).is(":checked"),
            });
            console.log(
              $("check_id" + item.habitID + dayMapNames[i]) +
                " habitID " +
                $(this).attr("data-habitID")
            );
            if (
              $(this)
                .prop("checked")
                .valueOf() === true
            ) {
              let box_value = 1;
              console.log(
                "checked_value1 " +
                  $("#check_id" + dayMapNames[i]).is(":checked") +
                  " box_value= " +
                  box_value +
                  " weekday= " +
                  dayMapNames[i] +
                  " habitID " +
                  $(this).attr("data-habitID")
              );
            } else {
              let box_value = 0;
              console.log(
                "checked_value2 " +
                  $("#check_id" + dayMapNames[i]).is(":checked") +
                  " box_value= " +
                  box_value +
                  " weekday= " +
                  dayMapNames[i]
              );
            }
            $.ajax({
              url: "/api/update_habit/",
              method: "PUT",
              data: {
                habitID: $(this).attr("data-habitID"),
                weekday: dayMapNames[i],
                checked: $(this)
                  .prop("checked")
                  .valueOf(),
              },
              dataType: "json",
              success: function() {
                console.log("success!");
              },
            }).always(function() {});
          });

          form.append(input);
          tableData.append(form);
          tableRow.append(tableData).css("text-align", "center");

          count++;
        }
      }
    });
  } // end of function

 
 
    generateRandomQuotes();

    function generateRandomQuotes() {
      let quotes = [
        "You will never change your life until you change something you do daily!",
        "Good habits are as addictive as bad habits but much more rewarding.",
        "Motivation is what gets your started, Habit is what keeps you going!",
        "If you want to master a habit, the key is to start with repetition, not perfection.",
        "Hey, you! Don't Give Up, Okay?",
        "You are the most valuable investment you will ever make.",
        "Success doesn't come from what you do occassionally. It comes from what you do consistently. ",
      ];

      let randomIndex = Math.floor(Math.random() * quotes.length);

      $(".randomQuotes").text(quotes[randomIndex]);
    }
  
 
  // Refresh Week Button
 refresh_button.click(function(arr)  {
   console.log("userId: " + userId);
  for (let i = 0; i < 7; i++) {
    
     if (userId === item.userID) {   

   $.ajax({
     url: "api/update_habit",
     type: "PUT",
     data: { userID: item.userID,
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    },

   }).always(function() {
     // renderHabits();
   });
 }};
 }) // end of function
});