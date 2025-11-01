import router from './router.jsx'
import './index.css'
import { ThemeProvider } from './components/theme/TheamProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import {createRoot} from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme='system'>
    <RouterProvider router={router}/>
  </ThemeProvider>

)
