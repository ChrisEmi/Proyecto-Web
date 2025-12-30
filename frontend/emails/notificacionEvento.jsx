import { Html, Head, Body, Container, Section, Row, Column, Text, Link, Tailwind, Preview, Hr, Img, Button } from "@react-email/components";

const NotificacionEvento = ({
  nombre_usuario = "{{nombre_usuario}}",
  titulo_evento = "{{titulo_evento}}",
  descripcion_evento = "{{descripcion}}",
  fecha_inicio = "{{fecha_inicio}}",
  fecha_final = "{{fecha_final}}",
  hora_evento = "{{hora_evento}}",
  lugar_evento = "{{lugar_evento}}",
  imagen_evento = "{{imagen_evento}}",
  url_evento = "{{url_evento}}"
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>{titulo_evento} - ESCOMunidad</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 rounded-lg overflow-hidden max-w-[600px]">
            
            {/* Header con imagen del evento */}
            <Section>
              <Img
                src={imagen_evento}
                width="600"
                height="200"
                alt={titulo_evento}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            </Section>

            {/* Contenido principal */}
            <Section className="px-8 py-6">
              <Row>
                <Text className="m-0 text-[16px] text-gray-600 leading-[24px]">
                  Hola, <strong>{nombre_usuario}</strong>
                </Text>
              </Row>
              <Row>
                <Text className="m-0 mt-4 font-bold text-[28px] text-[#1e3a5f] leading-[36px]">
                  {titulo_evento}
                </Text>
              </Row>
              <Row>
                <Text className="m-0 mt-4 text-[16px] text-gray-600 leading-[26px]">
                  {descripcion_evento}
                </Text>
              </Row>

              <Hr className="border-gray-200 my-6" />

              {/* Detalles del evento */}
              <Section>
                <Row>
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/calendar.png"
                      width="40"
                      height="40"
                      alt="Fecha"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-semibold text-[18px] text-gray-900 leading-[24px]">
                      Fecha
                    </Text>
                    <Text className="m-0 mt-1 text-[16px] text-gray-600 leading-[24px]">
                      {fecha_inicio} - {fecha_final}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-4" />

              <Section>
                <Row>
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/clock.png"
                      width="40"
                      height="40"
                      alt="Hora"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-semibold text-[18px] text-gray-900 leading-[24px]">
                      Horario
                    </Text>
                    <Text className="m-0 mt-1 text-[16px] text-gray-600 leading-[24px]">
                      {hora_evento}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-4" />

              <Section>
                <Row>
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/marker.png"
                      width="40"
                      height="40"
                      alt="Ubicación"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 font-semibold text-[18px] text-gray-900 leading-[24px]">
                      Lugar
                    </Text>
                    <Text className="m-0 mt-1 text-[16px] text-gray-600 leading-[24px]">
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
                      Ver detalles del evento
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

export default NotificacionEvento;