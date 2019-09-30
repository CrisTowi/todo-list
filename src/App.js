import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from "./context/Auth";

import ToDoList from "./ToDoList";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ToDoList />
      </AuthProvider>
    </div>
  );
}

export default App;
