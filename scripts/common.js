"use strict";

window.onload = getInput;

function getInput () {
    const urlParams = new URLSearchParams(location.search);
    
    let cid = -1;
    let courseData = {};

    if (urlParams.has("ADD"))
    {

        courseData.dept = urlParams.get("dept");
        courseData.courseNum = urlParams.get("courseNum");
        courseData.courseName = urlParams.get("courseName");
        courseData.instructor = urlParams.get("instructor");
        courseData.startDate = urlParams.get("startDate");
        courseData.numDays = urlParams.get("numDays");
        console.log(courseData)
        console.log(JSON.stringify(courseData))

      /* courseData = `{
        "dept": "${urlParams.get("dept")}",
        "courseNum": "${urlParams.get("courseNum")}",
        "courseName": "${urlParams.get("courseName")}",
        "instructor": "${urlParams.get("instructor")}",
        "startDate": "${urlParams.get("startDate")}",
        "numDays": "${urlParams.get("numDays")}" 
    }`; */

        addCourse(JSON.stringify(courseData))
    }
    else if(urlParams.has("DELETE"))
    {
        cid = urlParams.get("DELETE");
        console.log("Course ID is " + cid)
        deleteCourse(cid);
    }

}

function getCourseId () {
    const urlParams = new URLSearchParams(location.search);

    return urlParams.get("cid");
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


  function addCourse(courseData) {

   fetch('http://localhost:8081/api/courses/', {
      method: "POST",
      body: courseData,
      headers: { "Content-type": "application/json; charset = UTF-8" }
      })
    .then(response => response.json())
    .then(course => {
       // this returns a single course!
       const container = 
          document.getElementById('courseContainerDiv');

       for (let elem in course) {
       // display one course property in a <p>
       const deptP = document.createElement('p');
       deptP.textContent = `${elem}: ${course[elem]}`;
       container.appendChild(deptP);   
       // repeat for each field you want to display
       }})
      .catch(error => {
         const container = 
         document.getElementById('courseContainerDiv');

         const deptP = document.createElement('p');
         deptP.textContent = `ERROR !!!`;
         container.appendChild(deptP);   
         // handle errors that occurred during the fetch request
       });
   
 }

 function deleteCourse(cid) {

    fetch(`http://localhost:8081/api/courses/${cid}`, {
      method: "DELETE" })
    .then(response => {
        console.log("Status code: " + response.status);
       const container = 
          document.getElementById('courseContainerDiv');

       // display one course property in a <p>
       const deptP = document.createElement('p');
       deptP.textContent = "DELETED";
       container.appendChild(deptP);   
       // repeat for each field you want to display
       })
      .catch(error => {
         console.log(error);
         const container = 
         document.getElementById('courseContainerDiv');

         const deptP = document.createElement('p');
         deptP.textContent = `ERROR !!!`;
         container.appendChild(deptP);   
         // handle errors that occurred during the fetch request
       });
}   

