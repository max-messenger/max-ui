[![npm latest package](https://img.shields.io/npm/v/@maxhub/max-ui/latest.svg)](https://www.npmjs.com/package/@maxhub/max-ui)
[![storybook](https://img.shields.io/badge/storybook-available-brightgreen)](https://max-messenger.github.io/max-ui)

# MAX UI

## Обзор

MAX UI — библиотека React-компонентов для создания мини-приложений в MAX, сторонних суперприложений, а также standalone-приложений. Готовые компоненты библиотеки умеют подстраиваться под разные платформы и устройства

## Особенности MAX UI
- **Дизайн-система MAX**
  <br/>Библиотека компонентов разработана на основе дизайн-системы MAX, что позволяет мини-приложениям выглядеть гармонично в интерфейсе цифровой платформы

- **Единообразие на разных платформах**
  <br/>Компоненты библиотеки органично встраиваются в мобильные платформы iOS и Android, а также в экраны устройств разного размера

- **Современный UI Kit**
  <br/>Typescript, React 18+, полиморфные компоненты и подробная [документация](https://dev.max.ru/ui) с примерами

## Подключение библиотеки MAX UI

### Установка

Установите библиотеку одной из команд:

```shell
npm i @maxhub/max-ui
```

```shell
yarn add @maxhub/max-ui
```

```shell
pnpm add @maxhub/max-ui
```

#### Быстрый старт

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

### Подключение компонентов

Оберните код вашего приложения в провайдер MAX UI и подключите стили:

```jsx filename="index.jsx"
import { createRoot } from 'react-dom/client';
import { MaxUI } from '@maxhub/max-ui';
import '@maxhub/max-ui/dist/styles.css';
import App from './App.jsx';


const Root = () => (
    <MaxUI>
        <App />
    </MaxUI>
)

createRoot(document.getElementById('root')).render(<Root />);
```

Используйте компоненты библиотеки:

```jsx filename="App.jsx"
import { Panel, Grid, Container, Flex, Avatar, Typography } from '@maxhub/max-ui';

const App = () => (
    <Panel mode="secondary" className="panel">
        <Grid gap={12} cols={1}>
            <Container className="me">
                <Flex direction="column" align="center">
                    <Avatar.Container size={72} form="squircle" className="me__avatar">
                        <Avatar.Image src="https://sun9-21.userapi.com/1N-rJz6-7hoTDW7MhpWe19e_R_TdGV6Wu5ZC0A/67o6-apnAks.jpg" />
                    </Avatar.Container>

                    <Typography.Title>Иван Иванов</Typography.Title>
                </Flex>
            </Container>
        </Grid>
    </Panel>
)

export default App;
```

## Компоненты библиотеки MAX UI

Компоненты библиотеки MAX UI мимикрируют под нативные компоненты iOS и Android и умеют поддерживать светлую и тёмную темы оформления. Тема и платформа определяются автоматически в провайдере MAX UI, но могут быть переопределены через свойства `platform` (`'ios'` | `'android'`) и `colorScheme` (`'light'` | `'dark'`)

```jsx
import { createRoot } from 'react-dom/client';
import { MaxUI } from '@maxhub/max-ui';
import '@maxhub/max-ui/dist/styles.css';
import App from './App.jsx';


const Root = () => (
    <MaxUI platform="android" colorScheme="dark">
        <App />
    </MaxUI>
)
createRoot(document.getElementById('root')).render(<Root />);
```

### Полиморфные компоненты

Полиморфность компонентов реализована через паттерн `asChild prop`: это позволяет предотвратить ошибки типизации и не увеличивать время typescript-процессинга

В DOM полиморфные компоненты могут быть представлены в виде тегов. Например, компонент `Button` — как `button`, `a`, `span` и так далее

| React-компонент | DOM* |
| - | - |
| < Button ><br/>Я — кнопка<br/>< /Button > | < button class="btn-classes" ><br/>Я — кнопка<br/>< /button > |
| < Button asChild ><br/>< a href="#" >Я — ссылка!< /a ><br/>< /Button > | < a class="btn-classes" href="#" ><br/>Я — ссылка!<br/>< /a > |
| import { Link } from "react-router-dom";<br/><br/>< Button asChild ><br/>< Link to="/home" >Я — ссылка RRD!< /a ><br/>< /Button > | < a class="btn-classes" href="/home" ><br/>Я — ссылка RRD!<br/>< /a > |
| | *упрощённое представление компонента |

### Корнер-кейс с asChild

Паттерн `asChild prop` может привести к конфликту свойств, если у одинаковых свойств родительского и дочернего компонентов разные значения. В этом случае свойства `className`, `style` и обработчики событий `on*` (`onClick`, `onChange` и другие) объединяются. В остальных случаях приоритет остаётся у свойств родительского компонента

| React-компонент | DOM* |
| - | - |
| < Button disabled={true} asChild ><br/>< button disabled={false} ><br/>Кнопка<br/>< /button > | < /Button ><br/>< button class="btn-classes" disabled ><br/>Я — кнопка<br/>< /button > |
| < Button style={{ color: \'red\' }} asChild ><br/>< button style={{ background: \'green\' }} ><br/>Кнопка<br/>< /button> | < /Button ><br/>< button class="btn-classes" style={{ color: \'red\', background: \'green\' }} ><br/>Я — кнопка<br/>< /button > |
| | *упрощённое представление компонента |

### Кастомизация компонентоваа
Библиотека предоставляет API для кастомизации, но не гарантирует отсутствие изменений в следующих мажорных версиях. Любая кастомизация компонентов — ответственность разработчика мини-приложения

В MAX UI есть два способа кастомизации компонентов: переопределение CSS-переменных и свойство `innerClassNames`

- **Переопределение CSS-переменных**
  <br/>Все токены дизайн-системы MAX заданы в CSS-переменных. Вы можете переопределить переменные как для конкретного компонента, так и для всей темы в целом

- **Свойство** `innerClassNames`
  <br/>Многосоставные компоненты, например `Button`, имеют свойство `innerClassNames`. Он позволяет указать `className` для внутренних элементов

| React-компонент | DOM* |
| - | - |
| < Button<br/>  disabled={true}<br/>   iconBefore={< svg / >}<br/>><br/>   Кнопка с иконкой<br/>< /Button > | < button class="btn-classes" ><br/>   < span class="icon-before-classes" ><br/>      < svg / ><br/>   < /span ><br/>   < span >Я — кнопка</span><br/>< /button > | 
| < Button <br/>   disabled={true}<br/>   iconBefore={< svg / >}<br/>   innerClassNames={{<br/>      iconBefore: \'my-custom-icon-class\'<br/>   }}<br/> ><br/>   Кнопка с иконкой<br/>< /Button > | < button class="btn-classes" ><br/>   < span class="icon-before-classes my-custom-icon-class" ><br/>      < svg / ><br/>   < /span ><br/>   < span >Я — кнопка< /span ><br/>< /button > | 
| | *упрощённое представление компонента |

<br/>
