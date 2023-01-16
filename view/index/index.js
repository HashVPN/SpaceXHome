var countries_arr= [
	{
		area: 'Europe',
		origin:'Armenia,Andorra,Albania,Austria,Bosnia & Herzegovina,Belarus,Belgium,Bulgaria,Switzerland,Cyprus,Czech Republic,Estonia,Germany,Denmark,Spain,Finland,France,United Kingdom,Georgia,Greece,Croatia,Hungary,Ireland,Iceland,Italy,Netherlands,Norway,Poland,Romania,Russia,Sweden,Slovakia,Isle of Man,Jersey,Latvia,Liechtenstein,Lithuania,Luxembourg,Malta,Moldova,Monaco,Montenegro,North Macedonia,Portugal,Serbia,Slovenia,Turkey,Ukraine',
		list: [],
	}, {
		area: 'Americas',
		origin:'Argentina,Bahamas,Bolivia,Brazil,Canada,Chile,Colombia,Costa Rica,Ecuador,Guatemala,Mexico,Panama,Peru,United States,Uruguay,Venezuela',
		list: [],
	}, {
		area: 'Asia Pacific',
		origin:'Australia,Bangladesh,Bhutan,Brunei Darussalam,Cambodia,Hong Kong,India,Indonesia,Japan,Kazakhstan,Laos,Macau,Malaysia,Mongolia,Myanmar,Nepal,New Zealand,Pakistan,Philippines,Singapore,South Korea,Sri Lanka,Taiwan,Thailand,Uzbekistan,Vietnam',
		list: [],
	}, {
		area: 'Middle East And Africa',
		origin:'Algeria,Egypt,Israel,Kenya,South Africa',
		list: [],
	}
]
var countries_active= 'Europe'
var countries_active_list = []
$(function(){
	var region_from_ip=null 
	region_from_ip = sessionStorage.getItem('region_from_ip')
	$('#trailer').html("<iframe width='650' height='366' src='https://www.youtube.com/embed/" + 'eKkRgSa6pgE' + "' frameborder='0' allowfullscreen>");

	// if(!region_from_ip||region_from_ip==''){
	// 	get_region_from_ip()
	// }else{
	// 	region_from_ip = JSON.parse(region_from_ip)
	// 	setRegion(region_from_ip)
	// }
	getDownloadUrl()
	getAreaData()
})

function getCountriesData () {
	let arr = []
	for (var _ind = 0; _ind < countries_arr.length; _ind++) {
		var _obj = countries_arr[_ind];
		if (_obj.area == countries_active)
		{
			arr = _obj.list
		}
	}
	countries_active_list =  arr;
	setTab()
}
function setTab() {
	var  str = ''
	for (var index = 0; index < countries_arr.length; index++) {
		var obj = 	countries_arr[index];
		if(countries_active==obj.area){
			str+='<p class="active" attr-obj="'+obj.area+'" onclick="changeCountriesActive(this)">'+obj.area+'</p>'
		}else{
			str+='<p attr-obj="'+obj.area+'" onclick="changeCountriesActive(this)">'+obj.area+'</p>'
		}
		
	}
	$('#left_warp').html(str)
	$('#countries_active').html(countries_active)
	saveImage()
}
function saveImage(){
	var _str=''
	for (var _index = 0; _index < countries_active_list.length; _index++) {
		var obj = countries_active_list[_index];
		_str+='<div class="img-item">'
		_str+='<img src="./images/countriesAndRegions/'+obj.abbreviation.toLowerCase()+'.png" alt="'+obj.countriesAndRegions+'">'
		_str+='<span>'+obj.countriesAndRegions+'</span></div>'
	}
	$('#imgwarp').html(_str)
}
function changeCountriesActive(obj){
	var str=$(obj).attr('attr-obj')
	countries_active=str
	console.log(str)
	getCountriesData()
}
function getAreaData(){
	countries_arr.forEach(ca=>{
		let  arr=ca.origin.split(',')
		let newArr = []
		for(var i =0;i<countriesAndRegionsArr.length;i++){
			if(arr.indexOf(countriesAndRegionsArr[i].countriesAndRegions)>=0){
				newArr.push(countriesAndRegionsArr[i])
			}
		}
		ca.list = newArr
	})
	getCountriesData()
}

