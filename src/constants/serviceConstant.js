export default {
    API_URL : 'http://stats.nba.com/stats/',
    League_ID : '00', // 00 is NBA
    SeasonType: {
        Regular : 'Regular Season',
        Playoffs: 'Playoffs',
        PreSeason: 'Pre Season',
        AllStar : 'All Star'
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
    MeasureType: {
        Base : 'Base',
        Advanced : 'Advanced',
        Misc : 'Misc',
        FourFactors : 'Four Factors',
        Scoring : 'Scoring',
        Opponent : 'Opponent',
        Usage : 'Usage'
    },
    Month: {
        All : '0',
        October : '1',
        November : '2',
        December : '3',
        January : '4',
        February : '5',
        March : '6',
        April : '7',
        May : '8',
        June : '9',
        July : '10',
        August : '11',
        September : '12'
    },
    Period: {
        AllQuarters : '0',
        FirstQuarter : '1',
        SecondQuarter : '2',
        ThirdQuarter : '3',
        FourthQuarter : '4'
    },
    VsConference: {
        All : '',
        East : 'East',
        West : 'West'
    },
    VsDivision: {
        All : '',
        Atlantic : 'Atlantic',
        Central : 'Central',
        Northwest : 'Northwest',
        Pacific : 'Pacific',
        Southeast : 'Southeast',
        Southwest : 'Southwest'
    },
    GameSegment: {
        EntireGame : '',
        FirstHalf : 'First Half',
        SecondHalf : 'Second Half',
        Overtime : 'Overtime'
    },
    ClutchTime: {
        Last5Min: 'Last 5 Minutes',
        Last4Min: 'Last 4 Minutes',
        Last3Min: 'Last 3 Minutes',
        Last2Min: 'Last 2 Minutes',
        Last1Min: 'Last 1 Minutes',
        Last30Sec: 'Last 30 Seconds',
        Last10Sec: 'Last 10 Seconds'
    },
    Outcome: {
        All: '',
        Win : 'W',
        Loss : 'L'
    },
    Location: {
        All: '',
        Home : 'Home',
        Away : 'Away'
    },
    SeasonSegment : {
        EntireSeason : '',
        PreAllStar : 'Pre All-Star',
        PostAllStar : 'Post All-Star'
    },
    PlayerPosition: {
        All: '',
        Forward : 'F',
        Center : 'C',
        Guard : 'G'
    },
    StarterBench: {
        All: '',
        Starters : 'Starters',
        Bench : 'Bench'
    },
    PlayoffRound : {
        All : '0',
        QuarterFinals : '1',
        SemiFinals : '2',
        ConferenceFinals : '3',
        Finals : '4'
    },
    PlayerExperience: {
        All: '',
        Rookie : 'Rookie',        //一年級生
        Sophomore : 'Sophomore',  //二年級生
        Veteran : 'Veteran'       //老鳥
    },
    StatCategory : {
        PTS : 'PTS',
        FGM : 'FGM',
        FGA : 'FGA',
        FG_PCT : 'FG%',
        FG3M : '3PM',
        FG3A : '3PA',
        FG3_PCT : '3P%',
        FTM : 'FTM',
        FTA : 'FTA',
        FT_PCT : 'FT%',
        OREB : 'OREB',
        DREB : 'DREB',
        REB : 'REB',
        AST : 'AST',
        STL : 'STL',
        BLK : 'BLK',
        TOV : 'TOV',
        EFF : 'EFF',
        AST_TOV : 'AST/TO',
        STL_TOV : 'STL/TOV',
        PF : 'PF'
    },
    Default: {
        _N : 'N',
        _0: '0',
        _Blank: ''
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