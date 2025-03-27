[![npm latest package](https://img.shields.io/npm/v/@maxhub/max-ui/latest.svg)](https://www.npmjs.com/package/@maxhub/max-ui)

# MaxUI

## Установка

```sh
npm install @maxhub/max-ui
```

```sh
yarn add @maxhub/max-ui
```

```sh
pnpm add @maxhub/max-ui
```

## Быстрый старт

```typescript jsx
import '@maxhub/max-ui/dist/styles.css';
import { MaxUi, Panel, Button } from "@maxhub/max-ui";

const App = () => {
  return (
    <MaxUi>
      <Panel centeredX centeredY>
        <Button>
          Hello world!
        </Button>
      </Panel>
    </MaxUi>
  )
}
```

