import React from "react";
import '../../css/Register.css'
import { useState } from "react";
import Swal from 'sweetalert2';
import { publicRequest } from '../../requestMethods'
import { useNavigate } from "react-router-dom";

export default function EditProfile({ closeModal }) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({ form: null });

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

    errors.form = null
  }


  const validateForm = () => {
    const { name, lastName, phone } = inputs
    const phonePattern = /^3[0-9]{9}$/
    const newErrors = {}
    if ((!name || name === '') && (!lastName || lastName === '') && (!phone || phone === '')) newErrors.form = 'No se han editado datos del pefil'
    else if (phone && !phonePattern.test(phone)) newErrors.phone = 'Ingrese un número telefónico válido. Ej: 3001234567'

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
    <form>
      <div className='row mx-2'>
        <div className='col form-group'>
          <label className="pb-1" htmlFor="name">Nombre(s)</label>
          <input id="name" name="name" type="text" className='form-control' autoFocus autoComplete='off' onChange={handleChange} />
        </div>
        <div className='col'>
          <label className="pb-1" htmlFor="lastName">Apellido(s)</label>
          <input id="lastName" name="lastName" type="text" className='form-control' autoComplete='off' onChange={handleChange} />

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
      <div className='row my-4 mx-2'>
        <div className='col form-group'>
          <button className='btn btn-sm' id='submitEdit' type='submit' onClick={handleSubmitEdit}>Actualizar</button>
          {errors.form
            ? <p className="errorContainer ms-1 mt-2 text-danger" id="containerErrorPhone">{errors.form}</p>
            : null}
        </div>
      </div>
    </form>
  );
}