# Guidu UI

Kit de componentes React do **guidu.chat** e dos **mini-apps Guidu**. Os componentes se adaptam
à plataforma (iOS, Android, desktop) e ao tema claro ou escuro.

> Baseado no [`@maxhub/max-ui`](https://github.com/max-messenger/max-ui) 0.7.0, de Vadim Tregubenko
> e colaboradores, sob licença MIT. Veja [LICENSE](LICENSE). Este projeto não tem relação com o MAX
> Messenger e não usa a marca dele.

## Onde é usado

- **guidu.chat** (PWA e app nativo): a interface do consumidor.
- **Mini-apps** servidos pelo console (`console.guidu.co`) e abertos dentro do guidu.chat.

O console (dashboard do comerciante) usa shadcn/ui. As cores de marca dos dois devem ficar alinhadas.

## Uso

```tsx
import '@guidu/ui/dist/styles.css';
import { GuiduUI, Panel, Button } from '@guidu/ui';

export const App = () => (
  <GuiduUI>
    <Panel centeredX centeredY>
      <Button>Olá</Button>
    </Panel>
  </GuiduUI>
);
```

`GuiduUI` é o provedor raiz: define `platform` (`ios` | `android`) e `colorScheme` (`light` | `dark`)
para toda a árvore. Sem as props, detecta pelo ambiente.

## Desenvolvimento

```shell
npm ci
npm run storybook   # catálogo de componentes em http://localhost:6006
npm run build       # gera dist/
npm run lint
```

O pacote está marcado como `private` para evitar publicação acidental no npm. Remova a marcação
quando houver um registro definido.

## Pendências

- Trocar os tokens de cor e tipografia em `src/styles/variables` pela identidade Guidu.
- Reescrever `RELEASING.md` e revisar `.release-it.json`, `.github/CODEOWNERS` e
  `.github/workflows`, que ainda descrevem o processo do projeto original.
- Traduzir os comentários do código e o `docs/MIGRATION.md`.
