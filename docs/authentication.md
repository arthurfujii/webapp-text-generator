# Autenticação do webapp — documentação completa

> Documento operacional e técnico do sistema de login adicionado ao webapp.
> As senhas e o segredo de sessão **não** estão neste documento. Eles vivem apenas nos arquivos locais ignorados pelo Git e/ou no gerenciador de segredos do ambiente de deploy.
> Última atualização: 27/10/2026.

## Índice

1. [Visão geral](#1-visão-geral)
2. [Inventário de arquivos](#2-inventário-de-arquivos)
3. [Processo de implementação](#3-processo-de-implementação)
4. [Configuração de ambiente](#4-configuração-de-ambiente)
5. [Usuários e senhas](#5-usuários-e-senhas)
6. [Fluxo de login em detalhe](#6-fluxo-de-login-em-detalhe)
7. [Sessão](#7-sessão)
8. [Middleware e proteção de rotas](#8-middleware-e-proteção-de-rotas)
9. [Rate limit](#9-rate-limit)
10. [Logout](#10-logout)
11. [Interface e experiência](#11-interface-e-experiência)
12. [Operações](#12-operações)
13. [Deploy](#13-deploy)
14. [Validação e testes](#14-validação-e-testes)
15. [Troubleshooting](#15-troubleshooting)
16. [Segurança e limitações](#16-segurança-e-limitações)
17. [Checklist de produção](#17-checklist-de-produção)

## 1. Visão geral

O webapp agora exige autenticação para acessar qualquer página ou API, exceto a própria tela de login e os endpoints de autenticação.

O sistema foi desenhado para ser leve:

- sem banco de dados;
- sem dependência externa de autenticação;
- dois usuários definidos no código: `afujii` e `bchenque`;
- senhas armazenadas apenas como hash `scrypt` com salt;
- sessão stateless assinada com HMAC-SHA256 e entregue em cookie `HttpOnly`;
- proteção centralizada por `middleware.ts`;
- limite de tentativas em memória para reduzir brute force.

### Fluxo em alto nível

```text
Navegador
   |
   | GET / (sem cookie de sessão)
   v
middleware.ts  ---> redireciona para /login?next=...
   |
   | GET /login
   v
app/login/page.tsx ---> renderiza LoginForm
   |
   | POST /api/auth/login { username, password }
   v
app/api/auth/login/route.ts
   |-- verifica rate limit
   |-- busca o hash do usuário
   |-- compara a senha com scrypt + timingSafeEqual
   |-- cria token HMAC-SHA256
   `-- define cookie tap_session (HttpOnly)
   |
   | 200 { ok: true, username }
   v
LoginForm ---> window.location.replace(APP_BASE_PATH + next)
   |
   | GET / com cookie tap_session
   v
middleware.ts ---> valida assinatura e expiração
   |
   v
app/page.tsx ---> valida novamente no servidor ---> <Main currentUser="..." />
```

## 2. Inventário de arquivos

### Núcleo de autenticação

| Arquivo | Responsabilidade |
| --- | --- |
| `lib/auth/config.ts` | Lista de usuários, nome do cookie, validade da sessão, path do cookie, leitura dos hashes e do segredo, checagem de configuração. |
| `lib/auth/session.ts` | Criação e validação do token assinado com HMAC-SHA256 usando Web Crypto. |
| `lib/auth/password.ts` | Hash e verificação de senhas com `scrypt` e `timingSafeEqual`. |
| `lib/auth/rate-limit.ts` | Limite de tentativas de login em memória. |
| `lib/auth/redirect.ts` | Sanitização do parâmetro `next` para evitar open redirect. |
| `lib/auth/server.ts` | Leitura do cookie de sessão em Server Components. |
| `lib/auth/browser.ts` | Redirecionamento para o login a partir do navegador em respostas `401`. |
| `lib/auth/node-crypto.ts` | Polyfill de Web Crypto para Node 18, usado apenas em runtimes Node. |

### Rotas e middleware

| Arquivo | Responsabilidade |
| --- | --- |
| `middleware.ts` | Protege páginas e APIs, libera rotas públicas e valida o cookie de sessão. |
| `app/api/auth/login/route.ts` | Endpoint `POST /api/auth/login`. |
| `app/api/auth/logout/route.ts` | Endpoint `POST /api/auth/logout`. |

### Interface

| Arquivo | Responsabilidade |
| --- | --- |
| `app/login/page.tsx` | Server Component da tela de login; redireciona usuários já autenticados. |
| `app/login/login-form.tsx` | Formulário, estados de erro/carregamento, mostrar/ocultar senha e redirecionamento pós-login. |
| `app/components/user-menu.tsx` | Menu de conta no rodapé, com usuário atual e logout. |
| `app/page.tsx` | Valida a sessão no servidor antes de renderizar o app e passa `currentUser` para o componente principal. |
| `app/components/index.tsx` | Recebe `currentUser` e renderiza o menu de conta. |
| `service/base.ts` | Redireciona para `/login` quando uma chamada de API recebe `401` durante o uso. |
| `config/index.ts` | Expõe `APP_BASE_PATH` para montar URLs de login/logout respeitando o `basePath` do Next.js. |

### Ferramentas, configuração e documentação

| Arquivo | Responsabilidade |
| --- | --- |
| `scripts/hash-password.mjs` | Gera senha aleatória forte e hash `scrypt` para o `.env.local`. |
| `package.json` | Script `npm run auth:hash`. |
| `.env.example` | Placeholders das variáveis de autenticação. |
| `.env.local` | Segredos e hashes reais (local, ignorado pelo Git, modo `600`). |
| `AUTH_CREDENTIALS.local.txt` | Senhas em texto puro para entrega inicial (local, ignorado pelo Git, modo `600`). |
| `.gitignore` | Impede versionamento de `.env`, `.env.local` e `AUTH_CREDENTIALS.local.txt`. |
| `.dockerignore` | Impede que credenciais locais entrem na imagem Docker. |
| `README.md` | Resumo de configuração e link para este documento. |

## 3. Processo de implementação

O trabalho foi executado nesta ordem:

1. **Levantamento da stack e do app existente**
   - Next.js 14 com App Router, React 19 e TypeScript.
   - APIs internas em `app/api/*`.
   - Design system Tapítise e classes de estilo reutilizáveis.
   - Nenhum sistema de autenticação existente.

2. **Definição da abordagem**
   - Autenticação local, sem banco e sem provedor externo.
   - Usuários e hashes carregados de variáveis de ambiente.
   - Sessão stateless com token assinado por HMAC, evitando armazenar sessões no servidor.
   - Middleware como ponto único de proteção.
   - Página de login no mesmo padrão visual do restante do produto.

3. **Geração das credenciais**
   - Duas senhas aleatórias fortes, uma para cada usuário.
   - Hash `scrypt` com salt individual para cada senha.
   - Segredo de sessão aleatório.
   - Senhas gravadas apenas no arquivo local de credenciais; hashes e segredo em `.env.local`.
   - Nenhuma senha foi incluída no código, no Git ou neste documento.

4. **Implementação do núcleo**
   - Hash/verificação de senha.
   - Criação/validação de token.
   - Configuração dos usuários e do cookie.
   - Rate limit.
   - Sanitização de redirecionamento.

5. **Implementação das rotas e do middleware**
   - Endpoint de login.
   - Endpoint de logout.
   - Proteção de páginas e APIs.
   - Preservação do caminho original em `next`.

6. **Integração com a interface**
   - Tela de login.
   - Bloqueio de usuários já autenticados na tela de login.
   - Menu de conta/logout no rodapé.
   - Redirecionamento automático em `401` de APIs durante o uso.

7. **Endurecimento e empacotamento**
   - Polyfill de Web Crypto para Node 18.
   - `.dockerignore` para não transportar segredos para imagens.
   - `.gitignore` para os arquivos locais de credenciais.
   - Atualização de README e `.env.example`.

8. **Validação**
   - ESLint nos arquivos alterados.
   - `tsc --noEmit`.
   - `npm run build`.
   - Testes HTTP de login, logout, proteção de API, redirecionamento, rate limit e assets públicos.

## 4. Configuração de ambiente

### 4.1 Variáveis obrigatórias

```bash
AUTH_USER_AFUJII_HASH=
AUTH_USER_BCHENQUE_HASH=
AUTH_SESSION_SECRET=
```

| Variável | Conteúdo | Observação |
| --- | --- | --- |
| `AUTH_USER_AFUJII_HASH` | Hash `scrypt` da senha de `afujii`. | Nunca colocar a senha em texto puro. |
| `AUTH_USER_BCHENQUE_HASH` | Hash `scrypt` da senha de `bchenque`. | Nunca colocar a senha em texto puro. |
| `AUTH_SESSION_SECRET` | Segredo aleatório com pelo menos 32 caracteres. | O valor em uso tem 96 caracteres hexadecimais. |

### 4.2 Onde ficam

Em desenvolvimento local:

- `.env.local` — hashes e segredo de sessão;
- `AUTH_CREDENTIALS.local.txt` — senhas em texto puro para entrega inicial.

Ambos são ignorados pelo Git e estão com permissão `600` (somente o dono lê e escreve).

O `.env` existente continua com as variáveis públicas do Dify. O Next.js carrega `.env.local` com precedência sobre `.env`.

Em produção, as variáveis devem ser configuradas no provedor (Vercel, EdgeOne, Docker etc.), nunca em arquivo versionado.

### 4.3 Formato do hash

```text
scrypt:<N>:<r>:<p>:<salt_base64url>:<hash_base64url>
```

Valores usados:

```text
N = 16384
r = 8
p = 1
salt = 16 bytes aleatórios
hash = 64 bytes
```

O formato usa `:` em vez de `$` porque o Next.js expande variáveis com `$` ao carregar arquivos `.env`, o que poderia corromper o hash.

### 4.4 Geração do segredo de sessão

```bash
openssl rand -hex 48
```

O resultado tem 96 caracteres hexadecimais (48 bytes / 384 bits).

## 5. Usuários e senhas

### 5.1 Usuários

| Usuário | Variável de hash |
| --- | --- |
| `afujii` | `AUTH_USER_AFUJII_HASH` |
| `bchenque` | `AUTH_USER_BCHENQUE_HASH` |

A lista fica em `lib/auth/config.ts`:

```ts
export const AUTH_USERS = ['afujii', 'bchenque'] as const
```

### 5.2 Senhas

- Cada senha foi gerada com 24 bytes aleatórios em base64url (32 caracteres / 192 bits de entropia).
- As senhas não aparecem no código, no Git, no README, neste documento ou no histórico do chat.
- Elas estão em `AUTH_CREDENTIALS.local.txt`.
- Após copiar para um gerenciador de senhas, o arquivo local deve ser apagado.

### 5.3 Como gerar uma nova senha/hash

```bash
npm run auth:hash
```

O comando:

1. gera uma senha aleatória forte;
2. calcula o hash `scrypt`;
3. imprime a senha gerada e o hash.

Para usar uma senha específica:

```bash
npm run auth:hash -- 'sua-senha-forte'
```

Nesse caso, o script imprime apenas o hash, para não ecoar a senha.

Depois:

1. copie o hash para a variável `AUTH_USER_<NOME>_HASH` no `.env.local` ou no provedor;
2. reinicie a aplicação;
3. guarde a senha no gerenciador de senhas.

## 6. Fluxo de login em detalhe

### 6.1 Acesso inicial

1. O navegador solicita uma página, por exemplo `/`.
2. O `middleware.ts` procura o cookie `tap_session`.
3. Se o cookie não existir, for inválido ou estiver expirado:
   - páginas são redirecionadas para `/login?next=<caminho-original>`;
   - APIs retornam `401` com JSON.
4. A tela `/login` é renderizada.

### 6.2 Envio do formulário

O formulário envia:

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "afujii",
  "password": "..."
}
```

A URL respeita `NEXT_PUBLIC_APP_BASE_URL_PATH` por meio de `APP_BASE_PATH`.

### 6.3 Validações no endpoint

`app/api/auth/login/route.ts` executa, nesta ordem:

1. Verifica se a autenticação está configurada (`AUTH_SESSION_SECRET` + hashes dos dois usuários).
   - Se não estiver: `503`.
2. Consulta o rate limit do cliente.
   - Se bloqueado: `429` com `Retry-After`.
3. Lê e valida o corpo JSON.
4. Normaliza o usuário (`trim` + `toLowerCase`).
5. Rejeita usuário/senha vazios ou acima de 64/256 caracteres.
6. Se o usuário não existe:
   - executa um `scrypt` descartável para manter o tempo de resposta parecido;
   - registra falha;
   - retorna `401` genérico.
7. Se o usuário existe:
   - busca o hash no ambiente;
   - compara a senha com `scrypt` e `timingSafeEqual`;
   - em caso de erro, registra falha e retorna `401` genérico.
8. Em caso de sucesso:
   - limpa o contador de falhas;
   - cria o token de sessão;
   - define o cookie `tap_session`;
   - retorna `200 { "ok": true, "username": "..." }`.

### 6.4 Respostas do endpoint

| Status | Situação | Corpo |
| --- | --- | --- |
| `200` | Login válido | `{ "ok": true, "username": "..." }` |
| `400` | JSON inválido | mensagem genérica |
| `401` | Credenciais inválidas ou campos inválidos | `Invalid username or password.` |
| `429` | Muitas tentativas | `Too many attempts. Please try again later.` |
| `503` | Autenticação não configurada | mensagem de configuração |
| `500` | Erro inesperado | mensagem genérica |

Todas as respostas usam `Cache-Control: no-store`.

### 6.5 Pós-login no navegador

Após `200`, o formulário executa:

```ts
window.location.replace(`${APP_BASE_PATH}${nextPath}`)
```

- `nextPath` foi sanitizado no servidor.
- O `replace` evita voltar para a tela de login no histórico.
- A navegação completa garante que o cookie seja enviado e o middleware valide a sessão.

## 7. Sessão

### 7.1 Formato do token

O cookie `tap_session` contém:

```text
<base64url(payload)>.<base64url(assinatura)>
```

Payload:

```json
{
  "sub": "afujii",
  "iat": 1710000000000,
  "exp": 1710604800000
}
```

- `sub`: usuário autenticado.
- `iat`: emissão em milissegundos.
- `exp`: expiração em milissegundos.

A assinatura é HMAC-SHA256 sobre o payload codificado, usando `AUTH_SESSION_SECRET`.

### 7.2 Validação

`verifySessionToken`:

1. verifica se o segredo tem pelo menos 32 caracteres;
2. limita o token a 2048 caracteres;
3. exige exatamente duas partes separadas por `.`;
4. valida a assinatura com `crypto.subtle.verify`;
5. decodifica o payload e valida:
   - `sub` é um usuário conhecido;
   - o hash do usuário ainda existe na configuração;
   - `exp` ainda não passou;
   - `iat` não está mais de 60 segundos no futuro;
6. retorna o usuário ou `null`.

A verificação da assinatura acontece antes de interpretar o payload.

### 7.3 Cookie

| Atributo | Valor |
| --- | --- |
| Nome | `tap_session` |
| `HttpOnly` | sim |
| `SameSite` | `Lax` |
| `Secure` | sim em produção |
| `Path` | base path do app, ou `/` |
| `Max-Age` | 604800 segundos (7 dias) |

O token não é acessível por JavaScript no navegador.

### 7.4 Expiração e revogação

- A sessão expira em 7 dias.
- Não há tabela de sessões; a validade é criptográfica.
- Trocar `AUTH_SESSION_SECRET` invalida **todas** as sessões imediatamente.
- Remover o hash de um usuário invalida as sessões desse usuário.
- Trocar a senha de um usuário **não** invalida sessões já emitidas; para isso, rotacione o segredo ou remova o hash temporariamente.

## 8. Middleware e proteção de rotas

### 8.1 Rotas públicas

```text
/login
/api/auth/login
/api/auth/logout
```

Além disso, assets estáticos (`_next/`, imagens, CSS, JS, fontes etc.) não passam pelo bloqueio.

### 8.2 Comportamento por tipo de rota

| Situação | Resposta |
| --- | --- |
| Página sem sessão | `307` para `/login?next=...` |
| API sem sessão | `401` com `{ "message": "Authentication required." }` |
| `/login` com sessão válida | redireciona para `/` |
| `/login` sem sessão | renderiza normalmente |
| Rota pública de auth | segue para o handler |
| Asset estático | segue sem autenticação |

### 8.3 Parâmetro `next`

O middleware preserva o caminho e a query string originais:

```text
/relatorios?mes=10  ->  /login?next=%2Frelatorios%3Fmes%3D10
```

O servidor sanitiza o valor antes de entregá-lo ao formulário:

- deve começar com `/`;
- não pode começar com `//`;
- não pode conter `\`;
- não pode apontar para `/login` ou `/api/`;
- comprimento máximo de 2048 caracteres.

Assim, o parâmetro não pode ser usado como open redirect.

### 8.4 `basePath`

O app suporta `NEXT_PUBLIC_APP_BASE_URL_PATH`:

- o cookie usa o base path como `Path`;
- o formulário monta URLs com `APP_BASE_PATH`;
- o middleware usa `request.nextUrl.clone()`, que preserva o base path no redirecionamento;
- o `next` é armazenado sem o base path e remontado no navegador.

### 8.5 Defesa em profundidade

Além do middleware:

- `app/page.tsx` valida a sessão novamente antes de renderizar;
- `app/login/page.tsx` redireciona usuários autenticados para `/`;
- APIs internas retornam `401` quando chamadas sem sessão.

## 9. Rate limit

Implementação em `lib/auth/rate-limit.ts`.

| Item | Valor |
| --- | --- |
| Janela | 10 minutos |
| Máximo de falhas | 10 por cliente |
| Escopo | memória do processo |
| Resposta ao exceder | `429 Too Many Requests` |
| Header | `Retry-After` em segundos |

- Falhas de senha, usuário inexistente, corpo inválido e campos inválidos contam.
- Um login bem-sucedido limpa o contador do cliente.
- O identificador é `request.ip` quando disponível; caso contrário, o primeiro IP de `x-forwarded-for`; caso contrário, `unknown`.
- O mapa é podado quando chega a 10.000 entradas.

Limitações:

- não é distribuído; cada instância tem seu próprio contador;
- em serverless, o contador pode ser reiniciado a cada cold start;
- é uma camada adicional, não a única proteção.

## 10. Logout

### 10.1 Endpoint

```http
POST /api/auth/logout
```

O handler:

1. responde `200 { "ok": true }`;
2. define `tap_session` com `Max-Age=0` e valor vazio;
3. usa `Cache-Control: no-store`.

O endpoint é público para permitir limpar um cookie inválido/expirado.

### 10.2 Interface

O menu de conta fica no rodapé do painel esquerdo e mostra:

- iniciais do usuário;
- nome do usuário;
- item “Sign out”.

Ao sair:

1. o navegador chama `POST /api/auth/logout`;
2. se a resposta for bem-sucedida, usa `window.location.replace('/login')`;
3. se falhar, o menu mostra “Could not sign out. Try again.”.

### 10.3 Expiração durante o uso

Se uma API interna retornar `401`, `service/base.ts` executa `redirectToLogin()` e o usuário volta ao login com `next` preservado.

## 11. Interface e experiência

### 11.1 Tela de login

- layout dividido no desktop: painel de marca em verde-floresta e formulário em creme;
- no mobile, painel de marca compacto no topo;
- campos com labels, autocomplete e suporte a gerenciadores de senha;
- botão de mostrar/ocultar senha com `aria-label` e `aria-pressed`;
- estados de carregamento, erro e configuração ausente;
- mensagens de erro genéricas para não revelar se o usuário existe;
- foco visível em âmbar, seguindo o design system;
- textos em inglês para consistência com o restante do app.

### 11.2 Menu de conta

- exibe o usuário autenticado;
- abre para cima, a partir do rodapé;
- permite logout;
- mostra erro se o logout falhar.

### 11.3 Redirecionamentos

- login bem-sucedido: `replace` para o destino original;
- logout: `replace` para `/login`;
- sessão expirada em chamada de API: `replace` para `/login?next=...`.

O uso de `replace` evita que o botão “voltar” retorne a uma tela autenticada após o logout.

## 12. Operações

### 12.1 Adicionar um usuário

1. Adicionar o usuário em `AUTH_USERS` em `lib/auth/config.ts`.
2. Adicionar o `case` correspondente em `getPasswordHash`.
3. Criar a variável `AUTH_USER_<NOME>_HASH`.
4. Gerar o hash com `npm run auth:hash`.
5. Configurar a variável no `.env.local` ou no provedor.
6. Reiniciar a aplicação.
7. Testar login e logout.

> O sistema atual é intencionalmente fechado para dois usuários. Para uma lista dinâmica, seria necessário mover a configuração para um formato como JSON em variável de ambiente.

### 12.2 Remover um usuário

1. Remover o usuário de `AUTH_USERS`.
2. Remover o `case` de `getPasswordHash`.
3. Remover a variável de ambiente.
4. Reiniciar.
5. Opcionalmente, rotacionar `AUTH_SESSION_SECRET` para invalidar qualquer token antigo.

### 12.3 Trocar a senha de um usuário

1. Gerar o novo hash:

   ```bash
   npm run auth:hash
   ```

2. Substituir o valor de `AUTH_USER_<NOME>_HASH`.
3. Reiniciar.
4. Testar o login.
5. Se quiser invalidar sessões antigas, rotacionar o segredo de sessão.

### 12.4 Rotacionar o segredo de sessão

1. Gerar um novo segredo:

   ```bash
   openssl rand -hex 48
   ```

2. Atualizar `AUTH_SESSION_SECRET`.
3. Reiniciar.
4. Todos os usuários precisarão fazer login novamente.

### 12.5 Recuperar acesso

Se as senhas forem perdidas:

1. gerar novos hashes com `npm run auth:hash`;
2. atualizar as variáveis;
3. reiniciar;
4. guardar as novas senhas no gerenciador.

Se o arquivo de credenciais for apagado, os hashes continuam funcionando; as senhas não podem ser recuperadas a partir deles.

### 12.6 Backup

Guardar em local seguro:

- hashes (`AUTH_USER_*`) e segredo (`AUTH_SESSION_SECRET`) no cofre de segredos do ambiente;
- senhas em texto puro apenas no gerenciador de senhas;
- nunca no Git, em prints, em issues ou em chats.

## 13. Deploy

### 13.1 Desenvolvimento local

```bash
npm run dev
```

Acessar:

```text
http://localhost:3000/login
```

O Next.js carrega `.env.local` automaticamente.

### 13.2 Vercel / EdgeOne / similares

Configurar as três variáveis `AUTH_*` no painel do provedor. O endpoint de login usa runtime Node.js por causa do `scrypt`; o middleware usa Edge Runtime e Web Crypto.

Após configurar:

1. fazer deploy;
2. abrir `/login`;
3. testar os dois usuários;
4. testar logout;
5. verificar que uma API sem sessão retorna `401`.

### 13.3 Docker

O `.dockerignore` exclui:

```text
node_modules
.next
.git
.env*.local
AUTH_CREDENTIALS.local.txt
npm-debug.log*
yarn-error.log*
.DS_Store
```

O `.env` pode continuar no contexto para as variáveis `NEXT_PUBLIC_*` de build, mas **não** deve conter segredos de autenticação. Em runtime, injetar:

```bash
docker run \
  -e AUTH_SESSION_SECRET='...' \
  -e AUTH_USER_AFUJII_HASH='scrypt:...' \
  -e AUTH_USER_BCHENQUE_HASH='scrypt:...' \
  -p 3000:3000 \
  sua-imagem
```

Não colocar os segredos em `Dockerfile`, `ARG` ou camadas da imagem.

### 13.4 HTTPS

O cookie usa `Secure` em produção. O acesso deve ser via HTTPS; caso contrário, o navegador pode não enviar o cookie e o login não persistirá.

### 13.5 Autenticação não configurada

Se `AUTH_SESSION_SECRET` ou algum hash estiver ausente:

- `POST /api/auth/login` retorna `503`;
- a tela de login mostra um aviso e desabilita o botão;
- o restante do app permanece inacessível.

## 14. Validação e testes

### 14.1 Comandos executados

```bash
npx eslint middleware.ts lib/auth app/login app/api/auth \
  app/components/user-menu.tsx app/page.tsx service/base.ts \
  config/index.ts scripts/hash-password.mjs

npx tsc --noEmit
npm run build
```

Resultado: todos passaram.

### 14.2 Matriz de testes HTTP executada

| Cenário | Resultado esperado | Resultado |
| --- | --- | --- |
| `GET /` sem cookie | redirecionar para `/login` | OK |
| `GET /pagina?x=1` sem cookie | redirecionar com `next=/pagina?x=1` | OK |
| `GET /login` | renderizar formulário | OK |
| `GET /api/parameters` sem cookie | `401` JSON | OK |
| Login com senha errada | `401` genérico | OK |
| Login `afujii` com senha correta | `200` + cookie | OK |
| Login `bchenque` com senha correta | `200` + cookie | OK |
| `GET /` com cookie válido | `200` + app | OK |
| `GET /login` com cookie válido | redirecionar para `/` | OK |
| `POST /api/auth/logout` | `200` + `Max-Age=0` | OK |
| 11 falhas seguidas do mesmo IP | `429` | OK |
| `GET /icon.svg` | `200` sem sessão | OK |
| `GET /login?next=//evil.example` | página abre sem open redirect | OK |
| `npm run build` | build de produção | OK |

### 14.3 Teste manual rápido

1. Abrir `/login`.
2. Entrar com `afujii`.
3. Confirmar que o app abre e o usuário aparece no rodapé.
4. Recarregar a página; a sessão deve persistir.
5. Abrir `/login`; deve redirecionar para `/`.
6. Sair pelo menu de conta.
7. Tentar abrir `/`; deve voltar ao login.
8. Repetir com `bchenque`.

## 15. Troubleshooting

| Sintoma | Causa provável | Ação |
| --- | --- | --- |
| Login sempre volta para `/login` | Cookie `Secure` em HTTP; segredo diferente entre processos; base path incorreto | Usar HTTPS; conferir `AUTH_SESSION_SECRET`; conferir `NEXT_PUBLIC_APP_BASE_URL_PATH`. |
| `503` no login | Variável `AUTH_*` ausente | Configurar os três valores e reiniciar. |
| Usuário válido recebe `401` | Hash incorreto, formato antigo com `$`, ou senha digitada errada | Regerar com `npm run auth:hash`; conferir se o hash está no `.env.local` correto. |
| `429` inesperado | 10 falhas na janela de 10 minutos | Aguardar a janela ou reiniciar o processo em desenvolvimento. |
| App abre, mas APIs retornam `401` | Cookie não enviado ou sessão expirada | Recarregar; verificar `Path` do cookie e base path; fazer login novamente. |
| Página mostra “Sign-in is not configured” | Variáveis não carregadas no runtime | Conferir `.env.local` local ou env do provedor; reiniciar. |
| `crypto is not defined` em Node 18 | Web Crypto não global no Node 18 | O polyfill `lib/auth/node-crypto.ts` deve estar importado nas rotas Node; conferir imports. |
| Hash corrompido no `.env` | Formato com `$` interpretado pelo Next | Usar o formato com `:` gerado por `npm run auth:hash`. |
| Docker pede login mas não autentica | `AUTH_*` não injetado em runtime | Passar as variáveis com `-e` ou no orquestrador. |
| Logout não limpa a sessão | `Path` do cookie diferente do path usado no logout | Conferir `NEXT_PUBLIC_APP_BASE_URL_PATH`; ambos usam `AUTH_COOKIE_PATH`. |

## 16. Segurança e limitações

### 16.1 Proteções presentes

- senhas com hash `scrypt` e salt individual;
- comparação em tempo constante;
- mensagens de erro genéricas;
- verificação de assinatura antes de interpretar o payload;
- cookie `HttpOnly`, `SameSite=Lax` e `Secure` em produção;
- CSRF de login mitigado por `SameSite` e por API JSON same-origin;
- rate limit por IP;
- token com expiração;
- sanitização de `next`;
- segredos fora do Git e da imagem Docker;
- validação de sessão no middleware e no Server Component principal.

### 16.2 Limitações conhecidas

- não há MFA;
- não há banco de usuários nem painel administrativo;
- não há auditoria de tentativas de login;
- não há revogação individual de sessão sem remover o usuário ou rotacionar o segredo;
- o rate limit é local ao processo, não distribuído;
- a sessão é stateless: qualquer portador do cookie é autenticado até a expiração;
- não há recuperação de senha self-service.

### 16.3 Recomendações futuras

Se o produto crescer:

- mover usuários para banco ou provedor de identidade;
- adicionar MFA;
- adicionar registro de auditoria;
- adicionar revogação de sessão por usuário (por exemplo, versão do hash no token);
- substituir o rate limit em memória por Redis/Upstash;
- adicionar política de senha e rotação periódica;
- adicionar testes automatizados de autenticação no CI.

## 17. Checklist de produção

- [ ] `AUTH_USER_AFUJII_HASH` configurado no runtime.
- [ ] `AUTH_USER_BCHENQUE_HASH` configurado no runtime.
- [ ] `AUTH_SESSION_SECRET` configurado com pelo menos 32 caracteres.
- [ ] `.env.local` e `AUTH_CREDENTIALS.local.txt` fora do Git e da imagem Docker.
- [ ] Senhas guardadas no gerenciador de senhas.
- [ ] Arquivo local de credenciais apagado após a entrega.
- [ ] HTTPS habilitado.
- [ ] Login e logout testados com os dois usuários.
- [ ] API sem sessão retorna `401`.
- [ ] Redirecionamento para `/login` funcionando.
- [ ] Rate limit validado.
- [ ] `npm run build` passando no pipeline.
