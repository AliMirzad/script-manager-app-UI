import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/main.css'
// import App from './App.tsx'
import MainRouter from './router/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <MainRouter/>
  </StrictMode>,
)
