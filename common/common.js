/* 엔터키 이벤트확인(모바일 디바이스 포함) */
//사용법: ex) input 태그에 onkeypress="enterCheck(event, 실행할 함수, [평션에 필요한 아규먼트/없어도 무방])"
function chkEnter(evt, fnc, args) {
	var keyCode = evt.which?evt.which:event.keyCode;

	if(keyCode == "13") { //키코드 13 : enter
		fnc(args);
	}
}
