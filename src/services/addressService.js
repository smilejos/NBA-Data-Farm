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
            'IsOnlyCurrentSeason' : 1,
            'LeagueID' : constant.League_ID,
            'Season' : constant.Current_Season()
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params);    
    },

    playerInfo: (id) => {
        //http://stats.nba.com/stats/commonplayerinfo?PlayerID=2544&LeagueID=00
        let API_METHOD = 'commonplayerinfo';
        let Params = {
            'PlayerID' : id,
            'LeagueID' : constant.League_ID
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params);    
    },

    playerLog: (id) => {
        //http://stats.nba.com/stats/playergamelog?PlayerID=2544&LeagueID=00&&Season=2016-17&SeasonType=Regular%20Season
        let API_METHOD = 'playergamelog';
        let Params = {
            'PlayerID' : id,
            'LeagueID' : constant.League_ID,
            'Season' : constant.Current_Season(),
            'SeasonType' : constant.SeasonType.Regular
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params);    
    },

    playerCareerStats: (id) => {
        //http://stats.nba.com/stats/playercareerstats?PlayerID=2544&PerMode=PerGame&LeagueID=00
        let API_METHOD = 'playercareerstats';
        let Params = {
            'PlayerID' : id,
            'LeagueID' : constant.League_ID,
            'PerMode': constant.PerMode.PerGame
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params);   
    },

    /**
     * @params gameDate month/date/year
     */
    teamRank: (gameDate) => {
        let API_METHOD = 'scoreboard';
        let Params = {
            'DayOffset' : 0,
            'LeagueID' : constant.League_ID,
            'gameDate' : gameDate
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params); 
    },

    teamInfo: (id) => {
        //http://stats.nba.com/stats/teaminfocommon?LeagueID=00&TeamID=1610612739&Season=2016-17&SeasonType=Regular%20Season
        let API_METHOD = 'teaminfocommon';
        let Params = {
            'LeagueID' : constant.League_ID,
            'TeamID': id,
            'Season' : constant.Current_Season(),
            'SeasonType' : constant.SeasonType.Regular
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params); 
    },

    teamDetail: (id) => {
        //http://stats.nba.com/stats/teamplayerdashboard?Season=2016-17&TeamID=1610612739&DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&SeasonSegment=&SeasonType=Regular+Season&VsConference=&VsDivision=
        let API_METHOD = 'teamplayerdashboard';
        let Params = {
            'DateFrom': constant.Default._Blank,
            'DateTo': constant.Default._Blank,
            'GameSegment': constant.GameSegment.EntireGame,
            'LastNGames': constant.Default._0,
            'LeagueID': constant.League_ID,
            'Location': constant.Location.All,
            'MeasureType': constant.MeasureType.Base,
            'Month': constant.Month.All,
            'OpponentTeamID': constant.Default._0,
            'Outcome': constant.Outcome.All,
            'PaceAdjust': constant.Default._N,
            'PerMode': constant.PerMode.PerGame,
            'Period': constant.Period.AllQuarters,
            'PlusMinus': constant.Default._N,
            'Rank': constant.Default._N,
            'Season': constant.Current_Season(),
            'SeasonSegment': constant.GameSegment.EntireGame,
            'SeasonType': constant.SeasonType.Regular,
            'TeamID': id,
            'VsConference': constant.VsConference.All,
            'VsDivision' : constant.VsDivision.All
        };
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params); 
    },

    teamRoster: (id) => {
        //http://stats.nba.com/stats/commonteamroster?TeamID=1610612739&Season=2016-17
        let API_METHOD = 'commonteamroster';
        let Params = {
            'TeamID': id,
            'Season' : constant.Current_Season()
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params); 
    },

    playerVsPlayer: () => {
        //http://stats.nba.com/stats/playervsplayer?PlayerID=2544&VsPlayerID=2747&SeasonType=Regular%20Season&MeasureType=Base&PerMode=PerGame&PlusMinus=N&PaceAdjust=N&Rank=N&Season=2015-16&Outcome=&Location=&Month=&SeasonSegment=&DateFrom=&DateTo=&OpponentTeamID=&VsConference=East&VsDi=a&GameSegment=&Period=0&LastNGames=0
        let API_METHOD = 'playervsplayer';
        let Params = {
            'PlayerID' : '2544',
            'VsPlayerID' : '2747',
            'SeasonType' : '',
            'MeasureType' : '',
            'PerMode' : '',
            'PlusMinus' : '',
            'PaceAdjust' : '',
            'Rank' : '',
            'Season' : '',
            'Outcome' : '',
            'Location' : '',
            'Month' : '',
            'SeasonSegment' : '',
            'DateFrom' : '',
            'DateTo' : '',
            'OpponentTeamID' : '',
            'VsConference' : '',
            'VsDi' : '',
            'GameSegment' : '',
            'Period' : '',
            'LastNGames' : '',
        };    
        return constant.API_URL + API_METHOD + '?' + util.extractParameters(Params); 
    }
}

export default address