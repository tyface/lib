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
