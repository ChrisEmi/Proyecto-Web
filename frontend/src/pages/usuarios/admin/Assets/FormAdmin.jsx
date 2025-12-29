import { CampoTexto } from "../../../../components/assets/cutoms-campos/CampoTexto"

export const FormAdmin = ({ 
    register, errors, onSubmit
}) => {
    return (
        <form className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full bg-escom-800 py-12 px-12 xl:px-32 rounded-2xl text-white shadow-2xl"
            onSubmit={onSubmit}>
            <h1 className="col-span-2 text-3xl font-bold mb-4 text-center">Registro Administrador</h1>
            <CampoTexto
                label="Nombre"
                id="nombre"
                placeholder="Ingresa el nombre"
                register={register}
                icon="fa-solid fa-user"
                required="El nombre es obligatorio"
                className="col-span-2"
                error={errors?.nombre}
                esquema_color="white"
            />
            <CampoTexto
                label="Apellido Paterno"
                id="apellido_paterno"
                placeholder="Ingresa el apellido paterno"  
                required="El apellido paterno es obligatorio"
                register={register}
                icon="fa-solid fa-user"
                error={errors?.apellido_paterno}
                esquema_color="white"
            />
            <CampoTexto
                label="Apellido Materno"
                id="apellido_materno"
                placeholder="Ingresa el apellido materno"
                register={register}
                icon="fa-solid fa-user"
                error={errors?.apellido_materno}
                esquema_color="white"
            />
            <CampoTexto
                label="Correo Electrónico"
                id="correo"
                type="email"
                placeholder="Ingresa el correo electrónico"
                required="El correo electrónico es obligatorio"
                register={register}
                icon="fa-solid fa-envelope"
                error={errors?.correo}
                esquema_color="white"
            />
            <CampoTexto
                label="Teléfono"
                id="telefono"
                type="tel"
                placeholder="Ingresa el número de teléfono"
                required="El teléfono es obligatorio"
                register={register}
                icon="fa-solid fa-phone"
                error={errors?.telefono}
                esquema_color="white"
            />
            <button type="submit" className="col-span-2 bg-white hover:bg-escom-200 text-escom-900 py-3 rounded-3xl font-semibold transition-colors mt-4">
                Crear
            </button>
        </form>
    )
}