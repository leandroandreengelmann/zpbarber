SaaS de Gestão para Barbearias — Documento de Produto

Documento focado em funcionalidades, telas e regras de negócio.
A parte técnica (stack, banco, integrações) já está definida em outro documento.


SUMÁRIO

Visão geral do produto
Papéis e permissões
Painel Super Admin
Painel da Barbearia (gestor)
Painel do Barbeiro
Experiência do cliente final (web e WhatsApp)
Módulo: Agendamento
Módulo: Comanda e atendimento
Módulo: Financeiro
Módulo: Fidelidade
Módulo: WhatsApp
Módulo: Avaliações
Módulo: Relatórios
Regras de negócio gerais
Fluxos críticos do sistema


1. VISÃO GERAL DO PRODUTO
O que é
Um SaaS multi-empresas para gestão de barbearias. Modelo B2B2C: eu vendo o software para barbearias, e elas usam o sistema para atender os clientes finais delas.
Pirâmide de uso

Eu (Super Admin) — controlo a plataforma toda, vejo todas as barbearias, recebo a mensalidade delas.
Dono / Gestor da Barbearia — administra a unidade dele, paga mensalidade, atende seus clientes.
Barbeiro — funcionário/parceiro de uma barbearia. Vê só sua agenda e seus dados.
Cliente Final — corta cabelo na barbearia. Agenda, paga, ganha pontos.

Princípios de design

Mobile-first em tudo. Especialmente nos painéis do barbeiro e do cliente, que serão usados majoritariamente no celular.
Identidade visual da barbearia aplicada nos painéis dela (logo, cor primária).
Linguagem clara para usuários não-técnicos (donos de barbearia raramente são "tech").
Velocidade: telas carregam rápido, ações são imediatas.
Confirmações em ações destrutivas (cancelar agendamento, excluir cliente).
Empty states acolhedores em listas vazias, com explicação e botão de criar.


2. PAPÉIS E PERMISSÕES
Super Admin (eu)
Acesso total. Vê todas as barbearias, todos os usuários, todas as métricas. Pode entrar em qualquer barbearia em modo "impersonate" para dar suporte.
Gestor (dono da barbearia)
Acesso total dentro da própria barbearia. Vê tudo que acontece, controla finanças, configura serviços, gerencia equipe.
Recepcionista
Igual ao gestor, mas sem acesso ao financeiro (contas a pagar/receber, fluxo de caixa, comissões). Pode operar agenda, comandas, clientes.
Barbeiro
Vê apenas:

Sua própria agenda
Comandas em que está atendendo
Clientes que ele já atendeu
Sua performance e comissões
Suas avaliações
Suas folgas

Não vê dados de outros barbeiros, nem o financeiro da barbearia.
Cliente Final
Vê apenas seus próprios dados na barbearia onde se cadastrou. Se ele frequenta duas barbearias diferentes do sistema, terá dois cadastros separados.

3. PAINEL SUPER ADMIN
Acesso
Login com email + senha + 2FA obrigatório (autenticador tipo Google Authenticator ou Authy).
3.1 Dashboard global
Propósito: visão executiva da plataforma.
Cards no topo:

MRR (faturamento recorrente mensal)
ARR (anualizado)
Total de barbearias
Barbearias ativas vs inativas
Novos cadastros no mês
Taxa de churn

Gráficos:

Evolução do MRR nos últimos 12 meses (linha)
Novos cadastros vs cancelamentos por mês (barras)
Distribuição de barbearias por estado (mapa do Brasil)

Lista lateral:

Últimos eventos: nova barbearia cadastrada, pagamento atrasado, ticket aberto, cancelamento

3.2 Barbearias (listagem)
Propósito: gerenciar todas as barbearias da plataforma.
Tabela com colunas:

Nome da barbearia
Cidade/Estado
Dono (nome + email)
Plano contratado
Status (Ativa / Trial / Suspensa / Cancelada)
Data de cadastro
Último login
MRR (quanto ela paga)
Ações: ver detalhes, entrar como (impersonate), suspender, cancelar

Filtros:

Status, plano, estado, período de cadastro

Busca: por nome, CNPJ ou email.
Botão: "Cadastrar nova barbearia" (modo manual, para o início da operação).
3.3 Detalhe da barbearia
Abre quando clico em uma barbearia da lista.
Abas:

Geral: dados cadastrais, dono, plano atual, status
Pagamentos: histórico de mensalidades pagas e pendentes
Uso: agendamentos por mês, mensagens WhatsApp consumidas, barbeiros ativos
Logs: histórico de auditoria (quem fez o quê)
Equipe: lista de usuários da barbearia

Ações:

Mudar plano
Suspender / Reativar
Cancelar (com motivo)
Entrar como (impersonate) — abre o painel da barbearia em outra aba como se eu fosse o gestor

3.4 Planos
Propósito: definir os planos comerciais da plataforma.
Tabela: Nome, preço mensal, limites (nº barbeiros, mensagens WhatsApp), funcionalidades incluídas, status.
CRUD completo — criar, editar, desativar plano.
Para cada plano, configuro:

Preço mensal e anual (com desconto)
Limite de barbeiros
Limite de mensagens WhatsApp/mês
Quais funcionalidades estão liberadas (toggle):

Clube de assinatura
Programa de pontos
Cashback
Indicação
Bot WhatsApp
Múltiplas unidades (futuro)



3.5 Financeiro da plataforma
Propósito: ver quanto a plataforma fatura.
Conteúdo:

Receita mensal (atual, anterior, comparativo)
Receita anual projetada
Lista de inadimplentes (barbearias com pagamento atrasado)
Previsão de MRR para próximos 3 meses (baseado em assinaturas ativas)
Botão exportar Excel/CSV

3.6 Cobranças
Propósito: gerenciar mensalidades das barbearias.
Tabela com: Barbearia, valor, vencimento, status (paga/pendente/atrasada/cancelada), forma de pagamento.
Filtros: status, período, barbearia.
Ações:

Reenviar cobrança (link de pagamento via WhatsApp ou email)
Marcar como paga manualmente (caso de pagamento fora do sistema)
Cancelar cobrança

3.7 Comunicados
Propósito: mandar avisos para as barbearias.
Editor com:

Título
Conteúdo (rich text com imagens e links)
Destinatários: todas / por plano / barbearias específicas
Agendamento (enviar agora ou em data futura)

Histórico de comunicados enviados com taxa de visualização.
3.8 Suporte / Tickets
Propósito: atender as barbearias.
Lista de tickets com filtros (aberto, em andamento, resolvido, fechado), prioridade, categoria, barbearia.
Tela de atendimento: conversa estilo chat, anexos permitidos, possibilidade de marcar interno (não visível pra barbearia).
Métricas: tempo médio de resposta, tickets por mês, satisfação pós-atendimento.
3.9 Logs de auditoria
Propósito: rastrear o que acontece no sistema (importante para LGPD).
Tabela com: data/hora, barbearia, usuário, ação, recurso afetado, IP.
Filtros: por barbearia, usuário, ação, período.
3.10 Saúde do sistema
Propósito: monitorar a operação técnica.
Indicadores:

Status das instâncias WhatsApp por barbearia (verde = online, vermelho = offline)
Total de mensagens enviadas/recebidas hoje
Total de erros nas últimas 24h
Performance média das requisições
Uso de armazenamento

3.11 Configurações da plataforma
Propósito: ajustes globais da plataforma.
Itens:

Logo do SaaS
Email remetente das notificações
Termos de uso (versionados)
Política de privacidade
Chaves de integração (Asaas, Evolution, LLM)


4. PAINEL DA BARBEARIA (GESTOR)
Acesso
Login com email + senha. 2FA opcional.
4.1 Onboarding (primeira vez)
Propósito: levar o gestor do zero até a barbearia funcionando.
Wizard em etapas, com barra de progresso:

Dados da barbearia: nome, CNPJ (opcional), telefone, endereço completo
Identidade visual: upload do logo, escolha da cor primária (paleta com 12 opções + seletor custom)
Horário de funcionamento: tabela por dia da semana (segunda 8h-19h, etc.), com possibilidade de ter intervalo de almoço
Feriados: lista de feriados nacionais já preenchida, gestor pode adicionar/remover
Cadastro de serviços: pelo menos 1 serviço (nome, duração, preço). Sugestões automáticas (Corte masculino R$ 50, Barba R$ 35, etc.) que ele pode aceitar ou editar
Cadastro de barbeiros: pelo menos 1 barbeiro (nome, telefone, comissão padrão)
WhatsApp: QR Code para parear o número da barbearia com a Evolution API
Conta Asaas: cadastrar dados bancários para receber pagamentos online dos clientes (caso queira oferecer)
Concluído: tela de boas-vindas com tour guiado opcional

Pode pular etapas e voltar depois (exceto dados básicos da barbearia).
4.2 Dashboard
Propósito: primeira tela ao entrar, dá visão do dia.
Cards no topo (KPIs):

Faturamento de hoje (atual vs ontem)
Faturamento do mês (atual vs mês anterior)
Agendamentos hoje (total + por status)
Taxa de ocupação dos barbeiros hoje
Ticket médio
Novos clientes no mês

Gráficos:

Faturamento dos últimos 30 dias (linha)
Top 5 barbeiros do mês (barras)
Top 5 serviços mais vendidos (barras)
Distribuição de agendamentos por dia da semana (heatmap)

Próximos agendamentos do dia: lista cronológica com horário, cliente, barbeiro, serviço.
Caixa de alertas:

Estoque baixo
Clientes inativos há 30+ dias
Pagamentos pendentes
Avaliações ruins recebidas
Mensagens WhatsApp aguardando resposta humana

4.3 Agenda
Propósito: coração operacional do sistema.
Visualizações:

Dia: colunas verticais por barbeiro, linha do tempo lateral por horário (8h-22h)
Semana: grid 7 colunas (dias) x linhas (horários)
Mês: calendário tradicional com bolinhas por dia indicando volume

Filtros:

Por barbeiro (um, vários ou todos)
Por status (todos, confirmados, pendentes, etc.)

Cores por status:

Cinza: pendente
Azul: confirmado
Amarelo: em atendimento
Verde: finalizado
Vermelho: cancelado
Preto: não compareceu (no-show)

Ações:

Clicar em horário vazio → modal de novo agendamento
Clicar em agendamento existente → drawer com detalhes
Arrastar (drag-and-drop) → reagendar
Bloqueio de horário com botão "Bloquear" (almoço, folga, manutenção)

Botões de atalho:

Novo agendamento
Bloquear horário
Lista de espera

4.4 Modal Novo Agendamento
Campos:

Cliente: busca com autocomplete por nome ou telefone. Se não existir, opção "+ Cadastrar novo cliente" (mini-form inline)
Serviço(s): lista com checkboxes, mostra duração total ao final
Barbeiro: dropdown ou cartões com foto. Filtra automaticamente por quem realiza esse serviço
Data: calendário
Hora: dropdown com horários disponíveis (já considerando duração e folgas)
Observações: campo livre
Cobrar sinal?: toggle. Se sim, define valor (R$ ou %) e gera link de pagamento PIX

Botão final: "Criar agendamento"
4.5 Detalhe do Agendamento (drawer lateral)
Conteúdo:

Foto/iniciais do cliente + nome
Histórico curto: "5 atendimentos no total, último há 23 dias"
Serviço(s), barbeiro, data/hora, duração
Status atual com badge
Valor total e status do pagamento (sinal pago, em aberto, etc.)
Observações
Mini-galeria de cortes anteriores

Botões de ação (mudam conforme status):

Confirmar agendamento
Iniciar atendimento (abre comanda)
Reagendar (abre modal)
Cancelar (pede motivo)
Marcar como não compareceu
Enviar mensagem WhatsApp

4.6 Lista de espera
Propósito: quando alguém cancela, há uma fila pra ocupar o horário.
Funcionamento:

Cliente que tentou agendar e não tinha horário no dia desejado pode entrar na lista de espera
Quando alguém cancela, o sistema notifica automaticamente (via WhatsApp) o primeiro da fila
Cliente confirma e ganha o horário

Tela: lista com nome, dia/período desejado, barbeiro preferido, data de entrada na fila.
4.7 Clientes (listagem)
Propósito: gerenciar a base de clientes.
Tabela com:

Nome
Telefone
Último atendimento (X dias atrás)
Total gasto (LTV)
Frequência média
Tags (VIP, novo, sumido, etc.)
Avatar

Filtros:

Tag
Último atendimento (recentes, sumidos há 30/60/90 dias)
Faixa de valor gasto
Barbeiro favorito
Aniversariantes do mês

Busca: por nome, telefone ou email.
Ações em massa:

Aplicar tag
Enviar mensagem em lote (até 4)

Botões: Novo cliente, Importar (CSV), Exportar.
4.8 Detalhe do Cliente
Aba Geral:

Foto + dados pessoais (nome, telefone, email, data de nascimento, endereço)
Tags
Cliente desde (data)
Status no programa de fidelidade

Aba Histórico:

Linha do tempo de atendimentos (data, serviço, barbeiro, valor)
Filtro por período
Cada item clicável abre detalhe

Aba Galeria:

Fotos antes/depois dos cortes
Upload manual ou foto tirada pelo barbeiro durante o atendimento

Aba Preferências:

Barbeiro favorito
Máquina/número
Tipo de corte recorrente
Conversa que gosta (futebol, política não, etc.)
Bebida preferida (cerveja, água, café)
Alergias / observações importantes

Aba Fidelidade:

Saldo de pontos / cashback
Status no clube de assinatura (se aplicável)
Histórico de movimentações
Indicações que fez

Aba Financeiro:

LTV total
Ticket médio
Frequência média (a cada X dias)
Score de churn (probabilidade de não voltar)

Botões:

Novo agendamento para esse cliente
Enviar mensagem WhatsApp
Editar
Excluir (com confirmação dupla)

4.9 Barbeiros (listagem)
Tabela:

Nome + foto
Status (ativo / afastado / inativo)
Comissão padrão (%)
Atendimentos no mês
Faturamento do mês
Avaliação média (estrelas)

Botão: Cadastrar barbeiro.
4.10 Detalhe do Barbeiro
Aba Geral:

Foto, nome, telefone, email, CPF
Bio (texto livre que aparece na página pública)
Dados bancários (chave PIX, conta) para split de pagamento

Aba Comissões:

Comissão padrão (%)
Override por serviço (ex: corte 50%, barba 60%)
Override por produto vendido
Histórico de comissões pagas

Aba Escala:

Horário de trabalho por dia da semana
Folgas agendadas
Bloqueios pontuais

Aba Performance:

Atendimentos por mês (gráfico)
Faturamento por mês (gráfico)
Comparativo com outros barbeiros (opcional)
Avaliações recebidas
Ranking interno (se ativado)

Aba Acesso:

Email/telefone de login
Status do acesso (ativo/bloqueado)
Reenviar credenciais
Resetar senha

4.11 Serviços
Propósito: catálogo de serviços oferecidos.
Lista com:

Categoria (Cabelo, Barba, Combos, Tratamentos, etc.)
Nome, duração, preço, comissão
Foto
Status (ativo/inativo)

CRUD completo:

Nome
Categoria (CRUD separado de categorias)
Descrição (opcional, aparece no agendamento online)
Duração em minutos
Preço
Comissão padrão (%)
Foto
Quais barbeiros realizam (todos ou alguns)

4.12 Produtos / Estoque
Lista com:

Nome
Tipo (Revenda / Uso interno)
Estoque atual
Estoque mínimo
Preço de venda
Status (alerta vermelho se abaixo do mínimo)

CRUD:

Nome, descrição, código de barras
Tipo (revenda ou uso interno)
Custo, preço de venda
Estoque atual e mínimo
Foto

Sub-aba Movimentações:

Histórico de entradas (compras) e saídas (vendas, uso interno, ajustes)
Filtros por período, produto, tipo

Botão: Nova movimentação (entrada de compra, ajuste, etc.).
4.13 Caixa
Propósito: controle do dinheiro físico e digital do dia.
Status do caixa: Aberto ou Fechado.
Tela quando fechado:

Botão "Abrir caixa" → pede valor inicial em dinheiro
Histórico de caixas anteriores

Tela quando aberto:

Resumo: saldo atual, total entradas, total saídas
Detalhamento por forma de pagamento (dinheiro, PIX, cartão, crédito do cliente)
Botões: Sangria (retirada), Suprimento (adicionar troco), Fechar caixa
Lista de movimentações do dia

Fechamento de caixa:

Sistema mostra o valor esperado
Gestor digita o valor contado
Sistema calcula a diferença
Campo para justificar diferença
Confirma fechamento

4.14 Financeiro — Contas a pagar
Lista:

Descrição, fornecedor, categoria, valor, vencimento, status (aberta/paga/atrasada)

CRUD:

Descrição, valor, vencimento, fornecedor (opcional), categoria, recorrência (única, mensal, etc.), forma de pagamento prevista, anexos

4.15 Financeiro — Contas a receber
Lista:

Descrição, cliente, valor, vencimento, status (aberta/recebida/atrasada)
Maioria gerada automaticamente das comandas com pagamento parcelado ou em aberto

4.16 Financeiro — Fluxo de caixa
Visão consolidada:

Gráfico de entradas vs saídas
Saldo atual
Saldo projetado (próximos 30, 60, 90 dias)
Comparativo mês a mês
Filtro por período e categoria

4.17 Financeiro — Comissões
Tela com:

Filtro por barbeiro e período
Tabela: data, cliente, serviço/produto, valor base, % comissão, valor comissão, status do split (pago automaticamente / pendente)
Total acumulado por barbeiro
Botão exportar Excel/PDF
Botão "Pagar comissões" (se algum não foi splitado automaticamente)

4.18 Fidelidade — Configuração
Modelos disponíveis (gestor escolhe um ou combina):
A) Cartão fidelidade digital

"A cada X cortes, 1 grátis"
Configurar X e qual serviço dispara

B) Pontos

R$ 1 gasto = X pontos
Cliente troca pontos por serviços/produtos
Tabela de resgates configurável

C) Cashback

X% do valor volta como crédito
Cliente usa crédito em compras futuras

D) Níveis VIP

Bronze, Prata, Ouro, Diamante (ou customizado)
Cada nível tem benefícios: desconto fixo, prioridade na agenda, brinde de aniversário, mimos
Critério para subir: gasto acumulado, frequência

E) Indique e ganhe

Cliente compartilha link único
Quando indicado faz primeiro corte: ambos ganham (cupom, pontos, crédito)

4.19 Clube de Assinatura
Sub-tela dentro de Fidelidade.
CRUD de planos do clube:

Nome (ex: "Plano Cabelo")
Preço mensal
O que está incluso: 4 cortes, desconto em barba, etc.
Renovação automática? Sim/não
Período de carência

Lista de assinantes ativos:

Cliente, plano, status, próxima cobrança, mensagens (atrasou, vai vencer)

Métricas do clube:

Total de assinantes
MRR do clube
Churn do clube
Ticket médio do assinante vs cliente comum

4.20 Cupons
Lista:

Código, tipo (% ou valor), validade, uso (12/100), status

Criar cupom:

Código (manual ou gerar automático)
Tipo: percentual ou valor fixo
Valor
Limite de uso (total e por cliente)
Validade início/fim
Aplicável a: todos os serviços / específicos
Valor mínimo de compra
Combinável com outras promoções? Sim/não

4.21 WhatsApp — Conexão
Mostra:

Status da conexão (Conectado / Desconectado / Em pareamento)
Número conectado
Última atividade
Botão "Reconectar" → abre QR Code da Evolution API
Estatísticas: mensagens enviadas/recebidas hoje, na semana, no mês

4.22 WhatsApp — Conversas (caixa de entrada)
Layout estilo WhatsApp Web:
Coluna esquerda — lista de conversas:

Avatar + nome do cliente
Última mensagem (preview)
Horário
Badge de não lidas
Indicador de quem está atendendo (bot / aguardando humano / humano respondeu)

Filtros no topo:

Todas / Bot atendendo / Aguardando humano / Resolvidas

Coluna direita — conversa aberta:

Histórico de mensagens
Campo de resposta (com sugestões rápidas)
Anexos: foto, áudio
Botão "Marcar como resolvida"
Botão "Atribuir a outro usuário"
Sidebar com dados do cliente (clicável → abre ficha)

4.23 WhatsApp — Mensagens automáticas
Lista de gatilhos:

Confirmação de agendamento
Lembrete 24h antes
Lembrete 2h antes
Pós-atendimento (com pedido de avaliação)
Aniversário
Cliente inativo (X dias sem voltar)
Vencimento de assinatura
Cobrança de sinal

Para cada um:

Toggle ativo/inativo
Editor de texto com variáveis: {{nome}}, {{horario}}, {{barbeiro}}, {{servico}}, {{valor}}
Pré-visualização com dados de exemplo
Para "cliente inativo": configurar quantos dias

4.24 WhatsApp — Envio em lote
Propósito: comunicações pontuais para até 4 clientes.
Tela:

Selecionar destinatários (busca, filtros — máximo 4)
Escrever mensagem (com variáveis)
Pré-visualizar
Enviar

Histórico de envios em lote feitos.
4.25 Avaliações
Lista:

Estrelas (1-5)
Comentário
Cliente
Barbeiro avaliado
Data
Status: nova, vista, respondida

Filtros: período, barbeiro, nota.
Métricas no topo:

Média geral
NPS
Distribuição por estrelas
Total de avaliações

Ação: responder publicamente ou em privado.
4.26 Relatórios
Categorias:
Faturamento

Por período (dia, semana, mês, customizado)
Por barbeiro
Por serviço/categoria
Por forma de pagamento

Atendimentos

Total por barbeiro
Total por serviço
No-shows e cancelamentos
Ticket médio por barbeiro

Clientes

Novos vs recorrentes
Aniversariantes do mês
Inativos
Top clientes (LTV)

Ocupação

Taxa de ocupação por barbeiro
Taxa de ocupação por dia da semana
Taxa de ocupação por horário (heatmap)

Marketing

Origem dos agendamentos (online, WhatsApp, manual)
Performance dos cupons
ROI das indicações

Cada relatório tem botão de exportar PDF e Excel.
4.27 Configurações — Barbearia

Dados gerais (nome, CNPJ, endereço, contato)
Logo e cor primária
Horário de funcionamento
Feriados
Política de cancelamento (até X horas antes para sem custo)
Política de sinal (cobrar? quanto? em quais serviços?)
Tempo limite de tolerância de atraso do cliente

4.28 Configurações — Plano

Plano atual (nome, preço, próximo vencimento)
O que está incluso
Comparativo com outros planos
Botão "Mudar plano" (upgrade/downgrade)
Histórico de pagamentos da mensalidade
Dados de cobrança (cartão / PIX)

4.29 Configurações — Usuários

Lista de usuários do painel
Cadastrar novo (nome, email, telefone, papel: gestor ou recepcionista)
Editar permissões
Bloquear/desbloquear acesso
Resetar senha

4.30 Suporte

Botão "Abrir ticket" → form (assunto, descrição, anexos)
Lista dos meus tickets (status, última atualização)
Conversa do ticket aberto
Base de conhecimento (FAQs categorizadas, busca)
Vídeos tutoriais


5. PAINEL DO BARBEIRO

Mobile-first. Ele vai usar majoritariamente no celular.

5.1 Login
Email/telefone + senha.
5.2 Minha agenda hoje
Topo (resumo):

Saudação personalizada ("Bom dia, Bruno")
Total de atendimentos hoje
Faturamento previsto
Comissão acumulada hoje

Lista cronológica de atendimentos:

Hora
Cliente (foto + nome)
Serviço(s)
Status (próximo, em andamento, finalizado)
Botão de ação contextual (iniciar, finalizar, ver detalhe)

Indicador "Agora": linha que mostra o horário atual cruzando a agenda.
5.3 Minha agenda semana/mês
Visualização estendida pra ele se programar. Vê folgas e bloqueios.
5.4 Detalhe do atendimento
Conteúdo:

Foto e nome do cliente
Histórico resumido: "Última visita: 18 dias atrás"
Preferências: máquina 1 nas laterais, gosta de cerveja, conversa sobre futebol
Foto do último corte (se tiver)
Serviços contratados, valor, duração estimada
Observações do agendamento

Botões:

Iniciar atendimento (abre comanda)
Adicionar produto durante atendimento
Finalizar (libera caixa)
Cancelar (notifica gestor)

5.5 Comanda em atendimento
Itens da comanda em tempo real:

Serviços já incluídos
Produtos adicionados
Subtotal
Botão "Adicionar produto" (busca rápida)
Botão "Finalizar e enviar para caixa"

5.6 Meus clientes
Lista de clientes que ele já atendeu:

Foto, nome, último atendimento por ele
Busca

Detalhe limitado: sem dados financeiros gerais da barbearia. Ele vê histórico que ele atendeu, preferências, fotos.
5.7 Performance
Cards:

Faturamento hoje / semana / mês
Comissão acumulada
Atendimentos realizados
Avaliação média (estrelas)

Gráficos:

Evolução de faturamento últimos 30 dias
Atendimentos por dia da semana
Serviços mais realizados por ele

Ranking interno (se ativado pelo gestor): posição entre os barbeiros da casa.
5.8 Avaliações recebidas
Lista das avaliações de clientes que atendeu. Estrelas, comentário, cliente, data.
5.9 Solicitar folga
Form:

Tipo (folga, troca, atestado)
Período (data início/fim)
Motivo
Anexos (atestado médico, etc.)

Histórico: solicitações anteriores com status (pendente / aprovada / recusada).
5.10 Perfil

Foto, dados pessoais
Bio (aparece na página pública)
Mudar senha
Notificações: o que receber via WhatsApp (novo agendamento, cancelamento, resumo manhã)


6. EXPERIÊNCIA DO CLIENTE FINAL
O cliente tem dois caminhos para interagir: web (PWA) e WhatsApp.
6.1 Página pública da barbearia (/[slug-barbearia])
Acessada via: link direto, QR Code físico na barbearia, redes sociais.
Conteúdo:

Header com logo, nome da barbearia, foto principal
Endereço com mapa
Horário de funcionamento
Telefone/WhatsApp
"Sobre nós" (texto curto)
Galeria de fotos (interior da barbearia, cortes feitos)
Equipe: cartão de cada barbeiro com foto, nome, especialidade, avaliação
Lista de serviços com preço e duração
Avaliações reais de clientes (últimas 10, com botão "ver mais")
CTA grande: "Agendar agora"

6.2 Fluxo de agendamento online (4 passos)
Passo 1 — Serviço(s):

Lista visual com fotos
Selecionar um ou mais
Mostra duração total e valor total atualizando ao vivo

Passo 2 — Barbeiro:

Cartões com foto, nome, avaliação
Opção "Sem preferência" (sistema escolhe quem tem disponibilidade)
Filtra automaticamente quem realiza os serviços escolhidos

Passo 3 — Data e hora:

Calendário com dias indisponíveis em cinza
Ao escolher dia, mostra horários disponíveis em grid
Já considera duração total do serviço

Passo 4 — Confirmação:

Resumo (serviço, barbeiro, data, hora, valor)
Login do cliente:

Se primeira vez: telefone + OTP via WhatsApp
Se já cadastrado: telefone reconhecido, só pede OTP


Pagamento (se barbearia exige sinal):

PIX (QR Code + chave copia-cola)
Cartão de crédito
Pagar na barbearia (se a barbearia permitir)


Termos e política aceitos
Botão "Confirmar agendamento"

Pós-confirmação:

Tela de sucesso com detalhes
Botão "Adicionar ao calendário do celular"
Mensagem automática enviada via WhatsApp confirmando

6.3 Login do cliente
Método principal: telefone + OTP via WhatsApp.
Fallback: email + senha (caso WhatsApp falhe).
6.4 Meus agendamentos
Conteúdo:

Próximos agendamentos (cards com data, hora, barbeiro, serviço)
Histórico de atendimentos (lista colapsável)

Ações em cada agendamento futuro:

Reagendar (abre fluxo)
Cancelar (com confirmação, dentro da política da barbearia)

6.5 Detalhe do agendamento

Dados completos
Status do pagamento
QR Code do agendamento (apresentar na barbearia)
Botões de ação

6.6 Perfil

Foto, nome, telefone, email, data de nascimento
Preferências (informa pra barbearia: barbeiro favorito, observações)
Botão "Excluir minha conta" (LGPD)

6.7 Fidelidade

Saldo de pontos / cashback / status no clube
Visualização do progresso (barra de progresso até próxima recompensa)
Histórico de ganhos e usos
Catálogo de resgates disponíveis
Botão "Resgatar"

6.8 Cupons

Cupons disponíveis para usar
Como usar cada um
Validade

6.9 Indique e ganhe

Link de indicação único (com botão copiar)
Botões de compartilhamento (WhatsApp, copiar link)
Histórico de pessoas que indicou
Status de cada indicação (pendente, convertida)
Total ganho


7. MÓDULO: AGENDAMENTO
Origens possíveis de um agendamento

Manual pelo gestor/recepcionista (no painel)
Online pelo cliente (página pública)
Via WhatsApp (bot)
Pelo PWA do cliente

Estados do agendamento

Pendente: criado mas não confirmado (caso barbearia exija confirmação manual)
Confirmado: pronto para acontecer
Em atendimento: cliente chegou, comanda aberta
Finalizado: comanda fechada e paga
Cancelado: cancelado por cliente ou barbearia
Não compareceu: cliente não apareceu (no-show)

Política de sinal (configurável por barbearia)

Sem sinal (paga só no atendimento)
Sinal fixo em R$ (ex: R$ 10)
Sinal percentual (ex: 30% do valor)
Sinal apenas em determinados serviços
Sinal apenas para clientes novos (fidelizados não pagam)

Política de cancelamento

Configurável: até X horas antes do horário, cancelamento sem custo
Após esse limite: cliente perde o sinal
No-show: cliente perde o sinal e pode ser bloqueado para futuros agendamentos online

Anti no-show

Confirmação automática enviada 24h antes via WhatsApp ("Confirma seu horário amanhã?")
Cliente que confirmar tem prioridade
Cliente com 3 no-shows seguidos é bloqueado para agendamento online (só consegue agendando manual com a barbearia)

Lista de espera

Quando cliente não acha horário no dia desejado, pode entrar na lista
Quando alguém cancela, sistema notifica os primeiros da fila via WhatsApp
Primeiro a confirmar leva o horário


8. MÓDULO: COMANDA E ATENDIMENTO
Fluxo

Cliente chega → barbeiro/recepcionista marca "iniciar atendimento" → comanda aberta automaticamente
Durante atendimento, é possível:

Adicionar produtos vendidos (ex: pomada, óleo)
Adicionar serviços extras (ex: aplicou progressiva, escova)
Aplicar desconto
Aplicar cupom


Ao finalizar:

Sistema mostra total
Escolhe forma(s) de pagamento (pode dividir em várias)
Confirma → comanda fechada → entra no caixa do dia


Split automático ocorre se for pagamento online (Asaas)
Pontos / cashback / fidelidade são creditados automaticamente

Formas de pagamento

Dinheiro
PIX (com QR Code gerado)
Cartão crédito (presencial via maquininha; online se for sinal)
Cartão débito
Crédito do cliente (saldo de cashback ou pontos)
Voucher / cupom
Misto (combinação de várias)

Comissões

Calculadas automaticamente conforme regra do barbeiro
Override por serviço se configurado
Comissão sobre venda de produto também (configurável)


9. MÓDULO: FINANCEIRO
Componentes

Caixa diário: dinheiro físico + entradas e saídas do dia
Contas a pagar: contas, fornecedores, salários, aluguel
Contas a receber: principalmente comandas com pagamento parcelado
Fluxo de caixa: visão consolidada
Comissões: a pagar para barbeiros (split automático ou manual)

Categorização
Categorias customizáveis para entradas/saídas: aluguel, energia, salários, produtos, marketing, etc.
Recorrências
Contas recorrentes (aluguel mensal, etc.) cadastradas uma vez e geradas automaticamente.
Conciliação
Comparativo entre o que o sistema esperava receber e o que efetivamente entrou (caso de pagamento fora do sistema).

10. MÓDULO: FIDELIDADE
Objetivo
Aumentar retenção e LTV. A barbearia escolhe o modelo (ou combinação) que faz sentido pra ela.
Modelos disponíveis
A) Cartão fidelidade digital

Cliente acumula carimbos virtuais
A cada X cortes, ganha um grátis
Visível no PWA do cliente

B) Pontos

Configuração: R$ 1 = X pontos
Tabela de resgate: 100 pontos = 1 corte, 50 pontos = barba grátis, etc.
Validade dos pontos (configurável: 6 meses, 1 ano)

C) Cashback

X% do valor gasto retorna como crédito
Cliente usa em compras futuras
Validade configurável

D) Níveis VIP

Bronze, Prata, Ouro, Diamante
Subir de nível por: gasto acumulado, frequência, ou tempo de cadastro
Cada nível tem benefícios:

Bronze: nada especial
Prata: 5% desconto
Ouro: 10% desconto + bebida grátis
Diamante: 15% desconto + prioridade na agenda + brinde mensal



E) Indique e ganhe

Cliente recebe link único
Compartilha com amigos
Quando o indicado faz primeiro corte: ambos ganham (configurável: cupom, pontos, crédito)

F) Clube de assinatura (recorrência mensal)

Plano com mensalidade fixa (ex: R$ 99/mês)
Inclui benefícios (ex: 4 cortes inclusos, descontos em serviços extras)
Cobrança recorrente automática via Asaas
Pode ter múltiplos planos (Plano Cabelo, Plano Premium, etc.)

Regras gerais

Modelos não são exclusivos: pode ter pontos + cashback + níveis VIP juntos
Cliente vê seu progresso/saldo no PWA e via WhatsApp ao perguntar


11. MÓDULO: WHATSAPP
Cada barbearia tem seu próprio número

Conexão via Evolution API (instância dedicada)
Pareamento por QR Code no painel da barbearia
Mensagens entrantes e saintes passam pelo sistema

Funcionalidades
A) Bot conversacional (cliente → barbearia)

Cliente manda mensagem para o número da barbearia
Bot atende e resolve:

Saudação e menu
Agendar corte (escolhe serviço, barbeiro, dia, hora, paga sinal se aplicável)
Consultar próximos agendamentos
Cancelar agendamento
Reagendar
Falar com humano (escala para gestor)


Modelo híbrido: fluxos comuns determinísticos, IA para mensagens livres ("dá pra empurrar 30 min meu horário?")

B) Notificações automáticas (sistema → cliente)
Cada uma é configurável (template editável, liga/desliga):

Confirmação de agendamento (no momento)
Lembrete 24h antes
Lembrete 2h antes
Cobrança de sinal (com link PIX)
Pós-atendimento (com pedido de avaliação)
Aniversário (com cupom de presente)
Cliente inativo (após X dias configuráveis)
Vencimento de assinatura (3 dias antes)

C) Notificações para barbeiro/gestor
Como não tem app do barbeiro, o WhatsApp é o canal de notificação:
Para o barbeiro:

Novo agendamento na agenda dele
Cancelamento
Resumo da manhã (8h: "Hoje você tem 8 atendimentos, primeiro às 9h")
Comissão do dia (fim do expediente)

Para o gestor:

Estoque baixo
Avaliação ruim recebida (≤ 3 estrelas)
Falha em pagamento
Cliente esperando atendimento humano

D) Caixa de entrada humana

Quando bot escala, conversa aparece em "Aguardando humano" no painel
Gestor responde direto pelo painel (não precisa abrir WhatsApp Web)
Mensagens em tempo real

E) Envio em lote pequeno

Máximo 4 contatos por vez
Para comunicações pontuais (ex: "barbeiro X faltou hoje, preciso remarcar com vocês")
Delay automático entre mensagens

O que NÃO faz

Disparo em massa de marketing (não tem)
Campanhas para toda a base
SAC complexo automatizado


12. MÓDULO: AVALIAÇÕES
Coleta

Após finalizar comanda, sistema dispara mensagem WhatsApp:
"Como foi seu atendimento hoje com [barbeiro]? Avalie de 1 a 5 ⭐"
Cliente responde com número (1-5) e opcionalmente um comentário
Avaliação é registrada e ligada ao agendamento, cliente e barbeiro

Visualização

Para a barbearia: lista filtrável, NPS calculado, média geral, média por barbeiro
Para o cliente final: pode ver suas próprias avaliações
Para a página pública: mostra as 10 últimas avaliações com 4-5 estrelas

Resposta

Gestor pode responder publicamente (aparece na página pública)
Pode responder em privado via WhatsApp

Avaliação ruim

Sistema notifica gestor imediatamente quando avaliação ≤ 3 estrelas
Permite ação rápida (ligação, mensagem, oferta de compensação)


13. MÓDULO: RELATÓRIOS
Relatórios disponíveis para a barbearia
Faturamento

Por período (dia, semana, mês, trimestre, ano, customizado)
Por barbeiro
Por serviço/categoria
Por forma de pagamento
Comparativo (este mês vs mês anterior)

Atendimentos

Total por barbeiro
Total por serviço
No-shows e cancelamentos (com motivos)
Ticket médio por barbeiro

Clientes

Novos vs recorrentes (gráfico)
Aniversariantes do mês
Inativos (não voltam há X dias)
Top 20 clientes por LTV
Distribuição por tag

Ocupação

% de ocupação por barbeiro
% de ocupação por dia da semana
Heatmap por horário (quais horários enchem)
Sugestões de horários "frios" para promoções

Marketing/Captação

Origem dos agendamentos (online, WhatsApp, manual, indicação)
Performance dos cupons (uso, faturamento gerado)
ROI das indicações
Taxa de conversão da página pública

Fidelidade

Total de pontos/créditos distribuídos vs resgatados
Crescimento de assinantes do clube
Churn do clube
Comparativo: assinante vs cliente comum (frequência, ticket)

Exportação
Todos os relatórios exportáveis em PDF (formatado) e Excel/CSV.

14. REGRAS DE NEGÓCIO GERAIS
Multi-tenant rigoroso
Sob nenhuma circunstância dados de uma barbearia podem aparecer para outra. Mesmo cliente em duas barbearias = dois cadastros independentes.
LGPD

Cliente pode pedir exclusão dos dados a qualquer momento
Soft delete + anonimização após 30 dias
Logs de auditoria para tudo que envolve dados de cliente
Termos e política aceitos no cadastro, versionados

Datas e fuso

Tudo armazenado em UTC
Exibido em fuso America/Sao_Paulo
Formatos brasileiros: dd/mm/aaaa, R$ 1.234,56

Telefones

Sempre normalizados para padrão internacional (+5511999999999)
Validados antes de salvar
WhatsApp do cliente é a chave principal de identificação

Dinheiro

Armazenado em centavos (inteiro)
Nunca usar float

Segurança

2FA obrigatório para super admin
2FA opcional para gestor
Sessão expira em 30 dias com refresh
Logout automático em outros dispositivos ao trocar senha

Notificações

Cliente final recebe via WhatsApp (canal principal)
Gestor/barbeiro recebem via WhatsApp + in-app (badge)
Email apenas para coisas formais (recibos, faturas)


15. FLUXOS CRÍTICOS DO SISTEMA
Fluxo 1: Onboarding de uma nova barbearia

Eu (super admin) cadastro a barbearia no painel admin
Sistema gera credenciais e envia email para o gestor
Gestor faz primeiro login e entra no wizard de onboarding
Configura barbearia (8 etapas)
Pareia WhatsApp via QR Code
Configura conta Asaas (opcional, mas recomendado)
Sistema cobra primeira mensalidade automaticamente
Barbearia está apta para operar

Fluxo 2: Cliente novo agendando online

Cliente acessa página pública da barbearia
Clica em "Agendar agora"
Escolhe serviço(s) → barbeiro → data → hora
Faz cadastro (telefone + OTP via WhatsApp)
Paga sinal se aplicável (PIX/cartão)
Recebe confirmação via WhatsApp
24h antes: lembrete via WhatsApp (com botão de confirmar)
2h antes: lembrete via WhatsApp
Cliente chega → barbeiro inicia atendimento
Atendimento finalizado → comanda fechada → cliente paga
Sistema dispara: pedido de avaliação + crédito de pontos/cashback
Cliente entra no funil de retenção (réguas)

Fluxo 3: Agendamento via WhatsApp

Cliente manda mensagem para o número da barbearia
Bot saúda e oferece menu
Cliente escolhe "Agendar"
Bot pergunta serviço → barbeiro → dia/hora
Bot busca disponibilidade real e oferece opções
Cliente confirma
Bot envia link de pagamento PIX (se exige sinal)
Cliente paga, bot confirma o agendamento
Continua igual fluxo 2 a partir do passo 7

Fluxo 4: Atendimento na barbearia

Cliente chega na barbearia
Recepção (ou barbeiro) busca o agendamento e clica "Iniciar atendimento"
Comanda é aberta automaticamente
Durante atendimento: barbeiro adiciona produtos vendidos, observações
Ao finalizar, leva pra recepção/caixa
Recepção aplica cupom/desconto se houver
Cliente escolhe forma de pagamento
Pagamento confirmado → comanda fechada
Split automático para barbeiro (se online)
Cliente recebe comprovante via WhatsApp
Pontos/cashback creditados
30min após: pedido de avaliação via WhatsApp

Fluxo 5: Recuperação de cliente inativo

Sistema identifica cliente sem agendamento há X dias (configurável)
Régua dispara mensagem WhatsApp:
"Oi {{nome}}! Faz {{X}} dias que não te vemos. Tá precisando de um corte? Pra você voltar, tem 20% off com o cupom VOLTA20."
Sistema cria cupom único para esse cliente
Se cliente agenda nos próximos 7 dias → conversão registrada
Se não agenda → entra em fluxo seguinte (15 dias depois, oferta diferente)

Fluxo 6: Cliente com clube de assinatura

Cliente assina plano "Cabelo R$ 99/mês = 4 cortes inclusos"
Asaas cobra automaticamente todo mês
A cada agendamento, comanda já considera o plano
Se ainda tem cortes inclusos: agendamento é grátis pra ele
Se passou da quota: cobra o valor avulso (com possível desconto de assinante)
3 dias antes do vencimento: WhatsApp lembrando da renovação
Se cartão falha: régua de cobrança (5 tentativas em 7 dias)
Se não regulariza: assinatura suspende, cliente é notificado

Fluxo 7: Pagamento da plataforma

Eu cadastro plano da barbearia
Asaas cria assinatura recorrente
Todo mês, sistema cobra automaticamente
Pago: barbearia continua ativa
Atrasou 3 dias: WhatsApp + email de cobrança suave
Atrasou 7 dias: segundo aviso, mais firme
Atrasou 15 dias: barbearia suspensa (acesso bloqueado, dados preservados)
Atrasou 60 dias: cancelamento, dados em retenção LGPD
Se regulariza: reativação imediata