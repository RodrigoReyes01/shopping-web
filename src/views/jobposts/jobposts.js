import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import './jobposts.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const JobPosts = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [newJobPost, setNewJobPost] = useState({
        title: '',
        company: '',
        salary: '',
        location: '',
        industry: '',
        jobDescription: '',
        jobRequirement: '',
        date: ''
    });
    const [selectedJobPost, setSelectedJobPost] = useState(null); // Estado para el job post seleccionado
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Controla la visibilidad del modal
    const [error, setError] = useState('');
    const [salaryIndex, setSalaryIndex] = useState(0);

    // Opciones de salario
    const salaryOptions = [45000, 60000, 80000, 100000, 120000];

    // Fetch job posts on component mount
    useEffect(() => {
        fetchJobPosts();
    }, []);

    const fetchJobPosts = () => {
        axios.get('http://localhost:3002/jobposts')
            .then(response => setJobPosts(response.data))
            .catch(error => console.error('Error fetching job posts:', error));
    };

    const handleCreate = () => {
        if (!newJobPost.title || !newJobPost.company || !newJobPost.salary || !newJobPost.location || !newJobPost.industry || !newJobPost.jobDescription || !newJobPost.jobRequirement || !newJobPost.date) {
            setError('Todos los campos son obligatorios');
            return;
        }

        axios.post('http://localhost:3002/jobposts', newJobPost)
            .then(response => {
                fetchJobPosts();
                setNewJobPost({
                    title: '',
                    company: '',
                    salary: '',
                    location: '',
                    industry: '',
                    jobDescription: '',
                    jobRequirement: '',
                    date: ''
                });
                setError('');
                window.location.reload(); // Recarga la página completa
            })
            .catch(error => setError('Error creando el job post'));
    };

    // Abre el modal de actualización con la información del job post seleccionado
    const openUpdateModal = (post) => {
        setSelectedJobPost(post);
        setIsUpdateModalOpen(true);
    };

    // Cierra el modal
    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedJobPost(null);
    };

    // Actualiza el job post con los nuevos valores o los valores anteriores si no se han modificado
    const handleUpdate = () => {
        if (!selectedJobPost) return;

        const updatedPost = {
            title: selectedJobPost.title || '',
            company: selectedJobPost.company || '',
            salary: selectedJobPost.salary || '',
            location: selectedJobPost.location || '',
            industry: selectedJobPost.industry || '',
            jobDescription: selectedJobPost.jobDescription || '',
            jobRequirement: selectedJobPost.jobRequirement || '',
            date: selectedJobPost.date || ''
        };

        axios.put(`http://localhost:3002/jobposts/${selectedJobPost.id}`, updatedPost)
            .then(response => {
                fetchJobPosts(); // Refresca la lista de job posts
                closeUpdateModal(); // Cierra el modal
            })
            .catch(error => console.error('Error updating job post:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3002/jobposts/${id}`)
            .then(() => setJobPosts(jobPosts.filter(post => post.id !== id)))
            .catch(error => console.error('Error deleting job post:', error));
    };

    const handleSalaryChange = (e) => {
        setSalaryIndex(e.target.value);
        setNewJobPost({ ...newJobPost, salary: salaryOptions[e.target.value] });
    };

    return (
        <div className="jobpost-container">
            {/* Dashboard */}
            <div className="dashboard">
                <h2>Dashboard</h2>
                <p>Total Job Posts: {jobPosts.length}</p>
                <div>
                    <h3>Job Posts per Industry</h3>
                    <Doughnut data={{
                        labels: Object.keys(jobPosts.reduce((acc, post) => ({ ...acc, [post.industry]: (acc[post.industry] || 0) + 1 }), {})),
                        datasets: [{
                            data: Object.values(jobPosts.reduce((acc, post) => ({ ...acc, [post.industry]: (acc[post.industry] || 0) + 1 }), {})),
                            backgroundColor: ['#F3A400', '#D11547', '#274192', '#302A40', '#F3A400CC', '#D11547CC']
                        }]
                    }} options={{ plugins: { legend: { display: false } } }} />
                </div>
                <div>
                    <h3>Job Posts per Location</h3>
                    <Doughnut data={{
                        labels: Object.keys(jobPosts.reduce((acc, post) => ({ ...acc, [post.location]: (acc[post.location] || 0) + 1 }), {})),
                        datasets: [{
                            data: Object.values(jobPosts.reduce((acc, post) => ({ ...acc, [post.location]: (acc[post.location] || 0) + 1 }), {})),
                            backgroundColor: ['#F3A400', '#D11547', '#274192', '#302A40', '#F3A40099', '#D1154799']
                        }]
                    }} options={{ plugins: { legend: { display: false } } }} />
                </div>
            </div>

            {/* Job Post Creation Form */}
            <div className="jobpost-form">
                <h3>Create Job Post</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input type="text" placeholder="Title" value={newJobPost.title} onChange={e => setNewJobPost({ ...newJobPost, title: e.target.value })} />
                <input type="text" placeholder="Company" value={newJobPost.company} onChange={e => setNewJobPost({ ...newJobPost, company: e.target.value })} />
                <select onChange={e => setNewJobPost({ ...newJobPost, location: e.target.value })}>
                    <option value="">Select Location</option>
                    <option value="Remote">Remote</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="San Francisco">San Francisco</option>
                </select>
                <input type="range" min="0" max={salaryOptions.length - 1} value={salaryIndex} onChange={handleSalaryChange} />
                <p>Salary: ${salaryOptions[salaryIndex]}</p>
                <select onChange={e => setNewJobPost({ ...newJobPost, industry: e.target.value })}>
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Data">Data</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                </select>
                <textarea placeholder="Job Description" value={newJobPost.jobDescription} onChange={e => setNewJobPost({ ...newJobPost, jobDescription: e.target.value })}></textarea>
                <textarea placeholder="Job Requirement" value={newJobPost.jobRequirement} onChange={e => setNewJobPost({ ...newJobPost, jobRequirement: e.target.value })}></textarea>
                <input type="text" placeholder="Date (YYYY-MM-DDTHH:MM:SSZ)" value={newJobPost.date} onChange={e => setNewJobPost({ ...newJobPost, date: e.target.value })} />
                <button onClick={handleCreate}>Create Job Post</button>
            </div>

            {/* Job Post List */}
            <div className="jobpost-list">
                <h3>Job Posts</h3>
                <ul>
                    {jobPosts.sort((a, b) => a.id - b.id).map(post => (
                        <li key={post.id}>
                            <div>
                                <strong>{post.title}</strong> - {post.company} - {post.location} - ${post.salary}
                            </div>
                            <button className="btn-update" onClick={() => openUpdateModal(post)}>Update</button>
                            <button className="btn-delete" onClick={() => handleDelete(post.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal para actualizar el job post */}
            {isUpdateModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Update Job Post</h3>
                        <input type="text" placeholder="Title" value={selectedJobPost.title} onChange={e => setSelectedJobPost({ ...selectedJobPost, title: e.target.value })} />
                        <input type="text" placeholder="Company" value={selectedJobPost.company} onChange={e => setSelectedJobPost({ ...selectedJobPost, company: e.target.value })} />
                        <select onChange={e => setSelectedJobPost({ ...selectedJobPost, location: e.target.value })}>
                            <option value={selectedJobPost.location}>{selectedJobPost.location}</option>
                            <option value="Remote">Remote</option>
                            <option value="New York">New York</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="San Francisco">San Francisco</option>
                        </select>
                        <input type="range" min="0" max={salaryOptions.length - 1} value={salaryIndex} onChange={handleSalaryChange} />
                        <p>Salary: ${salaryOptions[salaryIndex]}</p>
                        <select onChange={e => setSelectedJobPost({ ...selectedJobPost, industry: e.target.value })}>
                            <option value={selectedJobPost.industry}>{selectedJobPost.industry}</option>
                            <option value="Technology">Technology</option>
                            <option value="Data">Data</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Design">Design</option>
                            <option value="Sales">Sales</option>
                        </select>
                        <textarea placeholder="Job Description" value={selectedJobPost.jobDescription} onChange={e => setSelectedJobPost({ ...selectedJobPost, jobDescription: e.target.value })}></textarea>
                        <textarea placeholder="Job Requirement" value={selectedJobPost.jobRequirement} onChange={e => setSelectedJobPost({ ...selectedJobPost, jobRequirement: e.target.value })}></textarea>
                        <input type="text" placeholder="Date (YYYY-MM-DDTHH:MM:SSZ)" value={selectedJobPost.date} onChange={e => setSelectedJobPost({ ...selectedJobPost, date: e.target.value })} />
                        <button onClick={handleUpdate}>Update Job Post</button>
                        <button onClick={closeUpdateModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobPosts;
