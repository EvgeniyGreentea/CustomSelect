$('.select').each(function () {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 250; 

    _this.hide();
    _this.wrap('<div class="select"></div>');

    $('<div>', {
        class: 'new-select',
        id: 'new-select',
        text: 'Код ОКРБ или наименование закупочной продукции'

    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list',
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 0; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item ',
            html: $('<span>', {
                class: 'SelectItemText',
                text: selectOption.eq(i).text()
            }),
        })
            .attr('value', selectOption.eq(i).val())
            .attr('data-level', selectOption.eq(i).attr('data-level'))
            .appendTo(selectList)
        $('[data-level]').addClass('visual')

    }

    const selectItem = selectList.find('.new-select__item');
    $(selectItem).prepend("<div class='icDropDown'> <div class='line1'></div><div class='line2'></div><div class='line3'></div><div class='line4'></div><div class='line5'></div><div class='vector'></div> </div>")
    $(selectItem).prepend("<div class='check-box'><label class='checkboxItem'><input type='checkbox'><span class='ckeckspan'></span></label></div>")

    let findValue = () => {
        for (let i = 0; i < selectItem.length; i++) {
            if (selectItem.eq(i).attr('data-level') == 6)
                selectItem.eq(i).find('.vector').addClass('opacity')
        }
    }

    findValue()

    selectList.slideUp(0);
    selectHead.on('click', function () {
        if (!$(this).hasClass('on')) {
            if ($('.new-select__item input:checkbox').is(':checked')){
                $('.text').text('Реализуемые товары').addClass('backArrow')

            }
            $(this).addClass('on');
            selectList.slideDown(duration);
        } else {
            // $(this).removeClass('on');
            // selectList.slideUp(duration);
        }
    });

    selectItem.on('click', '.SelectItemText', function () {
        let i = $(this).closest('.new-select__item').index()
        i += 1
        let dataLevelItem = $(this).closest('.new-select__item').attr('data-level');
        if (!(typeof dataLevelItem !== typeof undefined && dataLevelItem !== false)) {
            for (i; i < selectItem.length; i++) {
                if (selectItem.eq(i).attr('data-level') == 2) {
                    if (selectItem.eq(i).hasClass('visual')) {
                        selectItem.eq(i).removeClass('visual')
                        selectItem.eq(i).children('.SelectItemText').addClass('dataLevel2')
                        selectItem.eq(i).find('.line5').css('display', 'block')


                    } else {
                        for (i; i < selectItem.length; i++) {
                            if (!(selectItem.eq(i).hasClass('visual')) && selectItem.eq(i).attr('data-level') !== dataLevelItem) {
                                selectItem.eq(i).addClass('visual')
                                selectItem.eq(i).find('.vector').removeClass('top')
                            }
                            if ((typeof selectItem.eq(i).attr('data-level') == typeof undefined)) break
                        }
                    }
                }
                if (!(typeof selectItem.eq(i).attr('data-level') == typeof undefined && selectItem.eq(i).attr('data-level') == false)) break;
            }
        } else {
            let nextDataLevelItem = +dataLevelItem + 1
            for (i; i < selectItem.length; i++) {
                if (selectItem.eq(i).attr('data-level') == nextDataLevelItem) {
                    if (selectItem.eq(i).hasClass('visual')) {
                        selectItem.eq(i).removeClass('visual')
                        selectItem.eq(i).children('.SelectItemText').addClass(`dataLevel${nextDataLevelItem}`)
                        selectItem.eq(i).find('.line5').css('display', 'block')
                        selectItem.eq(i).find('.line4').css('display', 'block')
                        if (nextDataLevelItem > 3) {
                            selectItem.eq(i).find('.line3').css('display', 'block')
                        }
                        if (nextDataLevelItem > 4) {
                            selectItem.eq(i).find('.line2').css('display', 'block')
                        }
                        if (nextDataLevelItem == 6) {
                            selectItem.eq(i).find('.line1').css('display', 'block')
                        }

                    } else {

                        for (i; i < selectItem.length; i++) {
                            if (!(typeof selectItem.eq(i).attr('data-level') == typeof undefined)) {
                                if (!(selectItem.eq(i).hasClass('visual')) && selectItem.eq(i).attr('data-level') !== dataLevelItem) {
                                    selectItem.eq(i).addClass('visual')
                                    selectItem.eq(i).find('.vector').removeClass('top')
                                }
                            }
                            if ((typeof selectItem.eq(i).attr('data-level') == typeof undefined)) break
                        }

                    }
                }
                if (!(typeof selectItem.eq(i).attr('data-level') == typeof undefined && selectItem.eq(i).attr('data-level') == false) && selectItem.eq(i).attr('data-level') == dataLevelItem) break;
            }

        }
    });
    $('.SelectItemText').on('click', function () {
        let vector = $(this).closest('.new-select__item').find('.vector')

        if (vector.hasClass('top')) {
            vector.removeClass('top')
        } else {
            vector.addClass('top')
        }
    })


    let ButtonPanel = $('.new-select__list').append("<div class='ButtonPanel'></div>")
    let ButtonSave = $('.ButtonPanel').append("<input type='button' class='NewButton' value='Применить'>");
    $('.NewButton').on('click', function () {
        if (selectHead.hasClass('on')) {
            selectHead.removeClass('on');
            selectList.slideUp(duration);
        }

        if ($('.new-select__item input:checkbox').is(':checked')) {
            $('.text').text('Тендеры в роли Заказчика');
            $('.new-select').addClass('active');
            $('.counter').css('display', 'inline-block')
        } else {
            $('.text').text('Тендеры в роли Поставщика');
            $('.new-select').removeClass('active');
        }
        $('.text').removeClass('backArrow')
        
    });


    $('.select').prepend("<div class='counter'> Показать выбранное <span class='count'></span> </div>");

    let count = 0;
    $(function () {

        count = $('input[type=checkbox]:checked').length;
        displayCount();

        $('input[type=checkbox]').bind('click', function (e, a) {
            if (this.checked) {
                count += a ? -1 : 1;
            } else {
                count += a ? 1 : -1;
            }
            displayCount();

            let item = e.target.closest('.new-select__item')
            if (this.checked) {
                $(item).addClass('backColor')
                
            } else {
                $(item).removeClass('backColor');
            }
            let chooseItem = $(this).closest('.new-select__item').data('value');
            $('select').val(chooseItem).attr('selected', 'selected');
            selectHead.text($(this).closest('.new-select__item').find('span').text());
            $('.new-select').css('color','#272526')
            if(count==0){
                $('.counter').css('display','none')
                $('.new-select').text('Код ОКРБ или наименование закупочной продукции');
                $('.new-select').css('color','rgba(39, 37, 38, 0.6)')
                $('.new-select').removeClass('active');
            }

        });
        $('.ButtonClear').click(function (e) {
            $('.count').text(0);
            $('input[type=checkbox]').removeAttr("checked");
            count = 0;
            for (let i = 0; i < selectItem.length; i++) {
                if (!(typeof selectItem.eq(i).attr('data-level') == typeof undefined)) {
                    if (!(selectItem.eq(i).hasClass('visual')))
                        selectItem.eq(i).addClass('visual')
                } else {
                    selectItem.eq(i).find('.vector').removeClass('top')
                }
            }
            $('.new-select').css('color','rgba(39, 37, 38, 0.6)')
            $('.counter').css('display','none')
            $('.text').text('Тендеры в роли Поставщика')
            $('.text').removeClass('backArrow')
        });
    });
    function displayCount() {
        $('.count').text(count);
    }

let ButtonClear = $('.ButtonPanel').append("<input type='button' class='ButtonClear' value='Очистить'>");
$('.ButtonClear').on('click', function () {
    $('.new-select__item input:checkbox').prop('checked', false);
    count = 0;
    $('.new-select__item').removeClass('backColor');
    $('.new-select').text('Код ОКРБ или наименование закупочной продукции');
    $('.new-select').removeClass('active');
});

$('.select').prepend("<div class='text'> Тендеры в роли Поставщика </div>");

$('.counter').on('click',function(){
    if (!(selectHead.hasClass('on'))) {
        selectHead.addClass('on');
        selectList.slideDown(duration);
    }
    $('.text').text('Реализуемые товары').addClass('backArrow');
})

});





































