const donationItems=document.querySelectorAll('.donationItem');
const input=document.getElementById('donation_amount')
donationItems.forEach(item=> item.addEventListener('click', ()=>{
    donationItems.forEach(item => item.childNodes[1].classList.remove('circle_checked_active')); //item.childNodes.indexOf(p.donationAmount)
    item.childNodes[1].classList.add('circle_checked_active');
    input.value=item.childNodes[7].innerHTML.replace(/\D/, '')
}));
const presetAmounts=[5000, 2000, 1000, 500, 250, 100, 50, 25]
function lightAmmount(){
    const i=presetAmounts.indexOf(Number(input.value));
    donationItems.forEach(item => item.childNodes[1].classList.remove('circle_checked_active'));
    if(i>=0){
        donationItems[i].childNodes[1].classList.add('circle_checked_active');      
    }
}
donationItems[5].childNodes[1].classList.add('circle_checked_active');
input.addEventListener('input', lightAmmount);

// burger
const burger = document.querySelector('.burger-container');
const closeLayer = document.querySelector('.grey-BG');

burger.addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.add('burger-menu_active');
    closeLayer.classList.add('burger-menu_active')
})

document.querySelector('.burger-menu').addEventListener('click', (e) => {
    if (e.target.id !== 'burger-menu') {
        document.querySelector('.burger-menu').classList.remove('burger-menu_active');
        closeLayer.classList.remove('burger-menu_active');
    }
})
closeLayer.addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.remove('burger-menu_active');    
    closeLayer.classList.remove('burger-menu_active');
})