# vanilla-js-webpack-template
Стартовый шаблон frontend-проекта с использованием webpack, babel, stylelint, eslint, scss, bootstrap 4.

## Навигация
* [Навигация](#навигация)
* [Сокращения](#сокращения)
* [CLI-команды](#cli)
* [Webpack](#webpack)
* [ESLint](#eslint)
* [Stylelint](#stylelint)
* [Bootstrap](#bootstrap)

## Сокращения
* RMC - правый клик мышью

## CLI
* `npm start` - dev-сборка проекта с поднятием dev-сервера и горячей перезагрузкой модулей (HMR)
* `npm dev` - development-сборка проекта
* `npm build` - production-сборка проекта
* `npm lint:js` - аудит и автоматическое исправление js-кода
* `npm lint:css` - аудит и автоматическое исправление css-кода

Для удобства рекомендуется воспользоваться встроенной поддержкой команд npm в PhpStorm. Он позволяет вывести все 
скрипты в отдельные окна и запускать их простыми кликами, а также подробно настраивать среду выполнения скриптов.
Окно команд в PhpStorm: *package.json -> RMC -> Show npm Scripts*

Например, чтобы переключить режим сборки проекта на production/development, необходимо в настройках команды 
(*Команда в отедльном окне -> RMC -> Edit <command> settings*) в поле *Environment* добавить/удалить строку 
`NODE_ENV=production`.

## Webpack
* **Документация:** https://webpack.js.org/concepts/
* **Настройки:** `webpack.config.js` в корне проекта

В целях оптимизации вендорные библиотеки выделяются в отдельный файл vendors.

### [babel-loader](https://www.npmjs.com/package/babel-loader)
Подключает продвинутый js-компилятор [babel](https://babeljs.io/docs/en/).

Используется рекомендованный пресет [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) для поддержки 
современных стандартов языка.

Используется технология [tree shaking](https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage), позволяющая не 
включать неиспользуемые модули в итоговую сборку.

### [eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)
Подключает js-линтер [eslint](#eslint). Выводит в консоль ошибки форматирования/корректности кода.

### [stylelint-webpack-plugin](https://www.npmjs.com/package/stylelint-webpack-plugin)
Подключает css-линтер [stylelint](#stylelint). Выводит в консоль ошибки форматирования/корректности кода.

## Инструменты контроля качества кода

### ESLint
* **Документация:** https://eslint.org/docs/user-guide/getting-started
* **Правила:** https://eslint.org/docs/rules/
* **Настройки:** `.eslintrc.js` в корне проекта

В качестве стартовых правил используется набор правил [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard), 
основанный на последних стандартах языка. Правила можно кастомизировать в параметре `rules`.

В PhpStorm есть встроенная поддержка ESLint. Чтобы включить: 
*Settings -> Languages & Frameworks -> JavaScript -> Code Quality Tools -> ESLint -> Automatic ESLint configuration*.
После чего в редакторе появятся подсказки на основе правил, установленных в файле настроек.

### Stylelint
* **Документация:** https://stylelint.io/user-guide/configuration
* **Правила CSS:** https://stylelint.io/user-guide/rules  
* **Правила SCSS:** https://github.com/kristerkari/stylelint-scss
* **Настройки:** `.stylelintrc.js` в корне проекта

В качестве стартовых правил используется набор правил [stylelint-config-recommended-scss](https://www.npmjs.com/package/stylelint-config-recommended-scss), 
основанный на последних стандартах языка. Правила можно кастомизировать в параметре `rules`.

В PhpStorm есть встроенная поддержка Stylelint. Чтобы включить: 
*Settings -> Languages & Frameworks -> StyleSheets -> Stylelint -> Enable*. После чего в редакторе появятся подсказки 
на основе правил, установленных в файле настроек.

## Bootstrap
**Документация:** https://bootstrap-4.ru/docs/4.3.1/getting-started/introduction/

По умолчанию из *bootstrap* взяты переменные, миксины, функции и некоторые модули.

### Методология Mobile First
Суть данной методологии в том, что стилями по умолчанию считаются стили для мобильных устройств. В результате этого 
становится намного проще масштабировать поддержку других типов устройств. 

Технически это означает, что медиа-запросы пишутся с использованием `min-width`:
```css
/* Mobile/Default */
.h1 {
    font-size: 26px
}

/* Tablet */
@media (min-width: 768px) {
    .h1 {
        font-size: 30px;
    }
}

/* Desktop */
@media (min-width: 1440px) {
    .h1 {
        font-size: 40px;
    }
}
```

### Методология атомарных css-компонентов
Суть данной методологии в том, чтобы для некоторых часто используемых css-свойств создать отдельные микро-классы
и внедрять их через *html*, вместо того, чтобы ломать голову, придумывая класс, "второму блоку слева во второй строке 
третьего блока главной страницы", если всего-то и нужно, что сделать текст в нём белым.

Bootstrap реализует эту методологию. Например, модуль `spacing.scss` предоставляет целую россыпь классов для гибкой 
настройки широкого спектра значений внешних/внутренних отступов в любые стороны.

### Переменные
* В проекте: `src/assets/scss/variables`
* В Bootstrap `~bootstrap/scss/_variables`

Переменные взяты из *bootstrap* частично, по мере необходимости, и для удобства разбиты на разные файлы.

### Миксины
* В проекте: `src/assets/scss/mixins`
* В Bootstrap `~bootstrap/scss/mixins/index`

Включены в проект полностью.

### Функции
* В проекте: `src/assets/scss/functions`
* В Bootstrap `~bootstrap/scss/_functions`

Включены в проект полностью.

### Утилиты
**Документация:** https://bootstrap-4.ru/docs/4.3.1/utilities/

* В проекте: `src/assets/scss/utilities`
* В Bootstrap `~bootstrap/scss`

По умолчанию в проект включены модули:
* Сетка
* Цвет
* Отступы
* Типография
* Рамки
* Отображение элементов
* Flex
* Позиционирование
* Размеры
* Текст
* Видимость

#### Сетка
**Документация:** https://bootstrap-4.ru/docs/4.3.1/layout/overview/

Сетка в Bootstrap 4 основана на Flex.

По умолчанию используется:
* Количество колонок - 12
* Вертикальные/горизонтальные отступы между колонками - 24px
* Вертикальные/горизонтальные внутренние отступы контейнера - 12px
* Поддержка 5 брейкпоинтов