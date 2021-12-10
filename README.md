# Web App for Pizzeria


* The page consists of a list of pizzas (in the middle) and a basket (on the right)
* Each item on the pizza list contains an image, name, price, ingredients list and an "zamów" button
* The list of pizzas is dynamically retrieved from the rest api
* The "zamówr" button adds the pizza to the cart
* One pizza can be added to the basket many times
* Each item in the cart contains the name, price, quantity and the "usuń" button
* "usuń" button deletes the pizza from the basket, if it has been added many times, the quantity is reduced by 1
* The total price for the order is displayed in the shopping cart
* If the pizza is added to or removed from the cart, the total price is recalculated
* If the basket is empty, the total price is hidden and the inscription „Głodny? Zamów naszą pizzę” is displayed in the basket
* Reloading the page does not clear the cart - localStorage
* The application is responsive according to the "mobile first" principle
* Default sort by name: ascending (A-Z) - opening the page products are sorted
* Filtering by ingredients - typing an ingredient refreshes the list of available pizzas.
* Automatic filtering, user types and refreshes the list with no additional buttons / actions.
* The user can enter multiple components by separating them with a comma. 
* The comparison is only based on whether the component contains the text you typed.
