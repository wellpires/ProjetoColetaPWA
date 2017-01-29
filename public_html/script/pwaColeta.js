var components = function () {

    var func_info = function () {
        return $('#func_info');
    };

    var btnNovaLinha = function () {
        return $('#btnNovaLinha');
    };

    var txtHoraAtual = function () {
        return $('#txtHoraAtual');
    };

    var idCheckbox = function () {
        return $('.checkboxesClass');
    };

    var tblColeta = function () {
        return $('#tblColeta');
    };

    var btnIniciar = function () {
        return $('#btnIniciar');
    };

    var btnPausar = function () {
        return $('#btnPausar');
    };

    var btnParar = function () {
        return $('#btnParar');
    };

    return{
        divFuncInfo: func_info,
        btnNovaLinha: btnNovaLinha,
        txtHoraAtual: txtHoraAtual,
        idCheckbox: idCheckbox,
        tblColeta: tblColeta,
        btnIniciar: btnIniciar,
        btnPausar: btnPausar,
        btnParar: btnParar
    };

}();

window.onload = function () {
//    if ('serviceWorker' in navigator) {
//        navigator.serviceWorker.register('/ProjetoColetaPWA/coleta-service-worker.js').then(function (registration) {
//            console.log('Service Worker registered ', registration);
//        }).catch(function (e) {
//            console.log('ERRO ', e);
//        });
//    }

    startTime();
};


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    components.txtHoraAtual().text(h + ":" + m + ":" + s);
    var t = setTimeout(startTime, 0);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    ;
    return i;
}

var timeout;

var CountDown = function () {

    var firstTime = false;
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
        if (CurrentTime + TimeGap < EndTime) {
            timeout = setTimeout(UpdateTimer, TimeGap);
        }
        // Countdown if running
        if (Running) {
            CurrentTime += TimeGap;
            if (GuiTimer.innerHTML === '01:00') {
                GuiTimer.parentNode.parentNode.style.backgroundColor = 'red';
            }
        }
        // Update Gui
        var Time = new Date();
        Time.setTime(EndTime - CurrentTime);
        var Minutes = Time.getMinutes();
        var Seconds = Time.getSeconds();

        GuiTimer.innerHTML = (Minutes < 10 ? '0' : '') + Minutes + ':' + (Seconds < 10 ? '0' : '') + Seconds;
    };

    var Pause = function () {
        Running = false;
    };

    var Resume = function () {
        Running = true;
    };

    var Start = function (Timeout, componentDisplay) {
        Running = true;
        if (!firstTime) {
            GuiTimer = componentDisplay;
            TimeOut = Timeout;
            CurrentTime = (new Date()).getTime();
            EndTime = (new Date()).getTime() + TimeOut;
            firstTime = true;
            UpdateTimer();
        }
    };

    return {
        Pause: Pause,
        Resume: Resume,
        Start: Start
    };
};


//var cronometro = undefined;
//function startTimer(duration, display) {
//    var timer = duration;
//    var minutes;
//    var seconds;
//    cronometro = setInterval(function () {
//        minutes = parseInt(timer / 60, 10);
//        seconds = parseInt(timer % 60, 10);
//
//        minutes = minutes < 10 ? "0" + minutes : minutes;
//        seconds = seconds < 10 ? "0" + seconds : seconds;
//
//        if (display !== undefined) {
//            display.innerHTML = minutes + ":" + seconds;
//        }
//
//        if (--timer < 0) {
//            timer = duration;
//        }
//    }, 1000);
//}
//
//function iniciarTimer(display) {
//    var fiveMinutes = 5;
//    var minutos = 60 * fiveMinutes;
//    startTimer(minutos, display);
//}
//;