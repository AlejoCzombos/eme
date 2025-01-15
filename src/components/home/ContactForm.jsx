import { FormProvider, useForm } from "react-hook-form"
import InputField from "../UI/InputField"
import SelectField from "../UI/SelectField"
import TextareaField from "../UI/TextAreaField"

import { branches } from '../../data/general-info.json'
import data from '../../data/home.json'
const {contact} = data.contact

export default function ContactForm() {
    const methods = useForm()
    const onSubmit = async (data) => {
        const response = await fetch("https://formsubmit.co/ajax/sistemas@eme.com.ar", {
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
                telefono: data.phone
            })
        })
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
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
            </form>
        </FormProvider>
    </div>
  )
}