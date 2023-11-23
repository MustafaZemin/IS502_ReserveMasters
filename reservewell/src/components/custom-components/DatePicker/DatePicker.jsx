// import React, { useState } from "react";

// function DatePicker() {
//   const [minDate, setMinDate] = useState("");
//   const [maxDate, setMaxDate] = useState("");

//   // Get today's date in the format YYYY-MM-DD
//   const today = new Date().toISOString().split("T")[0];

//   // Get the date 30 days from now
//   const maxDateObj = new Date();
//   maxDateObj.setDate(maxDateObj.getDate() + 30);
//   const thirtyDaysFromNow = maxDateObj.toISOString().split("T")[0];

//   // Set the minimum date for the input to today
//   if (minDate !== today) {
//     setMinDate(today);
//   }

//   // Set the maximum date for the input to 30 days from now
//   if (maxDate !== thirtyDaysFromNow) {
//     setMaxDate(thirtyDaysFromNow);
//   }

//   return (
//     <div className="border-2 p-4 rounded-md">
//       <label htmlFor="dateInput">Select a Date:</label>
//       <input type="date" id="dateInput" min={minDate} max={maxDate} />
//     </div>
//   );
// }

// export default DatePicker;
