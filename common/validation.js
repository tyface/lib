$(function(){

	// 모바일 에서 키보드옵션에 자동완성이 켜저있는경우 html maxlength 옵션이 적용되지 않아서 스크립트추가
  $("input[maxLength], input[maxlength]").on("input", function() {
    if(this.value.length > this.maxLength) {
      this.value = this.value.slice(0, this.maxLength);
		}
  });
  
  // 숫자만 입력받기 <input numberOnly>
  $("input[numberOnly], input[numberonly]").on("input", function() {
    $(this).val($(this).val().replace(/[^0-9]/g,""));
  });

	// 한글만 입력받기 <input korOnly>
  $("input[korOnly], input[koronly]").on("input", function() {
    $(this).val($(this).val().replace(/[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\'\"\\]/g,""));
  }
})

//${str.replaceAll('^(01[0|1|6|7|8|9]?)-?([*]{3,4})-?([0-9]{4})$','$1-$2-$3')} // 전화번호 '-' 추가
//<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
//<fmt:formatNumber value="${str}" pattern="0.00"/> 소수점 2자리 표기
//<fmt:formatNumber value="${str}" pattern="#,###"/> 3자리마다 콤마 표기
