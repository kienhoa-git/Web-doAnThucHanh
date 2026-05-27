const products = [
  {
    id: 1,
    name: "Điện Thoại Thông Minh",
    price: 8500000,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    category: "phone",
  },
  {
    id: 2,
    name: "Laptop Gaming",
    price: 25000000,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    category: "laptop",
  },
  {
    id: 3,
    name: "Tai Nghe Bluetooth",
    price: 1200000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    category: "accessory",
  },
  {
    id: 4,
    name: "Đồng Hồ Thông Minh",
    price: 3500000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    category: "accessory",
  },
  {
    id: 5,
    name: "Balo Laptop",
    price: 800000,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    category: "accessory",
  },
  {
    id: 6,
    name: "Chuột Không Dây",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    category: "accessory",
  },
];

let cart = JSON.parse(localStorage.getItem("sakura-cart")) || [];

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `<span>🌸</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function renderProducts(filteredList = products) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = filteredList
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Sản phẩm chất lượng cao, bảo hành 12 tháng</p>
                <div class="price">${formatPrice(product.price)}</div>
                <button class="btn" onclick="addToCart(${product.id})">Thêm Vào Giỏ</button>
            </div>
        </div>
    `,
    )
    .join("");
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCart();
  showToast(`Đã thêm <b>${product.name}</b> vào giỏ hàng!`);
}

function saveCart() {
  localStorage.setItem("sakura-cart", JSON.stringify(cart));
}

function updateCart() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount");
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Giỏ hàng trống</p>";
    totalAmount.textContent = "0đ";
    return;
  }
  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="price">${formatPrice(item.price)}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeItem(${item.id})" style="margin-left: 10px;">Xóa</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalAmount.textContent = formatPrice(total);
}

function updateQuantity(id, change) {
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) cart = cart.filter((i) => i.id !== id);
    saveCart();
    updateCart();
  }
}

function removeItem(id) {
  const product = products.find((p) => p.id === id);
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  updateCart();
  showToast(`Đã xóa <b>${product.name}</b> khỏi giỏ hàng`);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Giỏ hàng trống! Vui lòng thêm sản phẩm 🌸");
    return;
  }
  showToast("🎉 Cảm ơn anh đã đặt hàng! Em sẽ liên hệ xác nhận sớm ạ!");
  cart = [];
  saveCart();
  updateCart();
});

// Modern Mobile Navigation 🌸
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const menuOverlay = document.getElementById("menu-overlay");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu && menuOverlay) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
  });

  menuOverlay.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
  });

  // Xử lý Dropdown: Chỉ đóng/mở list con, KHÔNG đóng toàn bộ sidebar
  document.querySelectorAll(".dropdown > .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
        const parent = link.parentElement;
        parent.classList.toggle("active");

        // Đóng các dropdown khác nếu đang mở
        document.querySelectorAll(".dropdown").forEach((d) => {
          if (d !== parent) d.classList.remove("active");
        });
      }
    });
  });

  // Xử lý Lọc sản phẩm: Khi chọn item con thì mới đóng sidebar
  document.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const category = item.getAttribute("data-category");

      if (category === "all") {
        renderProducts(products);
      } else {
        const filtered = products.filter((p) => p.category === category);
        renderProducts(filtered);
      }

      // Đóng sidebar khi đã chọn xong danh mục
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      menuOverlay.classList.remove("active");

      document
        .getElementById("products")
        .scrollIntoView({ behavior: "smooth" });
      showToast(`Đang hiển thị danh mục: ${item.textContent} 🌸`);
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Chỉ đóng sidebar nếu KHÔNG PHẢI là link mở dropdown
      if (
        window.innerWidth <= 768 &&
        !link.parentElement.classList.contains("dropdown")
      ) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
      }
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
}

window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section, header");
  const scrollPosition = window.scrollY + 120;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });
  if (window.scrollY < 100) current = "home";
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href")?.slice(1) === current) {
      link.classList.add("active");
    }
  });
});

renderProducts();
updateCart();

function createSakuraPetals() {
  const container = document.getElementById("sakura-container");
  if (!container) return;
  const petalCount = 25;
  for (let i = 0; i < petalCount; i++) {
    createPetal(container);
  }
}

function createPetal(container) {
  const petal = document.createElement("span");
  petal.classList.add("sakura-petal");
  const size = Math.random() * 12 + 8;
  const left = Math.random() * 100;
  const delay = Math.random() * 15;
  const duration = Math.random() * 15 + 10;
  const opacity = Math.random() * 0.5 + 0.4;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  petal.style.left = `${left}vw`;
  petal.style.animationDelay = `${delay}s`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.opacity = opacity;
  const rotate = Math.random() * 360;
  petal.style.transform = `rotate(${rotate}deg)`;
  container.appendChild(petal);
  petal.addEventListener("animationiteration", () => {
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDelay = "0s";
  });
}

createSakuraPetals();

const checkout = () => {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  dropdownMenu.style.display =
    dropdownMenu.style.display === "none" ? "block" : "none";
};

const checkButton = document.querySelector(".checkout-button");
checkButton.addEventListener("click", checkout);
