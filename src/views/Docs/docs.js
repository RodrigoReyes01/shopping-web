// docs.js
import React, { useState } from 'react';
import './docs.css';

const docsData = [
    {
        date: "27/08/2024",
        content: `Se definió que se usará solamente un chunk de datos para probar que la aplicación en tanto a los api y endpoints sean funcionales. Por lo que no se exportará el .csv a .json como tal. Considerando la gran cantidad de datos a convertir. Más bien se usarán 25 elementos de los 19,000 job posts de la db. Al hacer un get está la pasara a Json. además se tomarán atributos específicos para mantener la simplicidad para la primera entrega estos son:
JobPost.init({ id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, title: DataTypes.STRING,company: DataTypes.STRING, date: DataTypes.TEXT, location: DataTypes.STRING, job_description: DataTypes.TEXT, job_requirement: DataTypes.TEXT, salary: DataTypes.STRING }
attributes: ['id', 'title', 'company', 'date', 'location', 'job_description', 'job_requirement', 'salary'] });
Donde también deberemos de limpiar y convertir algunos valores eventualmente. Como el salario sea numérico en vez de texto. Para poder hacer correctamente el análisis. Por ahora nada más usaremos búsquedas por texto para cumplir con la primera entrega y que el aplicativo sea funcional. Se cambió el puerto 3000 a 3001 porque se estaban entrelazando proyectos. -> .env -> PORT=3001`,
    },
    {
        date: "28/08/2024",
        content: "Se trabajó el front end de inicio de sesión y el login.",
    },
    {
        date: "29/08/2024",
        content: "Se probó utilizar Jmeter para hacer las pruebas pero al no tener el api funcionando.. No se puede llevar a cabo. Se intentará nuevamente al tener el api listo.",
    },
    {
        date: "30-31/08/2024",
        content: `Desde ayer y hoy he estado trabajando el login para que sea funcional. Pero hay unos errores de objetos que debo solucionar...
Solucione el error volviendo a configurar ruta por ruta revisando los componentes. Ya no aparecen errores pero aun así no me dejaba hacer login. Resulta que es un problema del API de registro relacionado con las políticas de CORS (Cross-Origin Resource Sharing)
Para solucionarlo configure el CORS en el backend. Se implementó el middleware de CORS en Express, configurado para permitir solicitudes desde el origen http://localhost:3001. Esto habilitó la comunicación segura y controlada entre el frontend y backend, asegurando que solo las solicitudes autorizadas puedan interactuar con el servidor.
En resumen los puertos usados son estos:
Docker compose up -> instancia mysql para la base de datos en el puerto 3308
Puerto 3001 para el front end iniciado con…-> npm start
Puerto 3002 para el servidor backend iniciado con… cd backend -> node index.js`,
    },
    // More data entries here
];

const Docs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="docs-container">
            <h2>Documentación</h2>
            {docsData.map((entry, index) => (
                <div key={index} className="docs-entry">
                    <div
                        className="docs-header"
                        onClick={() => toggleOpen(index)}
                    >
                        <h3>{entry.date}</h3>
                    </div>
                    {openIndex === index && (
                        <div className="docs-content">
                            <p>{entry.content}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Docs;
