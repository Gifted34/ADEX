export default class Periods {
    GetYearly = () => {
        let years = []
        let year = new Date().getFullYear()
        for (let index = 0; index < 40; index++) {
            years.push(year - index)
        }
        return years
    }

    getFirstPosition = (list) => {
        return list[0]
    }

    GetWeekly = () => {
        let weeks = []

        for (let index = 0; index < 56; index++) {
            weeks.push({
                name: `Week${index + 1}`,
                value: `${index + 1}`
            })
        }
        return weeks
    }
    GetBiWeekly = () => {
        let weeks = []

        for (let index = 0; index < 28; index++) {
            weeks.push({
                name: `Week${index + 1}`,
                value: `BI${index + 1}`
            })
        }
        return weeks
    }

    GetDaily = () => {
        const days = [
            { name: 'Monday', value: '01' },
            { name: 'Tuesday', value: '02' },
            { name: 'Wednesday', value: '03' },
            { name: 'Thursday', value: '04' },
            { name: 'Friday', value: '05' },
            { name: 'Saturday', value: '06' },
            { name: 'Sunday', value: '07' },
        ]
        return days
    }

    GetMonthly = () => {
        const months = [
            { name: 'January', value: '01' },
            { name: 'February', value: '02' },
            { name: 'March', value: '03' },
            { name: 'April', value: '04' },
            { name: 'May', value: '05' },
            { name: 'June', value: '06' },
            { name: 'July', value: '07' },
            { name: 'August', value: '08' },
            { name: 'September', value: '09' },
            { name: 'October', value: '10' },
            { name: 'November', value: '11' },
            { name: 'December', value: '12' }
        ]
        return months
    }

    GetBiMonthly = () => {
        const months = [
            { name: 'January-February', value: '01' },
            { name: 'March-April', value: '02' },
            { name: 'May-June', value: '03' },
            { name: 'July-August', value: '04' },
            { name: 'September-October', value: '05' },
            { name: 'November-December', value: '06' },
        ]
        return months
    }

    GetQuarterly = () => {
        const quarterly = [
            { name: 'January-March', value: 'Q1' },
            { name: 'April-June', value: 'Q2' },
            { name: 'July-September', value: 'Q3' },
            { name: 'October-December', value: 'Q4' }
        ]
        return quarterly
    }

    GetSixMonthly = () => {

        const sixMonthly = [
            { name: 'January-June', value: 'S1' },
            { name: 'July-December', value: 'S2' }
        ]
        return sixMonthly
    }
}


