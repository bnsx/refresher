setInterval(() => {
    let time = document.getElementById('minute').value

    if (Number(time) < 1) {
        document.getElementById('total').innerText = `${(Number(time) * 60).toFixed(0)} Second`
    }
    else {
        document.getElementById('total').innerText = `${time} Minute`
    }

}, 500)

let Button_Run = false
let Button_Stop = true

window.addEventListener('load', function () {
    document.getElementById('run').addEventListener('click', function () {
        Button_Run = true
        todo(Button_Run)
    })
    document.getElementById('stop').addEventListener('click', function () {
        Button_Stop = false
        todo(Button_Stop)
    })
})

function todo(status) {
    let time = Number(document.getElementById('minute').value)
    if (status === true) {
        document.getElementById('show_total').style.display = "none"
        document.getElementById('show_round').style.display = "inline"
        document.getElementById('run').style.display = "none"
        document.getElementById('stop').style.display = "inline"
        document.getElementById('beforeRun').style.display = "none"
        document.getElementById('afterRun').style.display = "inline"
        document.getElementById('ToDoMinute').value = time
        if (Number(time) < 1) {
            document.getElementById('runEvery').innerText = `Run every ${(time * 60).toFixed(0)} Second`
        }
        else {
            document.getElementById('runEvery').innerText = `Run every ${time} Minute`
        }
        reload(time)
    }
    else {
        window.location.reload()
    }
}

async function getCurrentTab() { // https://developer.chrome.com/docs/extensions/reference/tabs/#get-the-current-tab
    let queryOptions = { active: true, lastFocusedWindow: true }
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
}

async function reload(minute) {
    const todo = minute * 1000 * 60
    const tabId = await getCurrentTab()
    let round = document.getElementById("round")
    round.innerText = 0
    return setInterval(async () => {
        chrome.tabs.reload(tabId.id, () => {
            round.innerText = Number(round.textContent) + 1
        })
    }, todo)
}