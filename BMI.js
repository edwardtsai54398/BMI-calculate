const Height =document.getElementById('height');
const Weight =document.getElementById('weight');
const Red =document.querySelector('.red')
const BTN =document.querySelector('.btn');
const Result =document.querySelector('.result');
const Recal =document.querySelector('.recal')
const Banner =document.querySelector('.banner')
const wghtSituation =document.querySelector('.situation')
const historyData =JSON.parse(localStorage.getItem('historyData'))||[]
const UL =document.querySelector('.list')
updateList()
BTN.addEventListener('click',BMIcal);
UL.addEventListener('click',deleteHistory);
Recal.addEventListener('mouseenter',spanShow);
Recal.addEventListener('mouseleave',spanHide)
Recal.addEventListener('click',BMIcal);

function BMIcal(){
    // 計算BMI
    let hValue=Height.value;
    let wValue=Weight.value;
    if(hValue==="" || wValue===""){
        console.log('return')
        Red.textContent="*請輸入身高和體重"
        return;
    }else{
        console.log('?')
        Red.textContent=""
    }
    let hMeter=hValue/100;
    let BMI=Math.round(wValue/(hMeter*hMeter)*10)/10;
    
    updateResult(BMI);
    
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
    Result.setAttribute('class',`result result-${color}`);
    Recal.setAttribute('class',`recal recal-${color}`);
    wghtSituation.textContent=`${situation}`;
    wghtSituation.setAttribute('class',`situation situa-${color}`);

    updateData(hValue,wValue,BMI,situation)
    updateList(color)
    // 將data字串化，setItem更新到localStorage
    localStorage.setItem('historyData',JSON.stringify(historyData))
}
// banner的圓圈更新結果
function updateResult(BMI){
    BTN.classList.add('d-none')
    Result.setAttribute('style','display:flex')
    document.querySelector('.result p').textContent=`${BMI}`
    document.querySelector('.result p').setAttribute('style','display:flex')
    Recal.setAttribute('style','display:flex')
}
// 新結果存取(push)到data
function updateData(hValue,Value,BMI,situation){
    console.log(hValue);
    console.log(Value);
    console.log(BMI);
    let year =new Date().getFullYear()
    let month =new Date().getMonth()+1
    let day =new Date().getDay()
    let newdata={status:situation,
                clr:color,
                bmi:BMI,
                weight:Value,
                height:hValue,
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
    historyData.forEach(function(item,i){
        str+=`<li class="past past-${item.clr}">
                <span>${item.status}</span>
                <div><em>BMI</em><span>${item.bmi}</span></div>
                <div><em>weight</em><span>${item.weight}kg</span></div>
                <div><em>height</em><span>${item.height}cm</span></div>
                <em>${item.date}</em>
                <i class="fa-solid fa-trash-can" data-num="${i}"></i>
            </li>`
    })
    UL.innerHTML=str;
}

// 重測出現
function spanShow(){
    let ResultSpan =document.querySelector('.result span');
    ResultSpan.setAttribute('style','opacity:1;transform:translateX(0px);');
}
function spanHide(){
    let ResultSpan =document.querySelector('.result span');
    ResultSpan.setAttribute('style','opacity:0;transform:translateX(-10px);');
}