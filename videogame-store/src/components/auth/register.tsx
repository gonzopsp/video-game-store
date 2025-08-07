
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton, CForm, CFormInput, CCard, CCardBody, CCardTitle } from '@coreui/react';
import axios from 'axios';

type RegisterForm = {
  email: string;
  name: string;
  password: string;
  
  role: number;
};

interface Props {
  setIsLoggedIn: (value: boolean) => void;
}

const Register: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [form, setForm] = useState<RegisterForm>({
    email: '',
    name: '',
    password: '',
    
    role: 0, //Cliente role
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const res = await axios.post('http://localhost:4000/api/registro', form);
      console.log('User registered:', res.data);

     
   
        
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);

      navigate('/games');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <CCard style={{ width: '400px' }}>
        <CCardBody>
          <CCardTitle className="text-center mb-3">Registro de Usuario</CCardTitle>
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

            <CFormInput
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
            className="mb-3"
            />
            

            <CButton type="submit" color="primary" className="w-100">
              Registrarse
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Register;
