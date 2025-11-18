// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList.jsx';
import UserDetail from './components/UserDetail.jsx';
import CreateUserForm from './components/CreateUserForm.jsx';
import EditCardPage from './components/EditCardPage.jsx'; // 👈 nueva importación

export default function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<UserList />} />
                    <Route path="/usuarios/nuevo" element={<CreateUserForm />} />
                    <Route path="/usuario/:idParam" element={<UserDetail />} />
                    <Route path="/tarjetas/:numeroTarjeta/editar" element={<EditCardPage />} />

                </Routes>
            </div>
        </BrowserRouter>
    );
}