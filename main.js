'use strict';

// Navabr 스크롤했을때 Navabr에 background-color 생성
const navbar =document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Navbar에 Button을 클릭했을때 원하는 위치로 이동
const navbarMenu=document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
});

// Boggle btn 설정
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});

// Home 안에 있는 "contact me" 버튼 클릭 시 이벤트 발생
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Home을 스크롤 할때 점점 투명화 시키기 작업
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 위로가기 버튼 활성화
const arrowUp =document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight /2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// 위로가기 버튼 클릭 시 맨 위로 가게 이벤트 활성화
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
 const workBtnContainer = document.querySelector('.work__categories');
 const projectContainer = document.querySelector('.work__projects');
 const projects = document.querySelectorAll('.project');
 workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    // border 실시간 이동 가능하게 설정
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
 });

 // Certificate
 const academyBtnContainer = document.querySelector('.academy__category');
 const academyContainer = document.querySelector('.academy__Vowel');
 const vowels = document.querySelectorAll('.Vowel');
 academyBtnContainer.addEventListener('click', (a) => {
    const filter = a.target.dataset.filter || a.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    // border 실시간 이동 가능하게 설정
    const active = document.querySelector('.academy__btn.selected');
    active.classList.remove('selected');
    const target = a.target.nodeName === 'BUTTON' ? a.target : a.target.parentNode;
    target.classList.add('selected');

    academyContainer.classList.add('anim-out');
    setTimeout(() => {
        vowels.forEach((Vowel) => {
            if(filter === '*' || filter === Vowel.dataset.type) {
                Vowel.classList.remove('invisible');
            } else {
                Vowel.classList.add('invisible');
            }
        });
        academyContainer.classList.remove('anim-out');
    }, 300);

 });




function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}

// navbar 스크롤링 자동 선택 설정
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#project',
    '#academy',
    '#contact'
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            //스크롤링이 아래로 되어서 페이지가 올라오게 설정
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index -1;
            }
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if(window.scrollY + window.innerHeight === document.body.clientHeight){
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});