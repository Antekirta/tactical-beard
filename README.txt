*****************************
	PAGE MODULES
*****************************

main-page
	slider
    categories-list
    impulse-products
    page-content
    sidebar-additional
categories-page
	categories-list
products-list-page
	categories-sidebar
	product-filter (doest not exist)
	product-item (doest not exist)
product-page
	product-photos (doest not exist)
	product-short-description (doest not exist)
	product-buttons (doest not exist)
	product-tabs (doest not exist)
	impulse-products
make-order-page
	preordered-list (doest not exist)
	order-steps (doest not exist)
order-done-page
basket-page
info-list-page
info-page
bookmarks-page
personal-account-page
	there are a lot of different modules
*****************************
	REUSEABLE MODULES
*****************************

categories-list
categories-sidebar
enter-popup
impulse-products
main-menu
page-content
sidebar-additional
sidebar-menu
site-footer
site-header
slider

*****************************
	SERVICE MODULES
*****************************

beard
registry
utils

*****************************
	PROVIDERS
*****************************

categories
products



/* LOGIN PROCESS */

После того, как пользователь успешно залогинился, происходит следующее:
1) Закрывается окошко логина
2) $rootScope.isLogin выставляется в true
3) Сохраняется номер сессии
4) В окошке в хедере пропадает предложение залогиниться или разлогиниться, весто появляются ия пльзователя и предложение разлогиниться






