/* =========================================
   COFFEE DATA
========================================= */

const menu = [
    {
        id: 1,
        name: "Espresso",
        price: 2.50,
        icon: "☕",
        description: "Rich, bold and beautifully intense."
    },

    {
        id: 2,
        name: "Latte",
        price: 3.50,
        icon: "🥛",
        description: "Smooth espresso with silky steamed milk."
    },

    {
        id: 3,
        name: "Cappuccino",
        price: 3.00,
        icon: "☕",
        description: "Perfect balance of espresso and foam."
    },

    {
        id: 4,
        name: "Americano",
        price: 2.00,
        icon: "🫘",
        description: "Clean, smooth and wonderfully simple."
    },

    {
        id: 5,
        name: "Mocha",
        price: 4.00,
        icon: "🍫",
        description: "Chocolate, espresso and creamy goodness."
    },

    {
        id: 6,
        name: "Macchiato",
        price: 3.25,
        icon: "☕",
        description: "Bold espresso kissed with steamed milk."
    },

    {
        id: 7,
        name: "Frappuccino",
        price: 4.50,
        icon: "🧊",
        description: "Cold, creamy and irresistibly refreshing."
    },

    {
        id: 8,
        name: "Black Coffee",
        price: 1.50,
        icon: "🖤",
        description: "Pure coffee. Nothing unnecessary."
    }
];


/* =========================================
   CART
========================================= */

let cart = [];


/* =========================================
   DOM ELEMENTS
========================================= */

const menuGrid = document.getElementById("menuGrid");
const orderItems = document.getElementById("orderItems");

const totalPrice = document.getElementById("totalPrice");

const cartCount = document.getElementById("cartCount");
const navCartCount = document.getElementById("navCartCount");

const checkoutModal =
    document.getElementById("checkoutModal");

const modalTotal =
    document.getElementById("modalTotal");


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}


/* =========================================
   DISPLAY MENU
========================================= */

function renderMenu() {

    menuGrid.innerHTML = "";

    menu.forEach(coffee => {

        const card = document.createElement("div");

        card.className = "coffee-card";

        card.innerHTML = `

            <div class="coffee-visual">
                ${coffee.icon}
            </div>

            <h3>
                ${coffee.name}
            </h3>

            <p>
                ${coffee.description}
            </p>

            <div class="card-bottom">

                <span class="price">
                    ${formatPrice(coffee.price)}
                </span>

                <button
                    class="add-button"
                    onclick="addToCart(${coffee.id})"
                    aria-label="Add ${coffee.name}"
                >
                    +
                </button>

            </div>
        `;

        menuGrid.appendChild(card);
    });
}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(id) {

    const coffee = menu.find(item => item.id === id);

    if (!coffee) return;


    const existingItem =
        cart.find(item => item.id === id);


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...coffee,
            quantity: 1
        });
    }


    renderCart();

    showAddedFeedback();
}


/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);
    }


    renderCart();
}


/* =========================================
   REMOVE ITEM
========================================= */

function removeItem(id) {

    cart =
        cart.filter(item => item.id !== id);

    renderCart();
}


/* =========================================
   RENDER CART
========================================= */

function renderCart() {

    orderItems.innerHTML = "";


    if (cart.length === 0) {

        orderItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    ☕
                </div>

                <h4>
                    Your cart is empty
                </h4>

                <p>
                    Choose something delicious
                    from our menu.
                </p>

            </div>
        `;

    } else {

        cart.forEach(item => {

            const element =
                document.createElement("div");

            element.className = "order-item";

            element.innerHTML = `

                <div class="item-icon">
                    ${item.icon}
                </div>

                <div class="item-details">

                    <strong>
                        ${item.name}
                    </strong>

                    <small>
                        ${formatPrice(item.price)} each
                    </small>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <span class="item-price">
                    ${formatPrice(
                        item.price * item.quantity
                    )}
                </span>

                <button
                    class="remove-item"
                    onclick="removeItem(${item.id})"
                    aria-label="Remove ${item.name}"
                >
                    ×
                </button>
            `;

            orderItems.appendChild(element);
        });
    }


    updateTotals();
}


/* =========================================
   TOTALS
========================================= */

function updateTotals() {

    const quantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    cartCount.textContent = quantity;

    navCartCount.textContent = quantity;

    totalPrice.textContent =
        formatPrice(total);
}


/* =========================================
   CLEAR ORDER
========================================= */

function clearOrder() {

    if (cart.length === 0) {

        alert("Your order is already empty.");

        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to clear your order?"
        );


    if (!confirmed) return;


    cart = [];

    renderCart();
}


/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Please add items to your order before checkout."
        );

        return;
    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    modalTotal.textContent =
        formatPrice(total);


    checkoutModal.classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    checkoutModal.classList.remove("active");

    document.body.style.overflow = "";


    cart = [];

    renderCart();
}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

checkoutModal.addEventListener(
    "click",
    event => {

        if (
            event.target === checkoutModal
        ) {

            closeModal();
        }
    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            checkoutModal.classList.contains("active")
        ) {

            closeModal();
        }
    }
);


/* =========================================
   SCROLL TO ORDER
========================================= */

function scrollToOrder() {

    const order =
        document.getElementById("orderCard");

    order.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =========================================
   SMALL ADD FEEDBACK
========================================= */

function showAddedFeedback() {

    const cartButton =
        document.querySelector(".nav-cart");


    cartButton.animate(
        [
            {
                transform: "scale(1)"
            },

            {
                transform: "scale(1.15)"
            },

            {
                transform: "scale(1)"
            }
        ],
        {
            duration: 300
        }
    );
}


/* =========================================
   INITIALIZE
========================================= */

renderMenu();

renderCart();