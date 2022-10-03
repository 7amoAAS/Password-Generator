//! Select Items
const resultEl = document.getElementById("result");
const copyBtnEl = document.getElementById("copy");
const charLnegthEl = document.getElementById("character-length");
const inputRangeEl = document.getElementById("range-input");
const checkboxEl = document.querySelectorAll("input[type='checkbox']");
const strenthEl = [...document.querySelectorAll(".strength-fill span")];
const generateBtnEl = document.getElementById("generate-btn");

// Create Characters
const upperLetters =
	"IWAULMCUCICAIZBNLZARXYFZNGCHJNIOZEBAORKYKQYAVKGRAYINCIXIEJTASVAHYDVRKLXBGNX";
const lowerLetters =
	"jegekdxdtgdobuftrmjehpnyozzepxpbykvtshbrgfkpzvqvhihqggmshdvtgpwekpzsjkjiyio";
const numbers =
	"8650721856065599829886245782831306326961752236579797271505605701781999223050";
const symbols =
	"&_-^_~^%/^`'/~&|_=|$*$$@@+#%`*^/@@&~*@|*+^^#*##`-_+&@^_$=#'*^/_|^#-_=#-/%'__";

let charLength;

//! AddEventListeners
//  Update Character Length
inputRangeEl.addEventListener("input", () => {
	let value = inputRangeEl.value;
	charLnegthEl.textContent = value;
});

// Generate Password
generateBtnEl.addEventListener("click", generate);

// Copy
copyBtnEl.addEventListener("click", copyPass);

//! Functinos
// Styling Slider
inputRangeEl.addEventListener("input", function () {
	let value = ((this.value - this.min) / (this.max - this.min)) * 100;
	this.style.background =
		"linear-gradient(to right, #a4ffaf 0%, #a4ffaf " +
		value +
		"%, #111016 " +
		value +
		"%, #111016 100%";
});

inputRangeEl.addEventListener("change", () => {
	charLength = inputRangeEl.value;
});

// Update Strength
function strength() {
	checkboxEl.forEach((e, i) => {
		e.addEventListener("input", e => {
			if (e.target.checked == true) {
				strenthEl.forEach((span, spanIndex) => {
					if (i == spanIndex) {
						strenthEl[i].style = "background: #a4ffaf;";
					}
				});
			} else {
				strenthEl.forEach((span, spanIndex) => {
					if (i == spanIndex) {
						strenthEl[i].style = "background: transparent;";
					}
				});
			}
		});
	});
}
strength();

// Characters
function upperCaseChar() {
	return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function lowerCaseChar() {
	return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function numbersChar() {
	return numbers[Math.floor(Math.random() * numbers.length)];
}
function symbolsChar() {
	return symbols[Math.floor(Math.random() * symbols.length)];
}

// Generate Password
function generate() {
	if (
		!checkboxEl[0].checked &&
		!checkboxEl[1].checked &&
		!checkboxEl[2].checked &&
		!checkboxEl[3].checked
	) {
		alert("*(Options)* should include at lest one Option ❗");
	}
	if (inputRangeEl.value < 8) {
		alert("*(Character Length)* should bigger then 8 character ❗");
	} else {
		const len = inputRangeEl.value;
		let password = "";
		if (checkboxEl[0].checked) {
			password += upperCaseChar();
		}
		if (checkboxEl[1].checked) {
			password += lowerCaseChar();
		}
		if (checkboxEl[2].checked) {
			password += numbersChar();
		}
		if (checkboxEl[3].checked) {
			password += symbolsChar();
		}

		for (let i = password.length; i < len; i++) {
			const x = generateX();
			password += x;
		}

		resultEl.innerText = password;
	}
}

function generateX() {
	const xs = [];

	if (checkboxEl[0].checked) {
		xs.push(upperCaseChar());
	}

	if (checkboxEl[1].checked) {
		xs.push(lowerCaseChar());
	}

	if (checkboxEl[2].checked) {
		xs.push(numbersChar());
	}

	if (checkboxEl[3].checked) {
		xs.push(symbolsChar());
	}

	if (xs.length === 0) return "";

	return xs[Math.floor(Math.random() * xs.length)];
}

function copyPass() {
	navigator.clipboard.writeText(resultEl.textContent).then(() => {
		alert("Copied to clipboard");
	});
}
