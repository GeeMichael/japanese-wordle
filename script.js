const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container'); 

const wordle = 'おとこのこ';
const keys = [
    'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も', 'ら', 'り', 'る', 'れ', 'ろ', 'や', 'ゆ', 'よ', 'ん',
    'バックスペース', '小さい', '濁点', '半濁点', 'エンター'
];

const dakutenKeys = [
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'が', 'ぎ', 'ぐ', 'げ', 'ご',
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
    'だ', 'ぢ', 'づ', 'で', 'ど',
    'ば', 'び', 'ぶ', 'べ', 'ぼ',
];

const handakutenKeys = [
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
];

const smallKeys = [
    'あ', 'い', 'う', 'え', 'お',
    'つ', 'や', 'ゆ', 'よ',
    'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
    'っ', 'ゃ', 'ゅ', 'ょ'
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div');
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex);
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    })
    tileDisplay.append(rowElement);
});


keys.forEach(key => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = key;
    buttonElement.setAttribute('id', key);
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement);
});

const handleClick = (kana) => {
    console.log("clicked", kana);
    if (kana === '小さい') {
        smallKana();
        console.log('guessRows', guessRows);
        return;
    }
    if (kana === '濁点') {
        dakutenKana();
        console.log('guessRows', guessRows);
        return;
    }
    if (kana === '半濁点') {
        handakutenKana();
        console.log('guessRows', guessRows);
        return;
    }
    if (kana === 'バックスペース') {
        deleteKana();
        console.log('guessRows', guessRows);
        return;
    }
    if (kana === 'エンター') {
        checkRow();
        console.log('guessRows', guessRows);
        return;
    }
    addKana(kana);
};

const addKana = (kana) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = kana;
        guessRows[currentRow][currentTile] = kana;
        tile.setAttribute('data', kana);
        currentTile++;
    }
}

const deleteKana = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
}

const dakutenKana = () => {
    if (currentTile > 0) {
        currentTile--;

        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        const kana = tile.textContent;

        if (dakutenKeys.includes(kana)){
            const index = dakutenKeys.indexOf(kana);
            if (index < 20) {
                newKana = dakutenKeys[dakutenKeys.indexOf(kana) + 20];
                tile.textContent = newKana;
                tile.setAttribute('data', newKana);
            } else {
                newKana = dakutenKeys[dakutenKeys.indexOf(kana) - 20];
                tile.textContent = newKana;
                tile.setAttribute('data', newKana);
            }
        }
        currentTile++;
    }
}

const handakutenKana = () => {
    if (currentTile > 0) {
        currentTile--;

        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        const kana = tile.textContent;

        if (handakutenKeys.includes(kana)){
            const index = handakutenKeys.indexOf(kana);
            if (index < 5) {
                newKana = handakutenKeys[handakutenKeys.indexOf(kana) + 5];
                tile.textContent = newKana;
                tile.setAttribute('data', newKana);
            } else {
                newKana = handakutenKeys[handakutenKeys.indexOf(kana) - 5];
                tile.textContent = newKana;
                tile.setAttribute('data', newKana);
            }
        }
        currentTile++;
    }
}

const smallKana = () => {
    if (currentTile > 0) {
        currentTile--;

        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        const kana = tile.textContent;

        if (smallKeys.includes(kana)){
            const index = smallKeys.indexOf(kana);
            if (index < 9) {
                newKana = smallKeys[smallKeys.indexOf(kana) + 9];
                tile.textContent = newKana;
                tile.setAttribute('data', newKana);
            } else {
                newKana = smallKeys[smallKeys.indexOf(kana) - 9];
                tile.textContent = newKana;
                tile.setAttribute('data', newKana);
            }
        }
        currentTile++;
    }
}

const checkRow = () => { 
    const guess = guessRows[currentRow].join('');

    if (currentTile > 4){
        console.log('guess is ' + guess, 'wordle is ' + wordle);
        flipTile();
        if (wordle == guess) {
            showMessage('すごい！');
            isGameOver = true;
            return;
        } else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage('ゲームオーバー。正解は' + wordle + 'です。');
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
}

const addColorToKey = (keyKana, color) => {
    const key = document.getElementById(keyKana);
    if (keys.includes(keyKana)){
        key.classList.add(color);
    }
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes;
    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach(tile => {
        guess.push({kana: tile.getAttribute('data'), color: 'grey-overlay'});
    })

    guess.forEach((guess, index) => {
        if(guess.kana == wordle[index]) {
            guess.color = 'green-overlay';
            checkWordle = checkWordle.replace(guess.kana, '');
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.kana)) {
            guess.color = 'yellow-overlay';
            checkWordle = checkWordle.replace(guess.kana, '');
        }
    })

    rowTiles.forEach((tile, index) => {
        const dataKana = tile.getAttribute('data');
        setTimeout(() => {
            tile.classList.add('flip');
            tile.classList.add(guess[index].color);
            addColorToKey(guess[index].kana, guess[index].color);
        }, 500 * index);
    })
}