import * as util from '../utility'

const producer = {
    /**
     * return {live: [], unstart: [], over: []}
     */
    gameGeneral: (res) => {
        let result = {
            unstart: [],
            live: [],
            over: []
        }
        let item

        res['sports_content']['games']['game'].forEach((game, index) => {
            item = {
                id: game.id,
                home: {},
                visitor: {},
                detail: {
                    loaded: false,
                    data: {}
                }
            }

            const sides = ['home', 'visitor']
            sides.forEach(key => {
                item[key]['id'] = game[key]['id']
                item[key]['team'] = game[key]['team_key']
                item[key]['score'] = game[key]['score']
            })

            const process = game['period_time']
            switch (parseInt(process.game_status, 10)) {
                case 1:
                    // Unstart
                    item.type = 'unstart'
                    item.date = process.period_status
                    result.unstart.push(item)
                    break
                case 2:
                    // Live
                    item.type = 'live'
                    let game_clock
                    if (process.game_clock) {
                        game_clock = parseInt(process.game_clock.split(':')[0], 10) < 10 ? '0' + process.game_clock : process.game_clock
                    }
                    item.process = {
                        time: game_clock || 'End',
                        quarter: 'Q' + process.period_value
                    }
                    result.live.push(item)
                    break
                case 3:
                    // Over
                    item.type = 'over'
                    result.over.push(item)
                    break
                default:
                    return
            }
        })

        return result
    },

    /**
     * @return {type, home: {players: {Array}, team, score}, visitor: {<=same}, process: {time, quarter}}
     * @example player
          assists: "1"
          blocks: "1"
          field_goals_attempted: "6"
          field_goals_made: "0"
          first_name: "Garrett"
          fouls: "1"
          free_throws_attempted: "2"
          free_throws_made: "1"
          jersey_number: "17"
          last_name: "Temple"
          minutes: "17"
          on_court: "1"
          person_id: "202066"
          player_code: "garrett_temple"
          plus_minus: "-4"
          points: "1"
          position_full: "Guard"
          position_short: "G"
          rebounds_defensive: "2"
          rebounds_offensive: "0"
          seconds: "12"
          starting_position: ""
          steals: "3"
          team_turnovers: ""
          three_pointers_attempted: "4"
          three_pointers_made: "0"
          turnovers: "0"
     */
    gameDetail: (res) => {
        const data = res.sports_content.game
        let result = {
            home: {},
            visitor: {}
        }
        Object.keys(result).forEach(side => {
            result[side].team = data[side].team_key
            result[side].score = data[side].score
            result[side].player = data[side].players.player
        })

        const gameType = parseInt(data['period_time'].game_status, 10)
        result.type = gameType === 3 ? 'over' : (gameType === 2 ? 'live' : 'unstart')

        if (result.type === 'live') {
            const process = data.period_time
            result.process = {
                time: process.game_clock || 'End',
                quarter: 'Q' + process.period_value
            }
        }
        return result
    },

    /**
     * @return {teamId: { name, states:{} }}
     */
    leagueStanding: (res) => {
        /* data is a array of all teams */
        const data = res.sports_content.standings.team
        let result = {}

        data.forEach(team => {
            result[team.id] = result[team.id] || {}
            result[team.id].abbr = team.abbreviation
            result[team.id].state = team.team_stats
        })
        return result
    },

    /**
     * @return [{id, firstName, lastName, name, teamId, teamCity, teamName, teamAbbr, teamCode, fromYear, toYear, isExist}]
        0: "PERSON_ID"
        1: "DISPLAY_LAST_COMMA_FIRST"
        2: "DISPLAY_FIRST_LAST"
        3: "ROSTERSTATUS"
        4: "FROM_YEAR"
        5: "TO_YEAR"
        6: "PLAYERCODE"
        7: "TEAM_ID"
        8: "TEAM_CITY"
        9: "TEAM_NAME"
        10:"TEAM_ABBREVIATION"
        11:"TEAM_CODE"
        12:"GAMES_PLAYED_FLAG"
     */
    playerList: (res) => {
        const data = res.resultSets[0].rowSet
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
        let currentYear
        if (currentMonth >= 10) {
            currentYear = currentDate.getFullYear() + ''
        } else {
            currentYear = currentDate.getFullYear() - 1 + ''
        }

        let nameArray
        return data.map(item => {
            nameArray = item[1].split(', ')
            return {
                id: item[0],
                firstName: nameArray[1],
                lastName: nameArray[0],
                name: nameArray[1] + ' ' + nameArray[0],
                teamId: item[7],
                teamCity: item[8],
                teamName: item[9],
                teamAbbr: item[10],
                teamCode: item[11],
                fromYear: item[4],
                toYear: item[5],
                isExist: item[3] === 1
            }
        })
    },

    /**
     * @return {person_id, first_name, last_name, display_first_last, display_last_comma_first, display_fi_last, birthdate, school, country, last_affiliation,
     * height, weight, season_exp, jersey, position, rosterstatus, team_id, team_name, team_abbreviation, team_code, team_city, playercode, from_year, to_year,
     * dleague_flag, games_played_flag, draft_year, draft_round, draft_number}
     */
    playerInfo: (res) => {
        return util.extractStatsResult(res.resultSets[0])[0]
    },

    /**
     * @return {
     *  totals_regular: [{player_id, season_id, league_id, team_id, team_abbreviation, player_age, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts}]
     *  career_regular: [{player_id, league_id, team_id, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts}]
     *  totals_playoff: [{player_id, season_id, league_id, team_id, team_abbreviation, player_age, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts}]
     *  career_playoff: [{player_id, league_id, team_id, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts}]
     *  totals_allStar: [{player_id, season_id, league_id, team_id, team_abbreviation, player_age, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts}]
     *  career_allStar: [{player_id, league_id, team_id, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts}]
     * }
     */
    playerCareerStats: (res) => {
        return {
            totals_regular: util.extractStatsResult(res.resultSets[0]),
            career_regular: util.extractStatsResult(res.resultSets[1])[0],
            totals_playoff: util.extractStatsResult(res.resultSets[2]),
            career_playoff: util.extractStatsResult(res.resultSets[3])[0],
            totals_allStar: util.extractStatsResult(res.resultSets[4]),
            career_allStar: util.extractStatsResult(res.resultSets[5])[0]
        };
    },

    /**
     * @return [{season_id, player_id, game_id, game_date, matchup, wl, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts, plus_minus, video_available}]
     */
    playerLog: (res) => {
        return util.extractStatsResult(res.resultSets[0])
    },
    
    /**
     * @return {eastern: [{id, name, win, loss}], western:[]}
     */
    teamRank: (res) => {
        const eastData = res.resultSets[4].rowSet
        const westData = res.resultSets[5].rowSet

        let eastern = []
        let western = []
        let anotherItem = {}
        eastData.forEach((item, index) => {
            eastern.push({
                id: item[0],
                name: item[5],
                win: item[8],
                loss: item[7]   
            })
            anotherItem = westData[index]
            western.push({
                id: anotherItem[0],
                name: anotherItem[5],
                win: anotherItem[8],
                loss: anotherItem[7]
            })
        })

        return {
            eastern,
            western
        }
    },

    /**
     * @return {teamCity, teamName, teamAbbr, teamConf, teamDivi, confRank, diviRank,
     win, loss, id, ptsRank, rebRank, astRank, oppRank}
     */
    teamInfo: (res) => {
        const info = res.resultSets[0].rowSet[0]
        const dataInfo = res.resultSets[1].rowSet[0]
        return {
            id : info[0],
            season_year : info[1],
            team_city : info[2],
            team_name : info[3],
            team_abbr : info[4],
            team_conf : info[5],
            team_div : info[6],
            team_code : info[7],
            win : info[8],
            lose : info[9],
            pct : info[10],
            conf_rank : info[11],
            div_rank : info[12],
            min_year : info[13],
            max_year : info[14],
            league_id : dataInfo[0],
            season_id : dataInfo[1],
            pts_rank : dataInfo[3],
            pts_pg : dataInfo[4],
            reb_rank : dataInfo[5],
            reb_pg : dataInfo[6],
            ast_rank : dataInfo[7],
            ast_pg : dataInfo[8],
            opp_pts_rank : dataInfo[9],
            opp_pts_pg : dataInfo[10]
        }
    },

    /**
     * @return [{id, name, gp, pts, reb, ast, min}]
     */
    teamDetail: (res) => {
        const target = res.resultSets[1].rowSet
        // let result = {}
        // target.forEach(player => {
        //     result[player[1]] = {
        //         group_set : player[0],
        //         id : player[1],
        //         name : player[2],
        //         gp : player[3],
        //         win : player[4],
        //         loss : player[5],
        //         w_pct : player[6],
        //         min : player[7],
        //         fgm : player[8],
        //         fga : player[9],
        //         fg_pct : player[10],
        //         fg3m : player[11],
        //         fg3a : player[12],
        //         fg3_pct : player[13],
        //         ftm : player[14],
        //         fta : player[15],
        //         ft_pct : player[16],
        //         oreb : player[17],
        //         dreb : player[18],
        //         reb : player[19],
        //         ast : player[20],
        //         tov : player[21],
        //         stl : player[22],
        //         blk : player[23],
        //         blka : player[24],
        //         pf : player[25],
        //         pfd : player[26],
        //         pts : player[27],
        //         plus_minus : player[28],
        //         dd2 : player[29],
        //         td3 : player[30]
        //     }
        // })

        return target.map(player => {
            return {
                id : player[1],
                name : player[2],
                gp : player[3],
                win : player[4],
                loss : player[5],
                w_pct : player[6],
                min : player[7],
                fgm : player[8],
                fga : player[9],
                fg_pct : player[10],
                fg3m : player[11],
                fg3a : player[12],
                fg3_pct : player[13],
                ftm : player[14],
                fta : player[15],
                ft_pct : player[16],
                oreb : player[17],
                dreb : player[18],
                reb : player[19],
                ast : player[20],
                tov : player[21],
                stl : player[22],
                blk : player[23],
                blka : player[24],
                pf : player[25],
                pfd : player[26],
                pts : player[27],
                plus_minus : player[28],
                dd2 : player[29],
                td3 : player[30]
            }
        })
    },

    /**
     * @return {id: {pos, height, weight, num, age}}
     */
    teamRoster: (res) => {
        const target = res.resultSets[0].rowSet;
        let result = {};
        target.forEach(player => {
            result[player[12]] = {
                teamid: player[0],
                season: player[1],
                leagueid: player[2],
                player: player[3],
                num: player[4],
                position: player[5],
                height: player[6],
                weight: player[7],
                birth_date: player[8],
                age: player[9],
                exp: player[10],
                school: player[11],
                id: player[12]
            }
        });
        return result;
    }
}

export default producer;