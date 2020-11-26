//$(function () {
//
//	if (localStorage.getItem(key, v)) {
//		$('#memo').val(localStorage.getItem('memo'));
//	}
//
//
//	(function autoSave() {
//		localStorage.setItem('memo', $('#memo').val());
//		setTimeout(autoSave, 1000);
//	})();
//
//});
//自動保存をつけツィ







$("#save").on("click", function () {
	const key = $("#title").val(); //入力値をとってくる
	const v = $("#message").val(); //入力値をとってくる
	localStorage.setItem(key, v); //データ保存
	const h = '<ul class="add_list"><li class="in_t">' + key + '</li><li class="in_n">' + v + '</li></ul>';
	$("#list").append(h);
	alert("保存しますか？");
});






//2.clear クリックイベント
$("#clear").on("click", function () {
	localStorage.clear();
	$("#list").empty();
	alert("本当に削除しますか？");
});





//3.ページ読み込み：保存データ取得表示
for (let i = 0; i < localStorage.length; i++) {
	//変数keyにタイトル名を代入
	const key = localStorage.key(i);
	//変数Valにtext内容を代入
	const val = localStorage.getItem(key);
	const h = '<ul class="add_list"><li class="in_t">' + key + '</li><li class="in_n">' + v + '</li></ul>';
	$("#list").append(h);

};
