var sidebar = document.getElementById('sidebar');
var sidebarToggle = document.getElementById('sidebarToggle');
var openDropdown = null;
var rArrowIc=null;

// Function to check if cursor is outside the sidebar
sidebar.addEventListener('mouseleave', function() {
  if(openDropdown==null){
    sidebar.style.transform = 'translateX(-250px)';
  }
});

sidebarToggle.addEventListener('click', function() {
  if (sidebar.style.transform === 'translateX(0px)') {
    sidebar.style.transform = 'translateX(-250px)';
  } else {
    sidebar.style.transform = 'translateX(0)';
  }
});

// Function to add a new option with sub-items displayed directly
function addOptionWithSubItems(text, subItems) {
  var sidebarList = document.getElementById('sidebarList');
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.href = '#';
  a.textContent = text+'  ';
  a.classList.add('parent-link'); // Add class for parent link
  li.appendChild(a);
  sidebarList.appendChild(li);

  // Create arrow icon
  var arrowIcon = document.createElement('i');
  arrowIcon.classList.add('fas', 'fa-chevron-down');
  arrowIcon.style.marginRight = '3px'; // Add margin to the arrow icon
  a.appendChild(arrowIcon);

  // Create sub-items
  var subItemsList = document.createElement('ul');
  subItemsList.className = 'sub-items';
  subItems.forEach(function(item) {
    var subItem = document.createElement('li');
    var subLink = document.createElement('a');
    subLink.href = item.link;
    subLink.textContent = item.text;
    subItem.appendChild(subLink);
    subItemsList.appendChild(subItem);



    // Add hover event listener to sub-item
    subItem.addEventListener('mouseenter', function(event) {
      event.stopPropagation(); // Prevent the parent link from being triggered



      // Calculate the position of the hovered sub-item relative to the viewport
      var subItemRect = subItem.getBoundingClientRect();
      var dropdownTop = subItemRect.top;
      var dropdownLeft = subItemRect.left;
      
      // Close any open dropdowns
      if (openDropdown) {
        rArrowIc.remove();
        rArrowIc=null;
        openDropdown.remove();
        openDropdown = null;
      }

      var rarrowIcon = document.createElement('i');
      rarrowIcon.classList.add('fas', 'fa-chevron-right');
      rarrowIcon.style.marginRight = '3px'; // Add margin to the arrow icon
      rArrowIc=rarrowIcon;
      subLink.appendChild(rarrowIcon);

      if (typeof item.subOptions !== 'undefined' && Array.isArray(item.subOptions)) {
        var dropdownContainer = document.getElementById('dropdownContainer');
        dropdownContainer.innerHTML = ''; // Clear previous content
        var dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';
        item.subOptions.forEach(function(subOption) {
          var dropdownLink = document.createElement('a');
          dropdownLink.href = subOption.link;
          dropdownLink.textContent = subOption.text;
          dropdownContent.appendChild(dropdownLink);
        });
        dropdownContent.style.top = dropdownTop + 'px'; // Position below the hovered sub-item
        dropdownContent.style.left =  '250px'; // Position to the right of the hovered sub-item
        dropdownContent.style.display = 'block'; // Ensure visibility
        openDropdown = dropdownContent;
        dropdownContainer.appendChild(dropdownContent);
      }
    });
  });
  li.appendChild(subItemsList);

  // Add hover event listener to parent link
  a.addEventListener('click', function(event) {
    var allParentLinks = document.querySelectorAll('.parent-link');
    // Close all dropdowns except the one hovered
    allParentLinks.forEach(function(parentLink) {
      if (parentLink !== a) {
        parentLink.parentNode.querySelector('.sub-items').classList.remove('open');
        parentLink.querySelector('i').classList.replace('fa-chevron-up', 'fa-chevron-down');
      }
    });
    // Toggle open class for sub-items
    subItemsList.classList.toggle('open');
    // Toggle arrow direction
    arrowIcon.classList.toggle('fa-chevron-down');
    arrowIcon.classList.toggle('fa-chevron-up');
  });
}

// Example usage:
addOptionWithSubItems('Home', [
  { 
    text: 'Home 1', 
    link: '#',
    subOptions: [
      { text: 'Sub Home 1-1', link: '#' },
      { text: 'Sub Home 1-2', link: '#' },
      { text: 'Sub Home 1-3', link: '#' }
    ]
  },
  { 
    text: 'Home 2', 
    link: '#',
    subOptions: [
      { text: 'Sub Home 2-1', link: '#' },
      { text: 'Sub Home 2-2', link: '#' },
      { text: 'Sub Home 2-3', link: '#' }
    ]
  },
  { 
    text: 'Home 3', 
    link: '#',
    subOptions: [
      { text: 'Sub Home 3-1', link: '#' },
      { text: 'Sub Home 3-2', link: '#' },
      { text: 'Sub Home 3-3', link: '#' }
    ]
  }
]);

addOptionWithSubItems('About', [
  { 
    text: 'About 1', 
    link: '#',
    subOptions: [
      { text: 'Sub About 1-1', link: '#' },
      { text: 'Sub About 1-2', link: '#' },
      { text: 'Sub About 1-3', link: '#' }
    ]
  },
  { 
    text: 'About 2', 
    link: '#',
    subOptions: [
      { text: 'Sub About 2-1', link: '#' },
      { text: 'Sub About 2-2', link: '#' },
      { text: 'Sub About 2-3', link: '#' }
    ]
  },
  { 
    text: 'About 3', 
    link: '#',
    subOptions: [
      { text: 'Sub About 3-1', link: '#' },
      { text: 'Sub About 3-2', link: '#' },
      { text: 'Sub About 3-3', link: '#' }
    ]
  }
]);

addOptionWithSubItems('Products', [
  { 
    text: 'Product 1', 
    link: '#',
    subOptions: [
      { text: 'Sub Product 1-1', link: '#' },
      { text: 'Sub Product 1-2', link: '#' },
      { text: 'Sub Product 1-3', link: '#' }
    ]
  },
  { 
    text: 'Product 2', 
    link: '#',
    subOptions: [
      { text: 'Sub Product 2-1', link: '#' },
      { text: 'Sub Product 2-2', link: '#' },
      { text: 'Sub Product 2-3', link: '#' }
    ]
  },
  { 
    text: 'Product 3', 
    link: '#',
    subOptions: [
      { text: 'Sub Product 3-1', link: '#' },
      { text: 'Sub Product 3-2', link: '#' },
      { text: 'Sub Product 3-3', link: '#' }
    ]
  }
]);

// Example usage with sub-options
addOptionWithSubItems('Services', [
  { 
    text: 'Service 1', 
    link: '#',
    subOptions: [
      { text: 'Sub Service 1-1', link: '#' },
      { text: 'Sub Service 1-2', link: '#' },
      { text: 'Sub Service 1-3', link: '#' }
    ]
  },
  { 
    text: 'Service 2', 
    link: '#',
    subOptions: [
      { text: 'Sub Service 2-1', link: '#' },
      { text: 'Sub Service 2-2', link: '#' },
      { text: 'Sub Service 2-3', link: '#' }
    ]
  }
]);

// Function to close dropdown when clicking outside
document.body.addEventListener('click', function(event) {
  // Check if there is an open dropdown and if the clicked target is not within the sub-item area or the sidebar
  if (openDropdown && !event.target.closest('.sub-items')) {
    openDropdown.remove(); // Remove the open dropdown
    openDropdown = null; // Reset the openDropdown variable
    rArrowIc.remove();
    rArrowIc=null;

  }
});