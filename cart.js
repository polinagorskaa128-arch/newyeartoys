// cart.js - Общая логика корзины для всех страниц

// База данных товаров
const productsDB = {
    1: {
        id: 1,
        name: "Стеклянный шар 'Снежинка'",
        price: 850,
        image: "https://images.unsplash.com/photo-1512386233853-c3d0d61f6d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    2: {
        id: 2,
        name: "Деревянный олень",
        price: 1200,
        image: "https://images.unsplash.com/photo-1574359411659-619d6d6c1415?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    3: {
        id: 3,
        name: "Вязаный снеговик",
        price: 650,
        image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    4: {
        id: 4,
        name: "Винтажная шишка",
        price: 950,
        image: "https://images.unsplash.com/photo-1573869900138-93b8f6760ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    5: {
        id: 5,
        name: "Светящаяся гирлянда",
        price: 1800,
        image: "https://images.unsplash.com/photo-1512529904539-2034f9e1c8b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    6: {
        id: 6,
        name: "Ангел из фетра",
        price: 720,
        image: "https://images.unsplash.com/photo-1579547944212-c4f496d3044f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    7: {
        id: 7,
        name: "Шар 'Морозный узор'",
        price: 1100,
        image: "https://images.unsplash.com/photo-1574359455812-215704cd0c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    8: {
        id: 8,
        name: "Ёлочка из дерева",
        price: 890,
        image: "https://images.unsplash.com/photo-1606836131093-60d8ce42f5c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    9: {
        id: 9,
        name: "Снеговик из шерсти",
        price: 750,
        image: "https://images.unsplash.com/photo-1482513454561-4245d1b41618?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    10: {
        id: 10,
        name: "Звезда на верхушку",
        price: 1500,
        image: "https://images.unsplash.com/photo-1577720643365-7c9c7b69d0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    11: {
        id: 11,
        name: "Новогодний носок для подарков",
        price: 450,
        image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    12: {
        id: 12,
        name: "Мини-гирлянда",
        price: 350,
        image: "https://images.unsplash.com/photo-1512529904539-2034f9e1c8b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    13: {
        id: 13,
        name: "Ёлочный шарик 'С Новым годом'",
        price: 290,
        image: "https://images.unsplash.com/photo-1572386233853-c3d0d61f6d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
};

// Работа с корзиной в localStorage
function getCart() {
    const cart = localStorage.getItem('newyear_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('newyear_cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const cart = getCart();
    const product = productsDB[productId];
    
    if (!product) {
        console.error('Товар не найден:', productId);
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart(cart);
    updateCartCount();
    showNotification(`${product.name} добавлен в корзину!`);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
    showNotification('Товар удалён из корзины', 'warning');
}

function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity < 1) {
        removeFromCart(productId);
    } else {
        saveCart(cart);
        updateCartCount();
    }
}

function clearCart() {
    localStorage.removeItem('newyear_cart');
    updateCartCount();
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = getCartCount();
    
    countElements.forEach(element => {
        element.textContent = count;
    });
}

// Уведомления
function showNotification(text, type = 'success') {
    // Создаём уведомление, если его нет
    let notification = document.getElementById('global-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'global-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'warning' ? '#FF8A8A' : '#7FB685'};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            max-width: 300px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        document.body.appendChild(notification);
    }
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'warning' ? 'exclamation-triangle' : 'check-circle'}"></i>
        <span>${text}</span>
    `;
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
    }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Добавляем глобальные обработчики для кнопок добавления в корзину
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-add-to-cart')) {
            const button = e.target.closest('.btn-add-to-cart');
            const productId = parseInt(button.dataset.id);
            
            if (productId) {
                addToCart(productId);
                
                // Анимация кнопки
                button.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 200);
            }
        }
    });
});

// Экспортируем функции для использования в других скриптах
window.cartFunctions = {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateCartCount,
    showNotification
};
