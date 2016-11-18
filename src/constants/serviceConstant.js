export default {
    API_URL : 'http://stats.nba.com/stats/',
    League_ID : '00',                          // 00 is NBA
    Season_Type: {
        Regular : 'Regular Season',
        Layoffs : 'Playoffs'
    },
    PerMode : {
        Totals : 'Totals',
        PerGame : 'PerGame',
        MinutesPer : 'MinutesPer',
        Per48 : 'Per48',
        Per40 : 'Per40',
        Per36 : 'Per36',
        PerMinute : 'PerMinute',
        PerPossession : 'PerPossession',
        PerPlay : 'PerPlay',
        Per100Possessions : 'Per100Possessions',
        Per100Plays : 'Per100Plays',
        Default : 'Default'
    },
    Current_Season : () => {
        let d = new Date();
        let currentMonth = d.getMonth() + 1
        if (currentMonth >= 10) {
            return d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2, 4)
        } else {
            return (d.getFullYear().toString() - 1) + '-' + d.getFullYear().toString().substring(2, 4)
        }
    }
}