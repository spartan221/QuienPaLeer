import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2';
import { publicRequest } from '../../requestMethods'
import { useNavigate } from "react-router-dom";
import '../css/EditProfile.css'

export default function EditProfile({ closeModal }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setInputs(prevInput => {
      return {
        ...prevInput, [event.target.name]: event.target.value
      }
    })

    if (!!errors[event.target.name])
      setErrors({
        ...errors,
        [event.target.name]: null
      })
  }

  const validateForm = () => {
    const { phone } = inputs
    const phonePattern = /^3[0-9]{9}$/
    const newErrors = {}
    if (phone && !phonePattern.test(phone)) newErrors.phone = 'Ingrese un número telefónico válido. Ej: 3001234567'
    return newErrors
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault()
    const formErros = validateForm();
    if (Object.keys(formErros).length > 0) {
      setErrors(formErros)
    } else {
      publicRequest.put("/profile/update", inputs, { withCredentials: true });
      closeModal()
      setTimeout(() => {
        navigate(``)
      }, 200);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Se ha actualizado el perfil correctamente'
      })


    }
  }

  return (
    <form className="mt-3">
      <div className='row mx-2'>
        <div className='col form-group'>
          <label className="pb-1" htmlFor="name">Nombre(s)</label>
          <input id="name" name="name" type="text" className='form-control' autoFocus autoComplete='off' onChange={handleChange} />
          {errors.name
            ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorName">{errors.name}</p>
            : null}
        </div>
        <div className='col'>
          <label className="pb-1" htmlFor="lastName">Apellido(s)</label>
          <input id="lastName" name="lastName" type="text" className='form-control' autoComplete='off' onChange={handleChange} />
          {errors.lastName
            ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorLastName">{errors.lastName}</p>
            : null}
        </div>
      </div>

      <div className='row mt-2 mx-2'>
        <div className='col form-group'>
          <label className="pb-1" htmlFor="phone">Teléfono</label>
          <input id="phone" name="phone" type="tel" className='form-control' autoComplete='off' onChange={handleChange} />
          {errors.phone
            ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorPhone">{errors.phone}</p>
            : null}
        </div>
      </div>
      <div className='row mt-5 mb-3 mx-2'>
        <div className='col form-group text-center'>
          <button className='btn' id='submitEdit' type='submit' onClick={handleSubmitEdit}>Actualizar</button>
        </div>
      </div>
    </form>
  );
}