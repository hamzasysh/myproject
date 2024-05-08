var pageNumber=1;
// Function to create a dynamic table
        function createTable(data) {
            if(!data.length >0){
              alert('on last page');
              return null;
            }
            var table = document.createElement('table');
            var thead = document.createElement('thead');
            var tbody = document.createElement('tbody');

            // Create table header
            var headerRow = document.createElement('tr');
            for (var key in data[0]) {
                var th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            }
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table rows
            data.forEach(function(rowData) {
                var tr = document.createElement('tr');
                for (var key in rowData) {
                    var td = document.createElement('td');
                    td.textContent = rowData[key];
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            return table;
        }

        // Function to fetch orders from the backend
function fetchOrders(pgno) {

          // Define the number you want to pass

// Define the data to be sent in the request body
console.log(pgno);
const requestData = {
  page_no: pgno
};

// Define the fetch options
const options = {
  method: 'POST', // Set the request method to POST
  headers: {
    'Content-Type': 'application/json' // Specify the content type as JSON
  },
  body: JSON.stringify(requestData) // Convert the request data to JSON format
};

  fetch('/orders/', options)
  .then(response => response.json())
  .then(data => {
    // Process the data here
    // Example: Iterate through each object in the array and access its fields
    const existingTable=document.querySelector('.flex-grow-1').querySelector('table');
    if(existingTable){
      table=createTable(data);
      if (table){
        pageNumber=pgno;
        console.log(pageNumber)
      existingTable.remove();
      document.querySelector('.flex-grow-1').appendChild(table);
      }
    }
    else{
      console.log('here');
      table=createTable(data);
      document.querySelector('.flex-grow-1').appendChild(table);
    }

  })
  .catch(error => {
    console.error('Error:', error);
  });
        }

          // Event listener for "Previous Page" button
  document.getElementById('prev-page-btn').addEventListener('click', function() {
    // Assuming you have a variable to keep track of current page number
    if(pageNumber==1){
      alert('on first page');
      return;
    }
    pgno =pageNumber- 1; // Decrement current page number
    fetchOrders(pgno);
  });

  // Event listener for "Next Page" button
  document.getElementById('next-page-btn').addEventListener('click', function() {
    // Assuming you have a variable to keep track of current page number

    pgno =pageNumber+1; // Increment current page number
    fetchOrders(pgno);
  });

        // Call the fetchOrders function when the page loads
        window.onload = fetchOrders(pageNumber);