import PropTypes from 'prop-types';
import './Cart.css';

const Cart = ({ cart, handleREmoveFromCart }) => {
    return (
        <div>
            <h4>Cart: {cart.length}</h4>
            <div className="cart-container">
                {cart.map(bottle => <div key={bottle.id}>
                    <img src={bottle.img}></img>
                    <button onClick={() => handleREmoveFromCart(bottle.id)}>Remove</button>
                </div>)}
            </div>
        </div>
    );
};

Cart.PropTypes = {
    cart: PropTypes.array.isRequired,
    handleREmoveFromCart: PropTypes.func.isRequired
}
export default Cart;