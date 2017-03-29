(function(){
    var backgroundCount = 10 + 1;
    var currentBackground = 0;
    var transitionTime = 36000 / 6;
    var transitionSpeed = transitionTime / 10;

    var activeBg = getPicture(15);
    var flop = 1;

    function init(){
        var next = getPicture(16);
        var realNum = (next >= 10) ? next : ('0' + next);

        $('.background:eq(1)').css({'background-image': "url('./img/sky/"+realNum+"-Sky.png')"})
            .find('.ground').css('background-image', "url('./img/ground/"+realNum+"-Ground.png')");

        setBackground()
    }

    function setBackground() {
        var backgrounds = $('.background'),
            currentBg = $(backgrounds[flop]),
            nextBg = $(backgrounds[1 - flop]),
            nextG = nextBg.find('.ground'),
            next = (activeBg + 1) % backgroundCount,
            realNum = (next >= 10) ? next : ('0' + next);

        currentBg.css({transition: 'opacity ' + ((transitionSpeed / 1000) + 0.5) + 's ease', 'z-index': 1});
        nextBg.css({'transition': '', 'z-index': 0, 'background-image': "url('./img/sky/"+realNum+"-Sky.png')", 'opacity': 1})
        nextG.attr('class', 'ground').css('background-image', "url('./img/ground/"+realNum+"-Ground.png')");

        var time = 0;
        var interval = setInterval(function(){
            time += transitionSpeed;

            var per = time / transitionTime;

            currentBg.css({opacity: 1 - per});

            if(time >= transitionTime){
                clearInterval(interval);
                setBackground();
            }
        }, transitionSpeed);

        flop = 1 - flop;
        activeBg = next;
    }

    //Determines the picture to use based on the hour
    function getPicture(hour) {
        return (hour <= 1) ? numberOfBackgrounds : Math.floor(((hour - 1)) / 2);
    };

    init();
})();