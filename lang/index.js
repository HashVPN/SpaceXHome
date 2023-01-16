
var _lang = sessionStorage.getItem('lang')
if(_lang&&_lang!=''){
	if(_lang=='ru'||_lang=='es'){
		$('.menuItem').css('font-size','13px')
		$('.dropdown .selected').css('font-size','14px')
		$('.language-warp').css('width','110px')

	}else if(_lang == 'jpn'){
		$('.menuItem').css('font-size','16px')
		$('.dropdown .selected').css('font-size','16px')
		$('.language-warp').css('width','110px')

	}else if(_lang == 'id'){
		$('.language-warp').css('width','128px')
	}else{
		$('.menuItem').css('font-size','17px')
		$('.dropdown .selected').css('font-size','17px')
		$('.language-warp').css('width','110px')


	}
    languageSelect(_lang)
    $("#language_set").val(_lang)
}else{
	sessionStorage.setItem('lang','en')
	languageSelect('en')
}
 function languageSelect(defaultLang){
	 $("[i18n]").i18n({
		 defaultLang: defaultLang,
		 filePath: "lang/",
		 filePrefix: "i18n_",
		 fileSuffix: "",
		 forever: true,
		 callback: function(res) {
			console.log(res,'ss')
		 }
	 });
 }

 function handleSetLanguage(obj){
	var str = $(obj).val()
    sessionStorage.setItem('lang',str)
	languageSelect(str);
	console.log(str);
	if(str=='ru'||str=='es'){
		$('.menuItem').css('font-size','13px')
		$('.dropdown .selected').css('font-size','13px')
		$('.language-warp').css('width','110px')


	}else if(str == 'jpn'){
		$('.menuItem').css('font-size','16px')
		$('.dropdown .selected').css('font-size','16px')
		$('.language-warp').css('width','110px')

	}else if(str == 'id'){
		$('.language-warp').css('width','128px')
	}else{
		$('.menuItem').css('font-size','17px')
		$('.dropdown .selected').css('font-size','17px')
		$('.language-warp').css('width','110px')
	}
}