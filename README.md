[![npm latest package](https://img.shields.io/npm/v/@maxhub/max-ui/latest.svg)](https://www.npmjs.com/package/@maxhub/max-ui)
[![storybook](https://img.shields.io/badge/storybook-available-brightgreen)](https://max-messenger.github.io/max-ui)

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
import { MaxUI, Panel, Button } from "@maxhub/max-ui";

const App = () => {
  return (
    <MaxUI>
      <Panel centeredX centeredY>
        <Button>
          Hello world!
        </Button>
      </Panel>
    </MaxUI>
  )
}
```
