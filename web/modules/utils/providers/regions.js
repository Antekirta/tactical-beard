(function() {
    'use strict';

    angular.module('utils').provider('regionsProvider', function() {
        this.$get = [
            function() {
                return [
                    {
                        name: 'Алтайский край',
                        code: '22'
                    },
                    {
                        name: 'Амурская область',
                        code: '28'
                    },
                    {
                        name: 'Архангельская область',
                        code: '29'
                    },
                    {
                        name: 'Астраханская область',
                        code: '30'
                    },
                    {
                        name: 'Белгородская область',
                        code: '31'
                    },
                    {
                        name: 'Брянская область',
                        code: '32'
                    },
                    {
                        name: 'Владимирская область',
                        code: '33'
                    },
                    {
                        name: 'Волгоградская область',
                        code: '34'
                    },
                    {
                        name: 'Вологодская область',
                        code: '35'
                    },
                    {
                        name: 'Воронежская область',
                        code: '36'
                    },
                    {
                        name: 'г. Москва',
                        code: '77'
                    },
                    {
                        name: 'Еврейская автономная область',
                        code: '79'
                    },
                    {
                        name: 'Забайкальский край',
                        code: '75'
                    },
                    {
                        name: 'Ивановская область',
                        code: '37'
                    },
                    {
                        name: 'Иные территории, включая город и космодром Байконур',
                        code: '99'
                    },
                    {
                        name: 'Иркутская область',
                        code: '38'
                    },
                    {
                        name: 'Кабардино-Балкарская Республика',
                        code: '07'
                    },
                    {
                        name: 'Калининградская область',
                        code: '39'
                    },
                    {
                        name: 'Калужская область',
                        code: '40'
                    },
                    {
                        name: 'Камчатский край',
                        code: '41'
                    },
                    {
                        name: 'Карачаево-Черкесская Республика',
                        code: '09'
                    },
                    {
                        name: 'Кемеровская область',
                        code: '42'
                    },
                    {
                        name: 'Кировская область',
                        code: '43'
                    },
                    {
                        name: 'Костромская область',
                        code: '44'
                    },
                    {
                        name: 'Краснодарский край',
                        code: '23'
                    },
                    {
                        name: 'Красноярский край',
                        code: '24'
                    },
                    {
                        name: 'Курганская область',
                        code: '45'
                    },
                    {
                        name: 'Курская область',
                        code: '46'
                    },
                    {
                        name: 'Ленинградская область',
                        code: '47'
                    },
                    {
                        name: 'Липецкая область',
                        code: '48'
                    },
                    {
                        name: 'Магаданская область',
                        code: '49'
                    },
                    {
                        name: 'Московская область',
                        code: '50'
                    },
                    {
                        name: 'Мурманская область',
                        code: '51'
                    },
                    {
                        name: 'Ненецкий автономный округ',
                        code: '83'
                    },
                    {
                        name: 'Нижегородская область',
                        code: '52'
                    },
                    {
                        name: 'Новгородская область',
                        code: '53'
                    },
                    {
                        name: 'Новосибирская область',
                        code: '54'
                    },
                    {
                        name: 'Омская область',
                        code: '55'
                    },
                    {
                        name: 'Оренбургская область',
                        code: '56'
                    },
                    {
                        name: 'Орловская область',
                        code: '57'
                    },
                    {
                        name: 'Пензенская область',
                        code: '58'
                    },
                    {
                        name: 'Пермский край',
                        code: '59'
                    },
                    {
                        name: 'Приморский край',
                        code: '25'
                    },
                    {
                        name: 'Псковская область',
                        code: '60'
                    },
                    {
                        name: 'Республика Адыгея (Адыгея)',
                        code: '01'
                    },
                    {
                        name: 'Республика Алтай',
                        code: '04'
                    },
                    {
                        name: 'Республика Башкортостан',
                        code: '02'
                    },
                    {
                        name: 'Республика Бурятия',
                        code: '03'
                    },
                    {
                        name: 'Республика Дагестан',
                        code: '05'
                    },
                    {
                        name: 'Республика Ингушетия',
                        code: '06'
                    },
                    {
                        name: 'Республика Калмыкия',
                        code: '08'
                    },
                    {
                        name: 'Республика Карелия',
                        code: '10'
                    },
                    {
                        name: 'Республика Коми',
                        code: '11'
                    },
                    {
                        name: 'Республика Крым',
                        code: '91'
                    },
                    {
                        name: 'Республика Марий Эл',
                        code: '12'
                    },
                    {
                        name: 'Республика Мордовия',
                        code: '13'
                    },
                    {
                        name: 'Республика Саха (Якутия)',
                        code: '14'
                    },
                    {
                        name: 'Республика Северная Осетия - Алания',
                        code: '15'
                    },
                    {
                        name: 'Республика Татарстан (Татарстан)',
                        code: '16'
                    },
                    {
                        name: 'Республика Тыва',
                        code: '17'
                    },
                    {
                        name: 'Республика Хакасия',
                        code: '19'
                    },
                    {
                        name: 'Ростовская область',
                        code: '61'
                    },
                    {
                        name: 'Рязанская область',
                        code: '62'
                    },
                    {
                        name: 'Самарская область',
                        code: '63'
                    },
                    {
                        name: 'Санкт-Петербург',
                        code: '78'
                    },
                    {
                        name: 'Саратовская область',
                        code: '64'
                    },
                    {
                        name: 'Сахалинская область',
                        code: '65'
                    },
                    {
                        name: 'Свердловская область',
                        code: '66'
                    },
                    {
                        name: 'Севастополь',
                        code: '92'
                    },
                    {
                        name: 'Смоленская область',
                        code: '67'
                    },
                    {
                        name: 'Ставропольский край',
                        code: '26'
                    },
                    {
                        name: 'Тамбовская область',
                        code: '68'
                    },
                    {
                        name: 'Тверская область',
                        code: '69'
                    },
                    {
                        name: 'Томская область',
                        code: '70'
                    },
                    {
                        name: 'Тульская область',
                        code: '71'
                    },
                    {
                        name: 'Тюменская область',
                        code: '72'
                    },
                    {
                        name: 'Удмуртская Республика',
                        code: '18'
                    },
                    {
                        name: 'Ульяновская область',
                        code: '73'
                    },
                    {
                        name: 'Хабаровский край',
                        code: '27'
                    },
                    {
                        name: 'Ханты-Мансийский автономный округ - Югра',
                        code: '86'
                    },
                    {
                        name: 'Челябинская область',
                        code: '74'
                    },
                    {
                        name: 'Чеченская Республика',
                        code: '20'
                    },
                    {
                        name: 'Чувашская Республика - Чувашия',
                        code: '21'
                    },
                    {
                        name: 'Чукотский автономный округ',
                        code: '87'
                    },
                    {
                        name: 'Ямало-Ненецкий автономный округ',
                        code: '89'
                    },
                    {
                        name: 'Ярославская область',
                        code: '76'
                    }
                ];
            }
        ];
    });
})();
