import Main from '../template/Main';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { async } from 'regenerator-runtime';

const baseURL = 'http://localhost:3001/animais'

const headerProps = {
    icon: 'paw',
    title: 'Animais',
    subtitle: 'Cadastro de Animais'
}

const initialState = {nome: '', tipo: '', raca: '', sexo: '', idade: '', condicao: ''}

export default function AnimalCrud(){

    const [animal, setAnimal] = useState(initialState)
    const [animalList, setItems] = useState([]) 

    useEffect(() => {
        const getAllAnimais = async () => {
            const allAnimais = await retriveAnimais()
            if(allAnimais) setItems(allAnimais)
        }
        getAllAnimais()
    },[])

    const retriveAnimais = async () =>{
        try {
            const response = await axios.get(baseURL)
            return response.data
        } catch (error) {
            console.error(error.message)  
        }
    }

    const load = (animal) => {
        setAnimal(animal)
    }

    const remove = (animalSelected) => {
        axios.delete(`${baseURL}/${animalSelected.id}`).then(resp => {
            const newList = animalList.filter(u => u !== animalSelected)
            setItems(newList)
        })
    }

    //Adicionar e Atualizar
    const save = () => {
        if(animal.nome === '' || animal.tipo === '' || animal.raca === '' || animal.sexo === '' || animal.idade === '' || animal.condicao === ''){
            alert('Todos os campos devem ser preenchidos!')
            return
        }
        const method = animal.id ? 'put':'post'
        const url = animal.id ? `${baseURL}/${animal.id}`: baseURL
        axios[method](url, animal)
            .then(resp =>{
                const list = getUpdateList(resp.data)
                setItems(list)
                clear()
            })
    }

    const getUpdateList = (data) => {
        const list = animalList.filter((animal) => animal.id !== data.id)
        list.unshift(data)
        return list
    }

    const clear = () => {
        setAnimal(initialState)
    }

    const updateField = (event) => {
        setAnimal({
            ...animal, [event.target.name]: event.target.value 
        })
    }

    function renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Raça</th>
                        <th>Sexo</th>
                        <th>Idade</th>
                        <th>Condições</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    function renderRows() {
        return animalList.map(animal =>{
            return (
                <tr key={animal.id}>
                    <td>{animal.id}</td>
                    <td>{animal.nome}</td>
                    <td>{animal.tipo}</td>
                    <td>{animal.raca}</td>
                    <td>{animal.sexo}</td>
                    <td>{animal.idade}</td>
                    <td>{animal.condicao}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => load(animal)}>
                            <i className="fa fa-pencil" />
                        </button>

                        <button className="btn btn-danger ml-2" onClick={() => remove(animal)}>
                            <i className="fa fa-trash" />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    function renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label>Nome</label>
                        <input type="text" className="form-control" 
                            name="nome"
                            value={animal.nome}
                            placeholder="Digite um nome..."
                            onChange={e => updateField(e)}
                        />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tipo</label>
                            <input type="text" className="form-control" 
                                name="tipo"
                                value={animal.tipo}
                                placeholder="Digite um tipo (Gato ou Cachorro)..."
                                onChange={e => updateField(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label>Raça</label>
                        <input type="text" className="form-control" 
                            name="raca"
                            value={animal.raca}
                            placeholder="Digite uma raça..."
                            onChange={e => updateField(e)}
                        />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label>Sexo</label>
                        <input type="text" className="form-control" 
                            name="sexo"
                            value={animal.sexo}
                            placeholder="Digite o sexo do animal..."
                            onChange={e => updateField(e)}
                        />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label>Idade</label>
                        <input type="text" className="form-control" 
                            name="idade"
                            value={animal.idade}
                            placeholder="Digite a idade..."
                            onChange={e => updateField(e)}
                        />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        <label>Condição</label>
                        <input type="text" className="form-control" 
                            name="condicao"
                            value={animal.condicao}
                            placeholder="Digite a condição..."
                            onChange={e => updateField(e)}
                        />
                        </div>
                    </div>

                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => clear(e)}>
                            Cancelar
                        </button>
                    </div>
                    
                </div>

            </div>
        )
    }

    return(
        <Main {...headerProps}>
            {renderForm()}
            {renderTable()}
        </Main>
    )
}