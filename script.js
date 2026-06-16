// ================= 完整 78 張牌資料 =================

const cards = [
    // 大阿爾克納
    { name:"愚者", image:"cards/00_fool.jpg" },
    { name:"魔術師", image:"cards/01_magician.jpg" },
    { name:"女祭司", image:"cards/02_high_priestess.jpg" },
    { name:"皇后", image:"cards/03_empress.jpg" },
    { name:"皇帝", image:"cards/04_emperor.jpg" },
    { name:"教皇", image:"cards/05_hierophant.jpg" },
    { name:"戀人", image:"cards/06_lovers.jpg" },
    { name:"戰車", image:"cards/07_chariot.jpg" },
    { name:"力量", image:"cards/08_strength.jpg" },
    { name:"隱者", image:"cards/09_hermit.jpg" },
    { name:"命運之輪", image:"cards/10_wheel.jpg" },
    { name:"正義", image:"cards/11_justice.jpg" },
    { name:"吊人", image:"cards/12_hanged_man.jpg" },
    { name:"死神", image:"cards/13_death.jpg" },
    { name:"節制", image:"cards/14_temperance.jpg" },
    { name:"惡魔", image:"cards/15_devil.jpg" },
    { name:"高塔", image:"cards/16_tower.jpg" },
    { name:"星星", image:"cards/17_star.jpg" },
    { name:"月亮", image:"cards/18_moon.jpg" },
    { name:"太陽", image:"cards/19_sun.jpg" },
    { name:"審判", image:"cards/20_judgement.jpg" },
    { name:"世界", image:"cards/21_world.jpg" },

    // 聖杯
    { name:"聖杯Ace", image:"cards/c01_ace.jpg" },
    { name:"聖杯二", image:"cards/c02.jpg" },
    { name:"聖杯三", image:"cards/c03.jpg" },
    { name:"聖杯四", image:"cards/c04.jpg" },
    { name:"聖杯五", image:"cards/c05.jpg" },
    { name:"聖杯六", image:"cards/c06.jpg" },
    { name:"聖杯七", image:"cards/c07.jpg" },
    { name:"聖杯八", image:"cards/c08.jpg" },
    { name:"聖杯九", image:"cards/c09.jpg" },
    { name:"聖杯十", image:"cards/c10.jpg" },
    { name:"聖杯侍者", image:"cards/c11_page.jpg" },
    { name:"聖杯騎士", image:"cards/c12_knight.jpg" },
    { name:"聖杯皇后", image:"cards/c13_queen.jpg" },
    { name:"聖杯國王", image:"cards/c14_king.jpg" },

    // 金幣
    { name:"金幣Ace", image:"cards/p01_ace.jpg" },
    { name:"金幣二", image:"cards/p02.jpg" },
    { name:"金幣三", image:"cards/p03.jpg" },
    { name:"金幣四", image:"cards/p04.jpg" },
    { name:"金幣五", image:"cards/p05.jpg" },
    { name:"金幣六", image:"cards/p06.jpg" },
    { name:"金幣七", image:"cards/p07.jpg" },
    { name:"金幣八", image:"cards/p08.jpg" },
    { name:"金幣九", image:"cards/p09.jpg" },
    { name:"金幣十", image:"cards/p10.jpg" },
    { name:"金幣侍者", image:"cards/p11_page.jpg" },
    { name:"金幣騎士", image:"cards/p12_knight.jpg" },
    { name:"金幣皇后", image:"cards/p13_queen.jpg" },
    { name:"金幣國王", image:"cards/p14_king.jpg" },

    // 寶劍
    { name:"寶劍Ace", image:"cards/s01_ace.jpg" },
    { name:"寶劍二", image:"cards/s02.jpg" },
    { name:"寶劍三", image:"cards/s03.jpg" },
    { name:"寶劍四", image:"cards/s04.jpg" },
    { name:"寶劍五", image:"cards/s05.jpg" },
    { name:"寶劍六", image:"cards/s06.jpg" },
    { name:"寶劍七", image:"cards/s07.jpg" },
    { name:"寶劍八", image:"cards/s08.jpg" },
    { name:"寶劍九", image:"cards/s09.jpg" },
    { name:"寶劍十", image:"cards/s10.jpg" },
    { name:"寶劍侍者", image:"cards/s11_page.jpg" },
    { name:"寶劍騎士", image:"cards/s12_knight.jpg" },
    { name:"寶劍皇后", image:"cards/s13_queen.jpg" },
    { name:"寶劍國王", image:"cards/s14_king.jpg" },

    // 權杖
    { name:"權杖Ace", image:"cards/w01_ace.jpg" },
    { name:"權杖二", image:"cards/w02.jpg" },
    { name:"權杖三", image:"cards/w03.jpg" },
    { name:"權杖四", image:"cards/w04.jpg" },
    { name:"權杖五", image:"cards/w05.jpg" },
    { name:"權杖六", image:"cards/w06.jpg" },
    { name:"權杖七", image:"cards/w07.jpg" },
    { name:"權杖八", image:"cards/w08.jpg" },
    { name:"權杖九", image:"cards/w09.jpg" },
    { name:"權杖十", image:"cards/w10.jpg" },
    { name:"權杖侍者", image:"cards/w11_page.jpg" },
    { name:"權杖騎士", image:"cards/w12_knight.jpg" },
    { name:"權杖皇后", image:"cards/w13_queen.jpg" },
    { name:"權杖國王", image:"cards/w14_king.jpg" }
];

// ================= 全域狀態 =================

let shuffledDeck = [];
let selectedCards = [];
let spreadType = 3;
let spreadKey = "three";
let hasShuffled = false;
let dailyMode = false;
let currentModalIndex = 0;
let modalCards = [];
let touchStartX = 0;
let swipeHintShown = false;
let resultHintShown = false;

const DAILY_STORAGE_KEY = "rayTarotDailyFortune";

// ================= 畫面切換功能 =================

function hideAllScreens(){
    document.querySelectorAll(".screen").forEach(screen=>{
        screen.classList.remove("active");
    });
}

function showScreen(id){
    hideAllScreens();
    document.getElementById(id).classList.add("active");
}

function closeNoticeModal(){
    document.getElementById("noticeModal").style.display = "none";
}

// ================= 今日運勢功能 =================

function startDailyFortune(){
    dailyMode = false;
    selectedCards = [];
    shuffledDeck = [];
    hasShuffled = false;

    updateDailyDateText();
    loadTodayFortune();
    showScreen("dailyFortuneScreen");
}

function getTodayKey(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2,"0");
    const day = String(today.getDate()).padStart(2,"0");

    return `${year}-${month}-${day}`;
}

function getTodayDisplayText(){
    return new Date().toLocaleDateString("zh-TW",{
        year:"numeric",
        month:"long",
        day:"numeric",
        weekday:"long"
    });
}

function updateDailyDateText(){
    const dailyDate = document.getElementById("dailyDate");

    if(dailyDate){
        dailyDate.innerText = getTodayDisplayText();
    }
}

function loadTodayFortune(){
    const saved = getSavedDailyFortune();

    if(saved && saved.date === getTodayKey()){
        showDailyFortuneResult(saved.cardIndex,saved.reversed,true);
        return;
    }

    showDailyFortuneEmptyState();
}

function getSavedDailyFortune(){
    try{
        return JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY));
    }catch(error){
        return null;
    }
}

function showDailyFortuneEmptyState(){
    document.getElementById("dailyEmptyState").style.display = "block";
    document.getElementById("dailyResult").style.display = "none";
    document.getElementById("dailyCopyButton").style.display = "none";

    const dailyDownloadButton = document.getElementById("dailyDownloadButton");

    if(dailyDownloadButton){
        dailyDownloadButton.style.display = "none";
    }
}

function drawDailyFortune(){
    const saved = getSavedDailyFortune();

    if(saved && saved.date === getTodayKey()){
        showDailyFortuneResult(saved.cardIndex,saved.reversed,true);
        showWarning("你今天已經抽過今日運勢囉 ✨");
        return;
    }

    const cardIndex = Math.floor(Math.random() * cards.length);
    const reversed = Math.random() < 0.5;

    const dailyData = {
        date:getTodayKey(),
        cardIndex,
        reversed
    };

    localStorage.setItem(DAILY_STORAGE_KEY,JSON.stringify(dailyData));

    showDailyFortuneResult(cardIndex,reversed,false);
}

function showDailyFortuneResult(cardIndex,reversed,alreadyDrawn){
    const card = cards[cardIndex];

    if(!card){
        showDailyFortuneEmptyState();
        return;
    }

    const dailyEmptyState = document.getElementById("dailyEmptyState");
    const dailyResult = document.getElementById("dailyResult");
    const dailyCopyButton = document.getElementById("dailyCopyButton");
    const dailyDownloadButton = document.getElementById("dailyDownloadButton");

    dailyEmptyState.style.display = "none";
    dailyResult.style.display = "block";
    dailyCopyButton.style.display = "block";

    if(dailyDownloadButton){
        dailyDownloadButton.style.display = "block";
    }

    dailyResult.innerHTML =
    `
        <div class="daily-result-card ${getCardTypeClass(card)}">
            <h3>今日牌卡</h3>

            <img
            src="${card.image}"
            onclick="event.stopPropagation(); openDailyCardModal(${cardIndex}, ${reversed});"
            class="${reversed ? "reversed" : ""}"
            alt="${card.name}">

            <p>
                ${card.name}<br>
                ${reversed ? "逆位" : "正位"}
            </p>
        </div>

        <p class="daily-note">
            ${alreadyDrawn ? "你今天已抽過牌囉。" : "今天的牌卡已為你抽出。"}<br>
          
        </p>
    `;
}

function copyDailyFortuneContent(){
    const saved = getSavedDailyFortune();

    if(!saved || saved.date !== getTodayKey()){
        showWarning("請先抽取今日牌卡 ☀️");
        return;
    }

    const card = cards[saved.cardIndex];

    if(!card){
        showWarning("找不到今日牌卡，請重新整理後再試");
        return;
    }

    const text =
`☀️ Ray Tarot｜今日運勢

請以專業塔羅師角度，解讀我的今日運勢。

今日日期：
${getTodayDisplayText()}

今日牌卡：
${card.name} ${saved.reversed ? "逆位" : "正位"}

請從以下方向解讀：

1. 今日整體能量
2. 今日感情運勢
3. 今日工作／學習狀態
4. 今天需要注意的事情
5. 給我的一句提醒

請用溫柔、清楚、適合日常參考的方式解讀。`;

    navigator.clipboard.writeText(text).then(()=>{
        showWarning("今日運勢內容已複製📋");
    }).catch(()=>{
        showWarning("複製失敗，請再試一次");
    });
}

// ================= 今日運勢結果圖下載功能 =================

function downloadDailyFortuneImage(){
    if(typeof html2canvas === "undefined"){
        showWarning("圖片下載工具尚未載入，請確認網路或重新整理");
        return;
    }

    const saved = getSavedDailyFortune();

    if(!saved || saved.date !== getTodayKey()){
        showWarning("請先抽取今日牌卡 ☀️");
        return;
    }

    const card = cards[saved.cardIndex];

    if(!card){
        showWarning("找不到今日牌卡，請重新整理後再試");
        return;
    }

    const shareCard = document.getElementById("shareCard");
    const shareQuestion = document.getElementById("shareQuestion");
    const shareCards = document.getElementById("shareCards");

    shareCard.classList.remove("compact");

    shareQuestion.innerHTML =
    `
        <div>
            <strong>主題：</strong>
            今日運勢
        </div>
        <div>
            <strong>日期：</strong>
            ${getTodayDisplayText()}
        </div>
    `;

    shareCards.innerHTML =
    `
        <div class="share-card-item">
            <h3>今日牌卡</h3>

            <img
            src="${card.image}"
            class="${saved.reversed ? "reversed" : ""}"
            alt="${card.name}">

            <p>
                ${card.name}<br>
                ${saved.reversed ? "逆位" : "正位"}
            </p>
        </div>
    `;

    document.getElementById("loadingToast").style.display = "block";

    setTimeout(()=>{
        html2canvas(shareCard,{
            backgroundColor:null,
            scale:2,
            useCORS:true
        }).then(canvas=>{
            document.getElementById("loadingToast").style.display = "none";

            const image = canvas.toDataURL("image/png");
            showResultImagePreview(image,"RayTarot_Daily_Fortune.png");
        }).catch(()=>{
            document.getElementById("loadingToast").style.display = "none";
            showWarning("圖片產生失敗，請重新整理後再試");
        });
    },300);
}

// ================= 我要占卜與塔羅日記入口 =================

function startDivination(){
    dailyMode = false;
    hasShuffled = false;
    selectedCards = [];
    shuffledDeck = [];

    const questionBox = document.getElementById("userQuestion");

    if(questionBox){
        questionBox.value = "";
    }

    showScreen("spreadScreen");
}

function startDiary(){
    dailyMode = true;
    spreadType = 1;
    spreadKey = "single";
    hasShuffled = false;
    selectedCards = [];
    shuffledDeck = [];

    document.getElementById("userQuestion").value = "塔羅日記";
    showScreen("shuffleScreen");
}

// ================= 牌陣選擇功能 =================

function chooseSpread(cardCount,key){
    spreadType = cardCount;
    spreadKey = key;
    hasShuffled = false;
    selectedCards = [];
    shuffledDeck = [];

    showScreen("questionScreen");
}

function goToSpreadScreen(){
    const question = document.getElementById("userQuestion").value.trim();

    if(!question){
        showWarning("請先輸入問題 ✨");
        return;
    }

    showScreen("shuffleScreen");
}

// ================= 洗牌功能 =================

function shuffleDeck(){
    const deck = document.getElementById("deck");
    const shuffleCards = document.getElementById("shuffleCards");

    shuffledDeck = [...cards].sort(()=>Math.random() - 0.5);
    selectedCards = [];
    hasShuffled = true;

    shuffleCards.innerHTML = "";

    const moves = [
        { x:"-100px", y:"20px", r:"-25deg" },
        { x:"100px", y:"30px", r:"25deg" },
        { x:"-80px", y:"100px", r:"15deg" },
        { x:"80px", y:"110px", r:"-15deg" },
        { x:"0px", y:"140px", r:"8deg" },
        { x:"0px", y:"70px", r:"-5deg" }
    ];

    moves.forEach(move=>{
        const div = document.createElement("div");

        div.className = "shuffle-card";
        div.style.setProperty("--x",move.x);
        div.style.setProperty("--y",move.y);
        div.style.setProperty("--r",move.r);
        div.innerHTML = `<img src="cards/card_back.jpg" alt="塔羅牌背">`;

        shuffleCards.appendChild(div);
    });

    deck.style.opacity = ".4";

    setTimeout(()=>{
        deck.style.opacity = "1";
        shuffleCards.innerHTML = "";
    },1800);
}

// ================= 前往選牌功能 =================

function goToDrawScreen(){
    if(!hasShuffled){
        showWarning("請先洗牌 🔄");
        return;
    }

    showScreen("drawScreen");
    startDraw();
}

// ================= 顯示牌背功能 =================

function startDraw(){
    const area = document.getElementById("cardSelection");

    area.innerHTML = "";

    const totalCards = Math.min(78,shuffledDeck.length);

    for(let i = 0; i < totalCards; i++){
        const div = document.createElement("div");

        div.className = "select-card";
        div.innerHTML = `<img src="cards/card_back.jpg" alt="塔羅牌背">`;
        div.onclick = ()=>pickCard(i,div);

        area.appendChild(div);
    }

    updateSelectedText();
}

// ================= 選牌功能 =================

function pickCard(index,element){
    const card = shuffledDeck[index];

    if(!card){
        return;
    }

    const selectedIndex = selectedCards.findIndex(selectedCard=>selectedCard.image === card.image);

    if(selectedIndex > -1){
        selectedCards.splice(selectedIndex,1);
        element.classList.remove("selected");
        updateSelectedText();
        return;
    }

    if(selectedCards.length >= spreadType){
        return;
    }

    selectedCards.push({
        ...card,
        reversed:dailyMode ? false : Math.random() < 0.5
    });

    element.classList.add("selected");
    updateSelectedText();
}

// ================= 已選數量顯示 =================

function updateSelectedText(){
    const selectedCount = document.getElementById("selectedCount");

    if(selectedCount){
        selectedCount.innerText = `已選 ${selectedCards.length} / ${spreadType} 張`;
    }
}

// ================= 牌位名稱設定 =================

function getPositions(){
    if(spreadKey === "single"){
        return dailyMode ? ["📖 今日主題牌"] : ["答案"];
    }

    if(spreadKey === "three"){
        return ["過去","現在","未來"];
    }

    if(spreadKey === "cross"){
        return ["現況／核心","障礙／挑戰","建議／對策","過去／原因","未來／結果"];
    }

    if(spreadKey === "choice"){
        return ["現況","A選項發展","B選項發展","A結果","B結果"];
    }

    return [];
}

function getSpreadName(){
    if(dailyMode){
        return "塔羅日記";
    }

    if(spreadKey === "single"){
        return "單張牌";
    }

    if(spreadKey === "three"){
        return "三張牌陣";
    }

    if(spreadKey === "cross"){
        return "大十字牌陣";
    }

    if(spreadKey === "choice"){
        return "二選一牌陣";
    }

    return "塔羅占卜";
}

function getCardTypeClass(card){
    if(card.image.includes("/c")){
        return "cups-card";
    }

    if(card.image.includes("/w")){
        return "wands-card";
    }

    if(card.image.includes("/p")){
        return "pentacles-card";
    }

    if(card.image.includes("/s")){
        return "swords-card";
    }

    return "major-card";
}

// ================= 完成選牌功能 =================

function finishSelection(){
    const needCards = spreadType;

    if(selectedCards.length !== needCards){
        showWarning(`請選擇 ${needCards} 張牌`);
        return;
    }

    showScreen("resultScreen");
    showResult();
}

// ================= 顯示結果功能 =================

function showResult(){
    const result = document.getElementById("result");
    const positions = getPositions();

    result.innerHTML = "";

    let html = spreadType === 1
    ? '<div class="result-cards single-card">'
    : '<div class="result-cards">';

    selectedCards.forEach((card,index)=>{
        html +=
        `
            <div class="result-card ${getCardTypeClass(card)}">
                <h3>${positions[index]}</h3>

                <div class="card-inner">
                    <img
                    src="${card.image}"
                    onclick="event.stopPropagation(); openCardModal(${index});"
                    class="${card.reversed ? "reversed" : ""}"
                    alt="${card.name}">

                    <p>
                        ${card.name}<br>
                        ${card.reversed ? "逆位" : "正位"}
                    </p>
                </div>
            </div>
        `;
    });

    html += "</div>";
    result.innerHTML = html;

    showResultGuide();
}

// ================= 複製解讀內容功能 =================

function copyReadingContent(){
    if(selectedCards.length === 0){
        showWarning("目前沒有可複製的牌陣");
        return;
    }

    const positions = getPositions();
    const question = document.getElementById("userQuestion").value || getSpreadName();

    let text =
`🔮 Ray Tarot｜${getSpreadName()}

問題：
${question}

`;

    selectedCards.forEach((card,index)=>{
        text +=
`${positions[index]}：
${card.name}
${card.reversed ? "逆位" : "正位"}

`;
    });

    text +=
`請以專業塔羅師角度，
結合問題與牌陣，
進行完整解讀。`;

    navigator.clipboard.writeText(text).then(()=>{
        showWarning("解讀內容已複製📋");
    }).catch(()=>{
        showWarning("複製失敗，請再試一次");
    });
}

// ================= 重新開始功能 =================

function restartReading(){
    selectedCards = [];
    shuffledDeck = [];
    hasShuffled = false;
    dailyMode = false;
    swipeHintShown = false;
    resultHintShown = false;

    document.getElementById("userQuestion").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("cardSelection").innerHTML = "";

    const aiBox = document.getElementById("aiReadingBox");

    if(aiBox){
        aiBox.innerHTML = "";
        aiBox.style.display = "none";
    }

    showScreen("homeScreen");
}

// ================= 返回上一頁功能 =================

function backFromShuffle(){
    hasShuffled = false;
    selectedCards = [];
    shuffledDeck = [];

    if(dailyMode){
        showScreen("homeScreen");
    }else{
        showScreen("spreadScreen");
    }
}

// ================= 提醒視窗功能 =================

function showWarning(message){
    document.getElementById("warningText").innerHTML = message;
    document.getElementById("warningModal").style.display = "flex";
}

function closeWarning(){
    document.getElementById("warningModal").style.display = "none";
}

// ================= 牌面放大功能 =================

function openCardModal(index){
    openCardModalFromList(selectedCards,index);
}

function openDailyCardModal(cardIndex,reversed){
    const card = cards[cardIndex];

    if(!card){
        return;
    }

    openCardModalFromList([
        {
            ...card,
            reversed
        }
    ],0);
}

function openCardModalFromList(cardList,index){
    modalCards = cardList.filter(Boolean);

    if(modalCards.length === 0){
        return;
    }

    currentModalIndex = index;
    renderCardModal();
}

function renderCardModal(){
    const modal = document.getElementById("cardModal");
    const img = document.getElementById("cardModalImg");
    const hint = document.getElementById("swipeHint");
    const card = modalCards[currentModalIndex];

    if(!card){
        return;
    }

    img.src = card.image;

    // 放大檢視時固定顯示正位，避免逆位牌被倒轉後不好查看。
    // 結果頁面仍會保留原本的正逆位顯示。
    img.classList.remove("reversed");

    modal.style.display = "flex";

    if(!hint){
        return;
    }

    if(modalCards.length <= 1){
        hint.style.display = "none";
        return;
    }

    hint.style.display = "block";

    if(!swipeHintShown){
        swipeHintShown = true;
        hint.style.opacity = "1";

        setTimeout(()=>{
            hint.style.opacity = "0";
        },2000);
    }
}

function closeCardModal(){
    document.getElementById("cardModal").style.display = "none";
}

function handleTouchStart(event){
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event){
    if(modalCards.length <= 1){
        return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;

    if(Math.abs(distance) < 50){
        return;
    }

    if(distance < 0){
        nextModalCard();
    }else{
        prevModalCard();
    }
}

function nextModalCard(){
    if(modalCards.length <= 1){
        return;
    }

    currentModalIndex++;

    if(currentModalIndex >= modalCards.length){
        currentModalIndex = 0;
    }

    renderCardModal();
}

function prevModalCard(){
    if(modalCards.length <= 1){
        return;
    }

    currentModalIndex--;

    if(currentModalIndex < 0){
        currentModalIndex = modalCards.length - 1;
    }

    renderCardModal();
}

// ================= 下載結果圖功能 =================

function downloadShareImage(){
    if(typeof html2canvas === "undefined"){
        showWarning("圖片下載工具尚未載入，請確認網路或重新整理");
        return;
    }

    if(selectedCards.length === 0){
        showWarning("目前沒有可下載的牌面");
        return;
    }

    const shareCard = document.getElementById("shareCard");
    const shareQuestion = document.getElementById("shareQuestion");
    const shareCards = document.getElementById("shareCards");
    const question = document.getElementById("userQuestion").value || "塔羅占卜";
    const positions = getPositions();

    if(selectedCards.length >= 5){
        shareCard.classList.add("compact");
    }else{
        shareCard.classList.remove("compact");
    }

    shareQuestion.innerHTML =
    `
        <div>
            <strong>牌陣：</strong>
            ${getSpreadName()}
        </div>
        <div>
            <strong>問題：</strong>
            ${question}
        </div>
    `;

    shareCards.innerHTML = "";

    selectedCards.forEach((card,index)=>{
        shareCards.innerHTML +=
        `
            <div class="share-card-item">
                <h3>${positions[index]}</h3>

                <img
                src="${card.image}"
                class="${card.reversed ? "reversed" : ""}"
                alt="${card.name}">

                <p>
                    ${card.name}<br>
                    ${card.reversed ? "逆位" : "正位"}
                </p>
            </div>
        `;
    });

    document.getElementById("loadingToast").style.display = "block";

    setTimeout(()=>{
        html2canvas(shareCard,{
            backgroundColor:null,
            scale:2,
            useCORS:true
        }).then(canvas=>{
            document.getElementById("loadingToast").style.display = "none";

            const image = canvas.toDataURL("image/png");
            showResultImagePreview(image);
        }).catch(()=>{
            document.getElementById("loadingToast").style.display = "none";
            showWarning("圖片產生失敗，請重新整理後再試");
        });
    },300);
}

function showResultImagePreview(image,filename = "RayTarot_Result.png"){
    let preview = document.getElementById("imagePreviewModal");

    if(!preview){
        preview = document.createElement("div");
        preview.id = "imagePreviewModal";
        preview.innerHTML =
        `
            <div class="image-preview-box">
                <button class="image-preview-close" onclick="closeImagePreview()">
                    ✕
                </button>

                <p>
                    結果圖已產生 📷
                </p>

                <img id="imagePreviewImg" alt="結果圖預覽">

                <a
                id="imageDownloadBtn"
                class="image-download-btn"
                download="RayTarot_Result.png">
                    下載圖片
                </a>
            </div>
        `;

        document.body.appendChild(preview);
    }

    document.getElementById("imagePreviewImg").src = image;
    document.getElementById("imageDownloadBtn").href = image;
    document.getElementById("imageDownloadBtn").download = filename;

    preview.style.display = "flex";
}

function closeImagePreview(){
    document.getElementById("imagePreviewModal").style.display = "none";
}

// ================= 結果滑動提醒功能 =================

function showResultGuide(){
    if(resultHintShown){
        return;
    }

    resultHintShown = true;

    const guide = document.getElementById("resultGuide");

    if(!guide){
        return;
    }

    guide.style.opacity = "1";

    setTimeout(()=>{
        guide.style.opacity = "0";
    },2500);
}
