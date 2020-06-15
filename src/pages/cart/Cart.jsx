import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addToCart, removeFromCart } from "../../actions/cart";
import { getItemsTotalPrice } from "../../modules/helpers/cart";
import { Link } from "react-router-dom";
import { formatNameToUrlFormat } from "../../modules/helpers/catalog";

import "../home/catalog/Item.scss";
import "./Cart.scss";

const getEmptyCart = () => {
  return <span className="cart__empty">Sua sacola está vazia :\</span>;
};

const getCartItems = (items, addToCart, removeFromCart) => {
  return items.map((item, index) => (
    <div key={index} className="product__list__item">
      <div className="product__list__row">
        <figure className="product__image">
          <Link to={`${formatNameToUrlFormat(item.name)}`}>
            <img
              src={item.image}
              alt={`Produto ${item.name}`}
              title={`${item.name}`}
            />
          </Link>
        </figure>
        <div className="product__list__info">
          <p className="product__list__name">{`${item.name}`}</p>
          <p className="product__list__size">
            <span>Tam.: {item.selectedSize}</span>
          </p>
          <div className="product__list__quantity">
            <button
              type="button"
              className="cart__icons"
              onClick={() => removeFromCart(item)}
            >
              <FontAwesomeIcon icon="minus" />
            </button>
            <div className="product__list__input">{item.quantity}</div>
            <button
              type="button"
              className="cart__icons"
              onClick={() => addToCart(item)}
            >
              <FontAwesomeIcon icon="plus" />
            </button>
          </div>
        </div>
        <div className="product__list__pricing">
          <div className="product__list__current">{item.actual_price}</div>
          <div className="product__list__installments">{item.installments}</div>
        </div>
      </div>
      <div className="product__row">
        <button
          type="button"
          className="cart__remove"
          onClick={() => removeFromCart({ ...item, removeAll: true })}
        >
          Remover item
        </button>
      </div>
    </div>
  ));
};

function Cart({ cart, addToCart, removeFromCart }) {
  const { items } = cart;

  return (
    <div className="cart">
      <div className="product__list">
        {items.length
          ? getCartItems(items, addToCart, removeFromCart)
          : getEmptyCart()}
      </div>
      <div className="cart__subtotal">
        <div className="header__title">
          Subtotal - R${getItemsTotalPrice(items)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = {
  addToCart,
  removeFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);