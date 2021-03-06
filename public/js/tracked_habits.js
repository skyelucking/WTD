$(document).ready(() => {
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
          1: "blue",
          2: "purple",
          3: "green",
          4: "aqua",
          5: "yellow",
          6: "orange",
          7: "black",
        };

        // create table head
        let tableHead = $("<th>")
          .attr("scope", "row")
          .text(item.habitName)
          .css("color", "#D99830")
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

        // create table data
        for (let i = 0; i < 7; i++) {
          let count = i;
          let tableData = $("<td>");
          let form = $("<div>").addClass("form-check");
          let input = $("<input>")
            .addClass("form-check-input")
            .prop("type", "checkbox")
            .prop("checked", dayMap[i]);
          form.append(input);
          tableData.append(form);
          tableRow.append(tableData);
          count++;
        }
      }
    });
  } // end of function
}); // end of export
// Notes:
// 1) This table is not responsive lol
