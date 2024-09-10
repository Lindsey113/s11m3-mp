import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DogsList({ dogs, fetchDogs, setCurrentDog }) {
  const navigate = useNavigate()

  const edit = id => {
    setCurrentDog(id)
    navigate('form')
  }

  const deleteDog = id => {
    fetch(`/api/dogs/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          throw new Error("HAHA YOU'RE WRONG")

        }
        fetchDogs()
        setCurrentDog(null)

      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {
          dogs.map(dog => (
            <li key={dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? '' : 'NOT '}adopted
              <div>
                <button onClick={() => edit(dog.id)}>Edit</button>
                <button onClick={() => deleteDog(dog.id)} >Delete</button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
