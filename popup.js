document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('button');
    var contentContainer = document.getElementById('content-container');
    var state = 0;
  
    button.addEventListener('click', function() {
      var content = document.createElement('div');
      content.className = 'content';
  
      var heading = document.createElement('h1');
      var paragraph = document.createElement('p');
  
      if (state === 0) {
        heading.textContent = 'Get Started!';
        paragraph.textContent = 'Visit any Linkedin profile to get started.';
        state = 1;
      } else if (state === 1) {
        heading.textContent = 'Get Started!';
        paragraph.textContent = 'Just click on the "WoW" button to view details of any profile.';
        state = 2;
      } else if (state === 2) {
        heading.textContent = 'You are all set!';
        paragraph.textContent = 'All the details of the profile will be saved specially for you.';
        state = 3;
        } else {
        window.close();
      }
  
      content.appendChild(heading);
      content.appendChild(paragraph);
  
      contentContainer.innerHTML = '';
      contentContainer.appendChild(content);
    });
  });

  
  
  