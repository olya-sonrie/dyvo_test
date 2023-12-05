import './style.scss'

const startScreen = document.querySelector('.start-screen') as HTMLElement
const mainScreen = document.querySelector('.main-screen') as HTMLElement
const finalScreen = document.querySelector('.final-screen') as HTMLElement
const mainScreenContent = document.querySelector('.main-screen__content') as HTMLElement
const wheel = document.querySelector('.wheel') as HTMLElement
const creaditBalance = document.querySelector('.balance') as HTMLElement
const startBtn = document.querySelector('.start-screen__btn')
const finalBtn = document.querySelector('.final-screen__btn')

let selectedValue: number = 0
let selectedIndex: number | null = null
let savedBalanceAmount: number | null = null

const spinTime: number = 4000
const defaultspinDegrees: number = 360 * 3
let rotating: boolean = false

function wheelStopsCalculation(): void {
  const wheelValues: number[] = [2, 50, 500, 2, 100, 50, 2, 75]
  const probabilitiesArr: number[] = [0.22, 0.085, 0.015, 0.22, 0.07, 0.09, 0.22, 0.08]
  const randomValue: number = Math.random()

  let probability: number = 0

  for (let i = 0; i < wheelValues.length; i++) {
    probability += probabilitiesArr[i]

    if (randomValue <= probability) {
      selectedValue = wheelValues[i]
      selectedIndex = i
      break
    }
  }
}

function saveBalance(): void {
  const sessionBalance = sessionStorage.getItem('creditBalance')
  savedBalanceAmount = Number(sessionBalance) + selectedValue!

  sessionStorage.setItem('creditBalance', `${savedBalanceAmount}`)
}

function startRotation() {
  rotating = true
  wheel.style.transition = 'transform 5s ease-in-out'
  wheel.style.transform = `rotate(-${defaultspinDegrees + selectedIndex! * 45}deg)`
}

function stopRotation(): void {
  if (rotating) {
    rotating = false
    wheel.style.transition = 'transform 0s linear'

    setTimeout(() => showCreditsScreen(), 1000)
  }
}

function resetRotation(): void {
  wheel.style.transform = 'rotate(0deg)'

  wheelStopsCalculation()
}

function spinWheel(): void {
  wheelStopsCalculation()

  if (!mainScreenContent.classList.contains('main-screen__content_animated')) {
    mainScreenContent.classList.add('main-screen__content_animated')
    startRotation()

    setTimeout(() => {
      stopRotation()
    }, spinTime)
  }
}

function showStartScreen(): void {
  resetRotation()
  hideScreen(finalScreen)
  hideWheelScreen()
  showScreen(startScreen)
  showScreen(mainScreen)
}

function showWheelScreen(): void {
  hideScreen(startScreen)
  mainScreen.classList.add('main-screen_visible')

  wheel?.addEventListener('click', () => spinWheel())
}

function hideWheelScreen(): void {
  mainScreenContent.classList.remove('main-screen__content_animated')
  mainScreen.classList.remove('main-screen_visible')
}

function showCreditsScreen(): void {
  saveBalance()
  const creditsAmounts = document.querySelector('.credits-amount')
  creditsAmounts!.textContent = `${savedBalanceAmount}`

  // hideScreen(mainScreen)
  showScreen(finalScreen)

  creaditBalance.textContent = `${savedBalanceAmount}.00`
}

function showScreen(screen: HTMLElement): void {
  screen.classList.remove('hidden')
}

function hideScreen(screen: HTMLElement): void {
  screen.classList.add('hidden')
}

(function init(): void {
  hideScreen(finalScreen)

  startBtn?.addEventListener('click', () => showWheelScreen())
  finalBtn?.addEventListener('click', () => showStartScreen())
})()
