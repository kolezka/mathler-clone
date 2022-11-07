var $=Object.defineProperty;var D=(a,e,t)=>e in a?$(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var l=(a,e,t)=>(D(a,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const z=new RegExp(/^((?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$)/);function A(a){return a.startsWith("+")||a.startsWith("*")||a.startsWith("/")||!/(\+|\-|\*|\/)/g.test(a)?!1:z.test(a)}function N(a){try{return new Function(`return (${a})`)()}catch{return null}}function B(a,e){var t=[],o;for(o=0;o<a.length;o++)a[o]===e&&t.push(o);return t}const f=document.createElement("template");f.innerHTML=`
  <style>
    @keyframes appear {
      0% {
        opacity: 0;
        transform: scale(.5)
      }
      50% {
        opacity: .5;
        transform: scale(1.5)
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes disappear {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(0);
      }
    }
    .board {
      overflow: hidden;
      border-radius: 3px;
      background-color: var(--game-board-background-color);
    }
    
    .row {
      display: flex;
      height: var(--game-board-col-size);
      margin: 2px 0;
    }

    .col {
      margin: 0 2px;
      text-align: center;
      min-width: var(--game-board-col-size);
      min-height: var(--game-board-col-size);
      background-color: var(--game-board-col-background-color);
    }

    .value {
      display: block;
      animation: appear .5s forwards;
      line-height: var(--game-board-col-size);
      font-size: var(--game-board-col-text-size);
      font-weight: 700;
    }

    .value--correct {
      background-color: var(--game-board-result-correct);
    }

    .value--different-place {
      background-color: var(--game-board-result-different-place);
    }

    .value--not-in-solution {
      background-color: var(--game-board-result-not-in-solution);
    }

    .value.remove {
      animation: disappear .2s forwards;
    }

  </style>
  <div class="board" id="board"></div>
`;class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){var e;(e=this.shadowRoot)==null||e.appendChild(f.content.cloneNode(!0)),this.createBoard()}updateBoard({guesses:e,expectedResult:t,currentRow:o}){var n,i;for(let r=0;r<6;r++)for(let c=0;c<6;c++){const u=(n=e[r])==null?void 0:n[c],d=(i=this.shadowRoot)==null?void 0:i.getElementById(`row-${r}-col-${c}`);let s=d==null?void 0:d.children[0];if(s&&!u&&(s.classList.add("remove"),setTimeout(()=>{s==null||s.remove()},200)),!s&&u&&(s=document.createElement("span"),s.innerText=String(u),s.classList.add("value"),d==null||d.appendChild(s)),s&&r<o){const b=B(t,u);b.length?b.includes(c)?s==null||s.classList.add("value--correct"):s==null||s.classList.add("value--different-place"):s==null||s.classList.add("value--not-in-solution")}}}createBoard(){var t;const e=(t=this.shadowRoot)==null?void 0:t.getElementById("board");for(let o=0;o<6;o++){const n=document.createElement("div");n.classList.add("row"),n.id=`row-${o}`,e==null||e.appendChild(n);for(let i=0;i<6;i++){const r=document.createElement("div");r.classList.add("col"),r.id=`row-${o}-col-${i}`,n==null||n.appendChild(r)}}}}customElements.define("game-board",G);const v=document.createElement("template");v.innerHTML=`
  <style>
    #keyboard {
      display: flex;
      flex-direction: column;
    }
    div {
      display: flex;
    }
    button {
      cursor: pointer;
      border: none;
      border-radius: var(--game-keyboard-button-radius);
      font-size: var(--game-keyboard-button-text-size);
      margin: var(--game-keyboard-button-margin);
      line-height: 1;
      color: var(--game-keyboard-button-text-color);
      padding: var(--game-keyboard-button-padding);
      background-color: var(--game-keyboard-button-background-color);
      transition: background-color .1s ease-in;
    }

    button:hover {
      background-color: var(--game-keyboard-button-hover-background-color);
    }

    button:active {
      transform: scale(.9);
    }

  </style>
  <div id="keyboard">
    <div>
      <button data-value="0">0</button>
      <button data-value="1">1</button>
      <button data-value="2">2</button>
      <button data-value="3">3</button>
      <button data-value="4">4</button>
      <button data-value="5">5</button>
      <button data-value="6">6</button>
      <button data-value="7">7</button>
      <button data-value="8">8</button>
      <button data-value="9">9</button>
    </div>
    <div>
      <button data-value="+">+</button>
      <button data-value="-">-</button>
      <button data-value="*">*</button>
      <button data-value="/">/</button>
      <button style="margin-left: auto;" data-action="Enter">Enter</button>
      <button data-action="Delete">Delete</button>
    </div>
  </div>
`;var h=(a=>(a.ADD="ADD",a.ENTER="ENTER",a.DELETE="DELETE",a))(h||{});class M extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}bindButtonsEvents(){var t;const e=(t=this.shadowRoot)==null?void 0:t.querySelectorAll("button");if(e)for(const o of Array.from(e)){const n=o.getAttribute("data-value"),i=o.getAttribute("data-action");o.addEventListener("click",()=>{!!i?(i==="Enter"&&this.dispatchEvent(new CustomEvent("ENTER")),i==="Delete"&&this.dispatchEvent(new CustomEvent("DELETE"))):this.dispatchEvent(new CustomEvent("ADD",{detail:n}))})}}bindKeyboardEvents(){window.addEventListener("keydown",e=>{!isNaN(Number(e.key))||["*","/","+","-"].includes(e.key)?this.dispatchEvent(new CustomEvent("ADD",{detail:String(e.key)})):e.key==="Enter"?this.dispatchEvent(new CustomEvent("ENTER")):e.key==="Backspace"&&this.dispatchEvent(new CustomEvent("DELETE"))})}connectedCallback(){var e;(e=this.shadowRoot)==null||e.appendChild(v.content.cloneNode(!0)),this.bindButtonsEvents(),this.bindKeyboardEvents()}}customElements.define("game-keyboard",M);const y=document.createElement("template");y.innerHTML=`
  <style>
    @keyframes appear {
      0% {
        opacity: 0;
        transform: translateY(-64px) translateX(-50%);
      }
      100% {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
      }
    }
    @keyframes disappear {
      0% {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
      }
      100% {
        opacity: 0;
        transform: translateY(-64px) translateX(-50%);
      }
    }
    .notification {
      position: absolute;
      top: 64px;
      left: 50%;
      transform: translateX(-50%);
      right: 0;
      background-color: var(--game-notification-background-color);
      border-radius: var(--game-notification-border-radius);
      padding: var(--game-notification-padding);
      font-size: var(--game-notification-text-size);
      min-width: 320px;
      line-height: 1rem;
      animation: appear .5s forwards;
    }
    .notification--out {
      animation: disappear .2s forwards;
    }
  </style>
  <div id="root"></div>
`;const I=1500;class H extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){var e;(e=this.shadowRoot)==null||e.appendChild(y.content.cloneNode(!0))}removeNotification(e){e.classList.add("notification--out"),setTimeout(()=>{e==null||e.remove()},200)}addNotification(e){var o;const t=document.createElement("div");t.innerText=e,t.classList.add("notification"),(o=this.shadowRoot)==null||o.appendChild(t),setTimeout(()=>{this.removeNotification(t)},I)}}customElements.define("game-notifications",H);const w=document.createElement("template");w.innerHTML=`
  <span slot="dialog-title">How to play?</span>
  <div slot="dialog-body">
    <style>
      strong {
        font-weight: 700;
      }
      p {
        font-size: 0.875rem;
        margin: 0 0 8px;
      }
      ul {
        margin: 0 0 8px;
        padding-left: 16px;
      }
      ul li {
        margin: 0 0 4px;
        font-size: 0.875rem;
      }
      h3 {
        font-size: 1rem;
        margin: 16px 0 8px;
      }
    </style>
    <p>Try to find the hidden calculation in 6 guesses!</p>
    <p>
      After each guess, the color of the tiles will change to show how
      close you are to the solution.
    </p>
    <ul>
      <li><strong style="color: var(--game-board-result-correct)">Green</strong> are in the correct place.</li>
      <li><strong style="color: var(--game-board-result-different-place)">Orange</strong> are in the solution, but in a different place.</li>
      <li><strong style="color: var(--game-board-result-not-in-solution)">Gray</strong> are not in the solution.</li>
    </ul>
    <h3>Additional rules</h3>
    <ul>
      <li>Numbers and operators can appear multiple times.</li>
      <li>Calculate / or * before - or + (order of operations).</li>
      <li>
        Commutative solutions are accepted, for example 20+7+3 and 3+7+20.
      </li>
      <li>
        Commutative solutions will be automatically rearranged to the
        exact solution.
      </li>
    </ul>
  </div>
`;const E=document.createElement("template");E.innerHTML=`
  <style>
    @keyframes appear {
      0% {
        transform: scale(.875);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    :host(:not([open])), :host(:not(:defined)) {
      display: none;
    }
    button {
      cursor: pointer;
      background: none;
      border: none;
      width: 28px;
    }
    .dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      max-height: 100vh;
      overflow: auto;
      margin: 0 auto;
      max-width: 320px;
      border-radius: var(--game-dialog-border-radius);
      padding: 8px 16px 16px;
      background-color: var(--game-dialog-background-color);
      z-index: 101;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 -8px 8px;
    }
    .dialog-title {
      font-size: var(--game-dialog-title-text-size);
      color: var(--game-dialog-title-text-color);
      margin: 0;
    }
    .dialog-body {
      font-size: 1rem;
      color: #000;
    }
    #backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 100;
      background-color: rgba(0, 0, 0, .25);
    }
    .wrapper {
      position: relative;
      z-index: 101;
      animation: appear .1s linear forwards;
    }
  </style>
  <div id="backdrop"></div>    
  <div class="wrapper">
  <div class="dialog">
    <div class="dialog-header">
      <h3 class="dialog-title">
        <slot name="dialog-title"></slot>
      </h3>
      <button id="close-button">
        <svg
          enable-background="new 0 0 489.8 489.8"
          version="1.1"
          viewBox="0 0 489.8 489.8"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6    C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6    c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z"
          />
          <path
            d="m319 170.8c-4.8-4.8-12.5-4.8-17.3 0l-56.8 56.8-56.8-56.8c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l56.8 56.8-56.8 56.8c-4.8 4.8-4.8 12.5 0 17.3 2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l56.8-56.8 56.8 56.8c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6c4.8-4.8 4.8-12.5 0-17.3l-57-56.8 56.8-56.8c4.8-4.8 4.8-12.5 0-17.3z"
          />
        </svg>
      </button>
    </div>
    <slot class="dialog-body" name="dialog-body"></slot>
    </div>
  </div>
`;var x=(a=>(a.opened="opened",a.closed="closed",a))(x||{});class p extends HTMLElement{constructor(){var t,o,n;super();l(this,"$backdrop");l(this,"$closeButton");this.attachShadow({mode:"open"}),(t=this.shadowRoot)==null||t.appendChild(E.content.cloneNode(!0)),this.$backdrop=(o=this.shadowRoot)==null?void 0:o.getElementById("backdrop"),this.$closeButton=(n=this.shadowRoot)==null?void 0:n.getElementById("close-button"),this.close=this.close.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}get open(){return this.hasAttribute("open")}set open(t){t?this.setAttribute("open",""):this.removeAttribute("open")}static get observedAttributes(){return["open"]}show(){this.open=!0}close(){this.open=!1}onKeyDown(t){t.key==="Escape"&&this.close()}addEventListeners(){window.addEventListener("keydown",this.onKeyDown),this.$backdrop.addEventListener("click",this.close),this.$closeButton.addEventListener("click",this.close)}removeEventListeners(){window.removeEventListener("keydown",this.onKeyDown),this.$backdrop.removeEventListener("click",this.close),this.$closeButton.removeEventListener("click",this.close)}connectedCallback(){this.addEventListeners()}disconnectedCallback(){this.removeEventListeners()}didOpen(){this.dispatchEvent(new CustomEvent("opened"))}didClose(){this.dispatchEvent(new CustomEvent("closed"))}attributeChangedCallback(t){switch(t){case"open":this.open?this.didOpen():this.didClose()}}}customElements.define("game-dialog",p);function m({$content:a,$container:e=document.body,initialize:t=()=>new p}){const o=t();a&&o.appendChild(a);const n=new Promise(i=>{o.addEventListener(x.closed,r=>{o.remove(),i(r)})});return e.appendChild(o),o.show(),{$dialog:o,closePromise:n}}const k=document.createElement("template");k.innerHTML=`
  <style>
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 8px;
    }
    p {
      font-size: .875rem;
      margin: 0 0 16px;
    }
    h3 {
      margin: 0;
    }
    button {
      cursor: pointer;
      margin: 0;
      padding: 0;
      width: 24px;
      height: 24px;
      background: none;
      border: none;
    }
    button svg path {
      transition: fill .1s ease-in;
      fill: var(--game-header-button-color);
    }
    button:hover svg path {
      fill: var(--game-header-hover-button-color);
    }
  </style>
  <header>
    <h3>Mathematica</h3>
    <button id="help-button" type="button">
      <svg enable-background="new 0 0 50 50" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path d="m45 0h-40c-2.75 0-5 2.25-5 5v40c0 2.75 2.25 5 5 5h40c2.75 0 5-2.25 5-5v-40c0-2.75-2.25-5-5-5zm1 45c0 0.542-0.458 1-1 1h-40c-0.542 0-1-0.458-1-1v-40c0-0.542 0.458-1 1-1h40c0.542 0 1 0.458 1 1v40z"/>
          <path d="m24.733 34.318c-0.936 0-1.73 0.322-2.375 0.947-0.645 0.627-0.968 1.414-0.968 2.338 0 1.035 0.334 1.85 1 2.429 0.667 0.581 1.449 0.862 2.342 0.862 0.868 0 1.631-0.297 2.295-0.881 0.656-0.582 0.988-1.395 0.988-2.41 0-0.924-0.32-1.711-0.953-2.338-0.623-0.624-1.405-0.947-2.329-0.947z"/>
          <path d="m30.896 8.772c-1.631-0.791-3.51-1.18-5.629-1.18-2.295 0-4.294 0.473-6.005 1.401-1.718 0.943-3.026 2.126-3.919 3.562-0.893 1.423-1.343 2.839-1.343 4.232 0 0.67 0.281 1.295 0.848 1.889 0.561 0.565 1.258 0.861 2.076 0.861 1.395 0 2.342-0.832 2.844-2.488 0.527-1.574 1.172-2.777 1.935-3.59 0.762-0.817 1.946-1.225 3.564-1.225 1.377 0 2.502 0.406 3.375 1.205 0.871 0.813 1.31 1.802 1.31 2.98 0 0.602-0.147 1.16-0.429 1.66-0.289 0.515-0.643 0.984-1.055 1.397-0.419 0.425-1.103 1.047-2.039 1.866-1.072 0.941-1.922 1.743-2.548 2.428-0.632 0.686-1.138 1.464-1.522 2.382-0.378 0.9-0.57 1.959-0.57 3.199 0 0.975 0.259 1.721 0.783 2.217 0.519 0.496 1.162 0.75 1.923 0.75 1.464 0 2.334-0.768 2.62-2.293 0.161-0.713 0.28-1.211 0.358-1.506 0.084-0.281 0.192-0.562 0.342-0.857 0.149-0.281 0.375-0.602 0.675-0.945 0.294-0.345 0.698-0.736 1.194-1.203 1.805-1.61 3.051-2.753 3.75-3.438 0.697-0.672 1.299-1.486 1.803-2.43 0.507-0.941 0.763-2.037 0.763-3.284 0-1.574-0.441-3.05-1.333-4.388-0.89-1.353-2.146-2.424-3.771-3.202z"/>
      </svg>
    </button>
  </header>
  <p>
    Find the hidden calculation that equals <span id="expressionValue"></span>
  </p>
`;class V extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}setExpressionValue(e){var o;const t=(o=this.shadowRoot)==null?void 0:o.getElementById("expressionValue");t&&(t.innerText=e)}onInfoIconClick(){m({$content:w.content.cloneNode(!0)})}connectedCallback(){var e,t,o;(e=this.shadowRoot)==null||e.appendChild(k.content.cloneNode(!0)),(o=(t=this.shadowRoot)==null?void 0:t.getElementById("help-button"))==null||o.addEventListener("click",()=>{this.onInfoIconClick()})}}customElements.define("game-header",V);const R=document.createElement("template");R.innerHTML=`
  <style>
  #dialog-body {
    min-width: 320px;
  }
  p {
    font-size: .875rem;
    margin: 0 0 8px;
  }
  button {
    color: var(--game-dialog-button-text-color);
    border: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: var(--game-dialog-button-background-color);
  }
  button:hover {
    background-color: var(--game-dialog-button-hover-background-color);
  }
  </style>
  <span slot="dialog-title">This time you failed</span>
  <div id="dialog-body" slot="dialog-body">
    <p>
      Unfortunately, you have not been able to find a solution. You can
      try again however, it will make your statistics worse.
    </p>
    <button id="try-again-button" type="button">Try again</button>
  </div>
`;class L extends p{constructor(){super(),this.appendChild(R.content.cloneNode(!0)),this.onTryAgainClick=this.onTryAgainClick.bind(this)}onTryAgainClick(){const e=document.querySelector("mathler-game");e&&e.onTryAgain(),this.close()}addEventListeners(){var e;super.addEventListeners(),(e=this.querySelector("#try-again-button"))==null||e.addEventListener("click",this.onTryAgainClick)}removeEventListeners(){var e;super.removeEventListeners(),(e=this.querySelector("#try-again-button"))==null||e.removeEventListener("click",this.onTryAgainClick)}}customElements.define("fail-dialog",L);const C=document.createElement("template");C.innerHTML=`
  <style>
  #dialog-body {
    min-width: 320px;
  }
  button {
    cursor: pointer;
    border: none;
    display: block;
    margin: 16px auto 0;
    border-radius: var(--game-dialog-button-radius);
    font-size: var(--game-dialog-button-text-size);
    background-color: var(--game-dialog-button-background-color);
  }
  button:hover {
    background-color: var(--game-dialog-button-hover-background-color);
  }
  </style>
  <span slot="dialog-title">Success!</span>
  <div id="dialog-body" slot="dialog-body">
  <p>You managed to find the result</p>
  <button id="restart-button">Restart</button>
  </div>
`;class T extends p{constructor(){super();l(this,"$restartButton");this.appendChild(C.content.cloneNode(!0)),this.$restartButton=this.querySelector("#restart-button"),this.onRestartClick=this.onRestartClick.bind(this),this.$restartButton.addEventListener("click",this.onRestartClick)}onRestartClick(){document.querySelector("mathler-game").reset(),this.close()}}customElements.define("success-dialog",T);var g=(a=>(a.GUESSES="guesses",a.STATS="stats",a))(g||{});const S=document.createElement("template");S.innerHTML=`
  <game-header></game-header>
  <game-board id="game-board"></game-board>
  <game-keyboard></game-keyboard>
  <game-notifications></game-notifications>
`;class q extends HTMLElement{constructor(){var t,o,n,i,r;super();l(this,"$header");l(this,"$board");l(this,"$keyboard");l(this,"$notifications");l(this,"currentCol",0);l(this,"currentRow",0);l(this,"guesses",[[],[],[],[],[],[]]);l(this,"expectedResult");l(this,"expectedResultValue");l(this,"finishGame",!1);this.expectedResult="8/4+11",this.expectedResultValue=13,this.attachShadow({mode:"open"}),(t=this.shadowRoot)==null||t.appendChild(S.content.cloneNode(!0)),this.$header=(o=this.shadowRoot)==null?void 0:o.querySelector("game-header"),this.$board=(n=this.shadowRoot)==null?void 0:n.querySelector("game-board"),this.$keyboard=(i=this.shadowRoot)==null?void 0:i.querySelector("game-keyboard"),this.$notifications=(r=this.shadowRoot)==null?void 0:r.querySelector("game-notifications"),this.onAdd=this.onAdd.bind(this),this.onDelete=this.onDelete.bind(this),this.onEnter=this.onEnter.bind(this),this.attachEvents(),this.readLocalStorageState(),this.update(),this.$header.setExpressionValue(String(this.expectedResultValue)),window.mathler=this}onAdd(t){if(this.finishGame)return;const{detail:o}=t;this.currentCol>=6||(this.guesses[this.currentRow][this.currentCol]=o,this.currentCol+=1,this.update())}onDelete(){this.finishGame||!this.currentCol||(delete this.guesses[this.currentRow][this.currentCol-1],this.currentCol-=1,this.update())}validateCurrentRowResult(){return this.guesses[this.currentRow].join("")===this.expectedResult}onEnter(){if(this.finishGame)return;const t=this.guesses[this.currentRow].join("");if(t.length<6)return this.notify("The specified expression is too short. It should fill all the columns.");const o=A(t),n=N(t);if(!o||!n)return this.notify("The given expression is an incorrect mathematical expression or is the number itself.");if(n!==this.expectedResultValue)return this.notify(`The result of the expression should be ${this.expectedResultValue}`);t===this.expectedResult?(this.currentRow+=1,this.showFinishGameDialog(),this.finishGame=!0):this.currentRow<5?(this.currentCol=0,this.currentRow+=1):(this.currentRow+=1,this.showFailGameDialog(),this.finishGame=!0),this.saveStateToLocalStorage(),this.update()}reset(){this.finishGame=!1,this.guesses=[[],[],[],[],[],[]],this.currentCol=0,this.currentRow=0,this.update(),this.saveStateToLocalStorage()}onTryAgain(){this.reset()}attachEvents(){this.$keyboard.addEventListener(h.ADD,this.onAdd),this.$keyboard.addEventListener(h.DELETE,this.onDelete),this.$keyboard.addEventListener(h.ENTER,this.onEnter)}readLocalStorageState(){try{const t=localStorage.getItem(g.GUESSES);if(t){const o=JSON.parse(t);this.guesses=o,this.currentRow=o.reduce((n,i)=>i.length?n+1:n,0),this.currentRow&&this.guesses[this.currentRow-1].join("")===this.expectedResult&&(this.finishGame=!0,this.showFinishGameDialog())}}catch{}}saveStateToLocalStorage(){localStorage.setItem(g.GUESSES,JSON.stringify(this.guesses))}saveStatsToLocalStorage(){}update(){console.log(this.guesses,this.expectedResult,this.currentRow),this.$board.updateBoard({guesses:this.guesses,expectedResult:this.expectedResult,currentRow:this.currentRow})}notify(t){this.$notifications.addNotification(t)}showFailGameDialog(){m({initialize:()=>new L})}showFinishGameDialog(){m({initialize:()=>new T})}}customElements.define("mathler-game",q);
