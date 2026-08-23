import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#E63946" } }}>
     <Provider store={store}>
        <App />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
    
  // </StrictMode>,
)
