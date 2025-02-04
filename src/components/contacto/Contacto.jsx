import { useForm } from "react-hook-form";
import "./contacto.css";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Acceder a los errores de validación
  } = useForm();

  const enviar = (contacto) => {
    console.log(contacto); // Aquí puedes enviar los datos a una API o hacer lo que necesites
  };

  return (
    <form onSubmit={handleSubmit(enviar)} className="contact-form">
      {/* Campo Nombre */}
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          placeholder="Ingresar Nombre"
          {...register("nombre", {
            required: "El nombre es obligatorio", // Validación de campo requerido
          })}
        />
        {errors.nombre && ( // Mostrar mensaje de error si el campo no es válido
          <span className="error-message">{errors.nombre.message}</span>
        )}
      </div>

      {/* Campo Celular */}
      <div className="form-group">
        <label htmlFor="cel">Celular:</label>
        <input
          type="text"
          placeholder="Ingresar Celular"
          {...register("cel", {
            required: "El celular es obligatorio", // Validación de campo requerido
            pattern: {
              value: /^[0-9]+$/, // Validación para que solo acepte números
              message: "El celular solo debe contener números",
            },
          })}
        />
        {errors.cel && ( // Mostrar mensaje de error si el campo no es válido
          <span className="error-message">{errors.cel.message}</span>
        )}
      </div>

      {/* Campo Dirección */}
      <div className="form-group">
        <label htmlFor="direccion">Dirección:</label>
        <input
          type="text"
          placeholder="Ingresar Dirección"
          {...register("direccion", {
            required: "La dirección es obligatoria", // Validación de campo requerido
            minLength: {
              value: 10, // Mínimo 10 caracteres
              message: "La dirección debe tener al menos 10 caracteres",
            },
          })}
        />
        {errors.direccion && ( // Mostrar mensaje de error si el campo no es válido
          <span className="error-message">{errors.direccion.message}</span>
        )}
      </div>

      {/* Campo Mensaje */}
      <div className="form-group">
        <label htmlFor="message">Mensaje:</label>
        <textarea
          placeholder="Ingresar Mensaje"
          {...register("message")} // Este campo no tiene validaciones
        />
      </div>

      {/* Botón de envío */}
      <button type="submit" className="submit-button">
        Enviar
      </button>
    </form>
  );
};

export default Contacto;