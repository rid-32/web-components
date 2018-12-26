export const fetchElement = () =>
    new Promise((res, rej) => {
        setTimeout(() => {
            res('Element Data')
        }, 2000)
    })
