import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import  store from './redux/store.ts'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from './providers/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme/theme-provider.tsx'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider> */}
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
        {/* </AuthProvider> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
