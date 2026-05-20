document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const cardTemplate = document.getElementById('product-card-template');
    const categorySwitcher = document.getElementById('category-switcher');
    
    const WHATSAPP_NUMBER = '56977967174';
    let allProducts = [];
    let currentCategory = 'llanta'; // Categoría inicial

    // Función principal para cargar y mostrar productos
    async function init() {
        try {
            const response = await fetch('data/productos.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allProducts = await response.json();
            renderProducts(currentCategory);
        } catch (error) {
            console.error("No se pudieron cargar los productos:", error);
            productGrid.innerHTML = '<p class="text-red-500">Error al cargar el catálogo. Intente de nuevo más tarde.</p>';
        }
    }

    // Función para renderizar los productos en el DOM
    function renderProducts(category) {
        productGrid.innerHTML = ''; // Limpiar el grid
        const filteredProducts = allProducts.filter(p => p.categoria === category);

        filteredProducts.forEach(product => {
            const card = cardTemplate.content.cloneNode(true).querySelector('.product-card');
            
            // Llenar datos de la tarjeta
            card.querySelector('[data-field="imagen"]').src = product.imagen;
            card.querySelector('[data-field="imagen"]').alt = product.nombre;
            card.querySelector('[data-field="marca"]').textContent = product.marca;
            card.querySelector('[data-field="nombre"]').textContent = product.nombre;
            card.querySelector('[data-field="precio"]').textContent = `$${product.precio.toLocaleString('es-CL')}`;

            // Crear el enlace de WhatsApp para "Consultar Stock"
            const message = encodeURIComponent(`Hola, estoy interesado/a en el producto: ${product.nombre} (ID: ${product.id})`);
            const whatsappLink = `<https://wa.me/${WHATSAPP_NUMBER}?text=${message}>`;
            card.querySelector('[data-field="whatsapp"]').href = whatsappLink;

            // TODO: Añadir event listener para abrir el modal de detalle
            // card.addEventListener('click', () => openProductModal(product));

            productGrid.appendChild(card);
        });
    }

    // Manejo del cambio de categoría
    categorySwitcher.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const newCategory = e.target.dataset.category;
            if (newCategory !== currentCategory) {
                currentCategory = newCategory;
                // Actualizar estilo de botones
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                // Renderizar la nueva categoría
                renderProducts(currentCategory);
                // TODO: Actualizar los filtros disponibles
            }
        }
    });

    // Iniciar la aplicación
    init();

    // TODO: Lógica para el buscador (input en #search-input)
    // TODO: Lógica para generar y manejar los filtros
    // TODO: Lógica para el modal (abrir/cerrar y llenar datos)
    // TODO: Lógica para el comparador de productos
    // TODO: Lógica para el interruptor de tema (light/dark)
});
