// src/Login.js
import { useState} from 'react';
import { useNavigate } from 'react-router';
import { CButton, CForm, CFormInput, CCard, CCardBody, CCardTitle } from '@coreui/react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

type LoginForm = {
  email: string,
  password:string
}

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}


const Login: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/login`, form);
      console.log('Logged in!', res.data);
      setIsLoggedIn(true);
    //saving user and token
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);
      navigate('/juegos');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <CCard style={{ width: '400px' }}>
        <CCardBody>
          <CCardTitle className="text-center mb-3">Iniciar sesión</CCardTitle>
          {error && <div className="text-danger mb-2">{error}</div>}
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="mb-3"
            />
            <CFormInput
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className="mb-3"
            />
            <CButton type="submit" color="primary" className="w-100">
              Iniciar sesión
            </CButton>

            o
            <CButton color="secondary" className="w-100 mt-2" onClick={()=>navigate('/registro')}>Registrarse</CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Login;
