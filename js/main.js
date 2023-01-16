
var wheight=null;
var screenWidth= null
var sh=null
var baseUrl = 'https://www.whitehatvpn.com';
var timer2=false
function resizeScreen(){
	if (!timer2) {
		window.screenWidth = document.body.clientWidth;
		screenWidth = window.screenWidth;
		window.screenHeight = document.body.clientHeight;
		// window.screenHeight = $('.indexwarp').height()
		sh = window.screenHeight;
		wheight = sh;
		var r = document.body.offsetWidth / 1550;
		if (screenWidth < 1550) {
			var  shstr = 0;
			shstr = (sh / r).toFixed(3);
			var  style_='transform:scale(' + r + '); height:'+shstr+'px;flex:none'
			$($('.containerkuno')[0]).attr('style',style_)
			$('.containerkuno').css('-webkit-transform','scale(' + r + ')')
			// $('.containerkuno').css('height',shstr+'px')
		} else {
			var  style_='overflow:auto'
			$($('.containerkuno')[0]).attr('style',style_)
		}
		// setTimeout(() => {
		// 	$("#app").show()
		// }, 00);
		timer2 = false;
	}
}

$(window).resize(function(){
	//code
	resizeScreen()
});
resizeScreen();
var url_params = ''
var  url_params_arr=[]
var g_ads=''
if(window.location.href.indexOf('?')>0){
	url_params_arr=window.location.href.split('?')[1].split('&')
	if(url_params_arr.length>0){
		for (var n = 0; n < url_params_arr.length; n++) {
			var element = url_params_arr[n];
			if(element.indexOf('bd_vid')>=0){
				url_params=element
			}
			if(element.indexOf('g_ads')>=0){
				g_ads = element
			}
		}
		console.log(g_ads);
	}
}
function getParams_g_ads(){
	var _params
	if(g_ads&&g_ads!=''&&g_ads.indexOf('g_ads')>=0){
		_params=g_ads.split('g_ads=')[1]
		gtag('event', _params, {
			'g_ads':_params
		});
	}
}
function changeRouter(href){
	var str = "."+ href+'.html'
	if(url_params&&url_params!=''){
		str+='?'+url_params
	}
	window.location.href =str;
}
function changeRouter_noFount(href){
	var str = baseUrl+ href+'.html'
	if(url_params&&url_params!=''){
		str+='?'+url_params
	}
	window.location.href =str;
}
function changeRouter2(href){
	window.location.href='http://help.whitehatvpn.com/'
 }

var _systemVersion=''
function setSystemVersion(str){
	_systemVersion=str
	console.log(_systemVersion);
	sessionStorage.setItem('systemVersion',_systemVersion)
}
function getSystemVersion(){

}
function myBrowser () {
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf('Chrome') > -1)
	{
		$('#showBtnIcon').show()
	}
}
getSystemVersion();
myBrowser()


var myIp=''
var myISP=''
var ip_Pass=true
function get_region_from_ip(){
	$.ajax({
		url: baseUrl+"/jfy-vpn-service-manager/home_util/get_region_from_ip",      
		type: "GET",     
		headers: {
			Accept: "application/json; charset=utf-8"
		},                             
		data: {},
		success: function (response) {  
			if(response.code==0){
				var  row = response.data
				sessionStorage.setItem('region_from_ip',JSON.stringify(row))
				setRegion(row)
			} else if(response.code==3001020){
				var json_={
					region:'IPV6_NOT_SUPPORTED'
				}
				sessionStorage.setItem('region_from_ip',JSON.stringify(json_))
			}                   
		},
		error: function (err) {                    
				 console.log(err);                 
			}
	})
}
function setRegion(row){
	myIp = row.ip
	myISP = row.region
	if(row.region.includes('Iran')||row.region=='China'||row.inChina=='1'){//
		ip_Pass = false
		// $('#showShadeWarp').hide()
		if(document.getElementById('chat-widget-container')){
			document.getElementById('chat-widget-container').remove()
		}
	}else{
			ip_Pass = true
	}
	$('#showRemark .myIp').html(myIp)
	$('#showRemark .myISP').html(myISP)
	// if(!ip_Pass){
	// 	$('.ip_Pass').show()
	// 	$('.mainkuno').remove()
	// }else{
	// 	$('.ip_Pass').hide()
	// }
}
var downloadConfig={
	androidDownloadEq:false,
	windowDownloadEq:false,
	iosDownloadEq:false,
	macDownloadEq:false,
}
var downloadUrl_bottom='/index'
function getDownloadUrl(fun){
	$.ajax({
		url: baseUrl+"/jfy-vpn-service-manager/vpn_config/get_config_download",      
		type: "GET",     
		headers: {
			Accept: "application/json; charset=utf-8"
		},                             
		data: {},
		success: function (response) {  
			if (response.code == 0) {
				var  data = response.data
				downloadConfig=data
				downloadConfig.androidDownloadEq=false
				downloadConfig.windowDownloadEq=false
				downloadConfig.iosDownloadEq=false
				downloadConfig.macDownloadEq=false
				if(data.windowDownloadType=='2'&&data.windowDownloadPageUrl!=''){
					creatQrCode('qrCode1',data.windowDownloadPageUrl)
				}
				if(data.androidDownloadType=='2'&&data.androidDownloadPageUrl!=''){
					creatQrCode('qrCode2',data.androidDownloadPageUrl)
				}
				if(data.macDownloadType=='2'&&data.macDownloadPageUrl!=''){
					creatQrCode('qrCode3',data.macDownloadPageUrl)
				}
				if(data.iosDownloadType=='2'&&data.iosDownloadPageUrl!=''){
					creatQrCode('qrCode4',data.iosDownloadPageUrl)
				}
				fun&&fun()
			}                    
		},
		error: function (err) {                    
				 console.log(err);                 
			}
	})
}
function creatQrCode(dom,_url) {
	$('#'+dom).html('')
	jQuery('#'+dom).qrcode({
			render: "canvas",
			width: 110,
			height: 110,
			text: _url,
			colorDark: "#000",
			colorLight: "#fff"
	});
}
function showEq(str){
	console.log(str);
	if(downloadConfig[str+'Type']=='2'&&downloadConfig[str+'PageUrl']!=''){
		downloadConfig[str+'Eq'] = true
		changeQrView(str+'Eq')
	}
}
function hideEq(str){
	if(downloadConfig[str+'Eq']){
		downloadConfig[str+'Eq'] = false
		$('.eq_cpntent').parent().hide()
	}
}
function changeQrView(key){
	$('.eq_cpntent').parent().hide()
	switch (key) {
		case 'windowDownloadEq':
			$('#qrCode1').parent().show()
		break;
		case 'androidDownloadEq':
			$('#qrCode2').parent().show()
		break;
		case 'macDownloadEq':
			$('#qrCode3').parent().show()
		break;
		case 'iosDownloadEq':
			$('#qrCode4').parent().show()
		break;

	}
}
function is_neizhi () {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger")
	{
		return "weixin";
	} else if (ua.match(/QQ/i) == "qq")
	{
		return "QQ";
	} else if (ua.match(/Alipay/i) == "alipay" && payway == 2)
	{
		return "alipay";
	}
	return false;
}
function checkUrl_bottom (str) {
	var myStr = str
	//debugger

	var ua = navigator.userAgent;
	var isPhone = /(iPhone|iPad|iPod|iOS|Android)/i.test(ua);
	var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
	if (downloadConfig[str + 'Type'] == '1' && downloadConfig[str + 'Url'] != '')
	{
		downloadUrl_bottom = ''
		downloadUrl_bottom = downloadConfig[str + 'Url']
		if ((downloadConfig[str + 'Type'] == '1' && downloadConfig[str + 'Url'] == '') || (downloadConfig[str + 'Type'] == '2' && downloadConfig[str + 'PageUrl'] == ''))
		{
			this.$message({
				message: 'Still Developing',
				type: 'warning',
				showClose: true,
				duration: 1000
			})
			return false
		}
		if (isPhone && isAndroid)
		{
			if (is_neizhi())
			{
				this.$message({
					message: 'Please use the built-in browse',
					type: 'error',
					showClose: true,
					duration: 1500
				})
				return false;
			} else
			{
				window.location.href = downloadUrl_bottom;
			}
		} else
		{
			setTimeout(() => {
				//debugger
				var  bd_vid = ''
				url_params=window.location.href.split('?')[1]
				if(url_params&&url_params!=''&&url_params.indexOf('bd_vid')>=0){
					bd_vid=url_params.split('bd_vid=')[1]
				}
				// console.log(' downloadUrl_bottom', downloadUrl_bottom+'?token=785611');
				var down_url = ''
				if(bd_vid&&bd_vid!=''){
					down_url=downloadUrl_bottom+'?r='+bd_vid
				}else{
					down_url=downloadUrl_bottom
				}
				
				$('#downloadBtn_bottom').parent().attr('href',down_url)
				var my_language = navigator.language
				
				if (myStr == 'windowDownload')
				{ 
					var region_from_ip=sessionStorage.getItem('region_from_ip')
					region_from_ip = JSON.parse(region_from_ip)
					if(region_from_ip.region.includes('Iran')||region_from_ip.region=='China'||region_from_ip.inChina=='1'||region_from_ip.region=='IPV6_NOT_SUPPORTED'){//
						showShadowFun2()
						return false
					}
					// debugger
					var  str = downloadUrl_bottom.split('/')
					var download_url=''
					if(bd_vid&&bd_vid!=''){
						download_url=str[str.length-1].split('.exe')[0]+'.exe'+'?r='+bd_vid
					}else{
						download_url=str[str.length-1].split('.exe')[0]+'.exe'
					}
					showShadowFun(str[str.length-1].split('.exe')[0]+'.exe')
					$('#downloadBtn_bottom').parent().attr('download',download_url)
					var  systemVersion = sessionStorage.getItem('systemVersion')
				
					var  _json = {
						newdownload: 1,
					}
					if (systemVersion && (systemVersion.includes('win')||systemVersion.includes('Mac')))
					{
						_json.os = systemVersion
					}else{
						_json.os = 'other'
					}
					if(bd_vid&&bd_vid!=''){
						gtag('event', bd_vid, {
							'bd_vid':bd_vid
						});
					}
					_json.time = new Date().getTime()
					gtag('event', 'download_new', _json);
				}
				document.getElementById('downloadBtn_bottom').click()

			}, 400);
		}
	} else
	{
		if (downloadConfig[str + 'PageUrl'] != '' && isPhone && isAndroid)
		{
			if (is_neizhi())
			{
				this.$message({
					message: 'Please use the built-in browse',
					type: 'error',
					showClose: true,
					duration: 1500
				})
				return false;
			} else
			{
				window.location.href = downloadConfig[str + 'PageUrl'];
			}
		}
		if ((downloadConfig[str + 'Type'] == '1' && downloadConfig[str + 'Url'] == '') || (downloadConfig[str + 'Type'] == '2' && downloadConfig[str + 'PageUrl'] == ''))
		{
			this.$message({
				message: 'Still Developing',
				type: 'warning',
				showClose: true,
				duration: 1000
			})
			return false
		}
	}

}
function showShadowFun (str) {
	$('#downloadAppName').html(str)
	$('#showShadow').show()
}
function showShadowFun2 (str) {
	$('#showShadow').show()
	$("#showShadow_content").html('Your country or region does not support the use of.')
	$("#showShadow_content").css('color','#000')
}
function hideShadow(){
	$('#showShadow').hide()
}
function downloadAgain () { 
	var  dom = document.getElementById('downloadBtn_bottom')
	if (dom)
	{
		$('#downloadBtn_bottom').trigger("click");
		var  systemVersion = sessionStorage.getItem('systemVersion')
		var  bd_vid = sessionStorage.getItem('bd_vid')
		var  _json = {
			newdownload: 1,
		}
		if (systemVersion && (systemVersion.includes('win')||systemVersion.includes('Mac')))
		{
			_json.os = systemVersion
		}else{
			_json.os = 'other'
		}
		if(bd_vid&&bd_vid!=''){
			gtag('event', bd_vid, {
				'bd_vid':bd_vid
			});
		}
		_json.time = new Date().getTime()
		gtag('event', 'download_new', _json);
	}
	e.stopPropagation()
}
// var routerArr=['index.html','free.html','privacy.html','download.html','place.html','problem.html']
// var window_url = window.location.href.split('/')
// var now_url = window_url[window_url.length-1]
// var router = ''
// if(now_url.includes('?')){
// 	router = now_url.split('?')[0]
// }else{
// 	router = now_url
// }
// routerArr.indexOf('free.html')