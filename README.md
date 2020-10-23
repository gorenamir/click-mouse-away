# click-mouse-away

click-mouse-away are JavaScript web components designed to handle click-away and mouse-leave events,
using modern expressive syntax.

## Installation

```bash
npm install click-mouse-away
```

or

```bash
yarn add click-mouse-away
```

## Usage

Just import the package into your JavaScript:

```javascript
import 'click-mouse-away';
```

Alternatively, include the package through a script tag:

```html
<script src="./click-mouse-away/dist/index.js"></script>
```

Then you'll be able to use the components in your markup:

```html
<click-away onclickaway="alert('You just clicked outside of this element!')">
    <div style="width: 150px; height: 150px; background-color: red;"></div>
</click-away>

<mouse-away onmouseaway="alert('Your mouse just left this element!')">
    <div style="width: 150px; height: 150px; background-color: blue;"></div>
</mouse-away>
```

Note that the ```this``` keyword in both components refers to the element itself, as expected.

JavaScript is supported too:

```javascript
const clickAwayElement = document.querySelector('click-away');
const mouseAwayElement = document.querySelector('mouse-away');

clickAwayElement.onclickaway = event => {
    // Handle the event here
};

mouseAwayElement.onmouseaway = event => {
    // And here
};

// Alternatively, use traditional event handling:

clickAwayElement.addEventListener('clickaway', event => {
    // Event handling here
});

mouseAwayElement.addEventListener('mouseaway', event => {
    // And here
});
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)