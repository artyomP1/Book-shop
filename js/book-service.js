'use strict';
const BOOKS_KEY = 'books';

var gNextId = 101;
var gBooks;
createBooks()

function createBooks() {
    var books = loadBooksFromStorage();
    if (!books || books.length === 0) {
        books = [createBook('Don Quixote', '8.99', 'img/quixote.jpg', 'Nominated as one of America’s best-loved novels by PBS’s The Great American Read'),
        createBook('War and Peace', '12.99', 'img/warAndPeace.jpg', 'Nominated as one of America’s best-loved novels by PBS’s The Great American Read'),
        createBook('Hamlet', '5.59', 'img/hamlet.jpg', 'Hamlet: An UPDATED EDITION from the Folger Shakespeare Library')];
    }
    gBooks = books;
    saveBooksToStorage();
}

function createBook(title, price, imgUrl, about) {
    return {
        id: gNextId++,
        title: title,
        price: price,
        imgUrl: imgUrl,
        about: about,
        rate: 0,
    }
}

function getBooks() {
    return gBooks;
}

function deleteBook(bookId) {
    var isSure = confirm('Are you sure?');
    if (!isSure) return;
    var books = gBooks.filter(function (book) {
        return book.id !== bookId
    });
    gBooks = books;
    saveBooksToStorage();
}

function addBook(name, price) {
    var newBook = createBook(name, price);
    gBooks.unshift(newBook);
    saveBooksToStorage();
}

function saveBooksToStorage() {
    saveToStorage(BOOKS_KEY, gBooks)
}
function loadBooksFromStorage() {
    return loadFromStorage(BOOKS_KEY);
}

function updateBook(bookId, price) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    });
    gBooks[bookIdx].price = price;
}

function findCurrBook(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    });
    return book;
}