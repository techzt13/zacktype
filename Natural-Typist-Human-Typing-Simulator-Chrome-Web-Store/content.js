!function(){if(window.naturalTypistInitialized)return;window.naturalTypistInitialized=!0;let e=()=>{let e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,./;'[]=-`%";return e.charAt(Math.floor(Math.random()*e.length))},t=e=>{let t={q:["w","a","s"],w:["q","e","a","s","d"],e:["w","r","s","d","f"],r:["e","t","d","f","g"],t:["r","y","f","g","h"],y:["t","u","g","h","j"],u:["y","i","h","j","k"],i:["u","o","j","k","l"],o:["i","p","k","l"],p:["o","l"],a:["q","w","s","z"],s:["q","w","e","a","d","z","x"],d:["w","e","r","s","f","x","c"],f:["e","r","t","d","g","c","v"],g:["r","t","y","f","h","v","b"],h:["t","y","u","g","j","b","n"],j:["y","u","i","h","k","n","m"],k:["u","i","o","j","l","m"],l:["i","o","p","k"],z:["a","s","x"],x:["z","s","d","c"],c:["x","d","f","v"],v:["c","f","g","b"],b:["v","g","h","n"],n:["b","h","j","m"],m:["n","j","k"]},n=e.toLowerCase();if(t[n]){let a=t[n],i=a[Math.floor(Math.random()*a.length)];return e===e.toUpperCase()?i.toUpperCase():i}let r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";return r.charAt(Math.floor(Math.random()*r.length))},n=(e,t)=>{if(0===t)return!1;let n=!1,a=null;for(let i=0;i<t;i++){let r=e[i];'"'!==r&&"'"!==r&&"`"!==r||n?r===a&&n&&(n=!1,a=null):(n=!0,a=r)}return n},a=(e,t)=>{if(t<1||t>=e.length)return!1;let n=e[t],a=e[t-1],i=t<e.length-1?e[t+1]:"";if(/\d/.test(n)||"%"===n&&/\d/.test(a))return!0;if(/\d/.test(a)||i&&/\d/.test(i)){let r=Math.min(e.length,t+6),o=e.substring(Math.max(0,t-5),r);return/\d+%/.test(o)||/\d{1,2}\/\d{1,2}\/\d{4}/.test(o)||/\d{4}-\d{4}/.test(o)||/\b\d+(?:\.\d+)?\b/.test(o)}return!1},i=(e,t)=>{if(t<3||t>=e.length-1)return!1;let n=Math.max(0,t-3),a=Math.min(e.length,t+4),i=e.substring(n,a),r=i.match(/(?:^|\D)((19|20)\d{2})(?:\D|$)/);if(!r)return!1;let o=n+i.indexOf(r[1]);return t>=o&&t<o+4},r=(e,t)=>{if(0===t)return!1;let n=0,a=!1,i=null;for(let r=0;r<t;r++){let o=e[r];'"'!==o&&"'"!==o&&"`"!==o||a?o===i&&a&&(a=!1,i=null):(a=!0,i=o),a||("("===o&&n++,")"===o&&(n=Math.max(0,n-1)))}return n>0};function o(e,t,n,a){let i=1,r=t>0?a[t-1]:"",o=t<n-1?a[t+1]:"",s=/\d|[\+\-\*\/=<>%]/.test(a[t]),l=s||/\d/.test(r)&&s||/\d/.test(o)&&s;return l?i=.6+.3*Math.random():"'"===a[t]||"`"===a[t]?i=.8+.3*Math.random():t<.1*n?i=.9+.2*Math.random():/\d|[^\w\s]/.test(a[t])?i=1.2+.3*Math.random():.25>Math.random()?i=.7+.6*Math.random():t<n-1&&".!?".includes(a[t+1])?i=1.1+.2*Math.random():t>0&&t<n-1&&/\w/.test(a[t])&&/\w/.test(a[t-1])&&/\w/.test(a[t+1])&&(i=.8+.3*Math.random()),e*i}if(void 0===s)var s={isMinimized:!1,position:{x:20,y:20},isDragging:!1,dragOffset:{x:0,y:0},settings:{rememberText:!0,darkMode:!0,defaultSpeed:60,defaultErrorRate:5,enableBreaks:!1,aiDetection:!1,minBreakTime:1,maxBreakTime:5,breakFrequency:5}};let l=!1,d,$=0,c="",_=!1,p=null;function u(){if(localStorage.setItem("naturalTypistSettings",JSON.stringify(s.settings)),s.settings.rememberText){let e=document.getElementById("naturalTypistInput");e&&localStorage.setItem("naturalTypistText",e.value)}else localStorage.removeItem("naturalTypistText")}function g(){chrome.runtime.sendMessage({action:"openOptionsPage"})}function y(){window.open("https://discord.gg/SZdHy8FaCs","_blank")}function b(){let e=document.getElementById("naturalTypistInput"),t=document.querySelector(".character-count");e&&t&&(t.textContent=`${e.value.length} chars`)}function h(e){let t=document.getElementById("naturalTypistAICheckPopup");t&&t.remove();let n=document.createElement("div");n.id="naturalTypistAICheckPopup",n.style.cssText=`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1e1e1e;
    border: 1px solid #444;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    z-index: 10001;
    font-family: 'Inter', sans-serif;
    color: #f1f1f1;
    width: 300px;
    animation: slideInUp 0.3s ease;
  `,n.innerHTML=`
    <div style="margin-bottom: 12px;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #f1f1f1;">
        Check Text for AI?
      </h4>
      <p style="margin: 0; font-size: 12px; color: #aaa; line-height: 1.4;">
        Do you want to analyze this text for AI content and humanize it?
      </p>
    </div>
    <div style="display: flex; gap: 8px; justify-content: flex-end;">
      <button id="aiCheckNo" style="
        padding: 8px 16px;
        background: #444;
        border: 1px solid #555;
        border-radius: 6px;
        color: #f1f1f1;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      ">No</button>
      <button id="aiCheckYes" style="
        padding: 8px 16px;
        background: #3b82f6;
        border: none;
        border-radius: 6px;
        color: white;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      ">Yes</button>
    </div>
  `,document.body.appendChild(n);let a=document.createElement("style");a.textContent=`
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,document.head.appendChild(a),document.getElementById("aiCheckNo").addEventListener("click",()=>{n.remove()}),document.getElementById("aiCheckYes").addEventListener("click",()=>{(function e(t){let n=encodeURIComponent(t),a=`https://naturaltypist.com/humanize?text=${n}&source=extension`;window.open(a,"_blank")})(e),n.remove()}),setTimeout(()=>{n.parentNode&&(n.style.animation="slideInUp 0.3s ease reverse",setTimeout(()=>n.remove(),300))},1e4)}function f(){let e=document.getElementById("naturalTypistInput");if(!e||!s.settings.aiDetection)return;let t="",n=null,a=!1;e.addEventListener("input",function(){let i=this.value;n&&clearTimeout(n),i.length>100&&i.length>t.length+50&&!a&&(n=setTimeout(()=>{let t=document.getElementById("naturalTypistAICheckPopup");!t&&e.value.length>100&&(h(i),a=!0)},1500)),t=i}),e.addEventListener("paste",function(e){a=!1,setTimeout(()=>{let e=this.value,t=document.getElementById("naturalTypistAICheckPopup");!(e.length>100)||t||a||(h(e),a=!0)},100)}),e.addEventListener("focus",function(){0===this.value.length&&(a=!1)})}function m(e){let t=document.querySelector(".progress-fill"),n=document.querySelector(".progress-text");t&&n&&(t.style.width=`${e}%`,n.textContent=`${Math.round(e)}%`)}function x(e){let t=document.getElementById("breakIndicator");if(t){if(null===e||e<=0){t.style.display="none";return}t.style.display="block",t.textContent=`On break: ${Math.floor(e/6e4)}m ${Math.floor(e%6e4/1e3)}s`}}function k(){_=!_;let e=document.getElementById("naturalTypistPause");e&&(e.innerHTML=_?`<span>Resume</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="2 1.7 13 13">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
</svg>`:`<span>Pause</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="2 1.7 13 13">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>`),!_&&l&&C(c,parseInt(document.getElementById("naturalTypistSpeed").value),parseInt(document.getElementById("naturalTypistErrorRate").value)/100,$)}function w(){let e=document.getElementById("naturalTypistInput").value,t=parseInt(document.getElementById("naturalTypistSpeed").value),n=parseInt(document.getElementById("naturalTypistErrorRate").value)/100;if(!e){!function e(t,n=3e3){let a=document.getElementById("naturalTypistToast");a&&a.remove();let i=document.createElement("div");i.id="naturalTypistToast",i.textContent=t,i.style.cssText=`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #ff6b6b;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease;
  `,document.body.appendChild(i),setTimeout(()=>{i.parentNode&&(i.style.animation="fadeOut 0.3s ease",setTimeout(()=>i.remove(),300))},n)}("Please enter some text to type");return}l&&c===e||($=0,c=e),document.getElementById("naturalTypistStart").classList.add("hidden"),document.getElementById("naturalTypistPause").classList.remove("hidden"),document.getElementById("naturalTypistPause").disabled=!1,document.getElementById("naturalTypistStop").disabled=!1,document.querySelector(".progress-container").classList.remove("hidden"),_=!1,startTime=Date.now(),l=!0,C(e,t,n,$)}function v(){T(),document.getElementById("naturalTypistStart").classList.remove("hidden"),document.getElementById("naturalTypistPause").classList.add("hidden"),document.getElementById("naturalTypistStop").disabled=!0,document.querySelector(".progress-container").classList.add("hidden"),m(0),x(null);let e=document.getElementById("naturalTypistPause");e&&(e.innerHTML=`<span>Pause</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="2 1.7 13 13">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
    </svg>`),_=!1}function E(e){if(!s.settings.enableBreaks){e();return}let t=6e4*s.settings.minBreakTime,n=6e4*s.settings.maxBreakTime,a=Math.floor(Math.random()*(n-t+1))+t;x(a),p&&clearTimeout(p),p=setTimeout(()=>{x(null),l&&!_&&e()},a);let i=Date.now(),r=setInterval(()=>{if(!l||_){clearInterval(r),x(null);return}let e=Date.now()-i,t=a-e;if(t<=0){clearInterval(r);return}x(t)},1e3)}async function C(p,u=60,g=.05,y=0){let b=document.querySelector(".docs-texteventtarget-iframe");if(!b){console.error("Google Docs editor not found");return}let h=b.contentDocument.activeElement;if(!h){console.error("Could not focus Google Docs editor");return}function f(e){let t=1;e>100?t=.7:e>80&&(t=.8);let n=6e4/(5*e)*(.8+.4*Math.random())*t;return Math.max(5,n)}function x(e){return" "===e?"Space":"!"===e?"Digit1":"@"===e?"Digit2":"#"===e?"Digit3":"$"===e?"Digit4":"%"===e?"Digit5":"^"===e?"Digit6":"&"===e?"Digit7":"*"===e?"Digit8":"("===e?"Digit9":")"===e?"Digit0":"-"===e||"_"===e?"Minus":"="===e||"+"===e?"Equal":"["===e?"BracketLeft":"]"===e?"BracketRight":"{"===e?"BracketLeft":"}"===e?"BracketRight":"|"===e||"\\"===e?"Backslash":";"===e||":"===e?"Semicolon":"'"===e||'"'===e?"Quote":","===e||"<"===e?"Comma":"."===e||">"===e?"Period":"/"===e||"?"===e?"Slash":"`"===e||"~"===e?"Backquote":`Key${e.toUpperCase()}`}async function k(){h.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,30)),h.dispatchEvent(new KeyboardEvent("keypress",{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,30)),h.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,which:13,bubbles:!0,cancelable:!0}))}async function w(e){if("\n"===e)return await k(),100+150*Math.random();if("\b"===e)return h.dispatchEvent(new KeyboardEvent("keydown",{key:"Backspace",code:"Backspace",keyCode:8,which:8,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,15)),h.dispatchEvent(new KeyboardEvent("keypress",{key:"Backspace",code:"Backspace",keyCode:8,which:8,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,15)),h.dispatchEvent(new KeyboardEvent("keyup",{key:"Backspace",code:"Backspace",keyCode:8,which:8,bubbles:!0,cancelable:!0})),50;{let t='!@#$%^&*()_+{}|:"<>?~'.includes(e);if(t){var n;let a={"!":{code:"Digit1",keyCode:49},"@":{code:"Digit2",keyCode:50},"#":{code:"Digit3",keyCode:51},$:{code:"Digit4",keyCode:52},"%":{code:"Digit5",keyCode:53},"^":{code:"Digit6",keyCode:54},"&":{code:"Digit7",keyCode:55},"*":{code:"Digit8",keyCode:56},"(":{code:"Digit9",keyCode:57},")":{code:"Digit0",keyCode:48},_:{code:"Minus",keyCode:189},"+":{code:"Equal",keyCode:187},"{":{code:"BracketLeft",keyCode:219},"}":{code:"BracketRight",keyCode:221},"|":{code:"Backslash",keyCode:220},":":{code:"Semicolon",keyCode:186},'"':{code:"Quote",keyCode:222},"<":{code:"Comma",keyCode:188},">":{code:"Period",keyCode:190},"?":{code:"Slash",keyCode:191},"~":{code:"Backquote",keyCode:192}}[n=e]||{code:x(n),keyCode:n.charCodeAt(0)};h.dispatchEvent(new KeyboardEvent("keydown",{key:"Shift",code:"ShiftLeft",keyCode:16,which:16,shiftKey:!0,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,8)),h.dispatchEvent(new KeyboardEvent("keydown",{key:e,code:a.code,keyCode:a.keyCode,which:a.keyCode,shiftKey:!0,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,10)),h.dispatchEvent(new KeyboardEvent("keypress",{key:e,code:a.code,keyCode:e.charCodeAt(0),which:e.charCodeAt(0),shiftKey:!0,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,10)),h.dispatchEvent(new KeyboardEvent("keyup",{key:e,code:a.code,keyCode:a.keyCode,which:a.keyCode,shiftKey:!0,bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,8)),h.dispatchEvent(new KeyboardEvent("keyup",{key:"Shift",code:"ShiftLeft",keyCode:16,which:16,shiftKey:!1,bubbles:!0,cancelable:!0}))}else h.dispatchEvent(new KeyboardEvent("keydown",{key:e,code:x(e),keyCode:e.charCodeAt(0),which:e.charCodeAt(0),bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,15)),h.dispatchEvent(new KeyboardEvent("keypress",{key:e,code:x(e),keyCode:e.charCodeAt(0),which:e.charCodeAt(0),bubbles:!0,cancelable:!0})),await new Promise(e=>setTimeout(e,15)),h.dispatchEvent(new KeyboardEvent("keyup",{key:e,code:x(e),keyCode:e.charCodeAt(0),which:e.charCodeAt(0),bubbles:!0,cancelable:!0}));let i=0;return",.?!".includes(e)?i=100+200*Math.random():" "===e&&(i=25+50*Math.random()),i}}async function v(n){let a=/[a-zA-Z]/.test(n)?t(n):e();await w(a);let i=100+150*Math.random();return await new Promise(e=>setTimeout(e,i)),await w("\b"),await new Promise(e=>setTimeout(e,80+120*Math.random())),await w(n),200+300*Math.random()}async function C(n){let a=Math.floor(3*Math.random());if(0===a){let i=t(n)||e();return await w(i),await new Promise(e=>setTimeout(e,120)),await w("\b"),await new Promise(e=>setTimeout(e,80)),await w(n),300}if(1===a){let r=t(n)||e(),o=t(n)||e();return await w(r),await new Promise(e=>setTimeout(e,80)),await w(o),await new Promise(e=>setTimeout(e,70)),await new Promise(e=>setTimeout(e,200)),await w("\b"),await new Promise(e=>setTimeout(e,60)),await w("\b"),await new Promise(e=>setTimeout(e,60)),await w(n),500}{let s=n===n.toUpperCase()?n.toLowerCase():n.toUpperCase();return await w(s),await new Promise(e=>setTimeout(e,150)),await w("\b"),await new Promise(e=>setTimeout(e,80)),await w(n),350}}async function T(){let e=0,t=2*p.length;for(;$<p.length&&l&&!_&&!(++e>t);){let c=p[$];if("\r"===c){$++;continue}let y=$/p.length*100;m(y);let b=f(u);b=o(b,$,p.length,p);let h=0;if(.3>Math.random()){let x=.7+.6*Math.random();b*=x}if(h=!(Math.random()<g)||" "===c||"\n"===c||"\r"===c||'"'===c||"'"===c||"`"===c||i(p,$)||r(p,$)||n(p,$)||a(p,$)?await w(c):/\w/.test(c)&&.4>Math.random()?await C(c):await v(c),$++,s.settings.enableBreaks&&$<p.length){let k=p[$],T=" .!?,;\n".includes(c),I=T||" "===c&&" "!==k,B=".!?\n".includes(c);if(I){let S=s.settings.breakFrequency||5,z=0,L=z=S<=2?.8:S<=4?.6:S<=6?.4:S<=8?.2:.1;B&&(L*=1.5);let M=$-(window.lastBreakPosition||0);M<500&&(L*=.1),S>=8&&(L*=.5),Math.random()<L&&(window.lastBreakPosition=$,await new Promise(e=>{E(e)}))}}if(!_&&l&&$<p.length){let D=b;await new Promise(e=>{d=setTimeout(e,D=u>100?b+.3*h:b+h)})}}if($>=p.length&&l){l=!1,_=!1,m(100);let A=document.getElementById("naturalTypistStop"),q=document.getElementById("naturalTypistStart"),P=document.getElementById("naturalTypistPause");A&&(A.disabled=!0),q&&q.classList.remove("hidden"),P&&(P.classList.add("hidden"),P.disabled=!0)}}h.focus(),$=y,c=p,l=!0,_=!1,clearTimeout(d),await T()}function T(){l=!1,_=!1,clearTimeout(d),clearTimeout(p),$=0,m(0),x(null)}window.naturalTypistMessageListenerAdded||(window.naturalTypistMessageListenerAdded=!0,chrome.runtime.onMessage.addListener((e,t,n)=>{if("toggleUI"===e.action){let a=document.getElementById("naturalTypistUI");a?(T(),a.remove(),window.naturalTypistInitialized=!1):function e(){let t=document.getElementById("naturalTypistUI");t&&t.remove();let n=document.createElement("style");n.textContent=`
      .natural-typist-container {
        position: fixed;
        width: 320px;
        background: #1e1e1e;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 9999;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow: hidden;
        border: 1px solid #444;
        transition: all 0.2s ease;
        user-select: none;
        color: #f1f1f1;
      }

      .natural-typist-container.light-mode {
        background: #ffffff;
        border: 1px solid #e0e0e0;
        color: #333333;
      }

      .natural-typist-container.light-mode .natural-typist-header {
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
        color: #333333;
      }

      .natural-typist-container.light-mode .natural-typist-header h3 {
        color: #333333;
      }

      .natural-typist-container.light-mode .natural-typist-body {
        background: #ffffff;
        color: #333333;
      }

      .natural-typist-container.light-mode .control-card {
        background: #f9f9f9;
        border: 1px solid #e0e0e0;
      }

      .natural-typist-container.light-mode #naturalTypistInput {
        background: #f5f5f5;
        border: 1px solid #e0e0e0;
        color: #333333;
      }

      .natural-typist-container.light-mode .natural-typist-footer {
        background: #f5f5f5;
        border-top: 1px solid #e0e0e0;
      }

      .natural-typist-container.light-mode .secondary-btn {
        background-color: #e0e0e0;
        color: #333333;
        border: 1px solid #d0d0d0;
      }

      .natural-typist-container.light-mode .minimize-btn, 
      .natural-typist-container.light-mode .close-btn {
        color: #666666;
      }

      .natural-typist-container.light-mode .minimize-btn:hover,
      .natural-typist-container.light-mode .close-btn:hover {
        background: #e0e0e0;
      }
  
      .natural-typist-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #161616;
        border-bottom: 1px solid #444;
        cursor: grab;
      }
  
      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
  
      .natural-typist-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #f1f1f1;
      }
  
      .version-badge {
        font-size: 10px;
        background: #444;
        padding: 2px 6px;
        border-radius: 12px;
        color: #aaa;
        font-weight: 500;
      }

      .natural-typist-container.light-mode .version-badge {
        background: #e0e0e0;
        color: #666666;
      }
  
      .header-right {
        display: flex;
        align-items: center;
        gap: 6px;
      }
  
      .minimize-btn, .close-btn, .settings-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #aaa;
        padding: 4px;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
  
      .minimize-btn:hover, .settings-btn:hover {
        background: #444;
        color: #fff;
      }

      .natural-typist-container.light-mode .minimize-btn:hover,
      .natural-typist-container.light-mode .settings-btn:hover {
        background: #e0e0e0;
      }
  
      .close-btn:hover {
        background: #444;
        color: #ff6b6b;
      }

      .natural-typist-container.light-mode .close-btn:hover {
        background: #e0e0e0;
      }
  
      .natural-typist-body {
        padding: 16px;
        background: #1e1e1e;
      }

      .natural-typist-container.light-mode .natural-typist-body {
        background: #ffffff;
      }
  
      .text-input-container {
        position: relative;
        margin-bottom: 16px;
      }

      #naturalTypistInput {
        width: 100%;
        height: 100px;
        padding: 12px;
        border: 1px solid #444;
        border-radius: 8px;
        resize: none;
        font-family: inherit;
        background: #252525;
        color: #f1f1f1;
        font-size: 13px;
        line-height: 1.5;
        transition: all 0.2s;
        box-sizing: border-box;
      }

      .natural-typist-container.light-mode #naturalTypistInput:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      }

      #naturalTypistInput:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
      }

      .character-count {
        position: absolute;
        bottom: 10px;
        right: 10px;
        font-size: 10px;
        color: #aaa;
        background: rgba(30, 30, 30, 0.8);
        padding: 2px 6px;
        border-radius: 4px;
      }

      .natural-typist-container.light-mode .character-count {
        color: #666666;
        background: rgba(245, 245, 245, 0.8);
      }
  
      .controls-grid {
        display: grid;
        gap: 12px;
        margin-bottom: 16px;
      }
  
      .control-card {
        background: #252525;
        border-radius: 8px;
        padding: 12px;
        border: 1px solid #444;
      }

      .natural-typist-container.light-mode .control-card {
        background: #f9f9f9;
        border: 1px solid #e0e0e0;
      }
  
      .control-card label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        font-size: 12px;
        color: #aaa;
        font-weight: 500;
      }

      .natural-typist-container.light-mode .control-card label {
        color: #666666;
      }
  
      .value-display {
        font-weight: 600;
        color: #f1f1f1;
        font-size: 12px;
      }

      .natural-typist-container.light-mode .value-display {
        color: #333333;
      }
  
      input[type="range"] {
        width: 100%;
        -webkit-appearance: none;
        height: 4px;
        background: #444;
        border-radius: 3px;
        outline: none;
        margin-bottom: 4px;
      }

      .natural-typist-container.light-mode input[type="range"] {
        background: #e0e0e0;
      }
  
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #3b82f6;
        cursor: pointer;
        transition: all 0.2s;
        border: 2px solid #252525;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .natural-typist-container.light-mode input[type="range"]::-webkit-slider-thumb {
        border: 2px solid #f9f9f9;
      }
  
      input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        background: #2563eb;
      }
  
      .slider-labels {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        color: #777;
      }

      .natural-typist-container.light-mode .slider-labels {
        color: #999999;
      }

      .toggle-switch {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 18px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #444;
        transition: .4s;
        border-radius: 20px;
      }

      .natural-typist-container.light-mode .toggle-slider {
        background-color: #d0d0d0;
      }

      .toggle-slider:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }

      input:checked + .toggle-slider {
        background-color: #3b82f6;
      }

      input:checked + .toggle-slider:before {
        transform: translateX(14px);
      }

      .progress-container {
        margin-bottom: 12px;
      }

      .progress-bar {
        height: 4px;
        background: #444;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 4px;
      }

      .natural-typist-container.light-mode .progress-bar {
        background: #e0e0e0;
      }

      .progress-fill {
        height: 100%;
        background: #3b82f6;
        width: 0%;
        transition: width 0.3s ease;
      }

      .progress-text {
        font-size: 10px;
        color: #aaa;
        text-align: right;
      }

      .natural-typist-container.light-mode .progress-text {
        color: #666666;
      }
  
      .action-buttons {
        display: flex;
        gap: 8px;
      }
  
      .primary-btn, .secondary-btn {
        flex: 1;
        padding: 10px 0;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
  
      .primary-btn {
        background-color: #3b82f6;
        color: white;
      }
  
      .primary-btn:hover {
        background-color: #2563eb;
      }
  
      .primary-btn:disabled {
        background-color: #1e3a8a;
        cursor: not-allowed;
      }
  
      .secondary-btn {
        background-color: #444;
        color: #f1f1f1;
        border: 1px solid #555;
      }

      .natural-typist-container.light-mode .secondary-btn {
        background-color: #e0e0e0;
        color: #333333;
        border: 1px solid #d0d0d0;
      }
  
      .secondary-btn:hover {
        background-color: #555;
        border-color: #666;
      }

      .natural-typist-container.light-mode .secondary-btn:hover {
        background-color: #d0d0d0;
        border-color: #c0c0c0;
      }
  
      .secondary-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
  
      .natural-typist-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  font-size: 11px;
  color: #777;
  border-top: 1px solid #444;
  background: #161616;
  flex-wrap: nowrap;
}

      .natural-typist-container.light-mode .natural-typist-footer {
        background: #f5f5f5;
        border-top: 1px solid #e0e0e0;
        color: #666666;
      }
  
      .creator-info {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

      .natural-typist-container.dragging {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
      }
  
      .natural-typist-container.minimized .natural-typist-body,
      .natural-typist-container.minimized .natural-typist-footer {
        display: none;
      }

      .hidden {
        display: none !important;
      }

      .gear-icon {
        width: 16px;
        height: 16px;
        transition: transform 0.3s ease;
      }

      .gear-icon.rotated {
        transform: rotate(45deg);
      }

            .break-indicator {
        font-size: 11px;
        color: #ff6b6b;
        margin-top: 4px;
        text-align: center;
        display: none;
        font-weight: 500;
        padding: 4px 8px;
        background: rgba(255, 107, 107, 0.1);
        border-radius: 4px;
        border: 1px solid rgba(255, 107, 107, 0.3);
      }

      .natural-typist-container.light-mode .break-indicator {
        color: #dc2626;
        background: rgba(255, 107, 107, 0.08);
        border-color: rgba(255, 107, 107, 0.2);
      }

      .footer-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
}
      .feedback-link {
        background: none;
        border: none;
        color: #777;
        text-decoration: underline;
        cursor: pointer;
        font-size: 11px;
        padding: 2px 4px;
        border-radius: 4px;
        transition: all 0.2s;
        text-decoration: none;
        margin-left: 0px;
      }

      .feedback-link:hover {
        color: #3b82f6;
        background: rgba(59, 130, 246, 0.1);
      }

      .natural-typist-container.light-mode .feedback-link {
        color: #666666;
      }

      .natural-typist-container.light-mode .feedback-link:hover {
        color: #2563eb;
        background: rgba(59, 130, 246, 0.1);
      }

      .discord-link {
        background: none;
        border: none;
        color: #777;
        cursor: pointer;
        padding: 2px 4px;
        border-radius: 4px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }

      .discord-link:hover {
        color: #5865f2;
        background: rgba(88, 101, 242, 0.1);
      }

      .natural-typist-container.light-mode .discord-link {
        color: #666666;
      }

      .natural-typist-container.light-mode .discord-link:hover {
        color: #4752c4;
        background: rgba(88, 101, 242, 0.1);
      }

      @keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
}
    `,document.head.appendChild(n);let a=document.createElement("div");a.id="naturalTypistUI",a.className=`natural-typist-container ${s.settings.darkMode?"":"light-mode"}`,a.style.left=`${s.position.x}px`,a.style.top=`${s.position.y}px`,a.innerHTML=`
      <div class="natural-typist-header">
        <div class="header-left">
          <h3>Natural Typist</h3>
          <span class="version-badge">v1.5.0</span>
        </div>
        <div class="header-right">
          <button class="settings-btn" title="Settings">
            <svg class="gear-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
          </button>
          <button class="minimize-btn" title="Minimize">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14"/>
            </svg>
          </button>
          <button class="close-btn" title="Close">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="natural-typist-body">
        <div class="text-input-container">
          <textarea id="naturalTypistInput" placeholder="Enter text to type..."></textarea>
          <div class="character-count">0 chars</div>
        </div>
        
        <div class="progress-container hidden">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-text">0%</div>
          <div class="break-indicator" id="breakIndicator">On break: --</div>
        </div>
        
        <div class="controls-grid">
          <div class="control-card">
            <label for="naturalTypistSpeed">
              <span>Typing Speed</span>
              <span id="speedValue" class="value-display">60 WPM</span>
            </label>
            <input type="range" id="naturalTypistSpeed" min="30" max="150" value="60">
            <div class="slider-labels">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>
          
          <div class="control-card">
            <label for="naturalTypistErrorRate">
              <span>Error Rate</span>
              <span id="errorValue" class="value-display">5%</span>
            </label>
            <input type="range" id="naturalTypistErrorRate" min="0" max="20" value="5">
            <div class="slider-labels">
              <span>Precise</span>
              <span>Mistakes</span>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button id="naturalTypistStart" class="primary-btn">
            <span>Start</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="2 1.7 13 13">
  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
</svg>
          </button>
          <button id="naturalTypistPause" class="secondary-btn hidden" disabled>
            <span>Pause</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="2 1.7 13 13">
  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
</svg>
          </button>
          <button id="naturalTypistStop" class="secondary-btn" disabled>
            <span>Stop</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop" viewBox="2 1.7 13 13">
  <path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5z"/>
</svg>
          </button>
        </div>
      </div>
      
       <div class="natural-typist-footer">
  <div class="creator-info">
    <span>Created by ialwaysw1n</span>
  </div>
  <div class="footer-buttons">
    <button class="discord-link" title="Join Discord">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-discord" viewBox="0 0 16 16">
        <path
          d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
      </svg>
    </button>
    <button class="feedback-link">Feedback</button>
  </div>
</div>
</div>
    `,document.body.appendChild(a),function e(){let t=document.getElementById("naturalTypistUI"),n=t.querySelector(".natural-typist-header"),a=t.querySelector(".minimize-btn"),i=t.querySelector(".settings-btn"),r=document.getElementById("naturalTypistSpeed"),o=document.getElementById("naturalTypistErrorRate"),l=document.getElementById("naturalTypistInput"),d=document.querySelector(".feedback-link");d&&d.addEventListener("click",g);let $=document.querySelector(".discord-link");$&&$.addEventListener("click",function(){window.open("https://discord.gg/SZdHy8FaCs","_blank")}),function e(){let t=localStorage.getItem("naturalTypistSettings");if(t)try{let n=JSON.parse(t);s.settings={...s.settings,...n}}catch(a){}let i=document.getElementById("naturalTypistUI");if(i&&i.classList.toggle("light-mode",!s.settings.darkMode),s.settings.rememberText){let r=localStorage.getItem("naturalTypistText");if(r){let o=document.getElementById("naturalTypistInput");o&&(o.value=r,b())}}}(),r.value=s.settings.defaultSpeed,o.value=s.settings.defaultErrorRate,l.addEventListener("input",b);let c=()=>{document.getElementById("speedValue").textContent=`${r.value} WPM`,s.settings.defaultSpeed=parseInt(r.value),u()},_=()=>{document.getElementById("errorValue").textContent=`${o.value}%`,s.settings.defaultErrorRate=parseInt(o.value),u()};r.addEventListener("input",c),o.addEventListener("input",_),document.getElementById("naturalTypistStart").addEventListener("click",w),document.getElementById("naturalTypistPause").addEventListener("click",k),document.getElementById("naturalTypistStop").addEventListener("click",v),document.querySelector(".close-btn").addEventListener("click",()=>{T(),t.remove(),window.naturalTypistInitialized=!1}),a.addEventListener("click",()=>{s.isMinimized=!s.isMinimized,s.isMinimized?(t.querySelector(".natural-typist-body").style.display="none",t.querySelector(".natural-typist-footer").style.display="none",a.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 9l-7 7-7-7"/></svg>'):(t.querySelector(".natural-typist-body").style.display="block",t.querySelector(".natural-typist-footer").style.display="flex",a.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>')}),i.addEventListener("click",()=>{chrome.runtime.sendMessage({action:"openSettingsPage"})}),n.addEventListener("mousedown",e=>{if(e.target===n||n.contains(e.target)){e.preventDefault(),s.isDragging=!0;let a=t.getBoundingClientRect();s.dragOffset.x=e.clientX-a.left,s.dragOffset.y=e.clientY-a.top,t.style.cursor="grabbing",t.style.userSelect="none",t.style.transition="none"}}),document.addEventListener("mousemove",function e(n){s.isDragging&&(n.preventDefault(),requestAnimationFrame(()=>{s.position.x=n.clientX-s.dragOffset.x,s.position.y=n.clientY-s.dragOffset.y,s.position.x=Math.max(0,Math.min(window.innerWidth-t.offsetWidth,s.position.x)),s.position.y=Math.max(0,Math.min(window.innerHeight-t.offsetHeight,s.position.y)),t.style.left=`${s.position.x}px`,t.style.top=`${s.position.y}px`}))},{passive:!1}),document.addEventListener("mouseup",function e(){s.isDragging&&(s.isDragging=!1,t.style.cursor="",t.style.userSelect="",t.style.transition="left 0.2s, top 0.2s")}),c(),_(),b(),function e(){if(s.settings.rememberText){let t=document.getElementById("naturalTypistInput");t&&localStorage.setItem("naturalTypistText",t.value)}}(),setTimeout(f,1e3)}()}()}if("reloadSettings"===e.action&&e.settings){s.settings={...s.settings,...e.settings};let i=document.getElementById("naturalTypistUI");i&&i.classList.toggle("light-mode",!s.settings.darkMode),localStorage.setItem("naturalTypistSettings",JSON.stringify(s.settings))}n({status:"done"})})),window.naturalTypistStorageListenerAdded||(window.naturalTypistStorageListenerAdded=!0,window.addEventListener("storage",function(e){"naturalTypistSettings"===e.key&&function e(){let t=localStorage.getItem("naturalTypistSettings");if(t)try{let n=JSON.parse(t);s.settings={...s.settings,...n};let a=document.getElementById("naturalTypistUI");a&&a.classList.toggle("light-mode",!s.settings.darkMode)}catch(i){console.error("Failed to parse saved settings",i)}}()}))}();