import React from 'react'

import classes from './Order.module.css'
import BurgerIngredient from "../Burger/BurgerIngredient/BurgerIngredient";

const order = props => {
    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName, amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span
            key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '8px'
            }}
        >
            {ingredient.name} ({ingredient.amount})
        </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: </p>
            { ingredientOutput }
            <p>Price: <strong>$ { Number.parseFloat(props.price).toFixed(2) }</strong></p>
        </div>
    )
}

export default order