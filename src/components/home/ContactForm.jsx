import { useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import InputField from "../UI/InputField"
import SelectField from "../UI/SelectField"
import TextareaField from "../UI/TextAreaField"
import ReCAPTCHA from "react-google-recaptcha"

import { branches } from '../../data/general-info.json'
import data from '../../data/home.json'
const {contact} = data.contact

export default function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [captchaAcepted, setCaptchaAcepted] = useState(false)
    const captchaRef = useRef(null)
    const [error, setError] = useState(false)
    const methods = useForm()
    
    const onSubmit = async (data) => {
        if (!captchaAcepted) {
            setError(true)
            return
        }
        setError(false)

        setLoading(true)
        const response = await fetch("https://formsubmit.co/ajax/38cf86c31a283a370043a85f3c07ed24", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                nombre: data.full_name,
                asunto: data.asunto,
                email: data.email,
                sucursal: data.sucursal,
                mensaje: data.message,
                telefono: data.phone,
                _subject: "Nuevo mensaje de contacto desde el sitio web"
            })
        })
        if (response.ok) {
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

    const subjectsOptions = contact.subjects.map(subject => {
        return {value: subject, label: subject}
    })

    const branchesOptions = branches.map(branch => {
        return {value: branch.location, label: branch.location}
    })

    return (
    <div className="mi-h-[11rem] h-full w-full">
        <header className="h-20 flex items-center">
            <h2 className="w-full xl:w-auto">{contact.title.toLocaleUpperCase()}</h2>
        </header>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col w-full min-h-96 gap-8 p-5 xl:p-10 bg-zinc-200/60">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputField name="full_name" label="Nombre completo" placeholder="Nombre completo" required="El nombre es requerido" />
                    <SelectField name="asunto" label="Asunto" placeholder="Seleccione un Asunto" options={subjectsOptions} required="El asunto es requerido" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputField name="email" label="Correo electrónico" placeholder="Correo electrónico" required="El correo electrónico es requerido" rules={{
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Correo electrónico inválido"
                        }
                        }}
                    />
                    <SelectField name="sucursal" label="Localidad" placeholder="Seleccione una Localidad" options={branchesOptions} required="La localidad es requerida" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TextareaField name="message" label="Mensaje" placeholder="Mensaje" required="El mensaje es requerido" />
                    <div className="flex flex-col gap-4">
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