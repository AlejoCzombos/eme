import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import InputField from "../UI/InputField"
import FileInput from "../UI/FileInput"
import SelectField from "../UI/SelectField"
import TextareaField from "../UI/TextAreaField"

import { branches } from '../../data/general-info.json'

export default function ContactForm() {
    const [loading, setLoading] = useState(false)
    const methods = useForm()

    const branchesOptions = branches.map(branch => {
        return {value: branch.name, label: branch.location}
    })

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("nombre_completo", data.nombre_completo)
        formData.append("correo", data.correo)
        formData.append("telefono", data.telefono)
        formData.append("sucursal", data.sucursal)
        formData.append("presentacion", data.presentacion)
        formData.append("_subject", "Nueva postulación de trabajo desde el sitio web")
        formData.append("cv", data.cv[0].name)

        setLoading(true)
        let response = null
        
        if (data.sucursal === "Corrientes"){
            response = await fetch("https://formsubmit.co/cc23a690ed380afa2de927799825f653", {
                method: "POST",
                body: formData
            })

        } else if (data.sucursal === "Resistencia" || data.sucursal === "Sáenz Peña") {
            response = await fetch("https://formsubmit.co/612b8a6c9f42b566847a818334198934", {
                method: "POST",
                body: formData
            })
            
        }

        if (response.ok) {
            methods.reset()
            setLoading(false)
        } else {
            methods.reset()
            setLoading(false)
        }
    }

    return (
    <div className="px-2 lg:px-16">
        <header className="pb-3 lg:pb-8 flex items-center">
            <h3 className="w-full xl:w-auto lg:text-2xl lg:max-w-lg">Completa tus datos para que podamos contactarte</h3>
        </header>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputField name="nombre_completo" label="Nombre completo" placeholder="Nombre completo" required="El nombre es requerido" />
                    <SelectField name="sucursal" label="Localidad" placeholder="Seleccione una Localidad" options={branchesOptions} required="La localidad es requerida" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <InputField name="correo" label="Correo electrónico" placeholder="Correo electrónico" required="El correo electrónico es requerido" rules={{
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Correo electrónico inválido"
                        }
                        }}
                    />
                    <InputField type="number" name="telefono" label="Teléfono" placeholder="Teléfono" required="El teléfono es requerido" rules={
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TextareaField name="presentacion" label="Breve presentación de hasta 150 caracteres" placeholder="Presentacion" required="La presentación es requerida" height="min-h-24 max-h-24" rules={
                        {
                            minLength: {
                                value: 10,
                                message: "La presentación debe tener al menos 10 caracteres"
                            },
                            maxLength: {
                                value: 150,
                                message: "La presentación debe tener como máximo 150 caracteres"
                            } 
                        }}
                    />
                    <FileInput type="file" name="cv" label="Adjuntá tu CV en formato PDF" required="El Curriculum Vitae es requerido" rules={{
                        validate: {
                            lessThan5MB: files => files[0]?.size < 5000000 || "El archivo debe ser menor a 5MB"
                        }
                    }} />
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