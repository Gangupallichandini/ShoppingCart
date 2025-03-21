import React, { useEffect, useState } from "react";
import './ShoppingCart.css';

function ShoppingCart() {
    const [cart, setCart] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/carts/11')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setCart(data.products);
                setList(data.products);
            });
    }, []);

    //Sum of order price
    function totalOrderprice() {
        let orderPrice = cart.reduce((sum, item) => sum + item.price, 0);
        return orderPrice.toFixed(2);
    }

    //deleting the item
    const handleRemoveButton = (id) => {
        setCart(cart.filter(item => item.id !== id));
    }

    //Reset the cart data
    const handleResetCart = () => {
        setCart(list);
    }
    return (
        <div className="shoppingcart-contanier">
            <p className="shoppingcart-title">Shopping Cart</p>
            <div className="shoppingcart-total">
                <p className="cartlength">Cart contains {cart.length} products</p>
                <p className="ordertotal">Total:${totalOrderprice()}</p>
            </div>
            <div className="shoppingcart-items">
                {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <h4>{item.title}</h4>
                        <p>${item.price}</p>
                        <button className="cart-remove-button" onClick={() => handleRemoveButton(item.id)}>
                            Remove</button>
                    </div>
                ))}
            </div>
            <div className='resetbutton-wrapper'>
                <button className='resetbutton' onClick={handleResetCart}>Reset</button>
            </div>
        </div>
    )
}

export default ShoppingCart;