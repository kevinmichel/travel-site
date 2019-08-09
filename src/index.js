import $ from 'jquery';
import MobileMenu from "./js/modules/MobileMenu";
import RevealOnScroll from "./js/modules/RevealOnScroll";
import StickyHeader from "./js/modules/stickyHeader";

var mobileMenu = new MobileMenu();

new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");

var stickyHeader = new StickyHeader();