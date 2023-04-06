import './index.css';
import Todointerface from './Todo';
import "@fortawesome/fontawesome-free/css/all.css"; // or individual icons as required




function App() {
  return (
    <div className="text-center pt-8">
    <h1 className='font-bold text-3xl my-8 pb-4 font-sans text-gray-500'>DNB's todo-List</h1>
    <Todointerface/>
    </div>
  );
}

export default App;
