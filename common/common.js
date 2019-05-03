

/* 타이머  TODO 공통으로 사용하려면 많이 손봐야할 것 같다..
 * el : 남은시간 타이머 요소 : 아이디나 클래스명 ex)'#timer'
 * cb : 콜백 함수
 */
var missionTime = 180;			// 인증번호 유효 시간설정(3분)
var tempInterval;			// 임시 인터벌 변수

function missionTimer(el, cb) {
    var minutes;			// 분
    var seconds;			// 초
	
    clearInterval(tempInterval);

    /* 인터벌 영역 */
    tempInterval = setInterval(function() {
        minutes = parseInt(missionTime / 60 % 60, 10);
        seconds = parseInt(missionTime % 60, 10);

        /* 숫자 2자리 맞추기 */
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        /* 계산된 시간 요소에 셋팅 */
        $(el).html(minutes + ":" + seconds);

        /* 0초가 되면 인터벌 종료 */
        if (--missionTime < 0) {
        	missionTime = 0;
            clearInterval(tempInterval);

            if (typeof cb === "function") {
            	cb();
            }
        }
    }, 1000);
}

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
