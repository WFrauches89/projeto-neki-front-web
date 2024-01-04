import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes/index';


export default function App() {
  return (
    <>
      <BrowserRouter>

        <Rotas />

      </BrowserRouter>
    </>
  );
}
