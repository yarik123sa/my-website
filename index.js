console.log('Hello From Console')

const DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 }
const CIRC = 2 * Math.PI * 88

const app = document.querySelector('.app')
const timeEl = document.getElementById('time')
const startBtn = document.getElementById('start')
const resetBtn = document.getElementById('reset')
const sessionsEl = document.getElementById('sessions')
const progress = document.querySelector('.progress')
const modeBtns = document.querySelectorAll('.mode')

let mode = 'focus'
let left = DURATIONS[mode]
let timer = null
let sessions = Number(load('sessions', 0))

progress.style.strokeDasharray = CIRC
sessionsEl.textContent = sessions

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

function render() {
  const m = String(Math.floor(left / 60)).padStart(2, '0')
  const s = String(left % 60).padStart(2, '0')
  timeEl.textContent = `${m}:${s}`
  document.title = `${m}:${s} — Focus`
  progress.style.strokeDashoffset = CIRC * (1 - left / DURATIONS[mode])
}

function setMode(next) {
  stop()
  mode = next
  left = DURATIONS[mode]
  app.dataset.mode = mode
  modeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode))
  render()
}

function tick() {
  left--
  if (left <= 0) {
    left = 0
    render()
    stop()
    beep()
    if (mode === 'focus') {
      sessions++
      sessionsEl.textContent = sessions
      save('sessions', sessions)
      setMode(sessions % 4 === 0 ? 'long' : 'short')
    } else {
      setMode('focus')
    }
    return
  }
  render()
}

function start() {
  if (timer) return stop()
  timer = setInterval(tick, 1000)
  startBtn.textContent = 'Пауза'
}
function stop() {
  clearInterval(timer)
  timer = null
  startBtn.textContent = 'Старт'
}

function beep() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    osc.frequency.value = 880
    osc.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.4)
  } catch {}
}

startBtn.addEventListener('click', start)
resetBtn.addEventListener('click', () => setMode(mode))
modeBtns.forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)))

// ---- Задачі ----
const form = document.getElementById('task-form')
const input = document.getElementById('task-input')
const list = document.getElementById('task-list')
const empty = document.getElementById('empty')
let tasks = load('tasks', [])

function renderTasks() {
  list.innerHTML = ''
  tasks.forEach((t, i) => {
    const li = document.createElement('li')
    li.className = t.done ? 'done' : ''

    const cb = document.createElement('input')
    cb.type = 'checkbox'
    cb.checked = t.done
    cb.addEventListener('change', () => { tasks[i].done = cb.checked; update() })

    const span = document.createElement('span')
    span.textContent = t.text

    const del = document.createElement('button')
    del.className = 'del'
    del.textContent = '✕'
    del.title = 'Видалити'
    del.addEventListener('click', () => { tasks.splice(i, 1); update() })

    li.append(cb, span, del)
    list.append(li)
  })
  empty.hidden = tasks.length > 0
}

function update() {
  save('tasks', tasks)
  renderTasks()
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return
  tasks.push({ text, done: false })
  input.value = ''
  update()
})

render()
renderTasks()
