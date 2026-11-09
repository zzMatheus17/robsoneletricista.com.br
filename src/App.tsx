import { useState, type FormEvent, type ReactNode } from 'react'

const services = [
  {
    icon: 'bolt',
    title: 'Emergência elétrica',
    text: 'Atendimento ágil para quedas de energia, curto-circuito e disjuntores desarmando.',
  },
  {
    icon: 'panel',
    title: 'Quadros e disjuntores',
    text: 'Instalação, troca e organização do quadro elétrico com proteção adequada.',
  },
  {
    icon: 'outlet',
    title: 'Tomadas e iluminação',
    text: 'Novos pontos, luminárias, chuveiros, ventiladores e correção de instalações.',
  },
  {
    icon: 'shield',
    title: 'Revisão preventiva',
    text: 'Diagnóstico completo para evitar sobrecarga, desperdícios e riscos elétricos.',
  },
]

const steps = [
  ['Primeiro contato', 'Você explica o problema e informa o endereço para verificarmos a disponibilidade.'],
  ['Avaliação técnica', 'O local é analisado para identificar a causa e a solução mais segura.'],
  ['Orçamento claro', 'O serviço e os materiais necessários são apresentados antes da execução.'],
  ['Problema resolvido', 'O reparo é realizado com cuidado, testes e orientação ao final.'],
]

const faqs = [
  [
    'Quais tipos de serviço vocês realizam?',
    'Atendemos instalações, reparos, troca de disjuntores e quadros, chuveiros, tomadas, iluminação, identificação de curtos e revisões preventivas em imóveis residenciais e comerciais.',
  ],
  [
    'O atendimento é feito em quais regiões?',
    'O atendimento é realizado em Guarulhos e em diversos bairros de São Paulo. Entre em contato e informe seu endereço para confirmar a disponibilidade.',
  ],
  [
    'É possível solicitar atendimento de emergência?',
    'Sim. Casos urgentes, como falta de energia parcial, cheiro de queimado, curto-circuito ou disjuntores desarmando, têm atendimento conforme disponibilidade.',
  ],
  [
    'Como funciona o orçamento?',
    'Após entender a necessidade e avaliar o local, explicamos a solução indicada, os materiais envolvidos e o valor antes de iniciar o serviço.',
  ],
]

const completedWorks = [
  {
    src: '/images/servico-ventilador.webp',
    title: 'Instalação de ventilador de teto',
    category: 'Instalação residencial',
    alt: 'Ventilador de teto preto instalado em ambiente residencial',
  },
  {
    src: '/images/trabalho-01.webp',
    title: 'Projeto de iluminação decorativa',
    category: 'Iluminação residencial',
    alt: 'Painel de madeira com arandelas e iluminação indireta em LED',
  },
  {
    src: '/images/trabalho-02.webp',
    title: 'Pendente de LED em anéis',
    category: 'Iluminação decorativa',
    alt: 'Luminária pendente moderna formada por três anéis de LED',
  },
  {
    src: '/images/trabalho-03.webp',
    title: 'Instalação de lustre',
    category: 'Iluminação residencial',
    alt: 'Lustre decorativo de cristal instalado e aceso',
  },
  {
    src: '/images/trabalho-04.webp',
    title: 'Instalação elétrica de chuveiro',
    category: 'Instalação residencial',
    alt: 'Chuveiro elétrico instalado em banheiro',
  },
  {
    src: '/images/trabalho-05.webp',
    title: 'Sistema de câmeras em funcionamento',
    category: 'Segurança eletrônica',
    alt: 'Monitor exibindo imagens de um sistema de câmeras de segurança',
  },
  {
    src: '/images/trabalho-06.webp',
    title: 'Central de monitoramento CFTV',
    category: 'Segurança eletrônica',
    alt: 'Central organizada para sistema de câmeras de segurança',
  },
  {
    src: '/images/trabalho-07.webp',
    title: 'Manutenção de quadro elétrico',
    category: 'Manutenção elétrica',
    alt: 'Manutenção e substituição de componentes em quadro elétrico',
  },
  {
    src: '/images/trabalho-08.webp',
    title: 'Iluminação geométrica em LED',
    category: 'Iluminação comercial',
    alt: 'Iluminação de LED em formato geométrico instalada em barbearia',
  },
  {
    src: '/images/trabalho-09.webp',
    title: 'Projeto luminotécnico comercial',
    category: 'Iluminação comercial',
    alt: 'Linhas, spots e painéis de LED instalados em teto comercial',
  },
  {
    src: '/images/trabalho-10.webp',
    title: 'Pendentes e spots residenciais',
    category: 'Iluminação residencial',
    alt: 'Pendentes modernos e spots instalados em ambiente residencial',
  },
]

const whatsappUrl =
  'https://wa.me/5511932130240?text=Ol%C3%A1%2C%20Robson!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.'
const emergencyUrl =
  'https://wa.me/5511932130240?text=Ol%C3%A1%2C%20Robson!%20Estou%20com%20uma%20emerg%C3%AAncia%20el%C3%A9trica%20e%20preciso%20de%20atendimento.'
const googleReviewsUrl = 'https://share.google/ZNmkbo1ME0YqwIZ2j'
const workFilters = ['Todos', 'Iluminação', 'Instalação', 'Segurança', 'Manutenção']

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    bolt: <path d="M13 2 4.8 13h6.7l-.7 9L19.2 11h-6.7L13 2Z" />,
    panel: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 7h6M9 11h2M9 15h6M15 10v3" />
      </>
    ),
    outlet: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="3" />
        <path d="M9 9v3M15 9v3M9 16h6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.8 2.9 8.4 7 10 4.1-1.6 7-5.2 7-10V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    star: <path d="m12 2.8 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2L3 9.4l6.2-.9L12 2.8Z" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function WhatsAppBusinessIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.2 11.7a8.2 8.2 0 0 1-11.9 7.4L3.8 20l1-4.3a8.2 8.2 0 1 1 15.4-4Z" />
      <path d="M9 7.8h3.2a2.1 2.1 0 0 1 0 4.2H9V7.8Zm0 4.2h3.7a2.1 2.1 0 0 1 0 4.2H9V12Z" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedWork, setSelectedWork] = useState<(typeof completedWorks)[number] | null>(null)
  const [workFilter, setWorkFilter] = useState('Todos')
  const visibleWorks = completedWorks.filter(
    (work) => workFilter === 'Todos' || work.category.includes(workFilter),
  )

  function requestQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = [
      'Olá, Robson! Gostaria de solicitar um orçamento.',
      `Serviço: ${data.get('servico')}`,
      `Bairro/cidade: ${data.get('local')}`,
      `Descrição: ${data.get('descricao')}`,
    ].join('\n')
    window.open(`https://wa.me/5511932130240?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#" className="flex items-center gap-3 text-white" aria-label="Início">
            <img
              src="/images/logo-robson-rodrigues.webp"
              alt="Logo Eletricista Robson Rodrigues"
              className="h-14 w-14 rounded-full border border-white/15 object-cover"
            />
            <span className="leading-none">
              <strong className="block text-[14px] tracking-wide">ROBSON RODRIGUES</strong>
              <span className="text-[10px] font-semibold tracking-[0.18em] text-white/60">
                ELETRICISTA
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 md:flex">
            <a href="#sobre" className="transition hover:text-white">
              Sobre
            </a>
            <a href="#servicos" className="transition hover:text-white">
              Serviços
            </a>
            <a href="#trabalhos" className="transition hover:text-white">
              Trabalhos
            </a>
            <a href="#processo" className="transition hover:text-white">
              Como funciona
            </a>
            <a href="#duvidas" className="transition hover:text-white">
              Dúvidas
            </a>
          </nav>
          <div className="hidden items-center gap-4 sm:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2.5 text-white xl:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-[#f7c928]">
                <WhatsAppBusinessIcon size={19} />
              </span>
              <span className="leading-tight">
                <strong className="block text-xs">Atendimento ágil</strong>
                <small className="text-[10px] text-white/50">Retorno pelo WhatsApp</small>
              </span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Pedir orçamento <Icon name="arrow" size={18} />
            </a>
          </div>
          <button
            className="text-white sm:hidden"
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Icon name="menu" />
          </button>
        </div>
        {menuOpen && (
          <nav className="mx-5 mb-4 grid gap-1 rounded-2xl border border-white/10 bg-[#16212a] p-3 text-sm text-white shadow-xl sm:hidden">
            {[
              ['Sobre', '#sobre'],
              ['Serviços', '#servicos'],
              ['Trabalhos realizados', '#trabalhos'],
              ['Como funciona', '#processo'],
              ['Avaliações', '#avaliacoes'],
              ['Dúvidas', '#duvidas'],
              ['Pedir orçamento', whatsappUrl],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 hover:bg-white/5"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="hero relative overflow-hidden bg-[#101820] pb-20 pt-36 text-white lg:min-h-[760px] lg:pb-28 lg:pt-48">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="absolute -right-48 top-16 h-[520px] w-[520px] rounded-full border border-[#f7c928]/20" />
        <div className="absolute -right-24 top-40 h-[300px] w-[300px] rounded-full border border-[#f7c928]/30" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.08fr_.92fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#f7c928] shadow-[0_0_12px_#f7c928]" />
              ATENDIMENTO EMERGENCIAL
            </div>
            <h1 className="text-5xl font-semibold leading-[.98] tracking-[-0.045em] sm:text-6xl lg:text-[76px]">
              Energia segura.
              <br />
              <span className="text-[#f7c928]">Problema resolvido.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/66">
              Serviço elétrico residencial e comercial em Guarulhos e São Paulo, com diagnóstico
              preciso, atendimento rápido e execução responsável.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary justify-center px-7 py-4"
              >
                Solicitar atendimento <Icon name="arrow" size={19} />
              </a>
              <a href="#servicos" className="btn-secondary justify-center px-7 py-4">
                Conhecer serviços
              </a>
            </div>
            <a
              href={emergencyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f7c928] underline-offset-4 hover:underline"
            >
              <Icon name="bolt" size={17} /> Estou com uma emergência elétrica
            </a>
            <div className="mt-11 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              {['Orçamento transparente', 'Serviço com garantia', 'Atendimento local'].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="text-[#f7c928]">
                    <Icon name="check" size={17} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[390px] lg:min-h-[440px]">
            <div className="absolute right-0 top-2 w-full rounded-[32px] border border-white/10 bg-white/[0.055] p-3 backdrop-blur lg:w-[430px]">
              <div className="relative h-[350px] overflow-hidden rounded-[24px] bg-[#18242e] lg:h-[430px]">
                <img
                  src="/images/trabalho-01.webp"
                  alt="Projeto de iluminação residencial com painel de madeira, arandelas e LED"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/75 via-transparent to-transparent" />
                <span className="absolute left-7 top-7 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] font-semibold tracking-wider text-white/65">
                  SERVIÇO ESPECIALIZADO
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <div className="relative">
            <div className="overflow-hidden rounded-[30px] bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1660330589487-39cc0177ba89?auto=format&fit=crop&w=1000&q=85"
                alt="Eletricista trabalhando com equipamentos de segurança"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 max-w-[230px] rounded-2xl bg-[#f7c928] p-6 shadow-xl sm:right-6">
              <strong className="text-xl text-[#101820]">Trabalho responsável</strong>
              <p className="mt-2 text-sm leading-6 text-[#101820]/65">Soluções pensadas para durar e proteger.</p>
            </div>
          </div>
          <div className="lg:pl-8">
            <p className="eyebrow">SOBRE O ATENDIMENTO</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.035em] text-[#101820] sm:text-5xl">
              Sua instalação elétrica merece atenção de verdade.
            </h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
              <p>
                Um problema elétrico pode interromper sua rotina e, quando não é tratado corretamente,
                também pode colocar pessoas e o imóvel em risco.
              </p>
              <p>
                Por isso, cada atendimento começa com uma avaliação cuidadosa. O objetivo não é apenas
                fazer a energia voltar, mas encontrar a causa do problema e indicar uma solução segura,
                clara e adequada para sua necessidade.
              </p>
              <p>
                Seja para um reparo urgente, uma nova instalação ou uma revisão preventiva, você acompanha
                cada etapa e entende o que será realizado.
              </p>
            </div>
            <a href="#servicos" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#725700]">
              Conheça os serviços <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-[#f5f6f4] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">SOLUÇÕES ELÉTRICAS</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-[#101820] sm:text-5xl">
                Do reparo urgente à instalação completa.
              </h2>
            </div>
            <p className="max-w-sm leading-7 text-slate-600">
              Cuidado técnico em cada detalhe para deixar seu imóvel seguro e funcionando.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="service-card group rounded-[24px] border border-[#dfe2dc] bg-white p-7"
              >
                <div className="mb-10 flex items-start justify-between">
                  <span className="grid h-13 w-13 place-items-center rounded-2xl bg-[#fff5c9] text-[#866600] transition group-hover:bg-[#f7c928] group-hover:text-[#101820]">
                    <Icon name={service.icon} size={25} />
                  </span>
                  <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#101820]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="trabalhos" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">TRABALHOS REALIZADOS</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-[#101820] sm:text-5xl">
                Qualidade que você pode ver.
              </h2>
            </div>
            <p className="max-w-md leading-7 text-slate-600">
              Alguns dos serviços executados em residências e empresas de Guarulhos e São Paulo.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap gap-2" aria-label="Filtrar trabalhos">
            {workFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setWorkFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  workFilter === filter
                    ? 'border-[#101820] bg-[#101820] text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#f7c928]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleWorks.map((work, index) => (
              <button
                key={work.src}
                type="button"
                onClick={() => setSelectedWork(work)}
                className={`group relative min-h-[390px] overflow-hidden rounded-[26px] bg-slate-200 text-left sm:min-h-[430px] ${
                  index === 1 ? 'lg:col-span-2' : ''
                }`}
                aria-label={`Ampliar foto: ${work.title}`}
              >
                <img
                  src={work.src}
                  alt={work.alt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/90 via-[#101820]/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <span className="text-[11px] font-bold tracking-[.14em] text-[#f7c928]">
                    {work.category.toUpperCase()}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{work.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-white/65">
                    Ver imagem <Icon name="arrow" size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="diferenciais" className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="relative overflow-hidden rounded-[30px] bg-[#15212a] p-8 text-white sm:p-12">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#f7c928] text-[#101820]">
                <Icon name="shield" size={28} />
              </span>
              <blockquote className="mt-12 text-3xl font-medium leading-tight tracking-[-0.03em]">
                “Segurança não é detalhe. É o ponto de partida de todo serviço bem-feito.”
              </blockquote>
              <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/55">
                Compromisso com a sua casa, empresa e família.
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">POR QUE ESCOLHER</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[#101820] sm:text-5xl">
              Serviço direto, limpo e sem surpresa.
            </h2>
            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              {[
                ['Diagnóstico preciso', 'A causa do problema é identificada antes do reparo.'],
                ['Preço combinado', 'Você entende o serviço e aprova antes da execução.'],
                ['Execução segura', 'Boas práticas e materiais adequados para cada projeto.'],
                ['Pós-atendimento', 'Orientação clara e suporte depois do serviço concluído.'],
              ].map(([title, text]) => (
                <div key={title} className="border-l-2 border-[#f7c928] pl-5">
                  <h3 className="font-semibold text-[#101820]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="processo" className="overflow-hidden bg-[#101820] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[.16em] text-[#f7c928]">COMO FUNCIONA</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Um atendimento simples, do contato à solução.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-white/55">
              Você sabe o que está acontecendo e o que será feito em cada momento.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], index) => (
              <article key={title} className="bg-[#101820] p-7 lg:min-h-[280px]">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#f7c928]/35 text-sm font-bold text-[#f7c928]">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && <span className="hidden text-white/20 lg:block">→</span>}
                </div>
                <h3 className="mt-12 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="bg-[#f5f6f4] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid overflow-hidden rounded-[30px] bg-white shadow-[0_24px_70px_rgba(16,24,32,.08)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="eyebrow">AVALIAÇÕES DOS CLIENTES</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[#101820] sm:text-5xl">
                A confiança de quem já conhece o trabalho.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                Confira no Google as experiências compartilhadas por clientes que já contrataram os
                serviços de Robson Rodrigues.
              </p>
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-8 px-6 py-4"
              >
                Ver avaliações no Google <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="relative grid min-h-[370px] place-items-center overflow-hidden bg-[#101820] p-8 text-white sm:p-12">
              <div className="hero-grid absolute inset-0 opacity-25" />
              <div className="relative w-full max-w-md rounded-[24px] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-xl font-bold text-[#4285f4]">
                      G
                    </span>
                    <span>
                      <strong className="block">Avaliações no Google</strong>
                      <small className="text-white/50">Comentários publicados por clientes</small>
                    </span>
                  </div>
                  <div className="hidden gap-1 text-[#f7c928] sm:flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon key={star} name="star" size={15} />
                    ))}
                  </div>
                </div>
                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="text-lg font-medium leading-8">
                    Leia as avaliações diretamente no perfil para conhecer relatos reais e atualizados.
                  </p>
                  <a
                    href={googleReviewsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f7c928]"
                  >
                    Abrir perfil <Icon name="arrow" size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="regiao" className="bg-[#f7c928] py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[.8fr_1.2fr] md:items-center lg:px-8">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#101820] text-[#f7c928]">
              <Icon name="pin" />
            </span>
            <div>
              <p className="text-xs font-bold tracking-[.15em] text-[#101820]/60">REGIÃO ATENDIDA</p>
              <h3 className="mt-1 text-xl font-semibold text-[#101820]">
                Guarulhos e principais bairros de São Paulo
              </h3>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              {['Centro', 'Macedo', 'Vila Galvão', 'Taboão', 'Pimentas', 'Bonsucesso', 'Zona Norte', 'Zona Leste'].map(
                (area) => (
                  <span key={area} className="rounded-full bg-[#101820]/10 px-3 py-1.5 text-xs font-semibold text-[#101820]/75">
                    {area}
                  </span>
                ),
              )}
            </div>
            <p className="mt-3 text-xs text-[#101820]/60">
              Outros bairros sob consulta. Informe seu endereço para confirmar a disponibilidade.
            </p>
          </div>
        </div>
      </section>

      <section id="duvidas" className="bg-[#f5f6f4] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
          <div>
            <p className="eyebrow">DÚVIDAS FREQUENTES</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-[#101820] sm:text-5xl">
              Antes de chamar, tire suas dúvidas.
            </h2>
            <p className="mt-5 max-w-sm leading-7 text-slate-600">
              Não encontrou sua resposta? Entre em contato e explique o que está acontecendo.
            </p>
          </div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index
              return (
                <div key={question}>
                  <button
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span className="font-semibold text-[#101820]">{question}</span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xl text-[#101820]">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-slate-600">{answer}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contato" className="bg-[#101820] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
          <div className="text-center lg:text-left">
          <div className="mx-auto mb-6 flex w-fit gap-1 text-[#f7c928]">
            {[1, 2, 3, 4, 5].map((item) => (
              <Icon key={item} name="star" size={16} />
            ))}
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Precisando de um eletricista?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/60">
            Explique o que está acontecendo e receba uma orientação inicial para o seu atendimento.
          </p>
          <a
            href="tel:+5511932130240"
            className="mt-7 block text-lg font-semibold text-white transition hover:text-[#f7c928]"
          >
            (11) 93213-0240
          </a>
          <p className="mt-2 text-xs text-white/35">Retorno conforme disponibilidade de atendimento.</p>
          </div>
          <form onSubmit={requestQuote} className="rounded-[26px] border border-white/10 bg-white/[0.06] p-6 text-left sm:p-8">
            <h3 className="text-xl font-semibold">Orçamento rápido</h3>
            <p className="mt-2 text-sm text-white/50">Preencha e envie tudo pronto pelo WhatsApp.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-semibold text-white/60">
                SERVIÇO
                <select name="servico" required className="rounded-xl border border-white/10 bg-[#17232c] px-4 py-3 text-sm text-white outline-none focus:border-[#f7c928]">
                  <option value="">Selecione</option>
                  <option>Emergência elétrica</option>
                  <option>Iluminação</option>
                  <option>Chuveiro ou ventilador</option>
                  <option>Quadro elétrico</option>
                  <option>Câmeras e CFTV</option>
                  <option>Outro serviço</option>
                </select>
              </label>
              <label className="grid gap-2 text-xs font-semibold text-white/60">
                BAIRRO OU CIDADE
                <input name="local" required placeholder="Ex.: Centro, Guarulhos" className="rounded-xl border border-white/10 bg-[#17232c] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#f7c928]" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-xs font-semibold text-white/60">
              O QUE ESTÁ ACONTECENDO?
              <textarea name="descricao" required rows={4} placeholder="Descreva o serviço ou problema elétrico" className="resize-none rounded-xl border border-white/10 bg-[#17232c] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#f7c928]" />
            </label>
            <button type="submit" className="btn-primary mt-5 w-full justify-center py-4">
              Enviar pelo WhatsApp <WhatsAppBusinessIcon size={19} />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#101820] px-5 py-7 text-center text-xs text-white/35">
        © {new Date().getFullYear()} Robson Rodrigues — Eletricista em Guarulhos e São Paulo. Todos os
        direitos reservados.
      </footer>

      {selectedWork && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#070b0e]/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={selectedWork.title}
          onClick={() => setSelectedWork(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedWork(null)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-2xl text-[#101820]"
            aria-label="Fechar imagem"
          >
            ×
          </button>
          <figure
            className="max-h-[88vh] max-w-4xl overflow-hidden rounded-2xl bg-[#101820]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedWork.src}
              alt={selectedWork.alt}
              className="max-h-[78vh] w-full object-contain"
            />
            <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-white">
              <span className="font-semibold">{selectedWork.title}</span>
              <span className="text-xs text-white/45">{selectedWork.category}</span>
            </figcaption>
          </figure>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-bold text-[#092b16] shadow-[0_12px_35px_rgba(0,0,0,.25)] transition hover:-translate-y-1"
        aria-label="Falar com Robson pelo WhatsApp"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#128c4a]">
          <WhatsAppBusinessIcon size={19} />
        </span>
        WhatsApp
      </a>
    </main>
  )
}

export default App
