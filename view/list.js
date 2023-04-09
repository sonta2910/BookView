let arr;
function findAll() {
    $.ajax({
        url: "http://localhost:8080/books",
        type: "GET",
        success(data) {
            displayBook(data)
        }
    })
}
function displayBook(data) {
    let arr = data
    let context = `<table border="1"><tr>
                    <th>STT</th>
                    <th>Book Code</th>
                    <th> Name</th>
                    <th> Author</th>
                    <th> Price</th>
                    <th colspan="2">Action</th>
                    </tr>`
    for (let i = 0; i < arr.length; i++) {
        context += `<tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].bookCode}</td> 
                    <td> ${arr[i].name}</a></td>
                    <td> ${arr[i].author}</a></td>
                    <td> ${arr[i].price}</a></td>
                    <td><button onclick="updateForm(${arr[i].id})">Update</button></td>
                  
                    <td><button onclick="deleteBook(${arr[i].id})">Delete</button></td>
                    </tr>`
    }
    context += `</table>`
    document.getElementById("display").innerHTML = context
    $("#form").hide()
    $("#display").show()
    $("#total").show()
    $("#result").hide()
    $("#searchAuthor").hide()
    $("#price").hide()
}
    


function createForm() {
    $("#bookCode").val("")
    $("#name").val("")
    $("#author").val("")
    $("#price").val("")
    document.getElementById("title").innerHTML = "Create Form"
    $("#form").show()
    document.getElementById("action").setAttribute("onclick", "createBook()")
    document.getElementById("action").innerHTML = "Create"
    $("#display").hide()
    $("#total").hide()
}
function createBook(){
    let book = {
        bookCode: $("#bookCode").val(),
        name: $("#name").val(),
        author: $("#author").val(),
        price: $("#price").val(),
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/books",
        type: "POST",
        data: JSON.stringify(book),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function updateForm(id){
    $.ajax({
        url: `http://localhost:8080/books/${id}`,
        type: "GET",
        success(data){
            $("#bookCode").val(data.bookCode)
            $("#name").val(data.name)
            $("#author").val(data.author)
            $("#price").val(data.price)
            document.getElementById("title").innerHTML="Update form"
            $("#form").show()
            document.getElementById("action").setAttribute("onclick",`updateBook(${id})`)
            document.getElementById("action").innerHTML="Update"
            $("#display").hide()
            $("#total").hide()
        }
    })
}
function updateBook(id){
    let book = {
        id: id,
        bookCode: $("#bookCode").val(),
        name: $("#name").val(),
        author: $("#author").val(),
        price: $("#price").val(),
    }
    $.ajax({
        url: "http://localhost:8080/books",
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(book),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function deleteBook(id) {
    if (confirm("Are You Sure To Delete This Book?")) {
        $.ajax({
            url: `http://localhost:8080/books/${id}`,
            type: "DELETE",
            success() {
                findAll()
            }
        })
    }
}
function backHome() {
    $("#form").hide()
    $("#detail").hide()
    $("#display").show()
    $("#total").show()
    event.preventDefault()
}
function searchByName() {
    var name = $("#name").val();
    $.ajax({
        url: "http://localhost:8080/books/searchByName?name=" + name,
        type: "GET",
        success: function (data) {
            let arr = data
    let context = `<table border="1"><tr>
                    <th>STT</th>
                    <th>Book Code</th>
                    <th> Name</th>
                    <th> Author</th>
                    <th> Price</th>
                    <th colspan="2">Action</th>
                    </tr>`
    for (let i = 0; i < arr.length; i++) {
        context += `<tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].bookCode}</td> 
                    <td> ${arr[i].name}</a></td>
                    <td> ${arr[i].author}</a></td>
                    <td> ${arr[i].price}</a></td>
                    <td><button onclick="updateForm(${arr[i].id})">Update</button></td>
                  
                    <td><button onclick="deleteBook(${arr[i].id})">Delete</button></td>
                    </tr>`
    }
    context += `</table>`
    document.getElementById("result").innerHTML=context;
        },
    
    });
    $("#price").hide()
    $("#result").show()
    $("#display").hide()
    $("#searchAuthor").hide()
}

function searchByAuthor() {
    var author = $("#author").val();
    $.ajax({
        url: "http://localhost:8080/books/search?author=" + author,
        type: "GET",
        success: function (data) {
            let arr = data
    let context = `<table border="1"><tr>
                    <th>STT</th>
                    <th>Book Code</th>
                    <th> Name</th>
                    <th> Author</th>
                    <th> Price</th>
                    <th colspan="2">Action</th>
                    </tr>`
    for (let i = 0; i < arr.length; i++) {
        context += `<tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].bookCode}</td> 
                    <td> ${arr[i].name}</a></td>
                    <td> ${arr[i].author}</a></td>
                    <td> ${arr[i].price}</a></td>
                    <td><button onclick="updateForm(${arr[i].id})">Update</button></td>
                  
                    <td><button onclick="deleteBook(${arr[i].id})">Delete</button></td>
                    </tr>`
    }
    context += `</table>`
    document.getElementById("searchAuthor").innerHTML=context;
        },
    
    });
$("#searchAuthor").show()
$("#display").hide()
$("#result").hide()
$("#price").hide()
}
function showTotalPrice() {
    $.ajax({
        url: "http://localhost:8080/books/showSumPrice",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#total-price").text(data);
        }
    });
}
function searchByPrice() {
    
        let minPrice= $("#minPrice").val(),
        maxPrice= $("#maxPrice").val();
    
    $.ajax({
        url: "http://localhost:8080/books/searchByPrice?minPrice=" + minPrice+"&maxPrice="+maxPrice,
        type: "GET",
        success: function (data) {
            let arr = data
    let context = `<table border="1"><tr>
                    <th>STT</th>
                    <th>Book Code</th>
                    <th> Name</th>
                    <th> Author</th>
                    <th> Price</th>
                    <th colspan="2">Action</th>
                    </tr>`
    for (let i = 0; i < arr.length; i++) {
        context += `<tr>
                    <td>${i + 1}</td>
                    <td>${arr[i].bookCode}</td> 
                    <td> ${arr[i].name}</a></td>
                    <td> ${arr[i].author}</a></td>
                    <td> ${arr[i].price}</a></td>
                    <td><button onclick="updateForm(${arr[i].id})">Update</button></td>
                  
                    <td><button onclick="deleteBook(${arr[i].id})">Delete</button></td>
                    </tr>`
    }
    context += `</table>`
    document.getElementById("price").innerHTML=context;
        },
    
    });
    $("#price").show()
$("#searchAuthor").hide()
$("#display").hide()
$("#result").hide()
}
