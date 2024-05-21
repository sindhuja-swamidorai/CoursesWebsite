"use strict";

window.onload = fetchDetails;

function fetchDetails () {
    const urlParams = new URLSearchParams(location.search);

    let cid = -1;
    if (urlParams.has("cid") === true)
    {
       cid = urlParams.get("cid");
       // call a method that fetches this course
       getCourse(cid);
    }         
}

function getCourse(cid) {
    fetch('http://localhost:8081/api/courses/' + cid)
     .then(response => response.json())
     .then(course => {
        // this returns a single course!
        const container = 
           document.getElementById('courseContainerDiv');

        for (let elem in course) {
        if (elem === "id") continue;
  
        // display one course property in a <p>
        const deptP = document.createElement('p');
        deptP.textContent = `${elem}: ${course[elem]}`;
        container.appendChild(deptP);
    
        // repeat for each field you want to display
        }
  
      })
  
     .catch(error => {
        // handle errors that occurred during the fetch request
      });
  }


