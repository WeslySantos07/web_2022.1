// controlador, create, update, delete...
const ProfessorModel = require('../../models/professor/ProfessorModel')

let professors = [
    {_id:0, name:"Jeferson de Carvalho", university: "UFC", degree:"Mestrado"},
    {_id:1, name:"Ricardo Reis", university: "UFC",degree:"Doutorado"},
    {_id:2, name:"Germana Rodrigues", university: "UFC", degree:"Mestrado"},
]
let _id = 3;

class ProfessorService {
    static create(data) {
        let professor = new ProfessorModel(
            _id++,
            data.name,
            data.university,
            data.degree)
        professors.push(professor)
        return professor;
    }
    static retrieve(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                return professors[i];
            }
        }
        return {}
    }
    static update(_id, data) {
        for (let p of professors) {
            if (p._id == _id) {
                p.name = data.name
                p.university = data.university
                p.degree = data.degree
                return p;
            }
        }
        return null
    }
    static delete(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                professors.splice(i, 1)
                return true;
            }
        }
        return false
    }
    static list() {
        return professors
    }

}

module.exports = ProfessorService;