const tabLists = document.querySelectorAll('.tabheader__item');
const tabContents = document.querySelectorAll('.tabcontent');
const TAB_HEADER_PARENT = document.querySelector('.tabheader__items');

function hideTabContent() {
    tabContents.forEach(function (elem) {
        elem.classList.add('hide');
        elem.classList.remove('visibl', 'fade');
    });
    tabLists.forEach(function (elem) {
        elem.classList.remove('tabheader__item_active');
    });

}

function showTabContent(i = 0) {
    tabContents[i].classList.add('visibl', 'fade');
    tabContents[i].classList.remove('hide');
    tabLists[i].classList.add('tabheader__item_active');
}


hideTabContent();
showTabContent();

TAB_HEADER_PARENT.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('tabheader__item')) {
        tabLists.forEach(function (elem, i) {
            if (event.target == elem) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

//Timer

const deadline = '2021-09-25';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor((t / (1000 * 60 * 60 * 24))),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadline);

//Modal

const modalOpens = document.querySelectorAll('[data-modal]');
const modalWindow = document.querySelector('.modal');
const modalClose = document.querySelector('[data-close]');

modalOpens.forEach(function (modalOpen) {
    modalOpen.addEventListener('click', function () {
        modalWindow.classList.add('visibl');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = "hidden";
    });
});

function closeModal() {
    modalWindow.classList.add('hide');
    modalWindow.classList.remove('visibl');
    document.body.style.overflow = "";
}

modalClose.addEventListener('click', closeModal);

modalWindow.addEventListener('click', function (event) {
    if (event.target === modalWindow) {
        closeModal();
    }
});

//using classes chapter 48-49
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = +this.price * this.transfer; //плюсик стоит на случай, если в параметр случайно введётся не число, а строка.
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `;
        this.parent.append(element);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
).render();