# 🔄 Instruções de Atualização - LawyerHero Template

## 📋 **FLUXO COMPLETO DE ATUALIZAÇÃO E PUBLICAÇÃO**

### 🎯 **Quando Atualizar**

- Correções de bugs ou melhorias de código
- Atualizações de dependências (Next.js, React, etc.)
- Novos recursos ou funcionalidades
- Atualizações de conformidade ética/legal
- Melhorias de performance ou SEO

---

## 🛠️ **1. DESENVOLVIMENTO E TESTES**

### ✅ **Preparação do Ambiente**

```bash
# Instalar dependências
npm install

# Verificar se tudo está funcionando
npm run dev
```

### ✅ **Fazer Alterações**

1. **Editar código fonte** em `src/`
2. **Atualizar configurações** em `src/config/lawyer.ts` se necessário
3. **Testar localmente** com `npm run dev`
4. **Verificar qualidade** do código:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

### ✅ **Testes de Qualidade**

```bash
# Verificar ESLint (zero warnings)
npm run lint

# Verificar TypeScript (zero errors)
npm run type-check

# Testar build production
npm run build

# Testar static export (para Envato)
STATIC_EXPORT=true NODE_ENV=production npm run build
```

---

## 📚 **2. ATUALIZAR DOCUMENTAÇÃO**

### ✅ **Documentação HTML**

```bash
# Editar documentação principal
code documentation/index.html
```

**Pontos importantes:**

- Manter idioma em **inglês**
- Atualizar capturas de tela se necessário
- Verificar links e referências
- Manter seção de conformidade ética atualizada

### ✅ **README.txt**

```bash
# Atualizar README para compradores
code README.txt
```

**Verificar:**

- Versão do Node.js requerida
- Instruções de instalação
- Novos recursos adicionados
- Seção de conformidade legal

---

## 📦 **3. GERAR PACOTE ENVATO**

### ✅ **Script Automático**

```bash
# Gerar pacote completo
npm run prepare-envato
```

**Este comando:**

- Limpa pasta envato-package anterior
- Faz build production com static export
- Copia demo/ (site estático)
- Copia documentation/ (guia HTML)
- Copia template/ (código fonte)
- Cria README.txt e INSTALL.txt

### ✅ **Verificar Estrutura**

```bash
# Verificar se estrutura está correta
ls -la envato-package/
```

**Estrutura esperada:**

```
envato-package/
├── demo/              # Site compilado
├── documentation/     # Guia HTML
├── template/          # Código fonte
├── README.txt         # Documentação principal
├── LICENSE.txt        # Licença MIT
└── INSTALL.txt        # Instalação rápida
```

### ✅ **Testar Demo**

```bash
# Testar se demo funciona
cd envato-package/demo
python3 -m http.server 8080

# Abrir http://localhost:8080 no navegador
# Verificar se todas as páginas funcionam
```

---

## 🗂️ **4. CRIAR ZIP PARA UPLOAD**

### ✅ **Gerar ZIP**

```bash
# Voltar para diretório raiz
cd ../../

# Criar ZIP para Envato
cd envato-package
zip -r ../LawyerHero-Template-Envato-v[VERSAO].zip . -x "*.DS_Store" "*.git*" "*~" "*.tmp"
cd ..

# Verificar tamanho do arquivo
ls -lh LawyerHero-Template-Envato-v*.zip
```

### ✅ **Validação Final**

- **Tamanho**: Deve ser ~10-15MB
- **Estrutura**: demo/, documentation/, template/
- **Funcionalidade**: Demo deve abrir no navegador
- **Qualidade**: Sem arquivos temporários ou lixo

---

## 💾 **5. COMMIT E VERSIONAMENTO**

### ✅ **Commit das Alterações**

```bash
# Adicionar arquivos importantes
git add .
git add documentation/
git add scripts/prepare-envato.js
git add README.txt
git add LICENSE.txt
git add UPDATE_INSTRUCTIONS.md
git add ENVATO_SUBMISSION_CHECKLIST.md

# Fazer commit
git commit -m "feat: versão X.X.X - [descrição das mudanças]

- Adiciona/corrige: [lista de mudanças]
- Atualiza documentação
- Melhora conformidade ética
- Otimiza performance"

# Criar tag de versão
git tag -a v1.1.0 -m "LawyerHero Template v1.1.0"

# Push para repositório
git push origin main
git push origin v1.1.0
```

### ✅ **O QUE COMITAR**

#### 📁 **Arquivos ESSENCIAIS** (sempre comitar):

```
✅ src/                           # Todo código fonte
✅ public/                        # Assets públicos
✅ documentation/index.html       # Documentação principal
✅ scripts/prepare-envato.js      # Script de build
✅ package.json                   # Dependências
✅ package-lock.json              # Lock de dependências
✅ next.config.js                 # Configuração Next.js
✅ tailwind.config.ts             # Configuração Tailwind
✅ tsconfig.json                  # Configuração TypeScript
✅ README.md                      # README desenvolvimento
✅ README.txt                     # README compradores
✅ LICENSE.txt                    # Licença MIT
✅ .gitignore                     # Ignore patterns
✅ env.example                    # Exemplo de environment
✅ UPDATE_INSTRUCTIONS.md         # Este arquivo
✅ ENVATO_SUBMISSION_CHECKLIST.md # Checklist submissão
```

#### ❌ **Arquivos NÃO COMITAR** (temporários):

```
❌ node_modules/                  # Dependências npm
❌ .next/                         # Build Next.js
❌ out/                           # Export estático
❌ envato-package/                # Pacote gerado
❌ *.zip                          # ZIPs de upload
❌ .env*                          # Variáveis ambiente
❌ documentation/index copy.html  # Backups automáticos
```

---

## 🚀 **6. UPLOAD PARA ENVATO**

### ✅ **Informações da Submissão**

#### 📝 **Dados Básicos**

- **Nome**: LawyerHero - Professional Ethics-Compliant Lawyer Template
- **Categoria**: Site Templates > Specialty Pages > Landing Pages
- **Preço**: $55-$75 (premium justificado)
- **Versão**: X.X.X

#### 🏷️ **Tags Recomendadas**

```
lawyer, attorney, legal, law-firm, nextjs, typescript,
tailwind, responsive, professional, ethics, compliance,
seo, accessibility, modern, react, landing-page
```

#### 📖 **Descrição Curta**

```
Professional lawyer template with certified legal advertising compliance.
Built with Next.js 15, TypeScript, and advanced SEO optimization.
```

#### 📖 **Descrição Completa**

```markdown
🏛️ LawyerHero - Professional Ethics-Compliant Lawyer Template

The ONLY lawyer template with certified legal advertising compliance!
Built with Next.js 15, TypeScript, and comprehensive SEO optimization.

🔥 UNIQUE FEATURES:
✅ Ethics-compliant design (OAB, ABA, SRA compliant)
✅ Advanced SEO with Schema.org structured data
✅ Next.js 15 + TypeScript + Tailwind CSS
✅ 95+ Lighthouse performance score
✅ WCAG 2.1 AA accessibility certified
✅ Professional legal documentation included
✅ Dark/light mode with system detection
✅ Contact forms with EmailJS integration
✅ Error boundaries and performance monitoring
✅ Mobile-first responsive design

⚖️ LEGAL COMPLIANCE:
• No misleading claims or guarantees
• Professional, informational language
• Legal disclaimers included
• Bar association guidelines followed
• International compliance documentation

⚡ TECH STACK:
• Next.js 15 with App Router and Server Components
• React 19 with TypeScript strict mode
• Tailwind CSS 3.4 with custom design system
• Framer Motion 12 for smooth animations
• Advanced SEO with structured data
• Performance optimization with Web Vitals tracking

📁 WHAT'S INCLUDED:
• Complete source code with TypeScript
• Professional HTML documentation
• Legal compliance guide
• Installation and customization instructions
• 4 preview images + thumbnail
• Demo site (static HTML)
• Email integration setup guide

🚀 PERFECT FOR:
• Individual lawyers and attorneys
• Law firms and legal practices
• Legal consultants and advisors
• Bar associations and legal organizations

Transform your legal practice with the most advanced, compliant,
and professionally designed lawyer template available!
```

---

## 🔄 **7. VERSIONAMENTO SEMÂNTICO**

### 📋 **Padrão de Versões**

- **v1.X.Y** - Primeira versão Envato
- **v1.X+1.0** - Novas funcionalidades
- **v1.X.Y+1** - Correções de bugs
- **v2.0.0** - Mudanças breaking

### 📋 **Exemplo de Changelog**

```markdown
## v1.1.0 - 2024-XX-XX

### Adicionado

- Nova seção de depoimentos
- Integração com Google Analytics
- Suporte a múltiplos idiomas

### Corrigido

- Performance em dispositivos móveis
- Compatibilidade com Safari
- Links de navegação

### Atualizado

- Next.js para versão 15.1
- Documentação com novos exemplos
- Conformidade ética expandida
```

---

## ⚠️ **8. CHECKLIST PRÉ-SUBMISSÃO**

### ✅ **Qualidade Técnica**

- [ ] `npm run lint` - Zero warnings
- [ ] `npm run type-check` - Zero errors
- [ ] `npm run build` - Build sucessful
- [ ] Demo funciona no navegador
- [ ] Todas as páginas carregam corretamente
- [ ] Formulários de contato funcionam
- [ ] Responsivo em mobile/tablet/desktop

### ✅ **Documentação**

- [ ] README.txt atualizado em inglês
- [ ] documentation/index.html completa
- [ ] Screenshots atualizadas se necessário
- [ ] Seção de conformidade ética presente
- [ ] Instruções de instalação claras

### ✅ **Pacote Envato**

- [ ] Estrutura demo/documentation/template/
- [ ] LICENSE.txt presente
- [ ] ZIP gerado sem erros
- [ ] Tamanho apropriado (~10-15MB)
- [ ] Sem arquivos temporários ou desnecessários

### ✅ **Conformidade Ética**

- [ ] Linguagem neutra e profissional
- [ ] Sem promessas de resultado
- [ ] Disclaimers apropriados
- [ ] Título sem "especialista" não comprovado
- [ ] Estatísticas não enganosas

---

## 🆘 **9. SOLUÇÃO DE PROBLEMAS**

### 🔧 **Erros Comuns de Build**

#### **Problema**: Build falha com static export

```bash
Error: Page "/servicos/[service]" is missing "generateStaticParams()"
```

**Solução**: Verificar se `generateStaticParams()` está presente em páginas dinâmicas

#### **Problema**: Fontes não carregam no static export

```bash
assetPrefix must start with a leading slash
```

**Solução**: Remover `assetPrefix` da configuração de static export

#### **Problema**: API routes no static export

```bash
API routes not supported with "output: export"
```

**Solução**: Remover pasta `src/app/api/` ou usar imagens estáticas para OG

### 🔧 **Problemas de Documentação**

#### **Problema**: Screenshots desatualizados

**Solução**:

1. Rodar `npm run dev`
2. Fazer screenshots das páginas principais
3. Substituir `public/landing-*.png`
4. Rebuildar documentação

#### **Problema**: Links quebrados na documentação

**Solução**: Verificar todos os links relativos e absolutos

---

## 📞 **10. SUPORTE CONTÍNUO**

### 🔄 **Manutenção Regular**

- **Mensal**: Verificar atualizações de dependências
- **Trimestral**: Revisar conformidade ética
- **Semestral**: Atualizar documentação e screenshots
- **Anual**: Major version com novas funcionalidades

### 📈 **Melhorias Futuras**

- [ ] Múltiplos idiomas (i18n)
- [ ] Mais layouts de página
- [ ] Integração CMS (Contentful/Strapi)
- [ ] Dashboard administrativo
- [ ] Blog/notícias jurídicas
- [ ] Calculadoras jurídicas
- [ ] Sistema de agendamento

---

## ✅ **CHECKLIST RÁPIDO DE ATUALIZAÇÃO**

```bash
# 1. Desenvolvimento
npm run lint && npm run type-check && npm run build

# 2. Gerar pacote
npm run prepare-envato

# 3. Testar demo
cd envato-package/demo && python3 -m http.server 8080

# 4. Criar ZIP
cd .. && zip -r ../LawyerHero-Template-v1.X.X.zip . && cd ..

# 5. Commit
git add . && git commit -m "feat: v1.X.X - [mudanças]"
git tag v1.X.X && git push origin main && git push origin v1.X.X

# 6. Upload Envato
# Fazer upload manual do ZIP na plataforma
```

---

**🏆 Com essas instruções, futuras atualizações do LawyerHero serão rápidas, organizadas e consistentes, mantendo sempre a qualidade premium e conformidade ética que fazem dele único no mercado!** ⚖️🚀
