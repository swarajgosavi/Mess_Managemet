import { useFoodsContext } from '../hooks/useFoodsContext'

const FoodDetails = ({ food }) => {
    const { dispatch } = useFoodsContext()

    const handleClick = async () => {

      const response = await fetch('https://mess-managemet.onrender.com/mess/food/' + food._id, {
        method: 'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'DELETE_FOOD', payload: json})
      }
    }

    return (
      <div className="food-details">
        <h4>{food.name}</h4>
        <p><strong>Description: </strong>{food.description}</p>
        <p><strong>Price: </strong>{food.price}</p>
        <p><strong>Stars: </strong>{food.stars}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default FoodDetails