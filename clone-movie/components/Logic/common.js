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

export const setLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}
export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key)
        return data && JSON.parse(data)
    }
}
export const removeLocalStorage = (key) => {
    return localStorage.removeItem(key)
}
export const convertObjectToArray = (object) => {
    const convert = Object.entries(object)
    return convert.map(item => {
        return {
            id: item[1],
            name: item[0]
        }
    })
}