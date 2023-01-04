import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import axios from "axios"

interface Index {
  number: number
}

export const HomePage: FC = () => {
  const [ seenIndexes, setSeenIndexes ] = useState<Index[]>([])
  const [ values, setValues ] = useState<{ [index: number]: number }>({})
  const [ index, setIndex ] = useState<string>("")

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const fetchValues = async () => {
    const { data } = await axios.get<{ [index: number]: number }>("/api/values/current")
    setValues(data)
  }

  const fetchIndexes = async () => {
    const { data } = await axios.get<Index[]>("/api/values/all")
    setSeenIndexes(data)
  }

  const onIndexChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setIndex(value)

  const onIndexSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post("/api/values", { index })
    setIndex("")
  }


  return (
    <div>
      <form onSubmit={onIndexSubmit}>
        <label htmlFor="index">Enter your index:</label>
        <input id="index" type="text" value={index} onChange={onIndexChange} />
        <button type="submit">Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      <p>{seenIndexes.map(({ number }) => number).join(", ")}</p>
      <h3>Calculated values:</h3>
      <ul>
        {Object.entries(values).map(([ index, value ]) => {
          return <li key={index}>For index {index} I calculated {value}</li>
        })}
      </ul>
    </div>
  )
}
