export const changeTime = (time) => {
    if (time < 60) {
        return `${time}m`
    } else {
        let minute = time % 60
        let hours = (time - minute) / 60
        return `${hours}h${minute}m`
    }
}

export const getListDepartment = (list) => {
    const arr = list.map(item => item.department)
    return Array.from(new Set(arr))
}
export const generateList = (list, value) => {
    return list.filter(item => item.department === value)
}