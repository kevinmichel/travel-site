import $ from 'jquery';
import MobileMenu from "./js/modules/MobileMenu";
import RevealOnScroll from "./js/modules/RevealOnScroll";

var mobileMenu = new MobileMenu();

new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");
