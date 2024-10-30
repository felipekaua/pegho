import { useState } from "react";
import "../styles/Resume.css"
const Resume = ({ resume, onDelete, onSave }) => {
    const [email, setEmail] = useState(resume.email);
    const [phone, setPhone] = useState(resume.phone);
    const [address, setAdress] = useState(resume.address);

    const handleUpdate = (event) => {
        onSave(event, resume.id, {
            email,
            phone,
            address,
        });
    };

    return <>
        <button className="delete" onClick={()=>{onDelete(resume.user_id)}}>Deletar Currículo</button>
        <form onSubmit={handleUpdate} className="resume-container">
            <h1>Dados Pessoais</h1>
            <div className="resume-data">
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input readOnly disabled id="name" type="text" value={resume.name}/>
                </div>
                <div>
                    <label htmlFor="birthDate">Data de nascimento:</label>
                    <input readOnly disabled id="birthDate" type="date" value={resume.birth_date}/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="phone">Telefone:</label>
                    <input id="phone" type="text" value={phone} onChange={(e) => {setPhone(e.target.value)}} />
                </div>
                <div>
                    <label htmlFor="address">Endereço:</label>
                    <input id="address" type="text" value={address} onChange={(e) => {setAdress(e.target.value)}} />
                </div>
            </div>
            <input type="submit" value="Salvar Alterações"></input>
        </form>
        <div className="item-container">
            <h2>Experiência Profissional</h2>
            {resume.experiences.map((experience, index) => (
                <div key={index} className="item">
                    <div>
                        <h3>{experience.role}</h3>
                        <p>Empresa: {experience.firm}</p>
                        <p>Período: {experience.period}</p>
                        <p>Descrição: {experience.description}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="item-container">
            <h2>Formação Acadêmica</h2>
            {resume.formations.map((experience, index) => (
                <div key={index} className="item">
                    <div>
                        <h3>{experience.course}</h3>
                        <p>Instituição: {experience.institute}</p>
                        <p>Período: {experience.semester}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
}

export default Resume