import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarBlankIcon,
  CashRegisterIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  PackageIcon,
  ShieldCheckIcon,
  SignInIcon,
  StarIcon,
  TrendUpIcon,
  UsersThreeIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/current-user";

const STATS = [
  { value: "+120", label: "barbearias" },
  { value: "98%", label: "uptime" },
  { value: "<1min", label: "pra começar" },
];

const FEATURES = [
  {
    icon: CalendarBlankIcon,
    title: "Agenda inteligente",
    desc: "Drag-and-drop, múltiplos barbeiros e bloqueios automáticos por intervalo. Cliente agenda sozinho pela página pública.",
    accent: "from-blue-500/15 to-blue-500/0",
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: CashRegisterIcon,
    title: "Caixa integrado",
    desc: "Vendas, comissões por barbeiro, formas de pagamento e fechamento diário. Sem planilha, sem retrabalho.",
    accent: "from-emerald-500/15 to-emerald-500/0",
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: UsersThreeIcon,
    title: "CRM completo",
    desc: "Histórico de atendimentos, ticket médio, frequência e aniversários. Cada cliente vira um cartão vivo.",
    accent: "from-violet-500/15 to-violet-500/0",
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: WhatsappLogoIcon,
    title: "WhatsApp nativo",
    desc: "Confirmações, lembretes, pós-serviço e felicitações automáticas. Cliente responde direto no Zap da barbearia.",
    accent: "from-green-500/15 to-green-500/0",
    iconBg: "bg-green-500/10 text-green-600",
  },
  {
    icon: HeartIcon,
    title: "Fidelidade",
    desc: "Cartão fidelidade digital com pontos, recompensas e validação automática a cada visita concluída.",
    accent: "from-rose-500/15 to-rose-500/0",
    iconBg: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: ChartLineUpIcon,
    title: "Indicadores em tempo real",
    desc: "Faturamento, comissões, churn, top serviços e ranking de barbeiros. Decisões baseadas em dados, não no achismo.",
    accent: "from-amber-500/15 to-amber-500/0",
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: PackageIcon,
    title: "Estoque & produtos",
    desc: "Controle de produtos, alertas de baixa e venda direto no caixa com baixa automática no estoque.",
    accent: "from-orange-500/15 to-orange-500/0",
    iconBg: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: StarIcon,
    title: "Avaliações",
    desc: "Pesquisa de satisfação após cada atendimento, com histórico por barbeiro e respostas privadas pra reverter casos.",
    accent: "from-yellow-500/15 to-yellow-500/0",
    iconBg: "bg-yellow-500/10 text-yellow-600",
  },
  {
    icon: ShieldCheckIcon,
    title: "Multi-acesso seguro",
    desc: "Gestor, recepcionista e barbeiro com permissões separadas. Cada um vê só o que precisa.",
    accent: "from-slate-500/15 to-slate-500/0",
    iconBg: "bg-slate-500/10 text-slate-600",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Cadastre sua barbearia",
    desc: "Em menos de 1 minuto. Sem cartão de crédito.",
  },
  {
    n: "02",
    title: "Configure equipe e serviços",
    desc: "Adicione barbeiros, serviços, produtos e horários.",
  },
  {
    n: "03",
    title: "Compartilhe a página pública",
    desc: "Clientes agendam sozinhos. Você só atende.",
  },
];

const TESTIMONIALS = [
  {
    name: "Lucas R.",
    role: "Dono · Barbearia Norte",
    text: "Saí da planilha pro ZP Barber e em uma semana o caixa parou de divergir. A equipe pegou rápido, sem treinamento.",
  },
  {
    name: "Marina P.",
    role: "Gestora · Studio Hair",
    text: "O WhatsApp automático sozinho já paga a mensalidade. Reduzimos faltas em 40% no primeiro mês.",
  },
  {
    name: "Diego S.",
    role: "Barbeiro · Cuts House",
    text: "Vejo minha agenda, comissão e avaliações no celular. É a primeira ferramenta que realmente uso todo dia.",
  },
];

const FAQ = [
  {
    q: "Preciso de cartão de crédito pra testar?",
    a: "Não. O cadastro libera 14 dias com tudo desbloqueado. Só pedimos pagamento se você decidir continuar.",
  },
  {
    q: "Funciona no celular do barbeiro?",
    a: "Sim. É um PWA — instala como app no Android e iPhone. Cada barbeiro vê só os próprios atendimentos e comissões.",
  },
  {
    q: "Consigo migrar dados de outra ferramenta?",
    a: "Sim. Importamos clientes via CSV. Pra agenda e caixa, recomendamos começar do zero pra evitar inconsistência.",
  },
  {
    q: "E se eu quiser cancelar?",
    a: "Cancela direto no painel. Sem fidelidade, sem multa, sem ligar pra ninguém. Você exporta seus dados antes.",
  },
];

export default async function Home() {
  const user = await getCurrentUser();
  if (user) {
    if (user.profile.is_super_admin) redirect("/admin");
    redirect("/app");
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_1px_1px,var(--color-border-secondary)_1px,transparent_0)] [background-size:32px_32px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]"
      />

      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-24 max-w-6xl items-center justify-between px-6 md:h-28">
          <Link href="/" aria-label="ZP Barber" className="flex items-center">
            <Image
              src="/logo.png"
              alt="ZP Barber"
              width={400}
              height={400}
              priority
              className="h-16 w-auto object-contain md:h-20"
            />
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#recursos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Recursos</a>
            <a href="#como-funciona" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Como funciona</a>
            <a href="#depoimentos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Depoimentos</a>
            <a href="#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              <SignInIcon size={20} weight="duotone" />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
            <Link href="/auth/cadastro" className={buttonVariants({ size: "sm" })}>
              Criar conta
              <ArrowRightIcon size={20} weight="duotone" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-16 md:pt-24">
          <div className="grid gap-10 text-center">
            <div className="relative mx-auto">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-primary/30 blur-3xl"
              />
              <Image
                src="/logo.png"
                alt="ZP Barber"
                width={640}
                height={640}
                priority
                className="mx-auto h-auto w-[240px] object-contain drop-shadow-xl md:w-[320px]"
              />
            </div>
            <h1 className="mx-auto max-w-3xl text-balance text-display-md font-semibold tracking-tight md:text-display-xl">
              A gestão da sua barbearia,{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
                do agendamento ao caixa.
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-pretty text-text-lg text-muted-foreground md:text-text-xl">
              Agenda, equipe, clientes, fidelidade, WhatsApp e financeiro em um só lugar. Sem planilha, sem fricção.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/auth/cadastro" className={buttonVariants({ size: "lg" })}>
                Começar grátis por 14 dias
                <ArrowRightIcon size={20} weight="duotone" />
              </Link>
              <a href="#recursos" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Ver recursos
              </a>
            </div>
            <div className="mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircleIcon size={16} weight="duotone" className="text-emerald-600" />
                Sem cartão de crédito
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircleIcon size={16} weight="duotone" className="text-emerald-600" />
                Cancele quando quiser
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircleIcon size={16} weight="duotone" className="text-emerald-600" />
                Suporte humano por WhatsApp
              </span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur md:p-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading text-display-sm font-semibold tabular-nums tracking-tight md:text-display-md">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="recursos" className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Recursos</p>
            <h2 className="mt-3 text-balance text-display-sm font-semibold tracking-tight md:text-display-md">
              Tudo que sua barbearia precisa pra crescer.
            </h2>
            <p className="mt-4 text-text-md text-muted-foreground">
              Cada módulo conversa com os outros. Atendimento concluído vira venda, vira pontos de fidelidade, vira mensagem no WhatsApp, vira indicador no dashboard.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc, accent, iconBg }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br ${accent} blur-2xl transition-opacity group-hover:opacity-100`}
                />
                <div className="relative grid gap-3">
                  <div className={`flex size-11 items-center justify-center rounded-xl ${iconBg}`}>
                    <Icon size={24} weight="duotone" />
                  </div>
                  <h3 className="text-text-md font-semibold tracking-tight">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="border-y border-border bg-card/40">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Como funciona</p>
              <h2 className="mt-3 text-balance text-display-sm font-semibold tracking-tight md:text-display-md">
                Três passos. Menos de 5 minutos.
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.n} className="relative grid gap-3 rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-lg bg-primary/10 font-heading text-text-md font-semibold text-primary">
                      {step.n}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div aria-hidden className="hidden flex-1 border-t border-dashed border-border md:block" />
                    )}
                  </div>
                  <h3 className="text-text-md font-semibold tracking-tight">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="depoimentos" className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Depoimentos</p>
            <h2 className="mt-3 text-balance text-display-sm font-semibold tracking-tight md:text-display-md">
              Quem usa, recomenda.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="grid gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} size={16} weight="fill" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-2 grid gap-0.5 border-t border-border pt-4">
                  <span className="text-text-sm font-semibold tracking-tight">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="faq" className="border-t border-border bg-card/40">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 md:py-28">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Perguntas frequentes</p>
              <h2 className="mt-3 text-balance text-display-sm font-semibold tracking-tight md:text-display-md">
                Tem dúvida? A gente responde.
              </h2>
            </div>
            <div className="mt-12 grid gap-3">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-border bg-background px-5 py-4 transition-colors open:border-primary/30 hover:border-primary/30"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-text-md font-medium tracking-tight">
                    {item.q}
                    <ArrowRightIcon
                      size={18}
                      weight="bold"
                      className="shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-violet-500/10 p-10 md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-violet-500/20 blur-3xl"
            />
            <div className="relative grid gap-6 text-center">
              <Image
                src="/symbol.png"
                alt=""
                width={256}
                height={256}
                className="mx-auto size-32 shrink-0 object-contain drop-shadow-lg md:size-40"
              />
              <h2 className="mx-auto max-w-2xl text-balance text-display-sm font-semibold tracking-tight md:text-display-md">
                Pronto pra parar de perder tempo com planilha?
              </h2>
              <p className="mx-auto max-w-xl text-text-md text-muted-foreground">
                14 dias grátis com tudo desbloqueado. Sem cartão. Configura em minutos.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/auth/cadastro" className={buttonVariants({ size: "lg" })}>
                  Criar conta grátis
                  <ArrowRightIcon size={20} weight="duotone" />
                </Link>
                <Link href="/auth/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Já tenho conta
                </Link>
              </div>
              <div className="mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <ClockIcon size={24} weight="duotone" />
                  Setup em 5 minutos
                </span>
                <span className="inline-flex items-center gap-2">
                  <TrendUpIcon size={24} weight="duotone" />
                  ROI no primeiro mês
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheckIcon size={24} weight="duotone" />
                  Dados criptografados
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="ZP Barber"
              width={400}
              height={400}
              className="h-16 w-auto object-contain md:h-20"
            />
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} ZP Barber</span>
            <span>v0.1 · Fase 1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
