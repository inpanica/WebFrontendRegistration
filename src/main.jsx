import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { store } from './reducers/reducer.js'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
            <App />
    </Provider>
)
