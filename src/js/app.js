const minRangeInput = document.getElementById('minRange')
const maxRangeInput = document.getElementById('maxRange')
const userGuessInput = document.getElementById('userGuess')
const guessButton = document.getElementById('guessButton')
const message = document.getElementById('message')
const attemptsSpan = document.getElementById('attempts')

let minRange = parseInt(minRangeInput.value)
let maxRange = parseInt(maxRangeInput.value)
let randomNumber = generateRandomNumber(minRange, maxRange)
let attempts = 0
let consecutiveFailures = 0

guessButton.addEventListener('click', () => {
	const userGuess = parseInt(userGuessInput.value)
	attempts++

	if (isNaN(userGuess)) {
		message.textContent = 'Пожалуйста, введите число.'
	} else if (userGuess < minRange || userGuess > maxRange) {
		message.textContent = `Пожалуйста, введите число в диапазоне от ${minRange} до ${maxRange}.`
	} else if (userGuess === randomNumber) {
		message.textContent = `Поздравляем! Вы угадали число ${randomNumber} с ${attempts} попытки.`
	} else if (userGuess < randomNumber) {
		message.textContent = 'Попробуйте больше число.'
		consecutiveFailures++
	} else if (userGuess > randomNumber) {
		message.textContent = 'Попробуйте меньше число.'
		consecutiveFailures++
	}

	attemptsSpan.textContent = attempts

	// Если пользователь набрал 3 неудачные попытки, выдаем подсказку
	if (consecutiveFailures === 3) {
		consecutiveFailures = 0 // Сбрасываем счетчик неудачных попыток
		if (randomNumber % 2 === 0) {
			message.textContent += ' Число четное.'
		} else {
			message.textContent += ' Число нечетное.'
		}
	}
})

function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

minRangeInput.addEventListener('change', () => {
	minRange = parseInt(minRangeInput.value)
	randomNumber = generateRandomNumber(minRange, maxRange)
})

maxRangeInput.addEventListener('change', () => {
	maxRange = parseInt(maxRangeInput.value)
	randomNumber = generateRandomNumber(minRange, maxRange)
})

restartButton.addEventListener('click', () => {
	// Сброс всех значений для начала новой игры
	minRange = parseInt(minRangeInput.value)
	maxRange = parseInt(maxRangeInput.value)
	randomNumber = generateRandomNumber(minRange, maxRange)
	attempts = 0
	consecutiveFailures = 0
	message.textContent = ''
	attemptsSpan.textContent = '0'
})
