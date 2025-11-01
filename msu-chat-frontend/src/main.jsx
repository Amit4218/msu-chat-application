
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme/TheamProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme='system'>
    <App />
  </ThemeProvider>

)
