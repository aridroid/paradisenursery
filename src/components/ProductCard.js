function ProductCard({ item, onAddToCart, cart }) {
  const cartItem = cart.find(p => p.id === item.id);
  const isInCart = cartItem && cartItem.quantity > 0;

  return (
    <div className="product-card">
      <img src={item.image} alt={item.name} width="100" />
      <h3>{item.name}</h3>
      <p>USD{item.price}</p>
      <p>{item.description}</p>

      <button
        onClick={() => onAddToCart(item)}
        disabled={isInCart}
      >
        {isInCart ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}


export default ProductCard;
