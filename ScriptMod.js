//#layer-home
function goTranslate(id_elemento) {
    console.log(id_elemento);
    var arquivoAtual = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1).toLocaleLowerCase();
    if (arquivoAtual == "index.html" || arquivoAtual == "index.aspx" || arquivoAtual == "" || arquivoAtual == "home") {
        goToAnchor(id_elemento);
        $(".menu-mobile-button.aberto").click();
    }
    else {
        Cookies.set('anchor', id_elemento);
        if (location.href.indexOf(".aspx") >= 0) {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/index.aspx";
        }
        else if (location.href.indexOf(".html") >= 0) {
            window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/index.html";
        }
        else {
            /*window.location.href = location.href.replace(location.href.substring(location.href.lastIndexOf("/"), location.href.length), "") + "/";*/
            window.location.href = location.origin + "/";
        }
    }
}

function goToAnchor(id_elemento) {
    $('html,body').animate({ scrollTop: ($(id_elemento).offset().top - 70) }, 'slow');
}


$(document).ready(function () {

    function atualizarTamanhoFundoMenu() {
        if ($(window).scrollTop() > 0) {
            $(".header-base").addClass('desktop-tamanho-ativado');
            $(".header-base").addClass('desktop-cor-ativado');
        } else {
            $(".header-base").removeClass('desktop-tamanho-ativado');
            $(".header-base").removeClass('desktop-cor-ativado');
        }
    }

    //Submenu do mobile
    function atualizarEspacamentoMenuMobile() {
        if ($(".menu-mobile-button").hasClass('aberto')) {
            $(".menu-mobile").css('padding-top', $('.header-mobile').height() + "px");
        }
    }

    $(window).scroll(function () {
        atualizarEspacamentoMenuMobile();
        atualizarTamanhoFundoMenu();
    });

    if (typeof (Cookies.get('anchor')) != "undefined") {
        goToAnchor(Cookies.get('anchor'));
        Cookies.remove('anchor');
    }

    $(".traducao .menu-linguagem a").click(function () {
        $(".traducao > a img").attr('src', $(this).find('img').attr('src'));
    });

    //Controle do fundo do menu quando fora do destaque
    atualizarEspacamentoMenuMobile();
    atualizarTamanhoFundoMenu();

    $(".menu-mobile-button").click(function () {
        $(this).toggleClass('aberto');
        if ($(this).hasClass('aberto')) {
            $(".menu-mobile").css('bottom', "0%");
            $(".menu-mobile").css('padding-top', $('.header-mobile').height() + "px");
        } else {
            $(".menu-mobile").css('bottom', "100%");
            $(".menu-mobile").css('padding-top', "0");
        }
    });

    //Alterando submenu mobile
    $(".menu-mobile .dropdown a").click(function () {
        $(this).next().toggleClass('ativo');
    });

    //Corrigindo classes automaticas
    $(".menu-mobile ul").removeClass('dropdown-menu');
    $(".menu-mobile > li.dropdown > a").attr('data-toggle', '');

    //Menu e Submenu
    $('.nav-link.dropdown-item').click(function () {
        $(this).parent().find('> .dropdown-menu').show();
    });

    $('.nav-item.dropdown').click(function () {
        $(this).find('> .dropdown-menu').show();
        $(this).mouseleave(() => { $(this).find('> .dropdown-menu').hide(); })
    });
});