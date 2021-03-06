import React, { useState } from "react";
import { Link } from "react-router-dom";

import FirebaseStudentService from "../../../services/FirebaseStudentService";

const StudentTableRow = (props) => {
    const { _id, name, course, ira } = props.student;
    const [loading, setLoading] = useState(false);

    function deleteStudent() {
        if(window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            FirebaseStudentService.delete(
                props.firestore,
                () => {
                    setLoading(false)
                    props.setToast({ header: 'Erro!', body: 'Estudante ' + _id + ' apagado com sucesso!' })
                    props.setShowToast(true)
                },
                _id
            )
        }
    }

    const renderSubmitButton = () => {
        if (loading) {
            return (
                <button className="btn btn-danger" type="button" disabled style={{ width: '75px' }}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
            )
        }
        return (
            <button className="btn btn-danger" style={{ width: '75px' }} onClick={() => deleteStudent()}>Apagar</button>
        )
    }

    return (
        <tr>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{course}</td>
            <td>{ira}</td>
            <td style={{ textAlign: "center" }}>
                <Link className="btn btn-warning" to={`/editStudent/${_id}`}>
                    Editar
                </Link>
            </td>
            <td style={{ textAlign: "center" }}>
                {renderSubmitButton()}
            </td>
        </tr>
    );
};

export default StudentTableRow;