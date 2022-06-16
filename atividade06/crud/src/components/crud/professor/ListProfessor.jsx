import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProfessorTableRow from "./ProfessorTableRow";

import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";

const ListProfessorPage = () =>
    <FirebaseContext.Consumer>
        { firebase => <ListProfessor firebase={firebase} />}
    </FirebaseContext.Consumer>

function ListProfessor(props) {

    const [professors, setProfessor] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(
        () => {
            setLoading(true)
            FirebaseProfessorService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professors) => {
                    setLoading(false)
                    setProfessor(professors)
                }
            )
        }
        ,
        [props.firebase]
    )

    function deleteProfessorById(_id) {
        let professorsTemp = professors
        for (let i = 0; i < professorsTemp.length; i++) {
            if (professorsTemp[i]._id === _id) {
                professorsTemp.splice(i, 1);
            }
        }
        setProfessor([...professorsTemp])
    }

    function renderTable() {

        if (loading) {
            return (
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:100
                }}>
                    <div className="spinner-border" 
                     style={{width: '3rem', height: '3rem'}} 
                     role="status" />
                     Carregando...
                </div>
            )
        }
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Universidade</th>
                        <th>Titulação</th>
                        <th colSpan={2} style={{ textAlign: "center" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </table>
        )
    }
    function renderTableBody() {
        if (!professors) return
        return professors.map(
            (professor, i) => {
                return <ProfessorTableRow
                    professor={professor}
                    key={i}
                    deleteProfessorById={deleteProfessorById}
                    firestore={props.firebase.getFirestoreDb()}
                />
            }
        )
    }
    return (
        <>
            <main>
                <h2>
                    Listar Professores
                </h2>
                {renderTable()}
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListProfessorPage;