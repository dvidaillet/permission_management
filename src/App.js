function App() {
  const initialRoles = [
    { id: '1', name: 'Admin', permissions: ['PROJECT:WRITE', 'STORE:READ', 'ACCOUNT:READ_ACCESS'] },
    { id: '2', name: 'Editor', permissions: ['PROJECT:READ', 'STORE:WRITE'] },
  ]
  
  const initialPermissions = ['PROJECT:READ', 'PROJECT:WRITE', 'STORE:READ', 'STORE:WRITE', 'ACCOUNT:READ_ACCESS'];

  return (
    <div className="App">
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
