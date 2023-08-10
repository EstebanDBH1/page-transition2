document.addEventListener("DOMContentLoaded", () => {
  customCursor();
  pageTran();
  delay = (n) => {
    n = n || 2000;
    return new Promise((done) => {
      setTimeout(() => {
        done();
      }, n);
    });
  };

  barba.init({
    sync: true,
    transitions: [
      {
        async leave(data) {
          const done = this.async();
          pageTran();
          await delay(1000);
          done();
        },
        async enter(data) {
          mainAnimation();
        },

        async once(data) {
          mainAnimation();
        },
      },
    ],
  });
});

/*==========================CUSTOM CURSOR ===============*/

const customCursor = () => {
  var cursor = document.querySelector(".cursor"),
    follower = document.querySelector(".cursor-follower");

  var posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      follower.style.left = posX - 20 + "px";
      follower.style.top = posY - 20 + "px";
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    },
  });

  document.addEventListener("mousemove", function (e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  let linksHovered = document.querySelectorAll(".link-navigation");

  linksHovered.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
      follower.classList.remove("active");
    });

    link.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      follower.classList.remove("active");
    });
  });
};

customCursor();

let link1 = document.querySelector(".link1");

link1.addEventListener("mouseenter", () => {
  gsap.to(".img-overlay", {
    opacity: 1,
    ease: "power3.easeInOut",
    duration: 0.5,
    scale: 1,
  });
});

link1.addEventListener("mouseleave", () => {
  gsap.to(".img-overlay", {
    opacity: 1,
    duration: 0.5,
  });

  gsap.to(".img-overlay", {
    opacity: 0,
    duration: 0.5,
  });
});

let mainAnimation = () => {
  gsap.to(".link-navigation", {
    y: 0,
    opacity: 1,
    stagger: 0.1,
  });

  gsap.to(".img1", {
    clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
  });
};
mainAnimation();

let pageTran = () => {
  var tl = gsap.timeline();

  tl.to(".page-transition", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 0.8,
  });

  tl.to(".page-transition", {
    y: "-100%",
    delay: 0.5,
    duration: 0.3,
  });

  tl.set(".page-transition", {
    y: "-100%",
    opacity: 1,
  });
};
