import React, { useState } from 'react';
import './styles/style.css';
import plants from './data/plants';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';
import Header from './components/Header';


function App() {
  const [page, setPage] = useState('landing');
  const [cart, setCart] = useState([]);

  const goToLanding = () => setPage('landing');
  const goToProducts = () => setPage('products');
  const goToCart = () => setPage('cart');

  const handleAddToCart = (plant) => {
    const existing = cart.find((item) => item.id === plant.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...plant, quantity: 1 }]);
    }
  };

  const handleIncrease = (plant) => {
    setCart(cart.map((item) =>
      item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (plant) => {
    setCart(prevCart =>
      prevCart
        .map((item) => item.id === plant.id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter((item) => item.quantity > 0)
    );
  };

  const handleDelete = (plant) => {
    setCart(cart.filter((item) => item.id !== plant.id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);


  const groupedPlants = plants.reduce((acc, plant) => {
    acc[plant.category] = acc[plant.category] || [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div>
      {page === 'landing' && (
        <div className="landing-container">
          <div className="landing-left">
            <h1>Welcome To <br /> Paradise Nursery</h1>
            <p className="tagline">Where Green Meets Serenity</p>
            <button className="get-started-btn" onClick={goToProducts}>Get Started</button>
          </div>
          <div className="landing-right">
            <h2>Welcome to Paradise Nursery, where green meets serenity!</h2>
            <p>
              At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones, we have something for every plant enthusiast.
            </p>
            <p>
              Our team of experts is dedicated to ensuring that each plant meets our strict standards of quality and care. Whether you’re a seasoned gardener or just starting your green journey, we’re here to support you every step of the way. Feel free to explore our collection, ask questions, and let us help you find the perfect plant for your home or office.
            </p>
            <p>
              Join us in our mission to create a greener, healthier world. Visit Paradise Nursery today and experience the beauty of nature right at your doorstep.
            </p>
          </div>
        </div>
      )}



      {page === 'products' && (
        <div className="products">
          <Header
            totalItems={totalItems}
            onLogoClick={goToLanding}
            onCartClick={goToCart}
            showCartButton={true}
          />
          <h2>Browse Our Plants</h2>
          {Object.entries(groupedPlants).map(([category, items]) => (
            <div key={category}>
              <h3>{category}</h3>
              <div className="product-list">
                {items.map((plant) => (
                  <ProductCard
                    key={plant.id}
                    item={plant}
                    cart={cart}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}


      {page === 'cart' && (
        <div className="cart">
          <Header
            totalItems={totalItems}
            onLogoClick={goToLanding}
            onBackToShop={goToProducts}
            onCartClick={() => { }}
            showCartButton={true}
          />
          <h2>Your Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onDelete={handleDelete}
                />
              ))}
              <h3>Total: USD{totalCost}</h3>
              <button onClick={() => alert("Coming soon")}>Checkout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
