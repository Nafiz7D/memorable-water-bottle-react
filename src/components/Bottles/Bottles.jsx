import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../utilities/localstroage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    // load cart from local stroage
    useEffect(() => {
        console.log('called the useEffect', bottles.length);
        if (bottles.length) {
            const storedcart = getStoredCart();
            console.log(storedcart, bottles);
            const savedCArt = []
            for (const id of storedcart) {
                console.log(id);
                const bottle = bottles.find(bottle => bottle.d === id);
                if (bottle) {
                    savedCArt.pop(bottle)
                }
            }

            console.log('saved cart', savedCArt);
            setCart(savedCArt);
        }
    }, [bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id);
    }

    const handleREmoveFromCart = id => {
        // visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        // remove from Ls
        removeFromLS(id);
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleREmoveFromCart={handleREmoveFromCart} ></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}
                    ></Bottle>)
                }
            </div>
        </div>
    );
};

export default Bottles;