import { FormProvider, useForm } from "react-hook-form"
import InputField from "../UI/InputField"
import data from '../../data/home.json'
import { branches } from '../../data/general-info.json'
import SelectField from "../UI/SelectField"
import TextareaField from "../UI/TextAreaField"
const {contact} = data.contact

export default function ContactForm() {
    const methods = useForm()
    const onSubmit = (data) => console.log(data)

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
                    <InputField name="email" label="Correo electrónico" placeholder="Correo electrónico" required="El correo electrónico es requerido" />
                    <SelectField name="sucursal" label="Localidad" placeholder="Localidad" options={branchesOptions} required="La localidad es requerida" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TextareaField name="message" label="Mensaje" placeholder="Mensaje" required="El mensaje es requerido" />
                    <InputField type="number" name="phone" label="Teléfono" placeholder="Teléfono" required="El teléfono es requerido" rules={{ minLength: 3 }} />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
            </form>
        </FormProvider>
    </div>
  )
}