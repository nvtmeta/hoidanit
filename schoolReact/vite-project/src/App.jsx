import React, { useEffect, useState } from 'react'
import { ApiEcommerce } from './ApiEcommerce';
import './App.css'
const App = () => {
  const [data, setData] = useState(null)
  useEffect(() => {
    getData()

  }, [])

  const getData = async () => {
    try {
      let data = await ApiEcommerce()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(data)


  return (
    <>
      <div className='container'>
        {data?.map(item => {
          return (
            <div className="card">
              <img src={item.image} alt="" style={{ width: "100%" }} />
              <div className="container">
                <h4><b>{item.title}</b></h4>
                <p>{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>

    </>
  )
}

export default App