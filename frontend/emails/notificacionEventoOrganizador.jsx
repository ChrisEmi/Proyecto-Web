import { Html, Head, Body, Container, Section, Row, Column, Text, Link, Tailwind, Preview, Hr, Img, Button } from "@react-email/components";

const NotificacionInscripcionOrganizador = ({
  nombre_organizador = "{{nombre_organizador}}",
  nombre_inscrito = "{{nombre_inscrito}}",
  correo_inscrito = "{{correo_inscrito}}",
  titulo_evento = "{{titulo_evento}}",
  fecha_inscripcion = "{{fecha_inscripcion}}",
  hora_evento = "{{hora_evento}}",
  lugar_evento = "{{lugar_evento}}",
  url_evento = "{{url_evento}}"
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>¡Nueva inscripción en tu evento! - ESCOMunidad</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 rounded-lg overflow-hidden max-w-[600px]">
            
            {/* Header con badge de notificación */}
            <Section className="bg-[#005E8D] py-6 px-8">
              <Row>
                <Column align="center">
                  <Img
                    src="https://img.icons8.com/ios-filled/100/ffffff/add-user-male.png"
                    width="60"
                    height="60"
                    alt="Nueva inscripción"
                  />
                  <Text className="m-0 mt-4 font-bold text-[24px] text-white text-center">
                    ¡Nueva Inscripción!
                  </Text>
                  <Text className="m-0 mt-2 text-[16px] text-white opacity-80 text-center">
                    Alguien se ha inscrito a tu evento
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Contenido principal */}
            <Section className="px-8 py-6">
              <Row>
                <Text className="m-0 text-[16px] text-gray-600 leading-[24px]">
                  Hola, <strong>{nombre_organizador}</strong>
                </Text>
              </Row>
              <Row>
                <Text className="m-0 mt-4 text-[16px] text-gray-600 leading-[26px]">
                  Te informamos que tienes una nueva inscripción en tu evento:
                </Text>
              </Row>
              <Row>
                <Text className="m-0 mt-2 font-bold text-[24px] text-[#1e3a5f] leading-[32px]">
                  {titulo_evento}
                </Text>
              </Row>

              <Hr className="border-gray-200 my-6" />

              {/* Datos del inscrito */}
              <Section className="bg-[#e8f4f8] rounded-lg p-6">
                <Row>
                  <Text className="m-0 font-semibold text-[18px] text-[#005E8D] leading-[24px]">
                    📋 Datos del nuevo inscrito
                  </Text>
                </Row>
                <Row className="mt-4">
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/user.png"
                      width="32"
                      height="32"
                      alt="Usuario"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-semibold text-[16px] text-gray-900 leading-[24px]">
                      Nombre
                    </Text>
                    <Text className="m-0 mt-1 text-[16px] text-gray-600 leading-[24px]">
                      {nombre_inscrito}
                    </Text>
                  </Column>
                </Row>
                <Row className="mt-3">
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/email.png"
                      width="32"
                      height="32"
                      alt="Correo"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-semibold text-[16px] text-gray-900 leading-[24px]">
                      Correo electrónico
                    </Text>
                    <Text className="m-0 mt-1 text-[16px] text-gray-600 leading-[24px]">
                      <Link href={`mailto:${correo_inscrito}`} className="text-[#005E8D] underline">
                        {correo_inscrito}
                      </Link>
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-6" />

              {/* Detalles del evento */}
              <Section>
                <Row>
                  <Text className="m-0 font-semibold text-[18px] text-[#1e3a5f] leading-[24px]">
                    📅 Detalles del evento
                  </Text>
                </Row>
                <Row className="mt-4">
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/calendar.png"
                      width="32"
                      height="32"
                      alt="Fecha"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 text-[14px] text-gray-500 leading-[20px]">
                      Fecha
                    </Text>
                    <Text className="m-0 text-[16px] text-gray-800 font-medium leading-[24px]">
                      {fecha_inscripcion}
                    </Text>
                  </Column>
                </Row>
                <Row className="mt-3">
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/clock.png"
                      width="32"
                      height="32"
                      alt="Hora"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 text-[14px] text-gray-500 leading-[20px]">
                      Horario
                    </Text>
                    <Text className="m-0 text-[16px] text-gray-800 font-medium leading-[24px]">
                      {hora_evento}
                    </Text>
                  </Column>
                </Row>
                <Row className="mt-3">
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/marker.png"
                      width="32"
                      height="32"
                      alt="Ubicación"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 text-[14px] text-gray-500 leading-[20px]">
                      Lugar
                    </Text>
                    <Text className="m-0 text-[16px] text-gray-800 font-medium leading-[24px]">
                      {lugar_evento}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-6" />

              {/* Botón de acción */}
              <Section className="text-center">
                <Row>
                  <Column align="center">
                    <Button
                      href={url_evento}
                      className="bg-[#00AAFF] text-white font-semibold text-[16px] px-8 py-4 rounded-lg no-underline"
                    >
                      Ver lista de inscritos
                    </Button>
                  </Column>
                </Row>
              </Section>

              <Row>
                <Text className="m-0 mt-6 text-[14px] text-gray-500 text-center leading-[22px]">
                  ¿Tienes alguna pregunta?{" "}
                  <Link href="mailto:contacto@escom.ipn.mx" className="text-[#1e3a5f] underline">
                    Contáctanos
                  </Link>
                </Text>
              </Row>
            </Section>

            {/* Footer */}
            <Section className="bg-[#005E8D] py-8 px-6">
              <Row>
                {/* Columna 1: Logo y nombre */}
                <Column className="w-1/2" align="center" style={{ verticalAlign: 'middle' }}>
                  <table cellPadding="0" cellSpacing="0">
                    <tbody>
                      <tr>
                        <td style={{ verticalAlign: 'middle', paddingRight: '16px' }}>
                          <Img 
                            src="https://res.cloudinary.com/dqhsgokht/image/upload/e_colorize:100,co_white/v1764631266/gd98apkes7nfmhz0m2k7.png" 
                            width="70" 
                            height="70" 
                            alt="ESCOM"
                            style={{ display: 'block', objectFit: 'contain' }}
                          />
                        </td>
                        <td style={{ verticalAlign: 'middle' }}>
                          <Text className="m-0 font-bold text-[28px] text-white" style={{ lineHeight: '1.2' }}>
                            ESCOM
                          </Text>
                          <Text className="m-0 text-[16px] text-white opacity-80" style={{ lineHeight: '1.2' }}>
                            Escuela Superior de Cómputo
                          </Text>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Column>

                {/* Columna 2: Redes Sociales */}
                <Column className="w-1/2" align="center" style={{ verticalAlign: 'middle' }}>
                  <Text className="m-0 mb-3 font-semibold text-[18px] text-white text-center">
                    Redes Sociales
                  </Text>
                  <table cellPadding="0" cellSpacing="0" style={{ margin: '0 auto' }}>
                    <tbody>
                      <tr>
                        <td style={{ paddingRight: '12px' }}>
                          <Link href="#">
                            <Img 
                              src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" 
                              width="28" 
                              height="28" 
                              alt="Facebook" 
                              style={{ display: 'block' }} 
                            />
                          </Link>
                        </td>
                        <td style={{ paddingRight: '12px' }}>
                          <Link href="#">
                            <Img 
                              src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" 
                              width="28" 
                              height="28" 
                              alt="X" 
                              style={{ display: 'block' }} 
                            />
                          </Link>
                        </td>
                        <td>
                          <Link href="#">
                            <Img 
                              src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new--v1.png" 
                              width="28" 
                              height="28" 
                              alt="Instagram" 
                              style={{ display: 'block' }} 
                            />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Column>
              </Row>
              
              <Hr className="border-white opacity-30 my-6" />
              
              <Row>
                <Column>
                  <Text className="m-0 text-[11px] text-white opacity-60 text-center">
                    © 2026 Escuela Superior de Cómputo. Todos los derechos reservados.
                  </Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text className="m-0 text-[11px] text-white opacity-60 text-center">
                    <Link href="#" className="text-white no-underline">Política de privacidad</Link>
                    {" | "}
                    <Link href="#" className="text-white no-underline">Términos de servicio</Link>
                    {" | "}
                    <Link href="#" className="text-white no-underline">Ayuda</Link>
                    {" | "}
                    <Link href="#" className="text-white no-underline">Cookies</Link>
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NotificacionInscripcionOrganizador;