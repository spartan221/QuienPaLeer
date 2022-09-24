import React from 'react'
import "../css/Register.css"
import LogoQPLBlack from "../assets/img/QPL_Logo_Black.png";
import { FaEye } from "react-icons/fa";
import { useState } from "react";


function Register() {

  const [passwordShown, setPasswordShown] = useState(false);
  const [isChecked, setCheck] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleCheck = event => {
    if (event.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  return (
    <div className='d-flex align-content-center justify-content-center vh-100'>
      <div className="card my-auto">
        <div className="card-header">
          <div className="row">
            <div className="col-9">
              <div className="d-flex justify-content-start align-content-center">
                <div>
                  <div className="d-flex justify-content-start">
                    <b>
                      <span className="d-block signInTitle ps-3">Registro</span>
                    </b>
                  </div>
                  <div className="d-flex justify-content-Start">
                    <span className="d-block qplTitle ps-3">QuienPaLeer</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="logoQPL">
                <img src={LogoQPLBlack} />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className='row mx-2'>
              <div className='col form-group'>
                <label className="pb-1" htmlFor="firstname">Nombre(s)</label>
                <input id="firstname" name="firstname" type="text" className='form-control' required autoFocus autoComplete='off'/>
                <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorFirstN"></p>
              </div>
              <div className='col'>
                <label className="pb-1" htmlFor="lastname">Apellido(s)</label>
                <input id="lastname" name="lastname" type="text" className='form-control'required autoComplete='off'/>
                <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorLastN"></p>
              </div>
            </div>

            <div className='row mt-1 mx-2'>
              <div className='col form-group'>
                <label className="pb-1" htmlFor="email">Correo electrónico</label>
                <input id="email" name="email" type="email" className='form-control' required autoComplete='off'/>
                <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorEmail"></p>
              </div>
            </div>

            <div className='row mt-2 mx-2'>
              <div className='col form-group'>
                <label className="pb-1" htmlFor="phone">Teléfono</label>
                <input id="phone" name="phone" type="tel" className='form-control' required autoComplete='off'/>
                <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorPhone"></p>
              </div>
            </div>
            
            <div className='row mx-2 mt-2'>
              <div className='col form-group'>
                <div className='row'>
                  <div className='col-9'>
                    <label className="pb-1" htmlFor="password">Contraseña</label>
                  </div>
                  <div className='col'>
                    <FaEye onClick={togglePasswordVisiblity} />
                  </div>
                </div>
                <input id="password" name="password" type={passwordShown ? "text" : "password"} className='form-control' required autoComplete='off'/>
                <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorPassword"></p>
              </div>
              <div className='col'>
                <label className="pb-1 confirmPassLabel" htmlFor="confirmPassword">Confirmar contraseña</label>
                <input id="confirmPassword" name="confirmPassword" type={passwordShown ? "text" : "password"} className='form-control' required autoComplete='off'/>
                <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorConfPassword"></p>
              </div>
            </div>

            <div className='row mt-4 mx-2'>
              <div className='col form-group'>
                <input class="form-check-input ms-5" type="checkbox" id="checkbox" onChange={handleCheck}/>
                <label class="form-check-label ms-2" for="checkbox" >
                  Acepto los términos y condiciones de uso de la WebApp.
                </label>
              </div>
            </div>

            <div className='row my-4 mx-2'>
              <div className='col form-group'>
                <button className='btn btn-sm' id='submitRegister' type='submit' disabled={isChecked ? false : true}>Registrarse</button>
              </div>
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-center align-content-center">
          <p className="textDontHaveAcc">¿Ya tienes una cuenta?</p>
          <a className="linkRegister">Entrar</a>
        </div>
      </div>        
    </div>
  )
}

export default Register