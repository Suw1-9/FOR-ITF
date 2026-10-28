"use strict";

const dishes = [
  {
    name: "ข้าวหมูกรอบ",
    desc: "น้ำจิ้มเด็ดๆ หมูกรอบลั่นๆ",
    price: "ราคา 50-67 บาท",
    img: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "ผัดกะเพราหมูสับ",
    desc: "ใบกะเพราหอมๆ ผัดไฟแรง รสจัดจ้าน",
    price: "ราคา 50-60 บาท",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "ผัดไทยกุ้งสด",
    desc: "เส้นเหนียวนุ่ม กลมกล่อมด้วยมะขามเปียก",
    price: "ราคา 60-80 บาท",
    img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "ส้มตำไทย",
    desc: "มะละกอกรอบๆ เปรี้ยวเผ็ดถึงเครื่อง",
    price: "ราคา 45-55 บาท",
    img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "ต้มยำกุ้ง",
    desc: "กุ้งสดตัวโต น้ำซุปเปรี้ยวเผ็ดหอมสมุนไพร",
    price: "ราคา 80-120 บาท",
    img: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "ข้าวขาหมู",
    desc: "ขาหมูตุ๋นนุ่ม น้ำพะโล้หอมเข้มข้น",
    price: "ราคา 50-65 บาท",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80"
  }
];

const dishCard = document.getElementById("dishCard");
const dishImage = document.getElementById("dishImage");
const dishName = document.getElementById("dishName");
const dishDesc = document.getElementById("dishDesc");
const dishPrice = document.getElementById("dishPrice");
const shuffleBtn = document.getElementById("shuffleBtn");

let currentIndex = 0;

function showDish(dish, animate = true) {
  dishImage.src = dish.img;
  dishImage.alt = dish.name;
  dishName.textContent = dish.name;
  dishDesc.textContent = dish.desc;
  dishPrice.textContent = dish.price;

  if (animate) {
    dishCard.classList.remove("is-refreshing");
    void dishCard.offsetWidth;
    dishCard.classList.add("is-refreshing");
  }
}

function pickRandomDish() {
  if (dishes.length < 2) {
    showDish(dishes[0]);
    return;
  }

  let nextIndex;

  // Pick a different dish so one click always feels like a new result.
  do {
    nextIndex = Math.floor(Math.random() * dishes.length);
  } while (nextIndex === currentIndex);

  currentIndex = nextIndex;
  showDish(dishes[currentIndex]);
}

shuffleBtn.addEventListener("click", pickRandomDish);

// Show the first dish when the page loads.
showDish(dishes[currentIndex], false);

// Warm up the other dish images so random picks render quickly.
window.addEventListener("load", () => {
  dishes.forEach((dish, index) => {
    if (index === currentIndex) return;

    const image = new Image();
    image.src = dish.img;
  });
}, { once: true });
