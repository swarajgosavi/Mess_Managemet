import { useState } from 'react'
import { useFoodsContext } from '../hooks/useFoodsContext'

const FoodForm = () => {
  const { dispatch } = useFoodsContext()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [stars, setStars] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const food = {name, stars, description, price}
    
    const response = await fetch('/mess/food', {
      method: 'POST',
      body: JSON.stringify(food),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setDescription('')
      setStars('')
      setPrice('')
      setEmptyFields([])
      dispatch({type: 'CREATE_FOOD', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Food</h3>

      <label>Dish Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Description:</label>
      <input 
        type="text-area" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>Number of Stars:</label>
      <input 
        type="number" 
        onChange={(e) => setStars(e.target.value)} 
        value={stars} 
        className={emptyFields.includes('stars') ? 'error' : ''}
      />

      <label>Price:</label>
      <input 
        type="number" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price} 
        className={emptyFields.includes('price') ? 'error' : ''}
      />

      <button>Add Food</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FoodForm