import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Provider } from 'react-redux'
import { store } from './app/store'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </QueryClientProvider>
  </Provider>
)
