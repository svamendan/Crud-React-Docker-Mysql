import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="http://localhost:80/dashboard/CrudUsuarioT4G/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
    id_usuario: '',
    nombre_usuario: '',
    cedula_usuario: '',
    telefono_usuario: '',
    mail_usuario: '',
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setUsuarioSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const ventana=()=>{
    window.open("AppsinBD.js");
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre_usuario", usuarioSeleccionado.nombre_usuario);
    f.append("cedula_usuario", usuarioSeleccionado.cedula_usuario);
    f.append("telefono_usuario", usuarioSeleccionado.telefono_usuario);
    f.append("mail_usuario", usuarioSeleccionado.mail_usuario);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre_usuario", usuarioSeleccionado.nombre_usuario);
    f.append("cedula_usuario", usuarioSeleccionado.cedula_usuario);
    f.append("telefono_usuario", usuarioSeleccionado.telefono_usuario);
    f.append("mail_usuario", usuarioSeleccionado.mail_usuario);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params:{id_usuario: usuarioSeleccionado.id_usuario}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(tbl_usuario=>{
        if(tbl_usuario.id_usuario===usuarioSeleccionado.id_usuario){
          tbl_usuario.nombre_usuario=usuarioSeleccionado.nombre_usuario;
          tbl_usuario.cedula_usuario=usuarioSeleccionado.cedula_usuario;
          tbl_usuario.telefono_usuario=usuarioSeleccionado.telefono_usuario;
          tbl_usuario.mail_usuario=usuarioSeleccionado.mail_usuario;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params:{id_usuario: usuarioSeleccionado.id_usuario}})
    .then(response=>{
      setData(data.filter(tbl_usuario=>tbl_usuario.id_usuario!==usuarioSeleccionado.id_usuario));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarUsuario=(tbl_usuario, caso)=>{
    setUsuarioSeleccionado(tbl_usuario);
    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  })

  return (
    <div style={{textAlign: 'center'}}>
      <br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Cedula</th>
            <th>Telefono</th>
            <th>Mail</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(tbl_usuario=>(
            <tr key={tbl_usuario.id_usuario}>
              <td>{tbl_usuario.id_usuario}</td>
              <td>{tbl_usuario.nombre_usuario}</td>
              <td>{tbl_usuario.cedula_usuario}</td>
              <td>{tbl_usuario.telefono_usuario}</td>
              <td>{tbl_usuario.mail_usuario}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarUsuario(tbl_usuario,"Editar")}>Editar</button>{"   "}
                <button className="btn btn-danger" onClick={()=>seleccionarUsuario(tbl_usuario,"Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <br />
            <input type="text" className="form-control" name="nombre_usuario" onChange={handleChange}/>
            <label>Cedula:</label>
            <br />
            <input type="text" className="form-control" name="cedula_usuario" onChange={handleChange}/>
            <label>Telefono:</label>
            <br />
            <input type="text" className="form-control" name="telefono_usuario" onChange={handleChange}/>
            <label>Mail:</label>
            <br />
            <input type="text" className="form-control" name="mail_usuario" onChange={handleChange}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre:</label>
            <br />
            <input type="text" className="form-control" name="nombre_usuario" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.nombre_usuario}/>
            <label>Cedula:</label>
            <br />
            <input type="text" className="form-control" name="cedula_usuario" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.cedula_usuario}/>
            <label>Telefono:</label>
            <br />
            <input type="text" className="form-control" name="telefono_usuario" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.telefono_usuario}/>
            <label>Mail:</label>
            <br />
            <input type="text" className="form-control" name="mail_usuario" onChange={handleChange} value={usuarioSeleccionado&&usuarioSeleccionado.mail_usuario}/>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estas seguro de eliminar el usuario {usuarioSeleccionado && usuarioSeleccionado.nombre_usuario} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Si
          </button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
