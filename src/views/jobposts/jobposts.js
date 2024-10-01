import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobPosts = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [newJobPost, setNewJobPost] = useState({ title: '', company: '', salary: '' }); // Agrega todos los campos necesarios

    // Obtener todos los jobposts al cargar el componente
    useEffect(() => {
        axios.get('http://localhost:3002/jobposts')
            .then(response => setJobPosts(response.data))
            .catch(error => console.error('Error fetching job posts:', error));
    }, []);

    // Crear un nuevo jobpost
    const handleCreate = () => {
        axios.post('http://localhost:3002/jobposts', newJobPost)
        .then(response => console.log('Job Post Created:', response.data))
        .catch(error => console.error('Error creating job post:', error.response.data));
    };

    // Actualizar un jobpost
    const handleUpdate = (id) => {
        // Actualiza solo los campos necesarios
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
                {/* Agrega otros campos necesarios */}
                <button onClick={handleCreate}>Create Job Post</button>
            </div>

            {/* Lista de todos los jobposts */}
            <ul>
                {jobPosts.map(post => (
                    <li key={post.id}>
                        {post.title} - {post.company}
                        <button onClick={() => handleUpdate(post.id)}>Update</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobPosts;
