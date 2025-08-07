import type { users } from "../../types/types";
import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { CButton, CTable, CFormInput } from "@coreui/react";

const UsersPage = () => {
  const { users, loading, error, createUser, deleteUser } = useUsers();

  const [newUser, setNewUser] = useState<Omit<users, "id">>({
    email: "",
    name: "",
    password: "",
    role: 1,
  });

  const handleCreate = async () => {
    try {
      await createUser(newUser);
      setNewUser({ email: "", name: "", password: "", role: 1 });
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Usuarios</h2>

      <div className="mb-3 d-flex gap-2">
        <CFormInput
          placeholder="email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <CFormInput
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <CFormInput
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <CFormInput
          type="number"
          placeholder="Rol (0=Cliente, 1=Vendedor, 4=Admin)"
          value={newUser.role}
          onChange={(e) =>
            setNewUser({ ...newUser, role: parseInt(e.target.value) })
          }
        />
        <CButton onClick={handleCreate}>Crear</CButton>
      </div>

      <CTable striped hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         {Array.isArray(users) ? users.map(u => (
  <tr key={u.email}>
        <td>{u.email}</td>
        <td>{u.name}</td>
        <td>{u.role}</td>
          <td>
            <CButton color="danger" onClick={() => deleteUser(u.email)}>
              Eliminar
           </CButton>
         </td>
        </tr>
          )) : <tr><td colSpan={4}>No users available</td></tr>}
        </tbody>
      </CTable>
    </div>
  );
};

export default UsersPage;
