import { Html, Head, Body, Container, Section, Row, Column, Text, Link, Tailwind, Preview, Hr, Img, Button } from "@react-email/components";

const NotificacionRegistro = ({
  nombre_usuario = "{{nombre_usuario}}",
  correo_usuario = "{{correo_usuario}}",
  url_inicio = "{{url_inicio}}"
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Gracias por registrarte en ESCOMunidad</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 rounded-lg overflow-hidden max-w-[600px]">
            
            {/* Header con imagen de bienvenida */}
            <Section className="bg-[#005E8D] py-8 text-center">
              <Img
                src="https://res.cloudinary.com/dqhsgokht/image/upload/v1764631266/gd98apkes7nfmhz0m2k7.ico"
                width="120"
                height="80"
                alt="ESCOM"
                style={{ margin: '0 auto', filter: 'brightness(0) invert(1)' }}
              />
              <Text className="m-0 mt-4 font-bold text-[32px] text-white">
                ¡Bienvenido a ESCOMunidad!
              </Text>
            </Section>

            {/* Contenido principal */}
            <Section className="px-8 py-6">
              <Row>
                <Text className="m-0 text-[16px] text-gray-600 leading-[24px]">
                  Hola, <strong>{nombre_usuario}</strong>
                </Text>
              </Row>
              <Row>
                <Text className="m-0 mt-4 text-[16px] text-gray-600 leading-[26px]">
                  Tu cuenta ha sido creada exitosamente. Ahora formas parte de la comunidad de eventos de la Escuela Superior de Cómputo.
                </Text>
              </Row>

              <Hr className="border-gray-200 my-6" />

              {/* Información de la cuenta */}
              <Section className="bg-gray-50 rounded-lg p-6">
                <Row>
                  <Text className="mb-5 mt-2 font-bold text-[22px] text-[#005E8D]">
                    Datos de tu cuenta
                  </Text>
                </Row>
                <Row>
                  <Column className="w-[48px] align-top pt-4">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/user.png"
                      width="32"
                      height="32"
                      alt="Usuario"
                    />
                  </Column>
                  <Column className="pl-3 pt-4">
                    <Text className="m-0 text-[14px] text-gray-500">Nombre</Text>
                    <Text className="m-0 text-[16px] text-gray-900 font-medium">{nombre_usuario}</Text>
                  </Column>
                </Row>
                <Row>
                  <Column className="w-[48px] align-top pt-4">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/email.png"
                      width="32"
                      height="32"
                      alt="Correo"
                    />
                  </Column>
                  <Column className="pl-3 pt-4">
                    <Text className="m-0 text-[14px] text-gray-500">Correo electrónico</Text>
                    <Text className="m-0 text-[16px] text-gray-900 font-medium">{correo_usuario}</Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-6" />

              <Section className="bg-[#f0f7ff] rounded-xl p-6" style={{ borderRadius: '12px', backgroundColor: '#f0f7ff' }}>
                <Row>
                  <Text className="m-0 font-semibold text-[16px] text-[#1e3a5f]">
                    ¿Qué puedes hacer ahora?
                  </Text>
                </Row>
                <table cellPadding="0" cellSpacing="0" style={{ marginTop: '12px', width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: '8px' }}>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{ width: '24px', verticalAlign: 'middle' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '20px', color: 'white', fontSize: '12px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>Explorar eventos académicos y culturales</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '8px' }}>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{ width: '24px', verticalAlign: 'middle' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '20px', color: 'white', fontSize: '12px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>Inscribirte a los que te interesen</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '8px' }}>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{ width: '24px', verticalAlign: 'middle' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '20px', color: 'white', fontSize: '12px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>Recibir notificaciones de eventos</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{ width: '24px', verticalAlign: 'middle' }}>
                                <div style={{ width: '20px', height: '20px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '20px', color: 'white', fontSize: '12px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>Agregar eventos a tu calendario</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              <Hr className="border-gray-200 my-6" />

              {/* Botón de acción */}
                <Section className="my-12">
                    <Section className="text-center">
                        <Row>
                            <Column align="center">
                            <Button
                                href={url_inicio}
                                className="bg-[#00AAFF] text-white font-semibold text-[16px] px-8 py-4 rounded-lg no-underline"
                            >
                                Explorar eventos
                            </Button>
                            </Column>
                        </Row>
                    </Section>
                    <Row>
                        <Text className="m-0 mt-3 text-[14px] text-gray-500 text-center leading-[22px]">
                            ¿Tienes alguna pregunta?{" "}
                            <Link href="mailto:contacto@escom.ipn.mx" className="text-[#1e3a5f] underline">
                            Contáctanos
                            </Link>
                        </Text>
                    </Row>
                </Section>
                
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
                            src="https://res.cloudinary.com/dqhsgokht/image/upload/v1764631266/gd98apkes7nfmhz0m2k7.ico" 
                            width="70" 
                            height="70" 
                            alt="ESCOM"
                            style={{ filter: 'brightness(0) invert(1)', display: 'block', objectFit: 'contain' }}
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
                    © 2025 Escuela Superior de Cómputo. Todos los derechos reservados.
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

export default NotificacionRegistro;