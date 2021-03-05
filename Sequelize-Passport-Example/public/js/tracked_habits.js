
$(document).ready(() => {
  let userId;
  let habits = [];

  $.get("/api/user_data").then(data => {
    userId = data.id;
  });
  $.get("/api/all").then(data =>{
    habits = data;
    generateRows(habits)
   
  });
  // need a function to create a row into the body of the table
  function generateRows(arr){
    arr.forEach(item => {
        if (userId === item.userID){
        //table row
        let tableRow = $("<tr>")
        $("tbody").append(tableRow);

        // create table head
          let tableHead = $("<th>").attr("scope", "row").text(item.habitName).css("color", "#D99830")
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
  
  let randomQuotes = [
    {
      quote: "Get into the habit of asking yourself 'Does this support the life I'm trying to create?'"
    },
    {
      quote: "'Motivation' is what gets you started, 'Habit' is what keeps you going."
    },
    {
      quote: "Good habits are as addictive as bad habits, but much more rewarding."
    },
    {
      quote: "You are the most valuable investment you will ever make!"
    },
    {
      quote: "You'll never change your life until you change something you do daily. - John Maxwell"
    },
    {
      quote: "Success doesn't come from what you do occasionally. It comes from what you do consistently. - Marie Forleo"
    },
    {
      quote: "Remember that the reason you're doing this is to make your life better."
    },
    {
      quote: "Everything is hard before it is easy. - Goethe"
    },
    {
      quote: "The secret of your future is hidden in your daily routine."
    
    },
    {
      quote: "Do literally whatever makes you happy!"
    },
  ]

  getRandomValue()
  function getRandomValue(){
    let num = Math.floor(Math.random() * 10);
    $('.randomQuote').text(randomQuotes[num].quote)
  }

  
  
}); // end of export
// Notes:
// 1) This table is not responsive lol