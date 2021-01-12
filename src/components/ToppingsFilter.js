import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    align-items: center;
    border-radius: 2px;
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

function countPizzaInToppings(pizzas) {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];

      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        // otherwise create a new entry in our acc and set it to tur
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});

  // sort them based on their counts/ Object.values is used since it is an array
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
}

export default function ToppingsFilter() {
  // get a list of all toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  console.clear();
  // console logging the pizzas and toppings
  // get a list of all the pizzas with their toppings
  // count how many pizzas are

  const toppingsWithCounts = countPizzaInToppings(pizzas.nodes);
  console.log(toppingsWithCounts);
  // loop over the list of toppings and display the toppings and the count of pizzas that are topping

  return (
    <ToppingStyle>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyle>
  );
}
