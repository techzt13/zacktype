function loadSettings(){let e=localStorage.getItem("naturalTypistSettings");if(e)try{let t=JSON.parse(e);document.getElementById("rememberTextToggle").checked=t.rememberText,document.getElementById("darkModeToggle").checked=t.darkMode,document.getElementById("enableBreaksToggle").checked=t.enableBreaks,document.getElementById("aiDetectionToggle").checked=t.aiDetection||!1,document.getElementById("minBreakTime").value=t.minBreakTime,document.getElementById("maxBreakTime").value=t.maxBreakTime,document.getElementById("breakFrequency").value=t.breakFrequency||5,document.getElementById("breakFrequencyValue").textContent=t.breakFrequency||5,document.body.classList.toggle("light-mode",!t.darkMode)}catch(n){console.error("Failed to load settings",n)}}function setupEventListeners(){document.getElementById("rememberTextToggle").addEventListener("change",saveSettings),document.getElementById("darkModeToggle").addEventListener("change",function(e){document.body.classList.toggle("light-mode",!e.target.checked),saveSettings()}),document.getElementById("enableBreaksToggle").addEventListener("change",saveSettings),document.getElementById("minBreakTime").addEventListener("change",function(){validateBreakTimes(),saveSettings()}),document.getElementById("aiDetectionToggle").addEventListener("change",saveSettings),document.getElementById("maxBreakTime").addEventListener("change",function(){validateBreakTimes(),saveSettings()})}function validateBreakTimes(){let e=parseInt(document.getElementById("minBreakTime").value)||1,t=parseInt(document.getElementById("maxBreakTime").value)||1;e<1&&(document.getElementById("minBreakTime").value=1),e>5&&(document.getElementById("minBreakTime").value=5),t<1&&(document.getElementById("maxBreakTime").value=1),t>5&&(document.getElementById("maxBreakTime").value=5);let n=parseInt(document.getElementById("minBreakTime").value),a=parseInt(document.getElementById("maxBreakTime").value);n>a&&(document.getElementById("minBreakTime").value=a,showToast("Minimum break time cannot exceed maximum"))}function saveSettings(){let e={rememberText:document.getElementById("rememberTextToggle").checked,darkMode:document.getElementById("darkModeToggle").checked,enableBreaks:document.getElementById("enableBreaksToggle").checked,aiDetection:document.getElementById("aiDetectionToggle").checked,minBreakTime:parseInt(document.getElementById("minBreakTime").value)||1,maxBreakTime:parseInt(document.getElementById("maxBreakTime").value)||5,breakFrequency:parseInt(document.getElementById("breakFrequency").value)||5,defaultSpeed:60,defaultErrorRate:5};console.log("Saving settings:",e),localStorage.setItem("naturalTypistSettings",JSON.stringify(e)),chrome.runtime.sendMessage({action:"updateSettings",settings:e}),showToast("Settings saved!")}function showToast(e,t=2e3){let n=document.querySelector(".settings-toast");n&&n.remove();let a=document.createElement("div");a.className="settings-toast",a.textContent=e,a.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3b82f6;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.3s ease;
    `,document.body.appendChild(a),setTimeout(()=>{a.parentNode&&(a.style.animation="fadeOut 0.3s ease",setTimeout(()=>a.remove(),300))},t)}document.addEventListener("DOMContentLoaded",function(){loadSettings(),setupEventListeners()});const style=document.createElement("style");style.textContent=`
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`,document.head.appendChild(style),document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("discordBtn");e&&e.addEventListener("click",function(){window.open("https://discord.gg/SZdHy8FaCs","_blank")})}),document.getElementById("breakFrequency").addEventListener("input",function(){document.getElementById("breakFrequencyValue").textContent=this.value,saveSettings()});