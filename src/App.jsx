import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes/index';
import { AuthProvider } from './context/index'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Rotas />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
