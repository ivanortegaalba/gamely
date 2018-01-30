# Gamely

## Datos sobre el desarrollo:
* Horas invertidas: 20h
* Prácticas usadas:
    * Maquetación a través de estandares establecidos usando SASS para posterior migración a styled-component
    * TDD
    * Linting para accesibilidad y buenas prácticas en React a través de:
        - [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
        - [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) Muy util para evitar transmitir errores de accesibilidad al real DOM.
        - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
* Principales ideas de desarrollo:
    * Mostrar mis capacidades de arquitectura de software y buena praxis en Javascript
    * Mostrar la capacidad de construir semantic HTML a través de React
    * Mostrar la capacidad de abstraer los estilos de la lógica de aplicación
    * Proveer diferentes perspectivas de architectura para modularizar componentes (véase el uso de componentes comunes customizables pero estandarizados)
    * Presentar nuevos conceptos de Frontend como CSS-in-JS o TDD basado en Snapshot Testing
    * Promover el buen uso del unit testing a distintos niveles en React: Componente, Reducer, Selectors, Distpachers...
    * Demostrar que no siempre rápido significa malo: Un projecto sólido en 20 horas
* Principales TODO:
    * Uso de Flow para el tipado en JS. Solo he hecho uso de los propTypes.
    * Testear el HTML estático con el W3C validator. No fue posible por falta de tiempo y la lucha constante con subir el estático gh-pages.
    * Mejorar la apariencia de la web. Se ha quedado en un simple boceto por poner énfasis en la arquitectura de JS.
    * Mejorar la usabilidad concatenando los focus y ajustando mejor el grid a la pantalla
    * Crear los styled-components como: Grid, Flex, Card, etc.
* Principales 3 puntos débiles y 3 puntos fuertes:
    * Débiles:
        * CSS poco atractivo (Tenía pensamiento de hacer un guiño al estilo Candy)
        * Componentes customizados sin ser abstraidos
        * Dejar la accesibilidad para el final, y no poder haberla implementado.
    * Fuertes:
        * Optimización de rendimiento a partir de buena arquitectura
        * Testing
        * Introducir un nuevo paradigma de maquetacion basado en componentes sin pasar por el uso de clases en CSS.

## Introducción
Para desarrollar esta plataforma, he decidido usar:
- React (CRA para ahorrar tiempo en la configuraciónd de Webpack)
- Redux
- Jest (testing)
- [styled-component]() (CSS-in-JS)
- SASS (ha sido sustituido en última instancia por styled-component)

El objectivo de esta prueba era mostrar mis habilidades usando principalmente JS y CSS, además de tener en cuenta aspectos como UX o accesibilidad.

Para tal caso, he querido enfatizar en varios aspectos que desarrollaré más adelante:
1. Uso de React para cubrir todos los aspectos de una aplicación:
    1. Manejo de estado
    2. Interacción con la API
    3. Renderizado y optimización
2. Theming, abstacción y estandarización del estilo
    1. Abstracción y customización de CSS a partir de componentes en React
    2. Posibilidad extraer los estilos como una librería de componentes
3. Testing y buenas prácticas en JS
4. Optimización, single source of truth
5. Accesibilidad a través de React
6. Prueba de concepto de UX

## Javascript
* **Uso de única fuente de verdad para la interacción con el store**.
    Es uso común en Redux o en React el declarar funciones durante el render o dentro del mismo connect cuando estamos declarando un componente container.
    He replanteado esta práctica para evitar el duplicar código, malgastar memoria declarando más de una vez las funciones o eventos, o inclusos añadir infinitos listeners sin necesidad.
    Para ello he manejado conceptos como:
    - Dispatchers: Contendrán todas las funciones que hagan usos del dispatch para lanzar una acción
    - Selectors: Manejarán la lógica de cada uno de los reducers (véase los que están declarados dentro del propio archivo del reducer) o de la interacción entre los mismos (véase los declarados en el index.js que hace la combinación final.)

    Esta división tiene ventajas como:
    - Fácil unit testing
    - Una sola fuente de verdad para lanzar acciones u obtener información del store
    - Fácil refactor de reducers y estructura del store
    - Abstracción del store en los containers

* **Abstracción de la API a través del Middleware**.
    Uno de los grandes problemas de Redux son los side-effects que producen las acciones en las distintas partes del store y que muchas veces son dificiles de controlar.
    Una librería bastante famosa para evitar esto es [redux-saga]() que consiste básicamente en funciones generadoras que escuchan determinado tipo de acciones para controlar estos side-effects.
    No obstante, uno de los principales usos qeu se le da a esta librería es hacer peticiones a la API. Con este approach no evitas el tener que conocer donde estas llamando, de que forma, qeu recibes, como inyectarlo en el store, etc.
    La forma de declarar una petición es a través de una acción:
    ```
    {
        [CALL_API] = {
            types: ['GAMES_REQUEST', 'GAMES_SUCCESS', 'GAMES_FAILURE'],
            endpoint: `${API_URL}/games/`,
            schema: new schema.Array(new schema.Entity('games'))
        }
    }
    ```
    Con esto, el middleware:
    1. Lanzará la petición fetch, a la vez que lanzará una acción con el type `requestType`:
    2. Una vez la petición se resuelve:
        * Si la petición ha sido satisfactoria, se lanzará una acción con el tipo  `successType` y con la respuesta **Normalizada** en base al esquema enviado en la acción.
        Esto es muy importante para evitar tener deslocalizadas las entidades dentro del store. Para mas información ver la librería [normalizr]()
        * Si la petición ha sido fallida, se lanzará una accion de tipo `failureType` y además se añadirá un campo error con la información del error.
    Con esta arquitectura, es muy facil controlar toda la data recibida a través de peticiones fetch, ya que simplemente tenemos que distribuirla por el store usando los reducers que traten dichos tipos de acción.
    Además, usando la normalización, siempre guardaremos en un solo sitio la entidad, y podrémos distribuir las ids de dicho elemento a nuestro antojo, evitando así inconsistencia de datos.
    TODO:
    - [ ] Add extraParams to the call API actions to support POST, PUT and PATCH requests
    - [ ] Testear que los errores son lanzados
    - [ ] Evitar solapamiento de requests. Si una request de la api ha sido lanzada dos veces, cancelar la primera

* **Abstracción del localStorage a traves del Middleware**.
    Al igual que el middleware para la interacción con la API, el middleware de la localStorage nos permite guardar ciertas partes del store en la memoria local cuando determinadas acciones son despachadas.
    El uso es muy simple, para este caso, cuando un juego es guardado o borrado, actualizamos el store guardado en la memoria local.
* **Semantic testing and TDD**
    Durante el desarrollo de la aplicación, cada una de las funciones ha sido desarrollada a la par de su tests.
    Los componentes de react, a su excepción, primeramente fueron maquetados, y después distribuidos y testeados.
    Además, he procurado describir y utilizar semanticamente cada una de las tests suites para poder explicar la funcionalidad del código a través de los mismos tests. No obstante, debido al ajustado tiempo, no han sido lo suficientemente revisados.
## CSS
## Accesibilidad
## UX/UI
