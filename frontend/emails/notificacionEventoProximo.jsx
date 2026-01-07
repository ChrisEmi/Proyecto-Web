import { Html, Head, Body, Container, Section, Row, Column, Text, Link, Tailwind, Preview, Hr, Img, Button } from "@react-email/components";

const NotificacionEventoProximo = ({
  nombre_usuario = "{{nombre_usuario}}",
  titulo_evento = "{{titulo_evento}}",
  descripcion_evento = "{{descripcion}}",
  dias_restantes = "{{dias_restantes}}",
  fecha_evento = "{{fecha_evento}}",
  hora_evento = "{{hora_evento}}",
  lugar_evento = "{{lugar_evento}}",
  imagen_evento = "{{imagen_evento}}",
  url_evento = "{{url_evento}}"
}) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>⏰ ¡Tu evento está próximo! - ESCOMunidad</Preview>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white mx-auto my-10 rounded-lg overflow-hidden max-w-[600px]">
            
            {/* Header con alerta */}
            <Section className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] py-6 px-8">
              <Row>
                <Column align="center">
                  <Img
                    src="https://img.icons8.com/ios-filled/100/ffffff/alarm-clock.png"
                    width="60"
                    height="60"
                    alt="Recordatorio"
                  />
                  <Text className="m-0 mt-4 font-bold text-[24px] text-white text-center">
                    ¡Tu evento está cerca!
                  </Text>
                  <Text className="m-0 mt-2 text-[16px] text-white opacity-90 text-center">
                    No olvides asistir
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Contador de días */}
            <Section className="bg-[#1e3a5f] py-6 px-8">
              <Row>
                <Column align="center">
                  <Text className="m-0 text-[14px] text-white opacity-80 text-center uppercase tracking-wider">
                    Faltan
                  </Text>
                  <Text className="m-0 mt-2 font-bold text-[56px] text-[#00AAFF] text-center leading-none">
                    {dias_restantes}
                  </Text>
                  <Text className="m-0 mt-2 text-[18px] text-white text-center">
                    {dias_restantes === "1" ? "día" : "días"}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Imagen del evento */}
            <Section>
              <Img
                src={imagen_evento}
                width="600"
                height="180"
                alt={titulo_evento}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
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
                <Text className="m-0 mt-4 text-[16px] text-gray-600 leading-[26px]">
                  Te recordamos que estás inscrito en el siguiente evento que se realizará muy pronto:
                </Text>
              </Row>
              <Row>
                <Text className="m-0 mt-4 font-bold text-[24px] text-[#1e3a5f] leading-[32px]">
                  {titulo_evento}
                </Text>
              </Row>
              <Row>
                <Text className="m-0 mt-3 text-[15px] text-gray-500 leading-[24px]">
                  {descripcion_evento}
                </Text>
              </Row>

              <Hr className="border-gray-200 my-6" />

              {/* Detalles del evento en tarjetas */}
              <Section className="bg-[#f8fafc] rounded-lg p-5">
                <Row>
                  <Text className="m-0 font-semibold text-[18px] text-[#1e3a5f] leading-[24px] mb-4">
                    📋 Detalles del evento
                  </Text>
                </Row>
                
                <Row className="mt-4">
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/calendar.png"
                      width="36"
                      height="36"
                      alt="Fecha"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 text-[13px] text-gray-500 leading-[18px]">
                      Fecha
                    </Text>
                    <Text className="m-0 font-semibold text-[16px] text-gray-900 leading-[24px]">
                      {fecha_evento}
                    </Text>
                  </Column>
                </Row>

                <Hr className="border-gray-200 my-3" />

                <Row>
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/clock.png"
                      width="36"
                      height="36"
                      alt="Hora"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 text-[13px] text-gray-500 leading-[18px]">
                      Horario
                    </Text>
                    <Text className="m-0 font-semibold text-[16px] text-gray-900 leading-[24px]">
                      {hora_evento}
                    </Text>
                  </Column>
                </Row>

                <Hr className="border-gray-200 my-3" />

                <Row>
                  <Column className="w-[48px] align-top">
                    <Img
                      src="https://img.icons8.com/ios-filled/50/005E8D/marker.png"
                      width="36"
                      height="36"
                      alt="Ubicación"
                    />
                  </Column>
                  <Column className="pl-3">
                    <Text className="m-0 text-[13px] text-gray-500 leading-[18px]">
                      Lugar
                    </Text>
                    <Text className="m-0 font-semibold text-[16px] text-gray-900 leading-[24px]">
                      {lugar_evento}
                    </Text>
                  </Column>
                </Row>
              </Section>

              <Hr className="border-gray-200 my-6" />

              {/* Recordatorio */}
              <Section className="bg-[#fff7ed] border-l-4 border-[#F7931E] rounded-r-lg p-4">
                <Row>
                  <Column className="w-[32px] align-top">
                    <Text className="m-0 text-[24px]">💡</Text>
                  </Column>
                  <Column className="pl-2">
                    <Text className="m-0 text-[14px] text-[#9a3412] leading-[22px]">
                      <strong>Recuerda:</strong> Llega con tiempo de anticipación para registrar tu asistencia. ¡Te esperamos!
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
                  ¿No puedes asistir?{" "}
                  <Link href={url_evento} className="text-[#1e3a5f] underline">
                    Cancela tu inscripción
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

export default NotificacionEventoProximo;