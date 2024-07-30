import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { firebaseApp, uploadFile } from "../../lib/firebase"
const db = getFirestore(firebaseApp);

const Form = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [nicho, setNicho] = useState('');
  const [foto, setFoto] = useState(null);
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [doc, setDoc] = useState(null);
  const [influencers, setInfluencers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      
      const querySnapshot = await getDocs(collection(db, 'influencers'));
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      console.log(docs)
      setInfluencers(docs);
    };
    fetchData();
  }, [])

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    setDoc(file);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const docUrl = await uploadFile(doc);
      const influencer = {
          name: nombre,
          description: description,
          email: correo,
          whatsapp: whatsapp,
          nicho: nicho,
          marca: brand,
          instagram: instagram,
          urlDoc: docUrl,
      }
      await addDoc(collection(db, "influencers"), {
          ...influencer
      })
    } catch (error) {
      console.log(error);
    }
    setNombre('');
    setDescription('');
    setCorreo('');
    setWhatsapp('');
    setNicho('');
    setFoto(null);
    setInstagram('');
    setBrand('');
    setDoc(null);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Descripcion:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Correo:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">WhatsApp:</label>
        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nicho:</label>
        <input
          type="text"
          value={nicho}
          onChange={(e) => setNicho(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Foto de buena calidad con prendas de nuestra marca:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleDocChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Link de Instagram:</label>
        <input
          type="text"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Link de Tiktok:</label>
        <input
          type="text"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Marca:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
