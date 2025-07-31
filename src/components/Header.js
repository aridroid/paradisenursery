import React from 'react';

function Header({ totalItems, onLogoClick, onCartClick, onBackToShop, showCartButton = false }) {
  return (
    <header className="header">
      <h1 className="logo" onClick={onLogoClick}>🪴 Paradise Nursery</h1>

      <div className="header-buttons">
        {showCartButton && (
          <>
            {onBackToShop && (
              <button className="header-btn" onClick={onBackToShop}>
                ← Continue Shopping
              </button>
            )}
            <button className="header-btn" onClick={onCartClick}>
              🛒 Cart ({totalItems})
            </button>
          </>
        )}

      </div>
    </header>
  );
}

export default Header;
