# react-native-emoji-modal

Biblioteca de react native para desplegar un modal y seleccionar un emoji, con búsqueda en inglés o español.
Basado en el repositorio https://github.com/Majiedo/react-native-emojis-picker

|          light theme          |          dark theme          |
| :---------------------------: | :--------------------------: |
| ![](./assets/light.png) | ![](./assets/dark.png) |

## Instalación

```sh
npm install react-native-emoji-modal
```

## Uso


```js
import EmojiModal from 'react-native-emoji-modal';

// ...

 <EmojiModal
    columns={12}
    onSelect={(val: string) => {
        setEmoji(val);
        setVisible(false);
    }}
    setVisible={setVisible}
    visible={visible}
/>
```
## Props

| Prop              | Tipo     | Defecto            | Descripción                                                |
| ----------------- | -------- | -----------------  | --------------------------------------------------------   |
| columns           | _number_ | 10              | Cantidad de emojis a mostrar por fila                         |
| onSelect          | _func_   |                    | Función llamada al seleccioanr el emoji.                   |
| setVisible        | _func_   |                    | Función para cerrar el modal, debe pasar un bool como arg  |
| visible           | _bool_   | false              | Estado del modal                                           |
| language          | _estring_| "es"               | Lenguage para buscar emojis, es(español) o en(inglés)      |
| noResultText      | _estring_| "Ningún resultado" | Texto para indicar que no hay resultados de búsqueda       |
| searchPlaceholder | _estring_| "Buscar emoji"     | Texto de placeholder para el campo de búsqueda             |
| dark              | _bool_   | false              | Aplica un modo oscuro a los elementos                      |

## Licencia

MIT
