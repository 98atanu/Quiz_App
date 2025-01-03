import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { SnackbarProvider } from 'notistack'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <SnackbarProvider
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    autoHideDuration={1000}
    >
    <App />
    </SnackbarProvider>
  </Provider>
  // </StrictMode>,
)
