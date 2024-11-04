import React from 'react';
import { AuthProvider } from './components/AuthComponents';
import Menu from './rutas/Menu';

function App() {
  return (
    <AuthProvider>
      <Menu />
    </AuthProvider>
  );
}

export default App;
