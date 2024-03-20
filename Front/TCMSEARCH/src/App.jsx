
// import AppRoute from './routes/AppRoute'
import Routes from './routes';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <div className="max-w-[360px]  m-auto">
        <div className="navbar navbar-primary bg-base-100">
          <div className="navbar-start">
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl" href="/">TCM Search</a>
          </div>
          <div className="navbar-end">
          </div>
        </div>
        <Routes />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Slide
      />
    </>
  )
}

export default App
