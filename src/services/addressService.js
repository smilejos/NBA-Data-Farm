import constant from '../constants/serviceConstant'
import * as util from '../utility'

const address = {
    /**
     * All game of the date
     * @params gameDate: {String} {Format: yearmonthdate}
     * @example gameDate: 20151125
     */
    gameGeneral: (gameDate) => {
        return `http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${gameDate}/games.json`
    },
    /**
     * Detail of a game in a specific date
     * @params gameDate: {String} {Format: yearmonthdate} & gameId: {String}
     * @example gameDate: 20151128 & gameId: 0021500239
     */
    gameDetail: (gameDate, gameId) => {
        return `http://data.nba.com/data/10s/json/cms/noseason/game/${gameDate}/${gameId}/boxscore.json`
    },
    /**
     * Current league standing
     * @params year {String}
     * @example year: 2015
     */
    leagueStanding: (year) => {
        return `http://data.nba.com/data/json/cms/${year}/league/standings.json`
    },

    playerList: () => {
        let API_METHOD = 'commonallplayers';
        let Params = {
            'IsOnlyCurrentSeason' : 0,
            'LeagueID' : constant.League_ID,
            'Season' : constant.Current_Season()
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params);    
    },

    playerInfo: (id) => {
        let API_METHOD = 'commonplayerinfo';
        let Params = {
            'PlayerID' : id,
            'LeagueID' : constant.League_ID,
            'SeasonType' : constant.SeasonType.Regular
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params);    
    },

    playerLog: (id) => {
        let API_METHOD = 'playergamelog';
        let Params = {
            'PlayerID' : id,
            'LeagueID' : constant.League_ID,
            'PerMode' : constant.PerMode.PerGame,
            'Season' : constant.Current_Season(),
            'SeasonType' : constant.SeasonType.Regular
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params);    
    },

    /**
     * @params gameDate month/date/year
     */
    teamRank: (gameDate) => {
        return `http://stats.nba.com/stats/scoreboard?DayOffset=0&LeagueID=00&gameDate=${gameDate}`
    },

    teamInfo: (id) => {
        return `http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=${id}&season=${season}`
    },

    teamDetail: (id) => {
        return `http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${id}&VsConference=&VsDivision=`
    },

    teamDetailBasic: (id) => {
        return `http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${season}&TeamID=${id}`
    }
}

export default address