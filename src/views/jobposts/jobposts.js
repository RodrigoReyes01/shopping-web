import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobPosts = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [newJobPost, setNewJobPost] = useState({ title: '', company: '', salary: '', location: '', industry: '' });
    const [error, setError] = useState(''); // Estado para el manejo de errores

    // Obtener todos los jobposts al cargar el componente
    useEffect(() => {
        fetchJobPosts();
    }, []);

    // Función para obtener todos los jobposts
    const fetchJobPosts = () => {
        axios.get('http://localhost:3002/jobposts')
            .then(response => setJobPosts(response.data))
            .catch(error => console.error('Error fetching job posts:', error));
    };

    // Crear un nuevo jobpost
    const handleCreate = () => {
        // Validar campos
        if (!newJobPost.title || !newJobPost.company || !newJobPost.salary || !newJobPost.location || !newJobPost.industry) {
            setError('Todos los campos son obligatorios');
            return;
        }

        axios.post('http://localhost:3002/jobposts', newJobPost)
            .then(response => {
                console.log('Job Post Created:', response.data);
                fetchJobPosts(); // Refresca la lista de jobposts
                setNewJobPost({ title: '', company: '', salary: '', location: '', industry: '' }); // Limpia el formulario
                setError(''); // Limpiar el mensaje de error si todo sale bien
            })
            .catch(error => {
                console.error('Error creating job post:', error.response?.data || error);
                setError('Error creando el job post');
            });
    };

    // Actualizar un jobpost
    const handleUpdate = (id) => {
        // Actualiza solo los campos necesarios (puedes cambiar `updatedPost` a lo que necesites)
        const updatedPost = { title: 'Updated Title' };
        axios.put(`http://localhost:3002/jobposts/${id}`, updatedPost)
            .then(response => {
                setJobPosts(jobPosts.map(post => (post.id === id ? response.data : post)));
            })
            .catch(error => console.error('Error updating job post:', error));
    };

    // Eliminar un jobpost
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3002/jobposts/${id}`)
            .then(() => setJobPosts(jobPosts.filter(post => post.id !== id)))
            .catch(error => console.error('Error deleting job post:', error));
    };

    return (
        <div>
            <h1>Job Posts</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el mensaje de error si existe */}

            {/* Formulario para crear un nuevo jobpost */}
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newJobPost.title}
                    onChange={e => setNewJobPost({ ...newJobPost, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Company"
                    value={newJobPost.company}
                    onChange={e => setNewJobPost({ ...newJobPost, company: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Salary"
                    value={newJobPost.salary}
                    onChange={e => setNewJobPost({ ...newJobPost, salary: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={newJobPost.location}
                    onChange={e => setNewJobPost({ ...newJobPost, location: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Industry"
                    value={newJobPost.industry}
                    onChange={e => setNewJobPost({ ...newJobPost, industry: e.target.value })}
                />
                <button onClick={handleCreate}>Create Job Post</button>
            </div>

            {/* Lista de todos los jobposts */}
            <ul>
                {jobPosts.map(post => (
                    <li key={post.id}>
                        <strong>{post.title}</strong> - {post.company} - {post.location} - {post.salary}
                        <button onClick={() => handleUpdate(post.id)}>Update</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobPosts;

