# @juniokaito

Página independente extraída do componente original `/Juniokaito` da Kaito Company. A implementação completa está em `source/`; preserva estilos, ícones, animações, arrasto, abas Social/Loja e detalhes do serviço.

## Publicação

O GitHub Pages usa **GitHub Actions**. Alterações em `source/` na branch `main` disparam `.github/workflows/pages.yml`, que executa `npm ci`, `npm run build` e publica `source/dist`. A raiz também contém uma cópia estática gerada para referência. O site não requer servidor, Supabase ou ChatGPT Sites para funcionar.

Para editar localmente: `cd source && npm ci && npm run dev`. Para conferir a versão de produção: `npm run build`.

O domínio configurado no Pages é `juniokaito.com`. No provedor de DNS, os registros A de `@` precisam apontar para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`. Depois que o GitHub validar o DNS, ative **Enforce HTTPS** em Settings → Pages.

Os links das redes são externos. O botão “Iniciar conversa grátis” preserva o destino original `https://app.kaitocompany.com/`; ele pode ser alterado em `source/src/LinksSpace.tsx`.
