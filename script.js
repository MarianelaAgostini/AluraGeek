// Función para guardar los productos en localStorage
        function saveProductsToLocalStorage(products) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    
        // Función para obtener los productos desde localStorage
        function getProductsFromLocalStorage() {
            const products = localStorage.getItem('products');
            return products ? JSON.parse(products) : [];
        }
    
        // Función para renderizar los productos en la cuadrícula
        function renderProducts(products) {
            const productsGrid = document.getElementById('productsGrid');
            productsGrid.innerHTML = ''; // Limpiar la cuadrícula antes de renderizar
    
            products.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                
                productCard.innerHTML = `
                    <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
                    <div class="product-info">
                        <span>${product.nombre}</span>
                        <span>$${product.precio}</span>
                        <button class="delete-btn" data-index="${index}">🗑️</button>
                    </div>
                `;
    
                // Agregar el evento para eliminar el producto
                productCard.querySelector('.delete-btn').addEventListener('click', function() {
                    products.splice(index, 1); // Eliminar el producto del array
                    saveProductsToLocalStorage(products); // Guardar los cambios en localStorage
                    renderProducts(products); // Volver a renderizar los productos
                });
    
                productsGrid.appendChild(productCard);
            });
        }
    
        // Manejar el envío del formulario
        document.getElementById('productForm').addEventListener('submit', function(e) {
            e.preventDefault();
    
            const nombre = document.getElementById('nombre').value;
            const precio = document.getElementById('precio').value;
            const imagen = document.getElementById('imagen').value;
    
            const products = getProductsFromLocalStorage();
            products.push({ nombre, precio, imagen }); // Agregar el nuevo producto
            saveProductsToLocalStorage(products); // Guardar en localStorage
            renderProducts(products); // Volver a renderizar
    
            this.reset();
        });
    
        // Inicializar la aplicación cargando los productos guardados
        document.addEventListener('DOMContentLoaded', function() {
            const products = getProductsFromLocalStorage();
            renderProducts(products);
        });