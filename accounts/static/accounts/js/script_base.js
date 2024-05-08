function adjustSidebarHeight() {
    var sidebar = document.querySelector('.sidebar');
    var invisibleTrigger=document.querySelector('.invisible-trigger');
    var content = document.querySelector('.flex-grow-1'); // Change selector here
    var footer = document.querySelector('.footer');

    console.log(sidebar, content, footer); // Check if these are null

    if (sidebar && content && footer) {
       // Rest of your code
        var contentHeight = content.offsetHeight;
        var footerHeight = footer.offsetHeight;
        var windowHeight = window.innerHeight;
        var sidebarHeight = Math.max(contentHeight, windowHeight - footerHeight);
        // console.log(sidebarHeight);
        invisibleTrigger.style.height=sidebarHeight+'px';
        sidebar.style.height = sidebarHeight + 'px'; // Use 'px' instead of 'vh'
          // Set margin-bottom for content to avoid overlapping with the footer
       var contentMarginBottom = footerHeight -5// Adjust this value as needed
       content.style.marginBottom = contentMarginBottom + 'px';
        
    }
}

// Wait for the content block to be available
window.onload = function() {
    adjustSidebarHeight();
};
document.querySelector('.logout-btn').addEventListener('click', function() {
fetch('/logout/')
    .then(response => {
        // Check if the response status is in the 200-299 range (indicating success)
        if (response.ok) {
            // Perform actions after successful logout, like redirecting the user
            window.location.href = '/login/'; // Redirect to the login page
        } else {
            // Handle errors if the logout request fails
            console.error('Logout failed:', response.statusText);
        }
    })
    .catch(error => {
        // Catch and log any network errors
        console.error('Network error during logout:', error);
    });
});