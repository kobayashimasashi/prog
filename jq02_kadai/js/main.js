'use strict';


//functiomのなかにfunctionはない

/*
関数名一覧
getCalendarHead
getCalendarBody
getCalendarTail
clearCalendar
renderTitle
renderWeeks
createCalendar
関数式一覧
関数六個目のなかにある


*/

console.clear();

{
	const today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();


	//関数１個目何回も使うから外に出す
	//カレンダーの前の月の部分
	function getCalendarHead() {

		const dates = [];
		const d = new Date(year, month, 0).getDate(); //前月分の日付
		const n = new Date(year, month, 1).getDay();

		for (let i = 0; i < n; i++) {
			// 30
			// 29, 30
			// 28, 29, 30

			//unshiftは前に追加する,配列系の文字
			dates.unshift({
				date: d - i,
				isToday: false,
				isDisabled: true,
			});
		}

		return dates;
	}





	//関数二個目何回も使うから外に出す
	//カレンダーの今月部分
	function getCalendarBody() {
		const dates = []; // date: 日付, day: 曜日
		const lastDate = new Date(year, month + 1, 0).getDate();
		//ループ処理
		for (let i = 1; i <= lastDate; i++) {
			//配列の中に入れる配列系の文字
			dates.push({
				date: i,
				isToday: false,
				isDisabled: false,
			});
		}
		//条件分岐
		if (year === today.getFullYear() && month === today.getMonth()) {
			dates[today.getDate() - 1].isToday = true;
		}

		return dates;
	}







	//関数三個目何回も使うからreturnで外に出す
	//カレンダーの次の月の部分
	function getCalendarTail() {
		const dates = [];
		const lastDay = new Date(year, month + 1, 0).getDay();
		//ループ処理
		for (let i = 1; i < 7 - lastDay; i++) {
			dates.push({
				date: i,
				isToday: false,
				isDisabled: true,
			});
		}

		return dates;
	}



	//関数4個目カレンダーを消去する関数
	function clearCalendar() {
		const tbody = document.querySelector('tbody');

		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}
	}




	//関数五個目
	function renderTitle() {
		const title = `${year}/${String(month + 1).padStart(2, '0')}`;
		document.getElementById('title').textContent = title;
	}




	//関数六個目
	function renderWeeks() {
		//関数式　スプレット構文を使うと別々のポテチの袋を開封して全部まとめてさらに入れれる
		const dates = [
	  ...getCalendarHead(),
	  ...getCalendarBody(),
	  ...getCalendarTail(),
	];
		const weeks = [];
		const weeksCount = dates.length / 7;
		//ループ処理
		for (let i = 0; i < weeksCount; i++) {
			//配列系の文字
			//spliceを使ってる開始したいインデックス数、削除する要素の数　追加したい場合はその売り路にカンマ区切りで追加したい要素
			weeks.push(dates.splice(0, 7));
		}

		weeks.forEach(week => {
			const tr = document.createElement('tr');
			week.forEach(date => {
				const td = document.createElement('td');

				td.textContent = date.date;
				if (date.isToday) {
					td.classList.add('today');
				}
				if (date.isDisabled) {
					td.classList.add('disabled');
				}

				tr.appendChild(td);
			});
			document.querySelector('tbody').appendChild(tr);
		});
	}




	//関数七個目
	/*
	作った関数を実行したい時には
	関数名();で実行できる
	関数の中に関数を入れる時にはカッコの中に作った関数の引数名を入れる

	*/
	function createCalendar() {
		clearCalendar();
		renderTitle();
		renderWeeks();
	}


	document.getElementById('prev').addEventListener('click', () => {
		month--;
		if (month < 0) {
			year--;
			month = 11;
		}

		createCalendar();
	});

	document.getElementById('next').addEventListener('click', () => {
		month++;
		if (month > 11) {
			year++;
			month = 0;
		}

		createCalendar();
	});

	document.getElementById('today').addEventListener('click', () => {
		year = today.getFullYear();
		month = today.getMonth();

		createCalendar();
	});

	createCalendar();
}
