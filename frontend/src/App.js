import logo from './logo.svg';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-4">
            <img src={logo} className="h-16 w-16 animate-spin" alt="logo" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
            React + Tailwind CSS
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.js</code> and save to reload.
          </p>
          <div className="text-center">
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
