"use strict";

window.onload = loadIndex;


function loadIndex() {

    let table = document.getElementById("coursesTable");

    let fetch_url = `http://localhost:8081/api/courses`;

    fetch(fetch_url)
        .then(response => response.json())
        .then(data => 
        {
            for(let course of data) 
            {
                    let row = table.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML = course.dept;
                    cell2.innerHTML = course.courseNum;
                    cell3.innerHTML = course.courseName;
            }
        });
}
