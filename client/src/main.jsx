import { createRoot } from 'react-dom/client'
import { BrowserRouter } from'react-router-dom'
import { Provider } from'react-redux'
import './index.css'
import App from './App.jsx'
import store, { persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
)
