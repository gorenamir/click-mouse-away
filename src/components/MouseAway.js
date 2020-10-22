class MouseAway extends HTMLElement {

    static template = document.createElement('template');

    static observedAttributes = ['onmouseaway'];

    #eventHandler = null;
    #mouseAwayRoot;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(MouseAway.template.content.cloneNode(true));
        this.#mouseAwayRoot = this.shadowRoot.querySelector('.mouse-away');
        this.#mouseAwayRoot.addEventListener('mouseleave', () => {
            this.dispatchEvent(new CustomEvent('mouseaway', { bubbles: false }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'onmouseaway') {
            if (this.#eventHandler) {
                this.#mouseAwayRoot.removeEventListener('mouseleave', this.#eventHandler);
            }
            this.#eventHandler = () => { eval(newValue); };
            this.#mouseAwayRoot.addEventListener('mouseleave', this.#eventHandler);
        }
    }

    set onmouseaway(func) {
        if (typeof func !== 'function') {
            throw new TypeError('Argument to onmouseaway must be a function');
        }
        if (this.#eventHandler) {
            this.#mouseAwayRoot.removeEventListener('mouseleave', this.#eventHandler);
        }
        this.#eventHandler = func.bind(this);
        this.#mouseAwayRoot.addEventListener('mouseleave', this.#eventHandler);
    }

}

MouseAway.template.innerHTML = `
<div class="mouse-away">
<slot></slot>
</div>
`;

customElements.define('mouse-away', MouseAway);
