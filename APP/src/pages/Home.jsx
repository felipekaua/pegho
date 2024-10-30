import { useState, useEffect } from "react";
import api from "../api";
import Resume from "../components/Resume";
import { useNavigate } from 'react-router-dom';
import "../styles/Home.css"

function Home() {
    const navigate = useNavigate();

    const goToLogout = () => {
        navigate('/logout');
    };

    const [resume, setResume] = useState([]);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");
    const [experiences, setExperiences] = useState([]);
    const [formations, setFormations] = useState([]);

    useEffect(() => {
        getResume();
    }, []);

    const getResume = () => {
        api 
            .get(`/api/resume`)
            .then((res) => res.data)
            .then((data) => {
                setResume(data);
            })
            .catch((err) => alert(err));
    };

    const createResume = (e) => {
        e.preventDefault();
        const body  = {
            "name": name,
            "birth_date": birthDate,
            "email": email,
            "phone": phone,
            "address": address,
            "experiences": experiences,
            "formations": formations,
        }
        
        api
            .post("/api/resume/", body)
            .then((res) => {
                if (res.status !== 201) alert("Falha ao criar currículo");
                getResume();
            })
            .catch((err) => alert(err.code));
    };

    const handleExpAddition = (role, firm, period, description) => {
        const newExperience = {
            "role": role,
            "firm": firm,
            "period": period,
            "description": description,
        };
        setExperiences((prevExperiences) => [...prevExperiences, newExperience]);
        document.getElementById("exp-button").style.display = "block";
    };

    const handleFormationAddition = (institute, course, semester) => {
        const newFormation = {
            "institute": institute,
            "course": course,
            "semester": semester,
        };
        setFormations((prevFormations) => [...prevFormations, newFormation]);
        document.getElementById("formation-button").style.display = "block";
    };

    const addFormation = () => {
        document.getElementById("formation-button").style.display = "none";
        const container = document.getElementsByClassName("formations-container")[0];
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <label for="institute">Instituição:</label>
                <input id="institute" type="text"/>
                <label for="course">Curso:</label>
                <input id="course" type="text"/>
                <label for="period">Período:</label>
                <input id="period" type="text"/>
                <button id="add-formation-button">Adicionar</button>
            </div>
        `;
        const button = div.querySelector("#add-formation-button");
        button.onclick = () => {
            const institute = div.querySelector('#institute').value;
            const course = div.querySelector('#course').value;
            const period = div.querySelector('#period').value;
            handleFormationAddition(institute, course, period);
            button.remove();
        };
        container.appendChild(div);
    }

    const addExperience = () => {
        document.getElementById("exp-button").style.display = "none";
        const container = document.getElementsByClassName("experiences-container")[0];
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>Experiência</h2>
            <div>
                <label for="role">Cargo:</label>
                <input id="role" type="text"/>
            </div>
            <div>
            <label for="firm">Empresa:</label>
            <input id="firm" type="text"/>
            </div>
            <div>
            <label for="period">Período:</label>
            <input id="period" type="text"/>
            </div>
            <div>
            <label for="description">Descrição:</label>
            <input id="description" type="text"/>
            </div>
            <button id="add-experience-button">Adicionar</button>
        `;
        const button = div.querySelector("#add-experience-button");
        button.onclick = () => {
            const role = div.querySelector('#role');
            const firm = div.querySelector('#firm');
            const period = div.querySelector('#period');
            const description = div.querySelector('#description');
            
            handleExpAddition(role.value, firm.value, period.value, description.value);
            button.remove();
            role.readOnly = true;
            firm.readOnly = true;
            period.readOnly = true;
            description.readOnly = true;
        };
        container.appendChild(div);
    }

    const updateResume = (event, resumeId, updatedData) => {
        event.preventDefault();
        api
            .patch(`/api/resume/${resumeId}/`, updatedData)
            .then((res) => {
                console.log('Currículo Atualizado:', res.data);
            })
            .catch((err) => {
                alert(err.code)
            });
    };
    

    const deleteResume = (id) => {
        api
            .delete(`/api/resume/${id}/`)
            .then(() => {
                console.log("Resume deletado:");
            })
            .catch((err) => {
                alert(err.code);
            });
        goToLogout();
    };

    return (
        <div className="home-container">
            <a  href="/logout"><button>Logout</button></a>
            {resume[0] === undefined && <>
            <form onSubmit={createResume}>
                <h1>Dados Pessoais</h1>
                <div className="info-container">
                    <label htmlFor="name">Nome:</label>
                    <input id="name" type="text" value={name} onChange={(e) => {setName(e.target.value)}} />
                    <label htmlFor="birthDate">Data de nascimento:</label>
                    <input id="birthDate" type="date" value={birthDate} onChange={(e) => {setBirthDate(e.target.value)}} />
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    <label htmlFor="phone">Telefone:</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                    <label htmlFor="address">Endereço:</label>
                    <input id="address" type="text" value={address} onChange={(e) => {setAdress(e.target.value)}} />
                </div>
                <input type="submit" value="Enviar Currículo"></input>
            </form>
            <div className="experiences-container"></div>
            <button id="exp-button" onClick={addExperience}>Adicionar Experiência</button>
            <div className="formations-container"></div>
            <button id="formation-button" onClick={addFormation}>Adicionar Formação</button>
            </>}
            
            {resume[0] !== undefined && <>
                <Resume resume={resume[0]} onDelete={deleteResume} onSave={updateResume}/>
            </>}
        </div>
    );
}

export default Home;
