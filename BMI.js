const Height =document.getElementById('height');
const Weight =document.getElementById('weight');
const BTN =document.querySelector('.btn');
const Result =document.querySelector('.result');
const Form =document.querySelector('.banner form')
const wghtSituation =document.createElement('p')
const historyData =JSON.parse(localStorage.getItem('historyData'))||[]
const UL =document.querySelector('.list')
updateList()
BTN.addEventListener('click',BMIcal);
UL.addEventListener('click',deleteHistory);

function BMIcal(){
    // 計算BMI
    const Hvalue=parseInt(Height.value);
    const Wvalue=parseInt(Weight.value);
    const Hmeter=Hvalue/100;
    const BMI=Math.round(Wvalue/(Hmeter*Hmeter)*10)/10;
    updateResult(BMI);
    // banner出現.recal，綁定Recal事件
    const Recal =document.querySelector('.recal');
    Recal.addEventListener('mouseenter',spanShow);
    Recal.addEventListener('mouseleave',spanHide)
    Recal.addEventListener('click',BMIcal);
    
    // 判斷BMI結果，進行狀態管理
    switch(true){
        case(BMI<=18.5):
            situation='過輕'
            color='blue'
        break;
        case(BMI>18.5 && BMI<=25):
            situation='正常'
            color='green'
        break;
        case(BMI>25 && BMI<=30):
            situation='肥胖前期'
            color='ylw'
        break;
        case(BMI>30 && BMI<=35):
            situation='輕度肥胖'
            color='org'
        break;
        case(BMI>35 && BMI<=40):
            situation='中度肥胖'
            color='org'
        break;
        case(BMI>40):
            situation='嚴重肥胖'
            color='red'
        break;
    };
    // 在結果的網頁節點更改class命名
    Result.setAttribute('class','result result-'+color);
    Recal.setAttribute('class','recal recal-'+color);
    wghtSituation.textContent=`${situation}`;
    wghtSituation.setAttribute('class','situation situa-'+color);
    // createElement<p>放在最後
    Form.appendChild(wghtSituation);

    updateData(Hvalue,Wvalue,BMI,situation)
    updateList(color)
    // 將data字串化，setItem更新到localStorage
    localStorage.setItem('historyData',JSON.stringify(historyData))
}
// banner的圓圈更新結果
function updateResult(BMI){
    Result.innerHTML=
    `<p>${BMI}<em>BMI</em></p>
    <div class="recal">
        <img src="img/icons_loop.png" alt="">
    </div>
    <span>重測</span>`
}
// 新結果存取(push)到data
function updateData(Hvalue,Wvalue,BMI,situation){
    console.log(Hvalue);
    console.log(Wvalue);
    console.log(BMI);
    let year =new Date().getFullYear()
    let month =new Date().getMonth()+1
    let day =new Date().getDay()
    let newdata={status:situation,
                clr:color,
                bmi:BMI,
                weight:Wvalue,
                height:Hvalue,
                date:year+'-'+month+'-'+day}
    console.log(newdata)
    historyData.push(newdata)
}
// 刪除資料
function deleteHistory(e){
    let eltype =e.target.nodeName;
    console.log(eltype)
    if(eltype!=='I'){return};
    let Num=e.target.dataset.num
    console.log(Num)
    historyData.splice(Num,1)
    localStorage.setItem('historyData',JSON.stringify(historyData));
    updateList();
}
// data資料渲染成List
function updateList(color){

    let str=''
    let Len=historyData.length
    for(let i=0;i<Len;i++){
        str+=`<li class="past past-${historyData[i].clr}">
                <span>${historyData[i].status}</span>
                <div><em>BMI</em><span>${historyData[i].bmi}</span></div>
                <div><em>weight</em><span>${historyData[i].weight}kg</span></div>
                <div><em>height</em><span>${historyData[i].height}cm</span></div>
                <em>${historyData[i].date}</em>
                <i class="fa-solid fa-trash-can" data-num="${i}"></i>
            </li>`
    }
    UL.innerHTML=str;
}

// 重測出現
function spanShow(){
    const ResultSpan =document.querySelector('.result span');
    ResultSpan.setAttribute('style','opacity:1;transform:translateX(0px);');
}
function spanHide(){
    const ResultSpan =document.querySelector('.result span');
    ResultSpan.setAttribute('style','opacity:0;transform:translateX(-10px);');
}