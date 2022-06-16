import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";

const EditProfessorPage = () =>
<FirebaseContext.Consumer>
    { firebase => <EditProfessor firebase={firebase} />}
</FirebaseContext.Consumer>

function EditProfessor(props) {

    const [name, setName] = useState("")
    const [course, setUniversity] = useState("")
    const [degree, setDegree] = useState("")
    const params = useParams()
    const navigate = useNavigate()
    useEffect(
        () => {

           FirebaseProfessorService.retrieve(
               props.firebase.getFirestoreDb(),
               (professor)=>{
                    setName(professor.name)
                    setUniversity(professor.course)
                    setDegree(professor.degree)
               },
               params.id
           )

        }
        ,
        [params.id,props.firebase]
    )
    const handleSubmit = (event) => {
        event.preventDefault()
        const updatedProfessor =
        {
            name, course, degree
        }
       FirebaseProfessorService.update(
           props.firebase.getFirestoreDb(),
           ()=>{
                navigate("/listProfessor")
           },
           params.id,
           updatedProfessor)
    }
    return (
        <>
            <main>
                <h2>
                    Editar Professor
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text"
                            className="form-control"
                            value={(name == null || name === undefined) ? "" : name}
                            name="name"
                            onChange={(event) => { setName(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Universidade: </label>
                        <input type="text"
                            className="form-control"
                            value={course ?? ""}
                            name="course"
                            onChange={(event) => { setUniversity(event.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label>Titulação: </label>
                        <input type="text"
                            className="form-control"
                            value={degree ?? 0}
                            name="degree"
                            onChange={(event) => { setDegree(event.target.value) }} />
                    </div>
                    <div className="form-group" style={{ paddingTop: 20 }}>
                        <input type="submit" value="Editar Professor" className="btn btn-primary" />
                    </div>
                </form>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default EditProfessorPage;