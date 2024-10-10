import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const url = `https://apiusuarios-apxz.onrender.com`;
class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      fecha_registro: '',
      estado: '',
      tipoModal: ''
    }
  }

  peticionGet = () => {
    axios.get(url).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPost = async () => {
    delete this.state.form.id;
    console.log(this.state.form); // Asegúrate de que los datos sean correctos
    await axios.post("https://apiusuarios-apxz.onrender.com/api/usuario/crear", this.state.form)
      .then(response => {
        this.modalInsertar();
        this.peticionGet();
      }).catch(error => {
        console.log(error.message);
      })
  }

  peticionPut = () => {
    axios.put(`https://apiusuarios-apxz.onrender.com/api/usuario/${this.state.form.id}`, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete = () => {
    axios.delete(`https://apiusuarios-apxz.onrender.com/api/usuario/${this.state.form.id}`, this.state.form.id).then(response => {
      this.setState({ modalEliminar: false });
      this.peticionGet();
    })
  }

  modalInsertar = () => {
    this.setState({
      modalInsertar: !this.state.modalInsertar,
      form: {
        id: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        fecha_registro: '',
        estado: '',
        tipoModal: 'insertar'
      }
    });
  }

  seleccionarUsuario = (usuario) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        telefono: usuario.telefono,
        direccion: usuario.direccion,
        fecha_registro: usuario.fecha_registro,
        estado: usuario.estado
      }
    })
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <br /><br /><br />
        <button className="btn btn-success" onClick={this.modalInsertar}>Agregar Usuario</button>
        <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Fecha de Registro</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(this.state.data) && this.state.data.map(usuario => {
              return (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.direccion}</td>
                  <td>{usuario.fecha_registro}</td>
                  <td>{usuario.estado}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarUsuario(usuario); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => { this.seleccionarUsuario(usuario); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Modal para insertar o actualizar usuario */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id || '' : ''} />
              <br />
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre || '' : ''} />
              <br />
              <label htmlFor="apellido">Apellido</label>
              <input className="form-control" type="text" name="apellido" id="apellido" onChange={this.handleChange} value={form ? form.apellido || '' : ''} />
              <br />
              <label htmlFor="email">Email</label>
              <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form ? form.email || '' : ''} />
              <br />
              <label htmlFor="telefono">Teléfono</label>
              <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form ? form.telefono || '' : ''} />
              <br />
              <label htmlFor="direccion">Dirección</label>
              <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form ? form.direccion || '' : ''} />
              <br />
              <label htmlFor="fecha_registro">Fecha de Registro</label>
              <input className="form-control" type="date" name="fecha_registro" id="fecha_registro" onChange={this.handleChange} value={form? form.fecha_registro || '' : ''} />
              <label htmlFor="estado">Estado</label>
              <select className="form-control" name="estado" onChange={this.handleChange} value={form ? form.estado || '' : ''}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal === 'insertar' ? ( 
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button> ) : (  <button className="btn btn-primary" onClick={() => this.peticionPost()}>
                Actualizar
              </button>
            )}
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>

        {/* Modal para confirmar la eliminación */}
        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar al usuario {form && form.nombre} {form && form.apellido}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
