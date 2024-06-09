// PARA COLAPSAR LOS IDEVICES EXCEPTO EL PRIMERO

$(window).load(function(){
    $("p.toggle-idevice a").each(function(i){
        if (i>0) $(this).click();
    });
});
