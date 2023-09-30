import { ToastContainer } from 'react-toastify';
import { BeerContextProvider } from 'src/context/Beer';
import BeerListPage from 'src/pages/BeerListPage';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary fallbackRender={()=><div> Oops! Something went wrong. </div>}  onError={() => { }}>
      <BeerContextProvider>
        <BeerListPage />
      </BeerContextProvider>
      <ToastContainer autoClose={1500} position="bottom-right" />
    </ErrorBoundary>
  );
}

export default App;
