$(document).ready(() => {
  let userId;
  let habits = [];
  $.get("/api/user_data").then(data => {
    userId = data.id;
  });
  $.get("/api/all").then(data =>{
    habits = data;
    generateRows(habits)
    generateMarkedComplete(habits)
  });
  // need a function to create a row into the body of the table
  function generateRows(arr){
    arr.forEach(item => {
        if (userId === item.userID){
        //table row
        let tableRow = $("<tr>")
        $("tbody").append(tableRow);
        // create table head
        let tableHead = $("<th>").attr("scope", "row").text(item.habitName)
        tableRow.append(tableHead);
        // create table data
        for (let i = 0; i < 7; i++) {
          let count = i;
          let tableData = $("<td>");
          let form = $("<div>").addClass("form-check")
          let input = $("<input>").addClass("form-check-input").prop("type", "checkbox");
          form.append(input)
          tableData.append(form)
          tableRow.append(tableData)
          count++;
        }
      }
    })
  } // end of function
  function generateMarkedComplete(arr){
    arr.forEach(item => {
      // create the card dive
      let boxDiv = $('<div>').addClass("card");
      $(".complete").append(boxDiv)
    });
  } // end of function
}); // end of export
// Notes:
// 1) This table is not responsive lol