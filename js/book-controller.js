'use strict';


function onInit() {
    createBooks();
    doTrans();
    renderBooks();
}




function renderBooks() {
    var books = getBooks();
    var strHTML = '<tr> <th onclick="onSortBy(1)" class="id" data-trans="id">Id</th> <th onclick="onSortBy(2)" class="title" data-trans="title">Title</th><th onclick="onSortBy(3)" class="price" data-trans="price">Price</th><th class="action" data-trans="action" colspan="3">Actions</th> </tr>'
    var strHTMLs = books.map(function(book) {
        var className = book.id;
        return `<tr class="${className}">
        <td> ${book.id} </td>
        <td> ${book.title} </td>
        <td> ${book.price} <span>$</span> </td>
        <td><button class="read" data-trans="read" onclick="showBookDetails(${book.id})" >Read </button> </td>
        <td><button data-trans="update" onclick="readAndUpdateBook(${book.id})" class="update">Update </button></td>
        <td><button data-trans="delete" onclick="onDeleteBook(${book.id})" class="delete" >Delete </button></td>
                </tr>`
    });

    strHTMLs.unshift(strHTML);
    var elTodoList = document.querySelector('.books');
    elTodoList.innerHTML = strHTMLs.join('');
    doTrans();
}


function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function readAndAddNewBook() {
    var elName = document.querySelector('.name');
    var elPrice = document.querySelector('.book-price')
    addBook(elName.value, elPrice.value)
    renderBooks();
    elName.value = '';
    elPrice.value = '';
}

function readAndUpdateBook(bookId) {
    var price = +prompt(getTrans('what is the new price?'));
    updateBook(bookId, price);
    renderBooks()
}

function showBookDetails(bookId) {
    var book = findCurrBook(bookId);
    var elRate = document.querySelector('.rate');
    elRate.innerHTML = `<span class="plus" onclick="rateUp(${book.id})">   +   </span><span class="rate-score">  ${book.rate}  </span><span class="minus" onclick="rateDwon(${book.id})">   -   </span>`;
    showImg(book);
    var modal = getDocumentModal();
    modal[0].style.display = 'initial';
    modal[1].style.display = 'initial';
}

function closeDetails() {
    var modal = getDocumentModal();
    modal[0].style.display = 'none';
    modal[1].style.display = 'none';
}

function getDocumentModal() {
    var modal = [];
    var elBg = document.querySelector('.bg');
    var elModal = document.querySelector('.modal');
    modal.push(elBg, elModal);
    return modal;
}

function showImg(book) {
    var elImg = document.querySelector('.img');
    var elAbout = document.querySelector('.about');
    elImg.innerHTML = `<img src="${book.imgUrl}" >`;
    elAbout.innerText = book.about;
}

function rateUp(bookId) {
    var book = findCurrBook(bookId)
    if (book.rate === 10) return;
    book.rate++
        document.querySelector('.rate-score').innerText = book.rate;
}

function rateDwon(bookId) {
    var book = findCurrBook(bookId)
    if (book.rate === 0) return;
    book.rate--
        document.querySelector('.rate-score').innerText = book.rate;
}

function onSortBy(sortBy) {
    if (sortBy === 1) {
        gBooks.sort((id1, id2) => (id1.id > id2.id) ? 1 : -1)
    } else if (sortBy === 2) {
        gBooks.sort((title1, title2) => (title1.title > title2.title) ? 1 : -1)
    } else if (sortBy === 3) {
        gBooks.sort((price1, price2) => (price1.price > price2.price) ? 1 : -1)
    }
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
    renderBooks()
}