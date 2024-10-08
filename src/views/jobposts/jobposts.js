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

    // Handle job post creation
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
            })
            .catch(error => setError('Error creando el job post'));
    };

    // Handle job post update
    const handleUpdate = (id) => {
        const updatedPost = { title: 'Updated Title' };
        axios.put(`http://localhost:3002/jobposts/${id}`, updatedPost)
            .then(response => setJobPosts(jobPosts.map(post => (post.id === id ? response.data : post))))
            .catch(error => console.error('Error updating job post:', error));
    };

    // Handle job post delete
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3002/jobposts/${id}`)
            .then(() => setJobPosts(jobPosts.filter(post => post.id !== id)))
            .catch(error => console.error('Error deleting job post:', error));
    };

    // Handle salary change with slider
    const handleSalaryChange = (e) => {
        setSalaryIndex(e.target.value);
        setNewJobPost({ ...newJobPost, salary: salaryOptions[e.target.value] });
    };

    // Calculate job post statistics
    const industryCount = jobPosts.reduce((acc, post) => {
        acc[post.industry] = (acc[post.industry] || 0) + 1;
        return acc;
    }, {});

    const locationCount = jobPosts.reduce((acc, post) => {
        acc[post.location] = (acc[post.location] || 0) + 1;
        return acc;
    }, {});

    // Configuración de los gráficos sin leyenda
    const industryData = {
        labels: Object.keys(industryCount),
        datasets: [{
            data: Object.values(industryCount),
            backgroundColor: ['#263A99', '#97B4DE', '#DCD0BE', '#F0EBE5', '#2A2829'], // colores de la paleta
        }]
    };

    const locationData = {
        labels: Object.keys(locationCount),
        datasets: [{
            data: Object.values(locationCount),
            backgroundColor: ['#263A99', '#97B4DE', '#DCD0BE', '#F0EBE5', '#2A2829'], // colores de la paleta
        }]
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Oculta la leyenda
            },
        },
    };

    return (
        <div className="jobpost-container">
            {/* Dashboard */}
            <div className="dashboard">
                <h2>Dashboard</h2>
                <p>Total Job Posts: {jobPosts.length}</p>
                <div>
                    <h3>Job Posts per Industry</h3>
                    <Doughnut data={industryData} options={options} />
                </div>
                <div>
                    <h3>Job Posts per Location</h3>
                    <Doughnut data={locationData} options={options} />
                </div>
            </div>

            {/* Job Post Creation Form */}
            <div className="jobpost-form">
                <h3>Crear Job Post</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <select onChange={e => setNewJobPost({ ...newJobPost, location: e.target.value })}>
                    <option value="">Select Location</option>
                    <option value="Remote">Remote</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="San Francisco">San Francisco</option>
                </select>
                <input
                    type="range"
                    min="0"
                    max={salaryOptions.length - 1}
                    value={salaryIndex}
                    onChange={handleSalaryChange}
                />
                <p>Salary: ${salaryOptions[salaryIndex]}</p>
                <select onChange={e => setNewJobPost({ ...newJobPost, industry: e.target.value })}>
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Data">Data</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                </select>
                <textarea
                    placeholder="Job Description"
                    value={newJobPost.jobDescription}
                    onChange={e => setNewJobPost({ ...newJobPost, jobDescription: e.target.value })}
                ></textarea>
                <textarea
                    placeholder="Job Requirement"
                    value={newJobPost.jobRequirement}
                    onChange={e => setNewJobPost({ ...newJobPost, jobRequirement: e.target.value })}
                ></textarea>
                <input
                    type="text"
                    placeholder="Date (YYYY-MM-DDTHH:MM:SSZ)"
                    value={newJobPost.date}
                    onChange={e => setNewJobPost({ ...newJobPost, date: e.target.value })}
                />
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
                            <button className="btn-update" onClick={() => handleUpdate(post.id)}>Update</button>
                            <button className="btn-delete" onClick={() => handleDelete(post.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default JobPosts;
