let body = document.body;
let startGameButoon = document.getElementById('button');

let difficultyLabels = [];
difficultyLabels[0] = document.getElementById('label-simple');
difficultyLabels[1] = document.getElementById('label-average');
difficultyLabels[2] = document.getElementById('label-difficult');

let difficultyMap = {
    'Простой': {
        'class': 'three-card-field',
        'cardCount': 3
    },
    'Средний': {
        'class': 'six-card-field',
        'cardCount': 6
    },
    'Сложный': {
        'class': 'ten-card-field',
        'cardCount': 10
    }
}

let difficulty = document.getElementById('simple').value;
let cardWasClicked = false;

difficultyLabels.forEach(difficultyButton => {
    difficultyButton.onclick = function () {
        difficultyLabels.forEach(difficultyButton => difficultyButton.classList.remove('level_active'));
        this.classList.add('level_active');
        difficulty = this.children[0].value;
    }
});

let createCard = (number, field) => {
    let randowCard = Math.floor(Math.random() * number);

    for (let i = 0; i < number; i++) {
        let cardWrapper = document.createElement('div');
        let cardBackSide = document.createElement('div');
        let winnerCard = document.createElement('div');
        let looserCard = document.createElement('div');

        if (i === randowCard) {
            cardWrapper.className = 'card-wrapper';
            cardWrapper.classList.add('card-wrapper_hover');
            field.append(cardWrapper);
            cardBackSide.className = 'card-backside';
            cardWrapper.append(cardBackSide);
            winnerCard.className = 'winner-card';
            cardWrapper.append(winnerCard);
        } else {
            cardWrapper.className = 'card-wrapper';
            cardWrapper.classList.add('card-wrapper_hover');
            field.append(cardWrapper);
            cardBackSide.className = 'card-backside';
            cardWrapper.append(cardBackSide);
            winnerCard.className = 'looser-card';
            cardWrapper.append(looserCard);
        }
    }
}

startGameButoon.addEventListener('click', () => {
    let levelMenu = document.getElementById('level-menu');
    let levelParams = difficultyMap[difficulty];
    let cardsField = document.createElement('div');

    cardsField.className = levelParams['class'];
    body.append(cardsField);
    createCard(levelParams['cardCount'], cardsField);

    levelMenu.style.display = 'none';

    document.querySelectorAll('.card-wrapper').forEach(card => {
        card.addEventListener('click', () => {
            if (cardWasClicked) {
                cardsField.style.display = 'none';
                levelMenu.style.display = '';
                cardWasClicked = false;
            } else {
                card.classList.add('card-click');
                card.classList.remove('card-wrapper_hover');
                cardWasClicked = true;
            }
        });
    });
});