import { useState } from "react";
import MultiSelectDropdown from "../UI/MultiSelectDropdown";
import InputField from "../UI/Input";

export default function ContactForm({servicesOptions}) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    cuit: "",
    email: "",
    localidad: "",
    telefono: "",
    services: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServicesChange = (selectedServices) => {
    setFormData({ ...formData, services: selectedServices });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    setLoading(true);

    const services = servicesOptions.length > 1 ? formData.services.map((s) => s.replace(/ /g, "_").toLowerCase()) : servicesOptions.map((s) => s.replace(/ /g, "_").toLowerCase());
    console.log(services);

    const postData = {
      owner_id: 202619,
      owner: "sistemas@eme.com.ar",
      owner_name: "Gabriel Roman",
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.telefono,
      tags: ["pagina_web", ...services],
      // contact_type: servicesOptions.length > 1 ? "Cliente" : "Grupo familiar",
      contact_type: "Cliente",
      contact_source: "Pagina web",
      addresses: [
        {
          street: "",
          city: formData.localidad,
          state: "Provincia",
          country: "Argentina",
          postal_code: "",
          type: 1,
        },
      ],
      custom_fields: [
        { field: "CUIT", value: formData.cuit },
      ],
    };

    try {
      // const response = await fetch("https://api.clientify.net/v1/contacts/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Token bbbad5b5b04e1521b6de89cece28259c87b35b2c",
      //   },
      //   body: JSON.stringify(postData),
      // });
    console.log(postData);

      if (response.ok) {
        alert("Datos enviados exitosamente");
        setFormData({
          first_name: "",
          last_name: "",
          cuit: "",
          email: "",
          localidad: "",
          telefono: "",
          services: [],
        });
      } else {
        alert("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema con la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto space-y-6"
    >
      <h2 className="text-2xl text-white bg-[#0075D7] py-4 px-10">CONTRATÁ ESTE PLAN</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5">
        <fieldset>
            <label htmlFor="first_name">Nombre:</label>
            <InputField 
              name="first_name"
              placeholder="Nombre"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
        </fieldset>
        <fieldset>
            <label htmlFor="last_name">Apellido:</label>

            <InputField
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            required
            />
        </fieldset>
        <fieldset>
            <label htmlFor="cuit">CUIL/CUIT del titular del Servicio:</label>
            <InputField
            name="cuit"
            type="number"
            placeholder="CUIL/CUIT"
            value={formData.cuit}
            onChange={handleChange}
            required
            />
        </fieldset>
        <fieldset>
            <label htmlFor="email">Correo electrónico:</label>
            <InputField
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </fieldset>
        <fieldset>
            <label htmlFor="localidad">Localidad:</label>
            <InputField
            name="localidad"
            placeholder="Localidad"
            value={formData.localidad}
            onChange={handleChange}
            required
            />
        </fieldset>
        <fieldset>
            <label htmlFor="telefono">N° de teléfono:</label>
            <InputField
            name="telefono"
            placeholder="N° de teléfono:"
            type="number"
            value={formData.telefono}
            onChange={handleChange}
            required
            />
        </fieldset>
        {
          servicesOptions.length > 1 && (
            <fieldset>
                <label htmlFor="services">Servicios a contratar:</label>
                <MultiSelectDropdown
                formFieldName="services"
                options={servicesOptions}
                placeholder="Seleccione los servicios"
                selectedOptions={formData.services}
                onChange={handleServicesChange}
              />
            </fieldset>
          )
        }
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
