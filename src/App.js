import RolesComponent from "./components/RoleManagement";

function App() {
  //arreglo de roles iniciales
  const initialRoles = [
    {
      id: "1",
      name: "ADMIN",
      permissions: ["PROJECT:WRITE", "STORE:READ", "ACCOUNT:READ_ACCESS"],
    },
    { id: "2", name: "USER", permissions: ["PROJECT:READ", "STORE:WRITE"] },
  ];

  //arreglo de permisos inicales
  const initialPermissions = [
    "PROJECT:READ",
    "PROJECT:WRITE",
    "STORE:READ",
    "STORE:WRITE",
    "ACCOUNT:READ_ACCESS",
  ];

  return (
    <div className="App">
      <RolesComponent
        initialRoles={initialRoles}
        initialPermissions={initialPermissions}
      />
    </div>
  );
}

export default App;
