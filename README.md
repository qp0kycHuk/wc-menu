# Web Component Menu

Простой веб компонент меню

<a href="https://qp0kychuk.github.io/wc-menu/" target="_blank">Демонстрация</a>

<a href="https://github.com/qp0kycHuk/wc-menu" target="_blank">Github</a>

<a href="https://www.tinkoff.ru/rm/yuferov.sergey18/NC17C11734" target="_blank">Поддержать автора</a>

### Установка

```bash
npm install @qpokychuk/wc-menu
```

```js
import menu from '@qpokychuk/wc-menu'
import '@qpokychuk/wc-menu/dist/index.css'

menu.register()
```

### Использование

Меню создаются с использованием `c-menu`, `c-menu-button`, `c-menu-items` и `c-menu-item` компонентов:

```html
  <c-menu>
    <c-menu-button>
      Menu button
    </c-menu-button>
    <c-menu-items>
      <c-menu-item>Menu item 1</c-menu-item>
      <c-menu-item>Menu item 2</c-menu-item>
      <c-menu-item>Menu item 3</c-menu-item>
    </c-menu-items>
  </c-menu>
```

При нажатии на `c-menu-button` элементы меню будут автоматически открываться и закрываться

Внутри `c-menu-items` не обязательно использовать `c-menu-item`, вы можете использовать там любой `HTML`. 
При нажатии на `c-menu-item` меню будет автоматически закрываться

`c-menu` создает и вставляет дополнительный компонент `c-menu-shadow`, при нажатии на который меню будет автоматически закрываться
___

### Стилизация

В открытом состоянии компоненты `c-menu`, `c-menu-button`, `c-menu-items` и `c-menu-shadow` имеют атрибут `data-active` - используйте его для стилизации вашего меню

Пример с использованием `tailwindcss`

```html
  <c-menu>
    <c-menu-button class="group bg-primary data-[active]:bg-secondary">
      Menu button
      <img src="chevron-right.svg" class="group-data-[active]:-rotate-90" />
    </c-menu-button>
    <c-menu-items>
      <c-menu-item>Menu item 1</c-menu-item>
      <c-menu-item>Menu item 2</c-menu-item>
      <c-menu-item>Menu item 3</c-menu-item>
    </c-menu-items>
  </c-menu>
```

Отступ `c-menu-items` регулируется через переменную `--offset`

При открытом меню body получает класс `c-menu-opened`
___

### Позиционирование 

Позиционирование применяется с помощью атрибута `placement` компонента `c-menu-items`

`placement` имеет следующие значения: 
- Сверху: `top`, `top-start`, `top-end` 
- Справа: `right`, `right-start`, `right-end` 
- Снизу: `bottom`, `bottom-start`, `bottom-end`
- Слева: `left`, `left-start`, `left-end`
- Над `c-menu`: 
  - По центру: `over`
  - Сверху: `over-top`, `over-top-start`, `over-top-end`
  - Справа: `over-right`, `over-right-start`, `over-right-end`
  - Снизу: `over-bottom`, `over-bottom-start`, `over-bottom-end`
  - Слева: `over-left`, `over-left-start`, `over-left-end`

### При наведении

Чтобы меню открывалось при наведении используйте атрибут `action="hover"` компонента `c-menu`

### Примечание
`c-menu` позиционируется как `headless` компонент т.е. предоставляет только функционал без красивых стилей. Для минимальной стилизации рекомендуется задать `background`, `z-index`, `width` и `max-height` для `c-menu-items`

Так же можете использовать `c-menu-shadow` для доп возможностей

### Пример стилей:

```scss
c-menu-items {
  --offset: 8px;

  z-index   : theme('zIndex.1');
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.04);
  border    : 1px solid theme('colors.default / 5%');
  width     : 224px;
  background: theme('colors.l3');
  color     : theme('colors.default');

  transition: .25s var(--elastic, ease);

  @media (max-width:theme('screens.md')) {
    position  : fixed;
    inset     : auto 0 0 !important;
    width     : 100%;
    max-height: 400px;
    overflow  : auto;
    z-index   : theme('zIndex.4');
    transform : none;
    transition: .25s ease;
    margin    : 0 !important;
  }


  &:not([data-active]) {
    --scale: .95;

    @media (max-width:theme('screens.md')) {
      transform: translateY(20px) !important;
    }
  }
}

c-menu-shadow {
  position  : fixed;
  inset     : 0;
  z-index   : calc(theme('zIndex.4') - 1);
  background: rgba(0, 0, 0, 0.5);
  transition: .25s ease;


  @media (min-width:theme('screens.md')) {
    display: none;
  }

  &:not([data-active]) {
    pointer-events: none;
    opacity       : 0;

  }
}

body.c-menu-opened {
  @media (max-width:theme('screens.md')) {
    overflow: hidden;
  }
}
```

