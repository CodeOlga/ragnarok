// import "swiper/swiper.min.css";
import "swiper/css";
import "../styles/reset.scss";
import "../styles/styles.scss";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { languages } from "./languages";
// Swiper.use([Navigation]);

const checkboxes = {
  requirements: ["minimum", "recommended"],
  versions: ["standard", "limited"],
};

let isPlay = false;

const classes = {
  opened: "opened",
  hidden: "hidden",
  active: "active",
};

const values = [
  {
    price: 19.99,
    title: "Standard Edition",
  },
  {
    price: 18.99,
    title: "Standard Edition",
  },
  {
    price: 29.99,
    title: "Deluxe Edition",
  },
  {
    price: 35.99,
    title: "Dualsense With a Game",
  },
  {
    price: 15.99,
    title: "Limited Edition",
  },
];

const header = document.querySelector(".header");
const menuLink = document.querySelectorAll(".menu-link");
const menuButton = document.querySelector(".header-menu__button");
const video = document.getElementById("video");
const videoButton = document.querySelector(".video-btn");
const checkbox = document.querySelectorAll(".checkbox");
const faqItem = document.querySelectorAll(".faq-item");
const sections = document.querySelectorAll(".section");
const language = document.querySelectorAll(".language");
const buyButton = document.querySelectorAll(".buy-button");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-version");
const modalPrice = document.querySelector(".modal-total__price");
const modalClose = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");

// burger menu, navigation to sections
const toggleMenu = () => header.classList.toggle(classes.opened);
const scrollToSection = (e) => {
  e.preventDefault();
  const href = e.currentTarget.getAttribute("href");

  if (!href && !href.startsWith("#")) return;
  // href - "#editions"
  const section = href.slice(1);
  const top = document.getElementById(section)?.offsetTop || 0;
  window.scrollTo({ top, behavior: "smooth" });
};

// timer
const formatValue = (value) => (value < 10 ? `0${value}` : value);

const getTimerValues = (diff) => ({
  seconds: (diff / 1000) % 60,
  minutes: (diff / (1000 * 60)) % 60,
  hours: (diff / (1000 * 60 * 60)) % 24,
  days: (diff / (1000 * 60 * 60 * 24)) % 30,
});

const setTimerValues = (values) => {
  Object.entries(values).forEach(([key, value]) => {
    const timerValue = document.getElementById(key);
    timerValue.innerText = formatValue(Math.floor(value));
  });
};

const startTimer = (date) => {
  const id = setInterval(() => {
    const diff = new Date(date).getTime() - new Date().getTime();

    if (diff < 0) {
      clearInterval(id);
      return;
    }

    setTimerValues(getTimerValues(diff));
  }, 1000);
};

// video
const handleVideo = ({ target }) => {
  const info = target.parentElement;

  isPlay = !isPlay;
  info.classList.toggle(classes.hidden, isPlay);
  target.innerText = isPlay ? "Pause" : "Play";
  isPlay ? video.play() : video.pause();
};

// checkbox
const handleCheckbox = ({ currentTarget: { checked, name } }) => {
  const { active } = classes;
  const value = checkboxes[name][Number(checked)];
  const list = document.getElementById(value);
  const tabs = document.querySelectorAll(`[data-${name}]`);
  const siblings = list.parentElement.children;

  for (const item of siblings) item.classList.remove(active);
  for (const tab of tabs) {
    tab.classList.remove(active);
    tab.dataset[name] === value && tab.classList.add(active);
  }

  list.classList.add(active);
};

// slider
const initSlider = () => {
  new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    initialSlide: 2,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

// faq - показуємо прихований текст і додаємо йому висоту
const handleFaqItem = ({ currentTarget: target }) => {
  target.classList.toggle(classes.opened);
  const isOpened = target.classList.contains(classes.opened);
  const height = target.querySelector("p").clientHeight;
  const content = target.querySelector(".faq-item__content");

  content.style.height = `${isOpened ? height : 0}px`;
};

// анімація та поява секцій при скролі сторінки
const handleScroll = () => {
  const { scrollY: y, innerHeight: h } = window;
  sections.forEach((section) => {
    if (y > section.offsetTop - h / 1.5)
      section.classList.remove(classes.hidden);
  });
};

// toggle languages
const setTexts = () => {
  const lang = localStorage.getItem("lang") || "en";
  const content = languages[lang];

  Object.entries(content).forEach(([key, value]) => {
    const items = document.querySelectorAll(`[data-text="${key}"]`);
    items.forEach((item) => (item.innerText = value));
  });
};

const toggleLanguage = ({ target }) => {
  const { lang } = target.dataset;

  if (!lang) return;

  localStorage.setItem("lang", lang);
  setTexts();
};

const handleBuyButton = ({ currentTarget: target }) => {
  const { value } = target.dataset;

  if (!value) return;

  const { price, title } = values[value];

  modalTitle.innerText = title;
  modalPrice.innerText = `${price}$`;
  modal.classList.add(classes.opened);
  overlay.classList.add(classes.opened);
};

const closeModal = () => {
  modal.classList.remove(classes.opened);
  overlay.classList.remove(classes.opened);
};

initSlider();
setTexts();
startTimer("November 9, 2024 00:00:00");
window.addEventListener("scroll", handleScroll);
menuButton.addEventListener("click", toggleMenu);
videoButton.addEventListener("click", handleVideo);
menuLink.forEach((link) => link.addEventListener("click", scrollToSection));
checkbox.forEach((box) => box.addEventListener("click", handleCheckbox));
faqItem.forEach((item) => item.addEventListener("click", handleFaqItem));
language.forEach((lang) => lang.addEventListener("click", toggleLanguage));
buyButton.forEach((btn) => btn.addEventListener("click", handleBuyButton));
modalClose.addEventListener("click", closeModal);
