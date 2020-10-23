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
        document.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('clickaway', { bubbles: false }));
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'onclickaway') {
            if (this.#eventHandler) {
                this.removeEventListener('clickaway', this.#eventHandler);
            }
            this.#eventHandler = () => {
                const func = new Function(newValue);
                func.bind(this)();
            };
            this.addEventListener('clickaway', this.#eventHandler);
        }
    }

    set onclickaway(func) {
        if (typeof func !== 'function') {
            throw new TypeError('Argument to onclickaway must be a function');
        }
        if (this.#eventHandler) {
            this.removeEventListener('clickaway', this.#eventHandler);
        }
        this.#eventHandler = func.bind(this);
        this.addEventListener('clickaway', this.#eventHandler);
    }

}

ClickAway.template.innerHTML = `
<style>
.click-away {
    display: inline-block;
}
</style>
<div class="click-away">
<slot></slot>
</div>
`;

customElements.define('click-away', ClickAway);
