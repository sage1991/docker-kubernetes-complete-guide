import { FC } from "react"
import { Link } from "react-router-dom"

export const OtherPage: FC = () => {
  return (
    <div>
      <h1>Im some other page!</h1>
      <Link to="/">Go back home</Link>
    </div>
  )
}
