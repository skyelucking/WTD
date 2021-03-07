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

        // create table data
        for (let i = 0; i < 7; i++) {
          let count = i;
          let tableData = $("<td>");
          let form = $("<div>").addClass("form-check").css("text-align", "center");
          let input = $("<input>")
            .addClass("form-check-input")
            .prop("type", "checkbox")
            .prop("unchecked", dayMap[i]).css("background-color", categoryMap[item.categoryID])
            ;
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
