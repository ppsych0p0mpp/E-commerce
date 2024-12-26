var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    price = document.getElementById("price"),
    stocks = document.getElementById("stocks"),
    brand = document.getElementById("brand"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/live-music.png"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
         showCustomAlert(`${item.name} This file is too large!`);
    }
}


function showInfo(){
    document.querySelectorAll('.productDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="productDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.prodbrand}</td>
            <td>${element.prodname}</td>
            <td>${element.prodprice}</td>
            <td>${element.prodstocks}</td>
            <td>${element.DateAdded}</td>


            <td>
                
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.prodbrand}', '${element.prodname}', '${element.prodprice}', '${element.prodstocks}', '${element.DateAdded}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()



function editInfo(index, pic, brand, name, price, stocks, Sdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    brand.value = brand
    price.value = price
    stocks.value = stocks
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}

function isFutureDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate > today;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (isFutureDate(sDate.value)) {
      showCustomAlert(`'The selected date cannot be in the future.'`);
        return;
    };

    const information = {
        picture: imgInput.src == undefined ? "./image/live-music.png" : imgInput.src,
        prodbrand: brand.value,
        prodname: userName.value,
        prodprice: price.value,
        prodstocks: stocks.value,
        DateAdded: sDate.value
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";

    showInfo();

    form.reset();

    imgInput.src = "./image/live-music.png";

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
});


//Custom alert function
function showCustomAlert(message) {
    const customAlert = document.getElementById('customAlert');
    const alertMessage = document.getElementById('alertMessage');
    const closeAlertBtn = document.getElementById('closeAlert');

    alertMessage.textContent = message;  // Set the custom message
    customAlert.style.display = 'flex';  // Show the custom alert

    // Close the custom alert when the "OK" button is clicked
    closeAlertBtn.addEventListener('click', function() {
        customAlert.style.display = 'none'; // Hide the alert after user clicks OK
    }, { once: true }); // Ensures the event listener is triggered only once

    // Optionally, close the alert after a brief delay
    setTimeout(function() {
        customAlert.style.display = 'none'; 
    }, 2000);  
}
