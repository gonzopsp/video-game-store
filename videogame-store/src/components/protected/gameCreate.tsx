// src/components/protected/GameCreate.tsx
import { useState} from 'react';
import   type {ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { CForm, CFormInput, CFormTextarea, CButton, CFormLabel } from '@coreui/react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const GameCreate: React.FC = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('genre', genre);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('stock', stock.toString());
    if (image) formData.append('image', image);

    try {
      const res = await axios.post(`${API_BASE}/videogame`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Game created:', res.data);
      // opcional: limpiar formulario
      setName('');
      setGenre('');
      setDescription('');
      setPrice(0);
      setStock(0);
      setImage(null);
    } catch (err) {
      console.error('Error creating game:', err);
    }
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <CFormLabel htmlFor="name">Name</CFormLabel>
      <CFormInput id="name" value={name} onChange={e => setName(e.target.value)} required />

      <CFormLabel htmlFor="genre">Genre</CFormLabel>
      <CFormInput id="genre" value={genre} onChange={e => setGenre(e.target.value)} required />

      <CFormLabel htmlFor="description">Description</CFormLabel>
      <CFormTextarea
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <CFormLabel htmlFor="price">Price</CFormLabel>
      <CFormInput
        type="number"
        id="price"
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        required
      />

      <CFormLabel htmlFor="stock">Stock</CFormLabel>
      <CFormInput
        type="number"
        id="stock"
        value={stock}
        onChange={e => setStock(Number(e.target.value))}
        required
      />

      <CFormLabel htmlFor="image">Image</CFormLabel>
      <CFormInput type="file" id="image" accept="image/*" onChange={handleFileChange} />

      <CButton type="submit" color="primary" className="mt-3">
        Create Game
      </CButton>
    </CForm>
  );
};

export default GameCreate;
