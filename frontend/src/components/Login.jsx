import React from "react";
import "../css/Login.css";
import LogoQPLBlack from "../assets/img/QPL_Logo_Black.png";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <div className="d-flex align-content-center justify-content-center vh-100">
      <div className="card my-auto">
        <div className="card-header">
          <div className="row">
            <div className="col-4">
              <div className="logoQPL">
                <img src={LogoQPLBlack} />
              </div>
            </div>
            <div className="col-8">
              <div className="d-flex justify-content-end align-content-center">
                <div>
                  <div className="d-flex justify-content-end">
                    <b>
                      <span className="d-block signInTitle">Login</span>
                    </b>
                  </div>
                  <div className="d-flex justify-content-end">
                    <span className="d-block qplTitle">QuienPaLeer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form>
            <div className="inputEmailContainer mb-3 mx-3">
              <label htmlFor="email" className="label-form">
                Correo electrónico
              </label>
              <input
                type="email"
                className="form-control"
                placeholder=""
                name="email"
                id="email"
                required
                autoFocus
                autoComplete="off"
              />
              <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorLoginEmail"></p>
            </div>

            <div className="inputPasswordContainer mb-4 mx-3">
              <div className="d-flex justify-content-between align-content-between">
                <div>
                  <label htmlFor="contraseña" className="label-form">
                    Contraseña
                  </label>
                </div>
                <div className="iconEyePass">
                  <FaEye onClick={togglePasswordVisiblity} />
                </div>
              </div>
              <input
                type={passwordShown ? "text" : "password"}
                className="form-control"
                placeholder=""
                name="email"
                id="email"
                required
              />
              <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorLoginPassword"></p>
            </div>

            <div className="d-flex justify-content-center align-content-center">
              <button
                type="submit"
                id="btnLogin"
                className="btn btn-sm mx-3 mt-2"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer d-flex justify-content-center align-content-center">
          <p className="textDontHaveAcc">¿Aún no tienes una cuenta?</p>
          <a className="linkRegister">Registrar</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
