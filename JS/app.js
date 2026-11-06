// Datos del menú

const menuData = {
    hamburguesas: [
        {
            name: "Clásica",
            price: 14000,
            description: "Carne de res, queso, lechuga, tomate, cebolla y jamón."
        },
        {
            name: "La Ranchera",
            price: 16000,
            description: "Carne, salchicha ranchera, lechuga, tomate, cebolla, jamón, queso, papa y salsa picante."
        },
        {
            name: "Doble Troque",
            price: 20000,
            description: "Dos carnes de res, lechuga, queso, tomate, cebolla, tocineta y papa."
        },
        {
            name: "La Suiza",
            price: 20000,
            description: "Carne de res, salchicha suiza, lechuga, queso, tomate, cebolla, tocineta y papa."
        },
        {
            name: "La Chorizada",
            price: 20000,
            description: "Carne de res, chorizo, lechuga, queso, tomate, cebolla, tocineta y papa."
        },
        {
            name: "La Bárbara",
            price: 25000,
            description: "Carne de res, pechuga, lechuga, queso, tomate, cebolla, tocineta y papa."
        }
    ],

    perros: [
        { name: "Sencillo", price: 7000 },
        { name: "Choriperro", price: 13000 },
        { name: "Ranchero", price: 13000 },
        { name: "Suizo", price: 15000 },
        { name: "4 Carnes", price: 15000 }
    ],

    salchipapas: [
        { name: "Personal", price: 14000 },
        { name: "Salchi Ranchera", price: 16000 },
        { name: "Salchi Suiza", price: 18000 },
        { name: "Salchi Chori", price: 18000 }
    ],

    burritos: [
        { name: "Mixto", price: 15000, description: "Cerdo, pechuga, chorizo, butifarra + papa" }
    ],

    asados: [
        { name: "Cerdo", price: 15000, description: "Papa frita o patacón, porción de cerdo + ensalada" },
        { name: "Pechuga", price: 15000,  description: "Papa frita o patacón, porción de pechuga + ensalada" },
        { name: "Pechuga gratinada", price: 18000,  description: "Papa frita o patacón, porción de pechuga gratinada + ensalada" },
        { name: "Mixto", price: 22000,  description: "Papa frita o patacón, porción de cerdo y pechuga + ensalada" }
    ],

    picadas: [
        { 
            name: "La Tablua", 
            prices: [20000, 25000, 32000],  description: "Papa frita, Cerdo, pechuga, chorizo y butiffara" 
        },
        { name: "La Cañana", price: 50000, description: "Papa frita, Cerdo, pechuga, chorizo y butiffara" }
    ],

    adicionales: [
        { name: "Papitas", price: 3000 },
        { name: "Queso", price: 3000 }
    ]
};

// Elementos del HTML

const categories = document.querySelectorAll(".category");
const productsContainer = document.querySelector(".products");
const categoryImage = document.querySelector("#categoryImage");



// Fotografías representativas de cada sección

const categoryImages = {
    hamburguesas: "img/hamburguesas.jpg",
    perros: "img/perros.webp",
    salchipapas: "img/salchipapa.webp",
    burritos: "img/burritos.webp",
    asados: "img/asados.webp",
    picadas: "img/picada.webp",
    adicionales: "img/porcion.webp"
};

let imageRequestId = 0;

// Mostrar productos

function showProducts(categoryName) {

    const products = menuData[categoryName];

    const image = categoryImages[categoryName];
const currentRequest = ++imageRequestId;

if (image) {
    const newImage = new Image();

    newImage.onload = () => {

        if (currentRequest !== imageRequestId) return;

        categoryImage.src = image;
        categoryImage.alt = categoryName;
        categoryImage.parentElement.style.display = "block";
    };

    newImage.onerror = () => {
        console.error("Error al cargar:", image);
    };

    newImage.src = image;
}

    // Mostrar tarjetas de productos
    productsContainer.innerHTML = products.map(product => {

        let priceContent = "";

        if (product.prices) {

            priceContent = `
                <div class="product-prices">
                    ${product.prices.map(price => `
                        <span>$${price.toLocaleString("es-CO")}</span>
                    `).join("")}
                </div>
            `;

        } else if (product.price !== null) {

            priceContent = `
                <p class="product-price">
                    $${product.price.toLocaleString("es-CO")}
                </p>
            `;

        }

        return `
            <article class="product-card">

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description || ""}
                </p>

                ${priceContent}

            </article>
        `;

    }).join("");
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            productsContainer.classList.remove("changing");
        });
    });
}

// Navegación

categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(button => {
            button.classList.remove("active");
        });

        category.classList.add("active");

        showProducts(category.dataset.category);

    });

});

// Mostrar hamburguesas al iniciar

showProducts("hamburguesas");

