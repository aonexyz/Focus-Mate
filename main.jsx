import React from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './popup/Popup'
import './popup/popup.css'

const root = createRoot(document.getElementById('root'))
root.render(<Popup />)
