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
const navabrMenu=document.querySelector('.navbar__menu');
navabrMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }

    scrollIntoView(link);
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


