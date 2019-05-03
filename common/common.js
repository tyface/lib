/*
레이어 팝업 열기
(자바의 컨트롤러를 통하여 팝업 열기)
자바단 소스 :
@RequestMapping(value="/openLayerPopup", method= {RequestMethod.POST})
public String layerPopup(@RequestBody Map<String, Object> inMap, Model model) throws Exception {
	model.addAllAttributes(inMap);
	return "/layerPopup/" + inMap.getString("fileName");
}
*/
function openLayerPopup(fileName, inData) {
	var url = "/openLayerPopup";	// 레이어 팝업 요청 url

	if(typeof inData === "undefined") {
		inData = {fileName : fileName};
	} else {
		inData.fileName = fileName;
	}

	$.ajax({
		url : url,			// 요청 url (RestFull)
		type : "post",
		data : inData,			// 넘겨주는 데이터 (없어도 무관)
		dataType : "text",		// 
		success : function(data) {			
			$(".layerPopDiv").remove();	// 중복 생성을 방지하기위해 먼저 지우면서 시작
			
			var layerPop = $("<div class='layerPopDiv'></div>").html(data);	// 레이어 팝업 생성후 body안에 마지막 요소로 추가

			$("body").append(layerPop);	// body에 만들어낸 레이어팝업 HTML 코드 append
			$(".modal-wrap").show();	// 레이어 팝업이 화면에 보이게 show()
		}
	});
	return;
}

/* 모바일디바이스 확인*/
function isMobile() {
	if (navigator.platform) {
		var filter = "win16|win32|win64|mac|macintel";

		return filter.indexOf(navigator.platform.toLowerCase()) < 0;
	}
}

/* 
엔터키 이벤트시 함수실행(모바일 디바이스 포함)
사용법: ex) input 태그안에 onkeypress="chkEnter(event, 실행할 함수, [함수에 필요한 아규먼트/없어도 무방]);"
*/
function chkEnter(evt, fnc, args) {
	var keyCode = evt.which ? evt.which : event.keyCode;

	if(keyCode == "13") { //키코드 13 : enter
		fnc(args);
	}
}

/* 
엔터키 이벤트시 포커스 아웃(모바일 키패드용)
사용법: ex) input 태그에 onkeypress="focusOut(event);"
*/
function focusOutByEnter(evt) {
	var keyCode = evt.which?evt.which:event.keyCode;

	if(keyCode == "13") {
		document.activeElement.blur();
	}
}
