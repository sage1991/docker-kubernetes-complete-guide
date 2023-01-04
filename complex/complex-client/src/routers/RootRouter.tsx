import { FC } from "react"
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

import { HomePage, OtherPage } from "../pages"

export const RootRouter: FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>
        <Link to="/other">Other Page</Link>
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
