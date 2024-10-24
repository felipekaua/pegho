import { useState, useEffect } from "react";
import api from "../api";
import Resume from "../components/Resume";
import "../styles/Home.css"

function Home() {
    const [resume, setResume] = useState([]);

    useEffect(() => {
        getResume();
    }, []);

    const getResume = () => {
        api 
            .get(`/api/resume`)
            .then((res) => res.data)
            .then((data) => {
                setResume(data);
                console.log(data)
            })
            .catch((err) => alert(err));
    };

    const createResume = (e) => {
        e.preventDefault();
        const body  = {
            "name": "exemplo",
            "birth_date": "1990-01-01",
            "email": "exemplo@example.com",
            "phone": "123456789",
            "address": "Seu Endereço",
            "experiences": [
                {
                    "role": "Desenvolvedor",
                    "firm": "Empresa X",
                    "period": "2020-2022",
                    "description": "Desenvolvimento de software."
                }
            ],
            "formations": [
                {
                    "institute": "Universidade Y",
                    "course": "Ciência da Computação",
                    "semester": 8
                }
            ]
        }
        
        api
            .post("/api/resume/", body)
            .then((res) => {
                if (res.status === 201) alert("Resume sent!");
                else alert("Failed to send resume");
                getResume();
            })
            .catch((err) => alert(err));
    };

    const updateResume = (e) => {
        e.preventDefault();
        const body  = {
            "name": "exemplo",
            "birth_date": "2000-10-10",
            "email": "felipe@example.com",
            "phone": "+5511999999999",
            "address": "Rua XYZ, 123"
            }
        api
            .patch("/api/resume/", body)
            .then((res) => {
                if (res.status === 201) alert("Resume updated!");
                else alert("Failed to update resume");
                getResume();
            })
            .catch((err) => alert(err));
    };

    const deleteResume = () => {
        api
            .delete(`/api/resume/`)
            .then((res) => {
                if (res.status === 204) alert("Resume deleted!");
                else alert("Failed to delete resume");
                getResume();
            })
            .catch((error) => alert(error));
    };

    

    return (
        <div>
            <a href="/logout">Logout</a>
            <div>
                {resume[0] === undefined && <>
                <form onSubmit={createResume}>
                    <input type="submit" value="Post"></input>
                </form>
                </>}
                
                {resume[0] !== undefined && <>
                    <Resume resume={resume[0]} onDelete={"d"}/>
                </>}
            </div>
        </div>
    );
}

export default Home;
