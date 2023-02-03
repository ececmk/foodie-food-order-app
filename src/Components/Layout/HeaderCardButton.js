import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCardButton.module.css"

const HeaderCartButton = (props) => {
    const [btnAnimated, setBtnAnimated] = useState(false);
    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${btnAnimated ? classes.bump : ''}`;

    useEffect(()=> {
        if(cartCtx.items.length === 0){
            return;
        }
        setBtnAnimated(true);
        const timer = setTimeout(()=> {
            setBtnAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [items, cartCtx.items.length]);

    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
    )
};

export default HeaderCartButton;