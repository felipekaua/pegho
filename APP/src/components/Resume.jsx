import { useState } from "react";

const Resume = ({ resume, onDelete }) => {
    const [name, setName] = useState(resume.name);
    const [birthDate, setBirthDate] = useState(resume.birth_date);
    const [email, setEmail] = useState(resume.email);
    const [phone, setPhone] = useState(resume.phone);
    const [address, setAdress] = useState(resume.address);

    return <div className="resume-container">
        <div>
            <h1>Dados Pessoais</h1>
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
        <div className="experiences-container">
            {resume.experiences.map((experience, index) => (
                <div key={index} className="experience">
                    <div>
                        <h3>{experience.role}</h3>
                        <p>Empresa: {experience.firm}</p>
                        <p>Período: {experience.period}</p>
                        <p>Descrição: {experience.description}</p>
                    </div>
                    <button>Excluir</button>
                </div>
            ))}
        </div>
        <div className="formation-container">
            {resume.formations.map((experience, index) => (
                <div key={index} className="formation">
                    <div>
                        <h3>Curso: {experience.course}</h3>
                        <p>Instituição: {experience.institute}</p>
                        <p>Período: {experience.semester}</p>
                    </div>
                    <button>Excluir</button>
                </div>
            ))}
        </div>
        <button>Salvar Alterações</button>
    </div>
}

export default Resume