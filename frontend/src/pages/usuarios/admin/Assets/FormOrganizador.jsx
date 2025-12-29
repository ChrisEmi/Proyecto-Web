import { CampoTexto } from "../../../../components/assets/cutoms-campos/CampoTexto"

export const FormOrganizador = ({ 
    register, errors, onSubmit
}) => {
    return (
        <form className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full bg-escom-100 py-12 px-12 xl:px-32 rounded-2xl text-escom-800 shadow-2xl"
            onSubmit={onSubmit}>
            <h1 className="col-span-2 text-3xl font-bold mb-4 text-center">Registro Organizador</h1>
            <CampoTexto
                label="Nombre"
                id="nombre"
                placeholder="Ingresa el nombre"
                register={register}
                icon="fa-solid fa-user"
                className="col-span-2"
                error={errors?.nombre}
            />
            <CampoTexto
                label="Apellido Paterno"
                id="apellido_paterno"
                placeholder="Ingresa el apellido paterno"   
                register={register}
                icon="fa-solid fa-user"
                error={errors?.apellido_paterno}
            />
            <CampoTexto
                label="Apellido Materno"
                id="apellido_materno"
                placeholder="Ingresa el apellido materno"
                register={register}
                icon="fa-solid fa-user"
                error={errors?.apellido_materno}
            />
            <CampoTexto
                label="Correo Electrónico"
                id="correo"
                type="email"
                placeholder="Ingresa el correo electrónico"
                register={register}
                icon="fa-solid fa-envelope"
                error={errors?.correo}
            />
            <CampoTexto
                label="Teléfono"
                id="telefono"
                type="tel"
                placeholder="Ingresa el número de teléfono"
                register={register}
                icon="fa-solid fa-phone"
                error={errors?.telefono}
            />
            <CampoTexto
                label="Empresa/Institución"
                id="empresa"
                placeholder="Ingresa la empresa o institución"
                register={register}
                icon="fa-solid fa-building"
                error={errors?.empresa}
            />
            <CampoTexto
                label="Cargo"
                id="cargo"
                placeholder="Ingresa el cargo"
                register={register}
                icon="fa-solid fa-briefcase"
                error={errors?.cargo}
            />
            <button type="submit" className="col-span-2 bg-escom-800 hover:bg-escom-900 text-white py-3 rounded-3xl font-semibold transition-colors mt-4">
                Crear
            </button>
        </form>
    )
}