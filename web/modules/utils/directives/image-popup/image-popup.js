(function () {
    'use strict';
    
    angular.module('utils')
        .directive('imagePopup', ['EVENTS', function (EVENTS) {
            return {
                restrict: 'E',

                scope: true,

                templateUrl: 'modules/utils/directives/image-popup/image-popup.html',

                link: function (scope, element, attrs) {
                    // TODO Refactor this directive, transform it to one object
                    var classes = {
                        background: 'image-popup__dark-background',

                        popupActive: 'product-images__dark-background--visible',

                        popupImage: 'image-popup__image'
                    };

                    var container = element.parent(),

                        currentPopupImage = $('.' + classes.popupImage),

                        background = $('.' + classes.background),

                        allImagesArray = [];

                    var sensors = {
                        popupIsOpen: false
                    };

                    var slider = {
                        currentImageNumber: 0
                    };

                    var helpers = {
                        collectImages: function () {
                            var images = container.find('img');

                            return _.remove(_.toArray(images), function (element) {
                                return element.classList.value.indexOf(classes.popupImage) === -1;
                            });
                        },
                        
                        switchSliderImage: function () {
                            var next = 0;

                            slider.currentImageNumber = _.findKey(allImagesArray, function (element) {
                                return element.src === currentPopupImage.attr('src');
                            });

                            if ( slider.currentImageNumber < allImagesArray.length - 1 ) {
                                next = ++slider.currentImageNumber;
                            }

                            currentPopupImage.attr('src', allImagesArray[next].src);
                        }
                    };

                    var handlers = {
                        containerClickHandler: function (event) {
                            if ( _.isEmpty(allImagesArray) ) {
                                allImagesArray = helpers.collectImages();
                            }

                            if ( !sensors.popupIsOpen ) {
                                var target = event.target;

                                if ( target.nodeName === 'IMG' ) {
                                    sensors.popupIsOpen = true;

                                    currentPopupImage.attr('src', target.src);

                                    background.addClass(classes.popupActive);
                                }
                            }
                        },

                        backgroundClickHandler: function () {
                            background.removeClass(classes.popupActive);

                            sensors.popupIsOpen = false;
                        },

                        popupImageClickHandler: function (event) {
                            event.stopPropagation();

                            helpers.switchSliderImage();
                        }
                    };

                    container.on(EVENTS.ELEMENT.CLICK, handlers.containerClickHandler);

                    background.on(EVENTS.ELEMENT.CLICK, handlers.backgroundClickHandler);

                    currentPopupImage.on(EVENTS.ELEMENT.CLICK, handlers.popupImageClickHandler);

                    var cancelHandlers = scope.$on('destroy', function () {
                        container.off(EVENTS.ELEMENT.CLICK, handlers.containerClickHandler);

                        background.off(EVENTS.ELEMENT.CLICK, handlers.backgroundClickHandler);

                        currentPopupImage.off(EVENTS.ELEMENT.CLICK, handlers.popupImageClickHandler);

                        cancelHandlers();
                    });
                }
            };
        }]);
})();