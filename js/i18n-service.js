var gTrans = {
    'mainTitle': {
        en: 'Welcome to my BookShop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    'subtitle': {
        en: 'Create new book',
        he: 'הוסף ספר ',
    },
    'id': {
        en: 'Id',
        he: 'מ"ס',
    },
    'title': {
        en: 'Title',
        he: 'כותר',
    },
    'price': {
        en: 'Price',
        he: 'מחיר',
    },
    'action': {
        en: 'Actions',
        he: 'ערוך',
    },
    'read': {
        en: 'Read',
        he: 'פרטים',
    },
    'update': {
        en: 'Update',
        he: 'עדכן מחיר',
    },
    'delete': {
        en: 'Delete',
        he: 'הסר ',
    },
    'add': {
        en: 'Add',
        he: 'הוסף ',
    },
    'add-book-placeholder': {
        en: 'Enter book name',
        he: 'שם הספר ',
    },
    'price-placeholder': {
        en: 'price',
        he: 'מחיר ',
    },
    'what is the new price?': {
        en: 'what is the new price?',
        he: 'מהו המחיר החדש ',
    },
    'Details': {
        en: 'Book Details',
        he: 'פרטים נוספים ',
    },
    'Are you sure?': {
        en: 'Are you sure?',
        he: '?האם אתה בטוח ',
    },
    'currency': {
        en: '$',
        he: '₪',
    },
    'close': {
        en: 'close',
        he: 'סגור',
    },

}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        // var transKey = el.getAttribute('data-trans');
        var transKey = el.dataset.trans;

        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}


function chengCurr() {
    if (gCurrLang === 'he') {
        for (var i = 0; i < gBooks.length; i++) {
            gBooks[i].price = (gBooks[i].price * 3.5).toFixed(2);
        }

    } else {
        for (var i = 0; i < gBooks.length; i++) {
            gBooks[i].price = (gBooks[i].price / 3.5).toFixed(2);
        }
    }

}


function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}