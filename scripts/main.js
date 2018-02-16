$(document).ready(function() {
	var allCards = [];
	var oneVisible = false;
	var moveCounter = 0;
	var $firstCard = null;
	var firstNumber = undefined;
	var lock = false;
	var pairsLeft = 10;

	$('.start').on('click', startGame);

	function startGame() {
		moveCounterCounter = 0;
		drawBoard();
		prepareCards();
		catchBoard();
		pairsLeft = 10;
	}

	function drawBoard() {
		var startHTML = '';
		for(i = 0; i < 20; i++)	{
			startHTML += '<div class="card" id="t'+i+'"></div>';
		}

		startHTML+='<div class="score">Move counter: 0</div>';
		$('#board').html(startHTML);
	}

	function prepareCards()	{
		var cards = [];
		for(var i = 0, j = 0; i < 10; i++, j=j+2) {
			var name = 'tile-'+i+'.png';
			cards[j] = name;
			cards[j+1] = name;
		}

		var maxIndex = 19;

		for(var k = 0; k<cards.length; k++)	{
			var index = Math.floor(Math.random() * maxIndex);
			allCards[k] = cards[index];

			cards[index] = cards[maxIndex];
			maxIndex--;
		}
	}

	function catchBoard() {
		$('#board').on('click', function(e) {
            revealCard(e); 
        });
	}

	function revealCard(e) {
		if(!$(e.target).hasClass('card')) {
			return;
		}
		if(lock) {
			return;
		}
		lock = true;
		$el = $(e.target);
		var opacityValue = $el.css('opacity');
		var nr = e.target.id.substring(1);
		var picture = 'url(img/' + allCards[nr] + ')';
		$el.css('background-image', picture);
		$el.addClass('cardA');
		$el.removeClass('card');

		if(oneVisible == false)	{
			oneVisible = true;
			$firstCard = $el;
			firstNumber = nr;
			lock = false;
		} else {
			check2cards(firstNumber, nr, $firstCard, $el);
		}
	}

	function check2cards(nr1, nr2, $card1, $card2) {
		if(nr1 == nr2) {
			lock = false;
			return;
		} else if(allCards[nr1] == allCards[nr2]) {
			setTimeout(function() { hideCards($card1, $card2) }, 750);
		} else {
			setTimeout(function() { restoreCards($card1, $card2) }, 1000);
		}
		moveCounter++;
		$('.score').html('Move counter: ' + moveCounter);
		oneVisible = false;
	}

	function hideCards($card1, $card2) {
		$card1.css('opacity', '0');
		$card1.off('click');
		$card2.css('opacity', '0');
		$card2.off('click');

		pairsLeft--;

		if(pairsLeft == 0) {
			win();
		}

		lock = false;
	}

	function restoreCards($card1, $card2) {
		$card1.css('background-image', 'url(img/title.png)');
		$card1.addClass('card');
		$card1.removeClass('cardA');

		$card2.css('background-image', 'url(img/title.png)');
		$card2.addClass('card');
		$card2.removeClass('cardA');
		lock = false;
	}

	function win() {
		var text = '<h2>You win!<br>Done in ' + moveCounter + ' moves.</h2>';
		var restartHTML = '<button class="restart">Restart</button>';
		$('#board').html(text);
		$('#record').html(restartHTML);
		$('.restart').on('click', startGame);
	}
    
    changeBgColor();
});

function changeBgColor() {
    var btn = $('.darken');
    var body = $('body');
    
    btn.on('click', function() {
        var btnClass = btn.attr('class');
        if(btnClass === 'darken') {
            btn.attr('class', 'lighten');
            btn.text('Lighten');
            body.attr('class', 'bgcolor');
        } else {
            btn.attr('class', 'darken');
            btn.text('Darken');
            body.removeAttr('class', 'bgcolor');
        }
    })
};