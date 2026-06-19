function validationform() {
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const age = document.getElementById("age").value;
    const phnumber = document.getElementById("phnumber").value;
    const location = document.getElementById("location").value;
    const mail = document.getElementById("mail").value;

    if (firstname == "" || typeof (firstname) !== "string") {
        alert("Enter valid firstname");
        return false;
    }
    if (lastname == "" || typeof (lastname) !== "string") {
        alert("Enter valid name");
        return false;
    }
    if (age == "" || age < 1 || age.length > 2) {
        alert("Enter valid age");
        return false;

    }

    if (phnumber == "" || phnumber < 1 || phnumber.length < 10 || phnumber.length > 10) {
        alert("Enter valid phnumber");
        return false;
    }
    if (location == "" || typeof (location) !== "string") {
        alert("Enter valid location");
        return false;
    }
    if (mail == "" || !mail.includes("@")) {
        alert("Enter valid mail");
        return false;
    }

    return true;



}

async function showData() {
    let studentlist;
    const response = await fetch("http://localhost:3000/users/disdata");

    recevied_studentlist = await response.json();
    studentlist = recevied_studentlist.results
    console.log(studentlist);

    let html = "";
    studentlist.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.first_name + "</td>";
        html += "<td>" + element.last_name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.phonenumber + "</td>";
        html += "<td>" + element.location + "</td>";
        html += "<td>" + element.mail + "</td>";
        html += "<td class = 'action'><button onclick='deleteData(" + element.id + ")' class='btn btn-danger'>Delete</button><button onclick='editData(" + element.id + ")' class='btn btn-success'>Edit</button><div class = 'mark2'></div></td>";
        html += "</tr>";
        document.querySelector("#datatable tbody").innerHTML = html;
        document.getElementById("arrayLength2").textContent = studentlist.length;

        // search for current students



    })

}



document.onload = showData();


// function to get data

async function adddata() {
    if (validationform() == true) {
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const age = document.getElementById("age").value;
        const phnumber = document.getElementById("phnumber").value;
        const location = document.getElementById("location").value;
        const mail = document.getElementById("mail").value;


        let studentlist;

        // new with bacjend
        studentlist = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            phnumber: phnumber,
            location: location,
            mail: mail

        };
        console.log(studentlist)

        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studentlist),
            };

            const response = await fetch(
                "http://localhost:3000/users/data",
                options
            );

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error(error);

        }

        showData();
        // console.log(age.length);


        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("age").value = "";
        document.getElementById("phnumber").value = "";
        document.getElementById("location").value = "";
        document.getElementById("mail").value = "";




    }
}




async function deleteData(id) {

    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ number: index }),
        };

        const response = await fetch(
            `http://localhost:3000/users/deletedata/${id}`,
            options
        );

        const result = await response.json();
        console.log(result);

    } catch (error) {
        console.error(error);

    }

    showData();

}

function toggleDropdown() {
    var dropdownContent = document.getElementById("classesDropdown");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";

}

// update function

async function editData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";


    const response = await fetch(
        `http://localhost:3000/users/dis_stu_data/${index}`
    );

    const studentlist = await response.json();

    console.log(studentlist)


    document.getElementById("firstname").value = studentlist.first_name;
    document.getElementById("lastname").value = studentlist.last_name;
    document.getElementById("age").value = studentlist.age;
    document.getElementById("phnumber").value = studentlist.phonenumber;
    document.getElementById("location").value = studentlist.location;
    document.getElementById("mail").value = studentlist.mail;

    var currentclassContent = document.querySelector(".currentclasscontent");
    var addstudentContent = document.querySelector(".contents");
    // var deletedstudentContent = document.querySelector(".oldstudentcontent");
    // deletedstudentContent.style.display = "none";


    currentclassContent.style.display = "none";
    addstudentContent.style.display = "block";
    // oldstudentarr.splice(index, 1)[0];


    document.querySelector("#update").onclick = async function () {
        const id = index;
        console.log(id)
        if (validationform() == true) {
            const firstname = document.getElementById("firstname").value;
            const lastname = document.getElementById("lastname").value;
            const age = document.getElementById("age").value;
            const phnumber = document.getElementById("phnumber").value;
            const location = document.getElementById("location").value;
            const mail = document.getElementById("mail").value;


            let studentlist;

            // new with bacjend
            studentlist = {
                firstname: firstname,
                lastname: lastname,
                age: age,
                phnumber: phnumber,
                location: location,
                mail: mail,


            };
            await fetch(`http://localhost:3000/users/students/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(studentlist)
            });
            showData();

            document.getElementById("firstname").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("age").value = "";
            document.getElementById("phnumber").value = "";
            document.getElementById("location").value = "";
            document.getElementById("mail").value = "";

            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";

            // update and return to currrent student

            var currentclassContent = document.querySelector(".currentclasscontent");
            var addstudentContent = document.querySelector(".contents");
            // var deletedstudentContent = document.querySelector(".oldstudentcontent");
            // deletedstudentContent.style.display = "none";

            // firststandardContent.style.display = "block";
            currentclassContent.style.display = "block";
            addstudentContent.style.display = "none";



        }
    }

}



function showaddstudent() {
    document.getElementById("submit").style.display = "block";
    document.getElementById("update").style.display = "none";
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phnumber").value = "";
    document.getElementById("location").value = "";
    document.getElementById("mail").value = "";
    var currentclassContent = document.querySelector(".currentclasscontent");
    var addstudentContent = document.querySelector(".contents");
    // var deletedstudentContent = document.querySelector(".oldstudentcontent");
    // deletedstudentContent.style.display = "none";


    currentclassContent.style.display = "none";
    addstudentContent.style.display = "block";


}

function showfirststandard() {
    var currentclassContent = document.querySelector(".currentclasscontent");
    var addstudentContent = document.querySelector(".contents");
    // var deletedstudentContent = document.querySelector(".oldstudentcontent");
    // deletedstudentContent.style.display = "none";

    // firststandardContent.style.display = "block";
    currentclassContent.style.display = "block";
    addstudentContent.style.display = "none";
    document.querySelector(`#datatable tbody tr .mark2`).style.display = "none";
    // document.querySelectorAll(".current ").innerHTML.style.backgroundColor = "black"


}

// function showdeleteddata() {

//     if (localStorage.getItem("oldstudentarr") == null) {
//         oldstudentarr = [];
//     } else {
//         oldstudentarr = JSON.parse(localStorage.getItem("oldstudentarr"));
//     }

//     let html = "";
//     oldstudentarr.forEach(function (element, index) {
//         html += "<tr>";
//         html += "<td>" + element.firstname + "</td>";
//         html += "<td>" + element.lastname + "</td>";
//         html += "<td>" + element.age + "</td>";
//         html += "<td>" + element.phnumber + "</td>";
//         html += "<td>" + element.location + "</td>";
//         html += "<td>" + element.mail + "</td>";
//         html += "<td class = 'action'><button onclick='olddeleteData(" + index + ")' class='btn btn-danger'>Permanent Delete</button><button onclick='addoldData(" + index + ")' class='btn btn-success'>Restore</button><div class = 'mark'></div></td>";
//         html += "</tr>";
//         document.querySelector("#deleteddatatable tbody").innerHTML = html;

//         var currentclassContent = document.querySelector(".currentclasscontent");
//         var addstudentContent = document.querySelector(".contents");


//         // firststandardContent.style.display = "block";
//         currentclassContent.style.display = "none";
//         addstudentContent.style.display = "none";
//         var deletedstudentContent = document.querySelector(".oldstudentcontent");
//         deletedstudentContent.style.display = "block";

//         console.log(element.firstname);
//         document.getElementById("arrayLength").textContent = oldstudentarr.length;
//         ;

//         document.querySelector(".oldstudentsearch").addEventListener("click", function () {
//             let oldstudentsearch = document.querySelector(".inputcontent2").value;

//             // Clear previous highlights
//             // document.querySelectorAll("#deleteddatatable tbody tr").forEach(row => {
//             //     row.classList.remove("highlighted"); // Remove the highlighted class
//             // });

//             // // Find and highlight matching row
//             // oldstudentarr.forEach((element, index) => {
//             //     if (element.phnumber == oldstudentsearch) {
//             //         // Add the highlighted class to the matching row
//             //         document.querySelector(``).classList.add("highlighted");
//             //     }
//             // });

//             // Loop through oldstudentarr to find matching phone number
//             oldstudentarr.forEach((element, index) => {
//                 if (element.phnumber == oldstudentsearch) {
//                     // Highlight the row if it matches the search
//                     let searchtable = document.querySelector(`#deleteddatatable tbody tr:nth-child(${index + 1})`)
//                     document.querySelector(`#deleteddatatable tbody tr:nth-child(${index + 1}) .mark`).style.display = "block";
//                     searchtable.parentNode.insertBefore(searchtable, searchtable.parentNode.firstChild);

//                     document.querySelector(".inputcontent2").value = "";


//                 }
//             });
//             // document.querySelector(`#deleteddatatable tbody tr:nth-child(${index + 1}) .mark`).style.display = "none";


//         })

//     })

// }


function search() {
    const select = document.getElementById("city");

    const map = {
        "First-Name": 0,
        "PhoneNumber": 3,
        "Email": 5
    };

    searchStudent(map[select.value] ?? 0);
}

function logout() {
    window.location.assign("signin.html");
}


function searchStudent(id = 0) {
    console.log(id);

    const searchValue = document
        .querySelector('.inputcontent')
        .value
        .toLowerCase();

    const rows = document.querySelectorAll('#datatable tbody tr');

    rows.forEach(row => {

        // Check cell exists
        if (!row.cells[id]) return;

        const value = row.cells[id].innerText.toLowerCase();

        row.style.display =
            value.includes(searchValue)
                ? ''
                : 'none';
    });
}



// new changes

