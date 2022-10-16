let todo = $("#todo");
let productList = $("#productList");
let dataInput = $("#dataInput");
saveBtn = $("#saveBtn");
tbody = $("#tbody");
names = $("#name");
price = $("#price");
quantity = $("#quantity");
description = $("#description");
btnData = $("#btnData");
divBtn = $("#divBtn");
viewBtn = $("#viewBtn");
addBtn = $("#addBtn");
subSec = $("#subSec");
myChart = $("#myChart");
category = $("#category");
images = $("#images");
infoChange = $("#infoChange");
productNo = $("#productNo");
inputData = $("#inputData");
userChange = $("#userChange");
userText = $("#userText");
productList = $("#productList");
previewProducts();

let todoForm = [];
let index;
loadData();
productList.hide();
inputData.hide();
todo.hide();
dataInput.hide();
inputData.hide();

addBtn.on("click", () => {
  dataInput.show();
  subSec.hide();
  myChart.hide();
  productList.hide();
  inputData.hide();
  infoChange.html("Add Products");
});

viewBtn.on("click", () => {
  productList.show();
  todo.hide();
  dataInput.hide();
  subSec.hide();
  myChart.hide();
  inputData.hide();
  infoChange.html("PRODUCTS");
});

btnData.on("click", () => {
  todo.toggle();
});
saveBtn.on("click", () => {
  if (index != null) {
    updateData();
  } else {
    addData();
  }
});
tbody.on("click", ".doneBtn", function () {
  index = $(this).attr("index");
  saveBtn.html("Update product");
  todo.show();
  names.val(todoForm[index]["name"]);
  price.val(todoForm[index]["price"]);
  category.val(todoForm[index]["category"]);
  description.val(todoForm[index]["description"]);
  quantity.val(todoForm[index]["quantity"]);
  images.val(todoForm[index]["images"]);
});

tbody.on("click", ".deleteBtn", function () {
  if (confirm("Are you sure you want to delete?")) {
    let i = $(this).attr("index");

    $.ajax({
      type: "delete",
      url: "http://159.65.21.42:9000/product/" + todoForm[i]["_id"],
      success: function (res) {
        console.log(res);

        if (res["success"]) {
          alert(`${res["success"]}`);
          loadEmployeesView();
        }
      },
      error: function (err) {
        console.log(err);
        alert(err.statusText);
      },
    });
    loadData();
  }
});

function addData() {
  let newOption = {
    name: names.val(),
    price: price.val(),
    category: category.val(),
    description: description.val(),
    quantity: quantity.val(),
    image: images.val(),
  };

  $.ajax({
    type: "post",
    url: "http://159.65.21.42:9000/create/product",
    data: newOption,
    success: function (res) {
      console.log(res);

      if (res["error"]) {
        alert(res["error"]);
      } else {
        alert(`${res["name"]} registration successful`);
      }
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
  todo.hide();
  loadData();
}

function updateData() {
  let newOption = {
    name: names.val(),
    price: price.val(),
    category: category.val(),
    description: description.val(),
    quantity: quantity.val(),
    image: images.val(),
  };

  $.ajax({
    type: "put",
    url: "http://159.65.21.42:9000/user/" + todoForm[index]["_id"],
    data: newOption,
    success: function (res) {
      console.log(res);

      if (res["error"]) {
        alert(res["error"]);
      } else {
        alert(`${res["name"]} update successful`);
        loadInfo();

        userSection.hide();
        numb = null;
      }
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
  todo.hide();
  loadData();
  saveBtn.html("Save Data");
  index = null;
}

function loadData() {
  tbody.html(" <h4>Please wait,data loading...</h4>");

  $.ajax({
    type: "get",
    url: "http://159.65.21.42:9000/products",
    success: function (res) {
      console.log(res);
      todoForm = res;
      todoForm = todoForm.reverse();
      userSection.hide();
      productNo.html(`${todoForm.length}`);

      let row = "";
      for (let i = 0; i < todoForm.length; i++) {
        if (
          todoForm[i].category == "Separates" ||
          todoForm[i].category == "Dress and jumpsuit" ||
          todoForm[i].category == "Lifestyle"
        ) {
          row += `<tr>
            <td>${i + 1}</td>
            <td>${todoForm[i]["name"]}</td>
            <td>£,${todoForm[i]["price"]}</td>
            <td>${todoForm[i]["description"]}</td>
            <td>${todoForm[i]["quantity"]}</td>
            <td><img src="${todoForm[i]["image"]}"</td>
            <td>${todoForm[i]["category"]}</td>
            <td class="pag1"><a href="#" class="doneBtn"  index="${i}">☰</a>  |  <a href="#" class="deleteBtn" index="${i}">✕</a></td>
            </tr>`;
        }
      }

      tbody.html(row);
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var xValues = ["Customers", "sales", "products"];
var yValues = [55, 49, 44];
var barColors = ["#dc2f6e", "green", "blue"];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: "STATISTICS",
    },
  },
});

let userSection = $("#userSection");
infoBtn = $("#infoBtn");
userView = $(".userView");
userName = $("#userName");
phone = $("#phone");
email = $("#email");
password = $("#password");
userBtn = $("#userBtn");
userPage = $("#userPage");
userNo = $("#userNo");
let userForm = [];
let numb;
userSection.hide();
loadInfo();

userPage.on("click", () => {
  inputData.show();
  dataInput.hide();
  subSec.hide();
  myChart.hide();
  productList.hide();
  infoChange.html("USERS");
});
userBtn.on("click", () => {
  userSection.toggle();
});
infoBtn.on("click", () => {
  if (numb != null) {
    updateInfo();
  } else {
    addInfo();
  }
});
userView.on("click", ".doneBtn", function () {
  numb = $(this).attr("numb");

  infoBtn.html("Update Data");

  userSection.show();

  userName.val(userForm[numb]["name"]);
  phone.val(userForm[numb]["phone"]);
  email.val(userForm[numb]["email"]);
  password.val(userForm[numb]["password"]);
});

userView.on("click", ".delBtn", function () {
  let i = $(this).attr("numb");
  $.ajax({
    type: "delete",
    url: "http://159.65.21.42:9000/user/" + userForm[i]["_id"],
    success: function (res) {
      console.log(res);

      if (res["success"]) {
        alert(`${res["success"]}`);
        loadInfo();
      }
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
});

function updateInfo() {
  let newOption = {
    name: userName.val(),
    phone: phone.val(),
    email: email.val(),
    password: password.val(),
  };

  $.ajax({
    type: "put",
    url: "http://159.65.21.42:9000/user/" + userForm[numb]["_id"],
    data: newOption,
    success: function (res) {
      console.log(res);

      if (res["error"]) {
        alert(res["error"]);
      } else {
        alert(`${res["name"]} update successful`);
        loadInfo();

        userSection.hide();
        numb = null;
      }
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
}

function addInfo() {
  let newOption = {
    name: userName.val(),
    phone: phone.val(),
    email: email.val(),
    password: password.val(),
  };
  $.ajax({
    type: "post",
    url: "http://159.65.21.42:9000/register",
    data: newOption,
    success: function (res) {
      console.log(res);

      if (res["error"]) {
        alert(res["error"]);
      } else {
        alert(`${res["name"]} registration successful`);
      }
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
  userSection.hide();
  loadInfo();
  infoBtn.html("Save Data");
  numb = null;
}

function loadInfo() {
  userView.html(" <h4>Please wait data loading...</h4>");
  $.ajax({
    type: "get",
    url: "http://159.65.21.42:9000/users",
    success: function (res) {
      console.log(res);
      userForm = res;
      userForm = userForm.reverse();
      userNo.html(`${userForm.length}`);

      let row = "";
      for (let i = 0; i < userForm.length; i++) {
        row += `<tr>
    <td>${i + 1}</td>
    <td>${userForm[i]["name"]}</td>
    <td>${userForm[i]["phone"]}</td>
    <td>${userForm[i]["email"]}</td>
    <td class="pag2"><a href="#" class="doneBtn"  numb="${i}">Edit</a>  |  <a href="#" class="delBtn" numb="${i}">Delete</a></td>
    </tr>`;
      }
      userView.html(row);
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
}
function previewProducts() {
  productList.html(" <h4>Please wait,data loading...</h4>");

  $.ajax({
    type: "get",
    url: "http://159.65.21.42:9000/products",
    success: function (res) {
      console.log(res);
      todoForm = res;
      todoForm = todoForm.reverse();
      userSection.hide();
      productNo.html(`${todoForm.length}`);

      let row = "";
      for (let i = 0; i < todoForm.length; i++) {
        if (
          todoForm[i].category == "Separates" ||
          todoForm[i].category == "Dress and jumpsuit" ||
          todoForm[i].category == "Lifestyle"
        ) {
          row += `<div class="funC">
          <img src="${todoForm[i]["image"]}" />
          <span>
            <p>£,${todoForm[i]["price"]}</p>
            <h5>Quantity</h5>
            <h6>${todoForm[i]["description"]}</h6>
            <a href="">${todoForm[i]["quantity"]}</a>
          </span>
        </div>`;
        }
      }

      productList.html(row);
    },
    error: function (err) {
      console.log(err);
      alert(err.statusText);
    },
  });
}
