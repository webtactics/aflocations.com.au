
const toggleButton = document.querySelector('.toggle-nav');
const offcanvasNav = document.querySelector('.offcanvas');
const closeNavButton = document.querySelector('.close-nav');

toggleButton.addEventListener('click', function() {
  offcanvasNav.classList.toggle('open');
  toggleButton.classList.toggle('active');
});

closeNavButton.addEventListener('click', function() {
  closeOffcanvasNav();
});

function closeOffcanvasNav() {
  offcanvasNav.classList.remove('open');
  toggleButton.classList.remove('active');
}

document.addEventListener('click', function(event) {
  const targetElement = event.target;
  if (
    !offcanvasNav.contains(targetElement) &&
    targetElement !== toggleButton &&
    !toggleButton.contains(targetElement) &&
    targetElement !== closeNavButton
  ) {
    closeOffcanvasNav();
  }
});

closeNavButton.addEventListener('click', function() {
  closeOffcanvasNav();
});


const header = document.querySelector('.topbar');
const scrollWatcher = document.createElement('div');

scrollWatcher.setAttribute('data-scroll-watcher', '');
header.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  header.classList.toggle('scrolled', !entries[0].isIntersecting)

}, {rootMargin: "-150px 0px 0px 0px"});
navObserver.observe(scrollWatcher)


const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");



const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -200px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});



window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    const transitionType = determineTransitionType(navigation.activation.from, navigation.activation.entry);
    e.viewTransition.types.add(transitionType);
  }
});


