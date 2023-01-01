import { FC } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { HomePage, OtherPage } from "../pages"

export const RootRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/other" element={<OtherPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
