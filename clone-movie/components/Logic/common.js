export const changeTime = (time) => {
    if (time < 60) {
        return `${time}m`
    } else {
        let minute = time % 60
        let hours = (time - minute) / 60
        return `${hours}h${minute}m`
    }
}