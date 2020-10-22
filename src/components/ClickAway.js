class ClickAway extends HTMLElement {

    static template = document.createElement('template');

    static observedAttributes = ['onclickaway'];

    #eventHandler = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(ClickAway.template.content.cloneNode(true));
        const clickAwayRoot = this.shadowRoot.querySelector('.click-away');
        clickAwayRoot.addEventListener('click', e => { e.stopPropagation(); });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'onclickaway') {
            if (this.#eventHandler) {
                document.removeEventListener('click', this.#eventHandler);
            }
            this.#eventHandler = () => { eval(newValue); };
            document.addEventListener('click', this.#eventHandler);
        }
    }

    set onclickaway(func) {
        if (typeof func !== 'function') {
            throw new TypeError('Argument to onclickaway must be a function');
        }
        if (this.#eventHandler) {
            document.removeEventListener('click', this.#eventHandler);
        }
        this.#eventHandler = func.bind(this);
        document.addEventListener('click', this.#eventHandler);
    }

}

ClickAway.template.innerHTML = `
<div class="click-away">
<slot></slot>
</div>
`;

customElements.define('click-away', ClickAway);
