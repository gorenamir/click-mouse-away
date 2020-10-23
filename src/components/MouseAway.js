class MouseAway extends HTMLElement {

    static template = document.createElement('template');

    static observedAttributes = ['onmouseaway'];

    #eventHandler = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(MouseAway.template.content.cloneNode(true));
        const mouseAwayRoot = this.shadowRoot.querySelector('.mouse-away');
        mouseAwayRoot.addEventListener('mouseleave', () => {
            this.dispatchEvent(new CustomEvent('mouseaway', { bubbles: false }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'onmouseaway') {
            if (this.#eventHandler) {
                this.removeEventListener('mouseaway', this.#eventHandler);
            }
            this.#eventHandler = () => {
                const func = new Function(newValue);
                func.bind(this)();
            };
            this.addEventListener('mouseaway', this.#eventHandler);
        }
    }

    set onmouseaway(func) {
        if (typeof func !== 'function') {
            throw new TypeError('Argument to onmouseaway must be a function');
        }
        if (this.#eventHandler) {
            this.removeEventListener('mouseaway', this.#eventHandler);
        }
        this.#eventHandler = func.bind(this);
        this.addEventListener('mouseaway', this.#eventHandler);
    }

}

MouseAway.template.innerHTML = `
<style>
.mouse-away {
    display: inline-block;
}
</style>
<div class="mouse-away">
<slot></slot>
</div>
`;

customElements.define('mouse-away', MouseAway);
