import React, { useEffect, useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DogForm from './DogForm'
import DogsList from './DogsList'

export default function App() {

  const [dogs, setDogs] = useState([])
  const [currentDogId, setCurrentDog] = useState(null)

  useEffect(() => {
    fetchDogs()
  }, [])

  const fetchDogs = () => {
    fetch('/api/dogs')
      .then(res => {
        if (!res.ok) {
          throw new Error('error')
        }

        const contentType = res.headers.get('Content-Type')

        if (contentType.includes('application/json')) {
          return res.json()
        }
      })
      .then(setDogs)
      .catch(error => console.log(error))

  }
  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList
          dogs={dogs}
          fetchDogs={fetchDogs}
          setCurrentDog={setCurrentDog}
        />} />
        <Route path="/form" element={<DogForm
          dog={currentDogId && dogs.find(d => d.id == currentDogId)}
          fetchDogs={fetchDogs}
          reset={() => setCurrentDog(null)}
        />} />
      </Routes>
    </div>
  )
}
