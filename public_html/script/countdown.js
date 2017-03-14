var CountDown = function () {

    // Length ms
    var TimeOut = 10;
    // Interval ms
    var TimeGap = 1000;

    var CurrentTime = (new Date()).getTime();
    var EndTime = (new Date()).getTime() + TimeOut;

    var GuiTimer = null;

    var Running = false;

    var UpdateTimer = function () {
        // Run till timeout
        if (CurrentTime + TimeGap <= EndTime) {
            timeout = setTimeout(UpdateTimer, TimeGap);
        }
        // Countdown if running
        if (Running) {

            // Update Gui
            var Time = new Date();
            Time.setTime(EndTime - CurrentTime);
            var Minutes = Time.getMinutes();
            var Seconds = Time.getSeconds();

            CurrentTime += TimeGap;

            for (var i = 0; i < GuiTimer.length; i++) {
                GuiTimer[i].innerHTML = (Minutes < 10 ? '0' : '') + Minutes + ':' + (Seconds < 10 ? '0' : '') + Seconds;
                if (converterMinutosParaMilis(GuiTimer[i].innerHTML) === 0) {
                    $($('#tblColeta tr td select.func_produto')[i]).val('');
                    $($('#tblColeta tr td select.func_atividade')[i]).val('');
                    GuiTimer[i].innerHTML = '05:00';
                    if (i === 1) {
                        var registrarArray = $('#tblColeta tr td button');
                        var indicePartida = 0;
                        for (var x = 0; x < registrarArray.length; x++) {
                            if (registrarArray[x].disabled === false) {
                                indicePartida = x;
                            }
                        }

                        gravarDados(indicePartida, registrarArray.length);

                        $(GuiTimer[0].parentNode.parentNode.children[3].children).attr('disabled', false);
                    }
                    GuiTimer[i].parentNode.parentNode.style.backgroundColor = 'white';
                    $(GuiTimer[i].parentNode.parentNode.children[3].children).attr('disabled', true);

                    if (i === (GuiTimer.length - 1)) {
                        keep(300000);
                    }
                }
                if (converterMinutosParaMilis(GuiTimer[i].innerHTML) < 60000) {
                    GuiTimer[i].parentNode.parentNode.style.backgroundColor = 'red';
                }
            }
        }
    };

    var Pause = function () {
        Running = false;
        TimeOut = 300000;
    };

    var Resume = function () {
        Running = true;
    };

    var Start = function (Timeout, componentDisplay) {
        Running = true;
        GuiTimer = componentDisplay;
        TimeOut = Timeout;
        CurrentTime = (new Date()).getTime();
        EndTime = (new Date()).getTime() + TimeOut;
        UpdateTimer();
    };

    var keep = function (Timeout) {
        Running = true;
        TimeOut = Timeout;
        CurrentTime = (new Date()).getTime();
        EndTime = (new Date()).getTime() + TimeOut;
        UpdateTimer();
    };

    return {
        Pause: Pause,
        Resume: Resume,
        Start: Start
    };
};