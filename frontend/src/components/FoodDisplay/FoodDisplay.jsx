import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../Context/StoreContext'

const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dates near you</h2>
      <div className='food-display-list'>
        {(
          category === "All"
            ? food_list
            : food_list.filter(i => (i.category || "").trim().toLowerCase() === (category || "").trim().toLowerCase())
        ).map(item => (
          <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id} />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
