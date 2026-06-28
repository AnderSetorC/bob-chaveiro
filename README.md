# 🔑 bob-chaveiro · Landing Page Ander Leads IA

Landing page de vendas para a **Ander Leads IA** — serviço que coloca chaveiros no Google e nas redes sociais pra captar clientes 24h.

## 🎯 Sobre o projeto

Página única (one-page) focada em conversão via WhatsApp. Construída com HTML/CSS/JS puro (zero dependências, zero build), otimizada pra:

- **Google SEO** — copy com palavras-chave locais ("chaveiro perto de mim", "chaveiro 24h", "chaveiro em [cidade]")
- **Mobile-first** — 70%+ das buscas de chaveiro acontecem no celular
- **Meta Ads** — Pixel instalado + evento `Lead` em todos os CTAs WhatsApp
- **Velocidade** — < 50KB total, carrega instantaneamente em 4G

## 📦 Estrutura

```
landing-page/
├── index.html              # Página completa (HTML semântico)
├── css/
│   └── styles.css          # Dark theme + animações + responsivo
├── js/
│   └── main.js             # Ticker, contadores, chat animado, toasts
├── assets/
│   ├── img/                # Imagens da landing (chaveiro-dor.png, team-bob.png)
│   └── video/              # (vazio — pra vídeos futuros)
└── README.md
```

## 🚀 Deploy

### GitHub Pages (grátis)

1. Settings → Pages → Source: `main` / `/ (root)`
2. URL pública: `https://andersetorc.github.io/bob-chaveiro/`

### Domínio custom (anderleads.com.br)

1. Compre o domínio no registro.br (R$40/ano)
2. Em **Settings → Pages → Custom domain**, adicione `anderleads.com.br`
3. No painel do registro.br, aponte os DNS pra GitHub Pages:
   - `A` → `185.199.108.153`
   - `A` → `185.199.109.153`
   - `A` → `185.199.110.153`
   - `A` → `185.199.111.153`
   - `CNAME www` → `andersetorc.github.io`

### Vercel (alternativa mais rápida)

1. Importe o repo em [vercel.com](https://vercel.com)
2. Deploy automático a cada push
3. CDN global + HTTPS grátis

## 🛠️ Desenvolvimento local

Não precisa de build. É só servir os arquivos estáticos:

```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node (se tiver npx)
npx serve .

# Opção 3: VS Code Live Server extension
```

Abre `http://localhost:8000` no browser.

## 📊 Meta Pixel

- **Pixel ID:** `1023633669651575`
- **Eventos configurados:**
  - `PageView` — toda visita
  - `Lead` — todo clique em botão WhatsApp
- **Para otimizar campanha:** no Meta Ads Manager, selecione objetivo "Conversão → Lead"

## 💰 Pacotes

| Pacote | Preço | Inclui |
|---|---|---|
| **Pacote 1** | R$250 à vista | Landing page otimizada + SEO + hospedagem grátis + 30 dias suporte |
| **Pacote 2** | R$500 à vista | Tudo do Pacote 1 + Google Meu Negócio + Instagram e Facebook prontos pra anúncios + 06 artes pra postar + Bio digital + 1ª campanha Google Ads + 1ª campanha Meta Ads + 30 dias suporte |

Domínio `.com.br` é opcional (R$40/ano no registro.br).

## 🤖 BOB — Agente de IA

A landing foi criada e otimizada pelo **BOB**, agente que orquestra **Claude + ChatGPT + Gemini** pra produção de copy, criativos e estrutura de campanha.

## 📞 Contato

- WhatsApp: (14) 99129-1256
- Instagram: @anderleads.ia
- Site: anderleads.ia

---

© 2026 Ander Leads IA · Feito pra chaveiros que não aceitam perder cliente.