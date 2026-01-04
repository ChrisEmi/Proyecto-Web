import { Html, Head, Body, Container, Section, Row, Column, Text, Link, Tailwind, Preview, Hr, Img, Button } from "@react-email/components";

const RecuperacionContrasena = ({
  nombre_usuario = "{{nombre_usuario}}",
  url_recuperacion = "{{url_recuperacion}}",
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Recupera tu contraseña - ESCOMunidad</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 rounded-lg overflow-hidden max-w-[600px]">
            
            {/* Header */}
            <Section className="bg-[#005E8D] py-8 text-center">
              <Img
                src="https://res.cloudinary.com/dqhsgokht/image/upload/e_colorize:100,co_white/v1764631266/gd98apkes7nfmhz0m2k7.png"
                width="110"
                height="70"
                alt="ESCOM"
                style={{ margin: '0 auto' }}
              />
              <Text className="m-0 mt-4 font-bold text-[28px] text-white">
                Recuperación de contraseña
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
                  Recibimos una solicitud para restablecer la contraseña de tu cuenta en ESCOMunidad. 
                  Si no realizaste esta solicitud, puedes ignorar este correo.
                </Text>
              </Row>

              <Hr className="border-gray-200 my-6" />

              {/* Icono de candado */}
              <Section className="text-center my-6">
                <Img
                  src="https://img.icons8.com/ios-filled/100/005E8D/lock-2.png"
                  width="80"
                  height="80"
                  alt="Seguridad"
                  style={{ margin: '0 auto' }}
                />
              </Section>

              {/* Mensaje de acción */}
              <Section className="bg-[#f0f7ff] rounded-xl p-6" style={{ borderRadius: '12px', backgroundColor: '#f0f7ff' }}>
                <Row>
                  <Text className="m-0 text-center font-semibold text-[18px] text-[#1e3a5f]">
                    Haz clic en el botón para crear una nueva contraseña
                  </Text>
                </Row>
                <Row>
                  <Text className="m-0 mt-2 text-center text-[14px] text-gray-500">
                    Este enlace expirará en <strong>60 minutos</strong>
                  </Text>
                </Row>
              </Section>

              {/* Botón de acción */}
              <Section className="text-center my-8">
                <Row>
                  <Column align="center">
                    <Button
                      href={url_recuperacion}
                      className="bg-[#00AAFF] text-white font-bold text-[16px] px-10 py-4 rounded-lg no-underline"
                      style={{ 
                        backgroundColor: '#00AAFF', 
                        color: '#ffffff',
                        padding: '16px 40px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      Restablecer contraseña
                    </Button>
                  </Column>
                </Row>
              </Section>

              {/* Link alternativo */}
              <Section className="bg-gray-50 rounded-lg p-4 my-4" style={{ borderRadius: '8px' }}>
                <Row>
                  <Text className="m-0 text-[12px] text-gray-500 text-center">
                    Si el botón no funciona, copia y pega este enlace en tu navegador:
                  </Text>
                </Row>
                <Row>
                  <Text className="m-0 mt-2 text-[11px] text-[#005E8D] text-center break-all" style={{ wordBreak: 'break-all' }}>
                    {url_recuperacion}
                  </Text>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-6" />

              {/* Consejos de seguridad */}
              <Section>
                <Row>
                  <Text className="m-0 font-semibold text-[16px] text-[#1e3a5f]">
                    Consejos de seguridad
                  </Text>
                </Row>
                <table cellPadding="0" cellSpacing="0" style={{ marginTop: '12px', width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: '10px' }}>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{ width: '24px', verticalAlign: 'top', paddingTop: '2px' }}>
                                <div style={{ width: '18px', height: '18px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '18px', color: 'white', fontSize: '10px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>Usa una contraseña de al menos 8 caracteres</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '10px' }}>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{ width: '24px', verticalAlign: 'top', paddingTop: '2px' }}>
                                <div style={{ width: '18px', height: '18px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '18px', color: 'white', fontSize: '10px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>Incluye mayúsculas, minúsculas y números</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingBottom: '10px' }}>
                        <table cellPadding="0" cellSpacing="0">
                          <tbody>
                            <tr>
                              <td style={{ width: '24px', verticalAlign: 'top', paddingTop: '2px' }}>
                                <div style={{ width: '18px', height: '18px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '18px', color: 'white', fontSize: '10px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>No uses información personal fácil de adivinar</td>
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
                              <td style={{ width: '24px', verticalAlign: 'top', paddingTop: '2px' }}>
                                <div style={{ width: '18px', height: '18px', backgroundColor: '#005E8D', borderRadius: '50%', textAlign: 'center', lineHeight: '18px', color: 'white', fontSize: '10px' }}>✓</div>
                              </td>
                              <td style={{ paddingLeft: '10px', color: '#4a5568', fontSize: '14px' }}>No compartas tu contraseña con nadie</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Section>

              <Hr className="border-gray-200 my-6" />

              <Row>
                <Text className="m-0 mt-6 text-[14px] text-gray-500 text-center leading-[22px]">
                  ¿Necesitas ayuda?{" "}
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

export default RecuperacionContrasena;
