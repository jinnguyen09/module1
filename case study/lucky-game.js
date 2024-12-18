const playlist = [
    "NGAY AY BAN VA TOI - PNAM (VAVH FIX).MP3",
    "DUNG LAM TRAI TIM ANH DAU - VAVH.mp3",
    "NGÀY MAI EM LẤY CỨK.mp3",
    "KHOC.mp3",
];
let currentIndex = 0;
const audio = new Audio(playlist[currentIndex]);

function playSong() {
    audio.src = playlist[currentIndex];
    audio.play();
    updateSongInfo();
}

function nextSong() {
    currentIndex = (currentIndex + 1) % playlist.length;
    playSong();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playSong();
}

function shuffleSong() {
    currentIndex = Math.floor(Math.random() * playlist.length);
    playSong();
}

function toggleLoop() {
    audio.loop = !audio.loop;
    alert(audio.loop ? "Chế độ lặp bật" : "Chế độ lặp tắt");
}

function updateSongInfo() {
    const songName = playlist[currentIndex].split('/').pop();
    document.getElementById('song-info').textContent = `Đang phát: ${songName}`;
}

audio.addEventListener('ended', nextSong);

function rewindAudio() {
    audio.currentTime -= 10;
}
function forwardAudio() {
    audio.currentTime += 10; 
}

let balance = 5000;  
let currentBet = 0; 

const xucSacSound = document.getElementById('xucSac-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const noMoneySound = document.getElementById('noMoneySound');

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}

// Chức năng quay xúc xắc và xác định kết quả
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    animateDice(dice1, dice2, dice3);

    return dice1 + dice2 + dice3;
}

function animateDice(dice1, dice2, dice3) {
    const diceElements = document.querySelectorAll('.dice');
    diceElements.forEach(dice => {
        dice.style.transform = 'rotate(360deg)';
    });
    
    if(dice1 == 1) {
        dice1 = 'so1.png';
    } else if(dice1 == 2){
        dice1 = 'so2.png';
    } else if(dice1 == 3){
        dice1 = 'so3.png';
    } else if(dice1 == 4){
        dice1 = 'so4.png';
    } else if(dice1 == 5){
        dice1 = 'so5.png';
    } else {
        dice1 = 'so6.png';
    }
    
    if(dice2 == 1) {
        dice2 = 'so1.png';
    } else if(dice2 == 2){
        dice2 = 'so2.png';
    } else if(dice2 == 3){
        dice2 = 'so3.png';
    } else if(dice2 == 4){
        dice2 = 'so4.png';
    } else if(dice2 == 5){
        dice2 = 'so5.png';
    } else {
        dice2 = 'so6.png';
    }
    
    if(dice3 == 1) {
        dice3 = 'so1.png';
    } else if(dice3 == 2){
        dice3 = 'so2.png';
    } else if(dice3 == 3){
        dice3 = 'so3.png';
    } else if(dice3 == 4){
        dice3 = 'so4.png';
    } else if(dice3 == 5){
        dice3 = 'so5.png';
    } else {
        dice3 = 'so6.png';
    }

    setTimeout(() => {
        document.getElementById('dice1').src = dice1;
        document.getElementById('dice2').src = dice2;
        document.getElementById('dice3').src = dice3;
        diceElements.forEach(dice => {
            dice.style.transform = 'rotate(0deg)';
        });
    }, 500);
}

function playGame(choice) {
    const betAmount = parseInt(document.getElementById('bet-amount').value);

    // Kiểm tra nếu số tiền cược hợp lệ
    if (betAmount <= 0 || isNaN(betAmount)) {
        alert("Vui lòng nhập số tiền cược hợp lệ.");
        return;
    }

    if (betAmount > balance) {
        alert("Bạn không có đủ tiền để cược.");
        noMoneySound.play()
        return;
    }

    currentBet = betAmount;
    balance -= betAmount;
    
    // Quay xúc xắc
    const total = rollDice();

    // Kiểm tra kết quả Tài hoặc Xỉu
    let resultMessage = '';
    if (total >= 11 && choice === 'Tai') {
        balance += currentBet * 2; 
        resultMessage = `Bạn chọn Tài và thắng! Tổng điểm: ${total}. Bạn đã nhận ${currentBet * 2} VND.`;
        xucSacSound.play();
        xucSacSound.onended = () => {
            winSound.play();
        };
    } else if (total <= 10 && choice === 'Xiu') {
        balance += currentBet * 2;
        resultMessage = `Bạn chọn Xỉu và thắng! Tổng điểm: ${total}. Bạn đã nhận ${currentBet * 2} VND.`;
        xucSacSound.play();
        xucSacSound.onended = () => {
            winSound.play();
        };
    } else {
        resultMessage = `Tổng điểm: ${total}. Bạn thua, thử lại! Bạn đã mất ${currentBet} VND.`;
        xucSacSound.play();
        xucSacSound.onended = () => {
            loseSound.play();
        };
    }

    // Hiển thị kết quả và cập nhật số dư
    document.getElementById('result-message').textContent = resultMessage;
    updateBalance();
}

// Chức năng nạp tiền
function depositMoney() {
    alert("Chuyển khoản vào stk ngân hàng: 3332992003 - MBBank - chủ số tài khoản: NGUYEN DINH THIEP.")
    const depositAmount = parseInt(document.getElementById('deposit-amount').value);
    if (depositAmount && depositAmount >= 10000) {
        balance += depositAmount;
        document.getElementById('deposit-amount').value = '';
        updateBalance();
        alert(`Bạn đã nạp ${depositAmount} VND vào tài khoản!`);
    } else {
        alert("Vui lòng nhập số tiền hợp lệ (tối thiểu 10,000 VND).");
    }
}

function withdrawMoney() {
    let widrawInfor = prompt('Vui lòng nhập thông tin như sau: STK-Ngân hàng-Tên chủ số tài khoản')
    const widrawAmount = parseInt(document.getElementById('widraw-amount').value);
    if (balance && widrawAmount >= 50000) {
        balance -= widrawAmount;
        document.getElementById('widraw-amount').value = '';
        updateBalance();
        alert(`Bạn đã rút ${widrawAmount} VND về tài khoản ngân hàng của bạn!`);
    } else {
        alert("Vui lòng nhập số tiền hợp lệ (Rút tối thiểu 50,000 VND).");
    }
}

// Cập nhật số tiền ban đầu
updateBalance();