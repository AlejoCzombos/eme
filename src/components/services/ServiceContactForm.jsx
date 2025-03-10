import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import { FormProvider, useForm } from "react-hook-form"
import MultiSelectDropdown from "../UI/MultiSelectDropdown";
import SelectField from "../UI/SelectField";
import InputField from "../UI/InputField";

import { branches } from '../../data/general-info.json'
import { sendFormServices } from "../../api/form";

export default function ContactForm({servicesOptions}) {
  const [captchaAcepted, setCaptchaAcepted] = useState(false)
  const [error, setError] = useState(false)
  const captchaRef = useRef(null)

  const methods = useForm()
  const [servicesSelected, setServicesSelected] = useState(servicesOptions.length === 1 ? servicesOptions : []);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!captchaAcepted) {
        setError(true)
        return
    }
    setError(false)

    setLoading(true)

    const services = servicesSelected.map(service => service.id)
    
    const body = {
      ...data, 
      services: services, 
      contact_type: servicesOptions[0].contact_type ? servicesOptions[0].contact_type : "Cliente", 
    }
    console.log(body)
    const response = await sendFormServices(body)

    if (response.status === 201) {
        methods.reset()
        captchaRef.current.reset()
      } else {
        methods.reset()
        captchaRef.current.reset()
    }
    setLoading(false)
  }

  const OnChangeCaptcha = () => {
      setCaptchaAcepted(true)
  }
  
  const branchesOptions = branches.map(branch => {
    return {value: branch.name, label: branch.location}
  })
  const handleServicesChange = (selectedServices) => {
    setServicesSelected(selectedServices);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl text-white bg-[#0075D7] py-4 px-10">CONTRATÁ ESTE PLAN</h2>
      <p>Completá tus datos para que podamos contactarte.</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            <InputField name="first_name" label="Nombre" placeholder="Nombre" required="El nombre es requerido" />
            <InputField name="last_name" label="Apellido" placeholder="Apellido" required="El apellido es requerido" />
            <InputField name="cuit" type="number" label="CUIL/CUIT" placeholder="CUIL/CUIT" required="El CUIL/CUIT es requerido" 
              rules={{
                minLength: {
                  value: 11,
                  message: "El CUIL/CUIT debe tener 11 caracteres"
                },
                maxLength: {
                  value: 11,
                  message: "El CUIL/CUIT debe tener 11 caracteres"
              }}}
            />
            <InputField name="email" label="Correo electrónico" placeholder="Correo electrónico" required="El correo electrónico es requerido" rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo electrónico inválido"
              }
            }}/>
            <SelectField name="branch" label="Localidad"placeholder="Seleccione una Localidad" options={branchesOptions} required="La localidad es requerida" />
            <InputField type="number" name="phone" label="Teléfono" placeholder="Teléfono" required="El teléfono es requerido" rules={
              { 
                    min: {
                      value: 0,
                      message: "El teléfono no puede ser negativo"
                    }, 
                    minLength: {
                        value: 8,
                        message: "El teléfono debe tener al menos 8 caracteres"
                      },
                      maxLength: {
                        value: 12,
                        message: "El teléfono debe tener como máximo 12 caracteres"
                      } 
                    }} 
            />
            {
              servicesOptions.length > 1 && (
                <fieldset>
                    <label htmlFor="services" className="block text-sm font-medium text-gray-700">Servicios a contratar:</label>
                    <MultiSelectDropdown
                    name="services"
                    options={servicesOptions}
                    onChange={handleServicesChange}
                    selectedOptions={servicesSelected}
                    placeholder="Seleccione los servicios"
                  />
                </fieldset>
              )
            }
            <div>
              <ReCAPTCHA 
                  sitekey="6LfHqcsqAAAAAJc3hxbtN4adrTGc_mT0YsTtYPlx"
                  onChange={OnChangeCaptcha}
                  hl="es"
                  ref={captchaRef}
                  className="pb-1"
              />
              {error && <p className="text-red-600 text-sm">Por favor, completa el CAPTCHA para enviar el formulario.</p>}
            </div>
          </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
        </form>
      </FormProvider>
    </div>
  )

}