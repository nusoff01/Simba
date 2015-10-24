App.controller('GameCtrl', [
  '$scope', '$timeout', '$rootScope', '$location',
  function ($scope, $timeout, $rootScope, $location) {
    $scope.play_outcome_text = "";
    $scope.inning_display = function(inn, half){
      if(half == "away")
        return "Top half of " + inn;
      return "Bottom half of " + inn;
    }

    // Go from choose 
    $scope.set_roster = function () {
      // console.log($scope.players_home)
      // console.log($scope.players_away)
      $rootScope.players_home = $scope.players_home;
      $rootScope.players_away = $scope.players_away;

      var count_position = 0;
      var count_pitcher = 0
      for(i = 0; i < $rootScope.players_home.length; i++){
        player = $rootScope.players_home[i]
        if(player.position != "P"){
          count_position++;
        } else {
          count_pitcher++;
        }
      }
      if(count_position != 9){
        alert("You need exactly 9 position players (including DH) on the home team!")
        return
      }
      if(count_pitcher != 1){
        alert("Your home team needs exactly one pitcher")
        return;
      }


      var count_position = 0;
      var count_pitcher = 0
      for(i = 0; i < $rootScope.players_away.length; i++){
        player = $rootScope.players_away[i]
        if(player.position != "P"){
          count_position++;
        } else {
          count_pitcher++;
        }
      }
      if(count_position != 9){
        alert("You need exactly 9 position players (including DH) on the away team!")
        return
      }
      if(count_pitcher != 1){
        alert("Your away team needs exactly one pitcher")
        return;
      }
      $location.path('/setLineup');
    }

    $rootScope.positions = ["DH", "P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"]

    $scope.init_lineup = function () {
      $scope.position_players_home = [];
      for(i = 0; i < $rootScope.players_home.length; i++){
        player = $rootScope.players_home[i]
        if(player.position != "P"){
          player["batting_pos"] = i
          $scope.position_players_home[i] = player
        } else {
          $rootScope.game.pitcher.home = player
        }
      }

      $scope.position_players_away = [];

      for(i = 0; i < $rootScope.players_away.length; i++){
        player = $rootScope.players_away[i]

        if(player.position != "P"){
          player["batting_pos"] = i
          $scope.position_players_away[i] = player
        } else {
          $rootScope.game.pitcher.away = player
        }
      }

    }

    $scope.set_lineups = function() {
      $rootScope.game.lineup.home = $scope.position_players_home;
      $rootScope.game.lineup.away = $scope.position_players_away;
      $rootScope.game.game_state.batter = $scope.position_players_away[0];
      $rootScope.game.game_state.due_up = $scope.position_players_home[0];
      $rootScope.game.game_state.pitcher = $rootScope.game.pitcher.home;
      $location.path('/playGame')
    }

    $scope.init_play = function() {
      console.log("initPlay is called")
      $scope.game = $rootScope.game;

      var batters_home = $scope.game.lineup.home;
      console.log("length of home lineup: " + $scope.game.lineup.home.length)
      for(var i = 0; i < batters_home.length; i++){
        $scope.game.box_score.home[i] = {
          "name": batters_home[i].name,
          "AB": 0,
          "H": 0,
          "R": 0
        }
      }


      var batters_away = $scope.game.lineup.away;
      for(var i = 0; i < batters_away.length; i++){
        $scope.game.box_score.away[i] = {
          "name": batters_away[i].name,
          "AB": 0,
          "H": 0,
          "R": 0
        }
      }
      console.log("initial box score home: ")
      console.log($scope.game.box_score.home)
    }



  $scope.initGame = function () {
    $rootScope.game = {
      "roster": {
        "home": [],
        "away": []
      },
      "pitcher": {
        "home": {},
        "away": {}
      },
      "lineup": {
        "home": [{}, {}, {}, {}, {}, {}, {}, {}, {}],
        "away": [{}, {}, {}, {}, {}, {}, {}, {}, {}]
      },
      "score": {
        "home": 0,
        "away": 0
      },
      "score_by_inning": {
        // "home": [{1: 0}, {2: 0}, {3: 0}, {4: 0}, {5: 0}, {6: 0}, {7: 0}, {8: 0}, {9: 0}],
        // "away": [{1: 0}, {2: 0}, {3: 0}, {4: 0}, {5: 0}, {6: 0}, {7: 0}, {8: 0}, {9: 0}]
        "home": [0,0,0,0,0,0,0,0,0],
        "away": [0,0,0,0,0,0,0,0,0]
      },
      "hits": {
        "home": 0,
        "away": 0,
      },
      "errors": {
        "home": 0,
        "away": 0,
      },

      //playername, hits, runs, rbis
      "box_score": {
        "home": [],
        "away": []
      },

      //who is due up the next half inning
      "due_up": {},

      "game_log": [],
      "game_state": {
        "inning": 1,
        "team_batting": "away",
        "outs": 0,
        "batter": {},
        "pitcher": {},
        "runners": {
          1: {},
          2: {},
          3: {}
        },
        "batter_num": {
          "away" : 0,
          "home" : 0
        }
      }
    }



    $scope.pos0 = [
      {
        "name": "David Ortiz",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "Jose Bautista",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }
    ]
    $scope.pos1 = [
      {
        "name": "Henry Owens",
        "position": "P",
        "WHIP": 1.0,
        "GoFo": 1.1
      },
      {
        "name": "Jon Lester",
        "position": "P",
        "WHIP": 1.1,
        "GoFo": 1
      }
    ]

    
    $scope.pos2 = [
      {
        "name": "Buster Posey",
        "position": "C",
        "AB": 557,
        "walks": 52,
        "strikeouts": 70,
        "hits": 177,
        "doubles": 28,
        "triples": 0,
        "homeruns": 19,
        "HBP": 3,
        "OBP": .379
      },
      {
        "name": "Francisco Cervelli",
        "position": "C",
        "AB": 451,
        "walks": 46,
        "strikeouts": 70,
        "hits": 133,
        "doubles": 17,
        "triples": 5,
        "homeruns": 7,
        "HBP": 8,
        "OBP": .370
      },
      {
        "name": "Yadier Molina",
        "position": "C",
        "AB": 488,
        "walks": 32,
        "strikeouts": 59,
        "hits": 132,
        "doubles": 23,
        "triples": 2,
        "homeruns": 4,
        "HBP": 0,
        "OBP": .310
      },
      {
        "name": "Stephen Vogt",
        "position": "C",
        "AB": 445,
        "walks": 56,
        "strikeouts": 97,
        "hits": 116,
        "doubles": 21,
        "triples": 3,
        "homeruns": 18,
        "HBP": 2,
        "OBP": .341
      },
      {
        "name": "Salvador Perez",
        "position": "C",
        "AB": 531,
        "walks": 13,
        "strikeouts": 82,
        "hits": 1138,
        "doubles": 25,
        "triples": 0,
        "homeruns": 21,
        "HBP": 4,
        "OBP": .280
      }
    ]
    
    $scope.pos3 = [
      {
        "name": "Miguel Cabrera",
        "position": "1B",
        "AB": 429,
        "walks": 77,
        "strikeouts": 82,
        "hits": 145,
        "doubles": 28,
        "triples": 1,
        "homeruns": 18,
        "HBP": 3,
        "OBP": .440
      },
      {
        "name": "Paul Goldschmidt",
        "position": "1B",
        "AB": 567,
        "hits": 182,
        "doubles": 38,
        "triples": 2,
        "homeruns": 33,
        "walks": 118,
        "strikeouts": 151,
        "HBP": 2,
        "OBP": .435
      },
      {
        "name": "Paul Goldschmidt",
        "position": "1B",
        "AB": 545,
        "hits": 171,
        "doubles": 33,
        "triples": 2,
        "homeruns": 29,
        "walks": 143,
        "strikeouts": 135,
        "HBP": 5,
        "OBP": .459
      },
      {
        "name": "Eric Hosmer",
        "position": "1B",
        "AB": 599,
        "hits": 178,
        "doubles": 33,
        "triples": 5,
        "homeruns": 18,
        "walks": 61,
        "strikeouts": 108,
        "HBP": 3,
        "OBP": .363
      },
      {
        "name": "Jose Abreu",
        "position": "1B",
        "AB": 613,
        "hits": 178,
        "doubles": 34,
        "triples": 3,
        "homeruns": 30,
        "walks": 39,
        "strikeouts": 140,
        "HBP": 15,
        "OBP": .347
      }
    ]
    $scope.pos4 = [
      {
        "name": "Jose Abreu",
        "position": "2B",
        "AB": 615,
        "hits": 205,
        "doubles": 24,
        "triples": 8,
        "homeruns": 4,
        "walks": 25,
        "strikeouts": 91,
        "HBP": 2,
        "OBP": .359
      },
      {
        "name": "Jose Altuve",
        "position": "2B",
        "AB": 638,
        "hits": 200,
        "doubles": 40,
        "triples": 4,
        "homeruns": 15,
        "walks": 33,
        "strikeouts": 67,
        "HBP": 9,
        "OBP": .353
      },
      {
        "name": "Jason Kipnis",
        "position": "2B",
        "AB": 565,
        "hits": 171,
        "doubles": 43,
        "triples": 7,
        "homeruns": 9,
        "walks": 57,
        "strikeouts": 107,
        "HBP": 9,
        "OBP": .372
      },
      {
        "name": "DJ LeMahieu",
        "position": "2B",
        "AB": 564,
        "hits": 170,
        "doubles": 21,
        "triples": 5,
        "homeruns": 6,
        "walks": 50,
        "strikeouts": 107,
        "HBP": 1,
        "OBP": .358
      },
      {
        "name": "Ian Kinsler",
        "position": "2B",
        "AB": 624,
        "hits": 185,
        "doubles": 35,
        "triples": 7,
        "homeruns": 11,
        "walks": 43,
        "strikeouts": 80,
        "HBP": 3,
        "OBP": .342
      }
    ]
    $scope.pos5 = [
      {
        "name": "Xander Bogaerts",
        "position": "SS",
        "AB": 613,
        "hits": 196,
        "doubles": 35,
        "triples": 3,
        "homeruns": 7,
        "walks": 32,
        "strikeouts": 101,
        "HBP": 3,
        "OBP": .355
      },
      {
        "name": "Troy Tulowitzki",
        "position": "SS",
        "AB": 486,
        "hits": 136,
        "doubles": 27,
        "triples": 0,
        "homeruns": 17,
        "walks": 38,
        "strikeouts": 114,
        "HBP": 6,
        "OBP": .337
      },
      {
        "name": "Jhonny Peralta",
        "position": "SS",
        "AB": 579,
        "hits": 156,
        "doubles": 26,
        "triples": 1,
        "homeruns": 17,
        "walks": 50,
        "strikeouts": 111,
        "HBP": 5,
        "OBP": .334
      },
      {
        "name": "Jose Reyes",
        "position": "SS",
        "AB": 481,
        "hits": 132,
        "doubles": 25,
        "triples": 2,
        "homeruns": 7,
        "walks": 26,
        "strikeouts": 62,
        "HBP": 0,
        "OBP": .310
      },
      {
        "name": "Erick Aybar",
        "position": "SS",
        "AB": 197,
        "hits": 161,
        "doubles": 30,
        "triples": 1,
        "homeruns": 3,
        "walks": 25,
        "strikeouts": 73,
        "HBP": 4,
        "OBP": .301
      },
    ]

    $scope.pos6 = [
      {
        "name": "Xander Boegarts",
        "position": "SS",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "Jung Ho Kang",
        "position": "SS",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }
    ]
    $scope.pos7 = [
      {
        "name": "Rusney Castillo",
        "position": "LF",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "Gregory Polanco",
        "position": "LF",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }
    ]
    $scope.pos8 = [
      {
        "name": "Mookie Betts",
        "position": "CF",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "Andrew McCutchen",
        "position": "CF",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }
    ]
    $scope.pos9 = [
      {
        "name": "Jackie Bradley Jr.",
        "position": "RF",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "Starling Marte",
        "position": "RF",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }
    ]

    $scope.posScreens = [
      $scope.pos0,
      $scope.pos1,
      $scope.pos2,
      $scope.pos3,
      $scope.pos4,
      $scope.pos5,
      $scope.pos6,
      $scope.pos7,
      $scope.pos8,
      $scope.pos9,
    ];
  }


  $scope.player_list = [];


// TO BE ADDED BACK IN ------->>>>>

  // $scope.players_home = [];
  // $scope.players_away = [];


// -----<<<<<<<<

// TO BE REMOVED ---------->>>>>>>


  $scope.players_home = [
      {
        "name": "David Ortiz",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "David Ortiz2",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "David Ortiz3",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
            {
        "name": "David Ortiz4",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "David Ortiz5",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "David Ortiz6",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
            {
        "name": "David Ortiz7",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "David Ortiz8",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },
      {
        "name": "David Ortiz9",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      },

      {
        "name": "Henry Owens",
        "position": "P",
        "WHIP": 1.0,
        "GoFo": 1.1
      }
      
  ];
  $scope.players_away = [
      {
        "name": "Jose Bautista",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista2",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista3",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista4",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista5",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista6",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista7",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista8",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jose Bautista9",
        "position": "DH",
        "AB": 500,
        "walks": 50,
        "strikeouts": 70,
        "hits": 150,
        "doubles": 30,
        "triples": 4,
        "homeruns": 25,
        "HBP": 5,
        "OBP": .380
      }, 
      {
        "name": "Jon Lester",
        "position": "P",
        "WHIP": 1.1,
        "GoFo": 1
      },

  ];



// -----<<<<<<<<
  
  $scope.sortableOptions = {
    placeholder: "app",
    connectWith: ".apps-container"
  };

  /***************** GAME LOGIC ******************/

  $scope.play_atbat = function() {
    var game = $scope.game
    var batter = game.game_state.batter
    var team_batting = game.game_state.team_batting
    var batter_num = game.game_state.batter_num[team_batting]
    var atbat_outcome = atbat_sim()
    if(atbat_outcome.bases > 0 && (atbat_outcome.reach_type == "single" || 
                           atbat_outcome.reach_type == "double" ||
                           atbat_outcome.reach_type == "triple" ||
                           atbat_outcome.reach_type == "homerun")){
      $scope.game.hits[team_batting] = game.hits[team_batting] + 1
    console.log("team: ")
    console.log($scope.game.box_score[team_batting])
    console.log("batter number: " + batter_num)
      $scope.game.box_score[team_batting][batter_num].H += 1
    }
    $scope.play_outcome_text = convert_play_to_text(atbat_outcome, batter.name)
    //console.log("# of outs: " + game.game_state.outs)
    $scope.game.game_state.batter_num[team_batting] = incriment_batter($scope.game.game_state.batter_num[team_batting])
    $scope.game.game_state.batter = $scope.game.lineup[team_batting][$scope.game.game_state.batter_num[team_batting]]
    if(atbat_outcome.outs != 0){
      game.game_state.outs += atbat_outcome.outs;
      if(game.game_state.outs >= 3){
        endOfInning();
      }
    } else {
      move_runners(atbat_outcome.bases);
      if(atbat_outcome.bases == 4){
        score(batter)
      } else {
        $scope.game.game_state.runners[atbat_outcome.bases] = batter;
      }

      //move_runners(atbat_outcome.bases);
    }
    //1. determine the outcome of the pitcher - hitter matchup
    //2. If an out occured, record it
    //3. determine whether the inning ended
    //4. determine and set the positions of the base runners
    //5. determine and set runs scored
    //6. set the stats for everyone involved

  }

  // helper function which advances the inning or determines whether the game is over
  endOfInning = function() {
    game = $scope.game
    if(game.game_state.team_batting == "away"){ //TODO add game end check
      $scope.game.game_state.team_batting = "home"
      $scope.game.game_state.pitcher = game.pitcher.away;
    } else {
      $scope.game.game_state.team_batting = "away"
      $scope.game.game_state.pitcher = game.pitcher.home;
      $scope.game.game_state.inning++;
    }
    $scope.game.game_state.outs = 0
    $scope.game.game_state.runners[1] = {};
    $scope.game.game_state.runners[2] = {};
    $scope.game.game_state.runners[3] = {};
    var team_batting = $scope.game.game_state.team_batting;
    $scope.game.game_state.batter = $scope.game.lineup[team_batting][$scope.game.game_state.batter_num[team_batting]]
    //console.log("end of inning called. game state:")
    //console.log(game.game_state)
  }

  incriment_batter = function (i) {
    if(i < 8) 
      return i + 1
    return 0
  }

//TODO possibility of runners not moving same number of bases as hitter

  move_runners = function(i) {
    runners = $scope.game.game_state.runners
    for(j = 3; j > 0; j--){
      //console.log("runner at " + j)
      //console.log(runners[j])
      if(j + i < 4 && JSON.stringify(runners[j]) != '{}'){
        $scope.game.game_state.runners[j + i] = runners[j];
        $scope.game.game_state.runners[j] = {}; 
      }
      if(j + i >= 4 && JSON.stringify(runners[j]) != '{}'){
        $scope.play_outcome_text += runners[j].name + " scored. "
        score(runners[j])
      }

    }
  }


  //TODO score: when a runner scores, update the score in all its various places, add a run to 
  //            the batter in the box score, and change the pitcher's stats accordingly

  score = function(scorer) {
    team_batting = $scope.game.game_state.team_batting
    var inn = $scope.game.game_state.inning

    $scope.game.score[team_batting] += 1
    $scope.game.score_by_inning[team_batting][inn - 1] = $scope.game.score_by_inning[team_batting][inn - 1] + 1

    console.log("checking this inning: ")
    console.log($scope.game.score_by_inning[team_batting])
    //....
  }

  // example output :
  // {outs: 0, bases: 1, reach_type: "walk"}
  // {outs: 0, bases: 3, reach_type: "hit"}
  // {outs: 1, bases: 0, out_type: "flew out"}
  // {outs: 1, bases: 1, out_type: "grounded into fielders choice"}


  atbat_sim = function () {
    var team_batting = $scope.game.game_state.team_batting
    var batter = $scope.game.game_state.batter
    console.log(batter.name)
    var pitcher = ""
    if(team_batting == "away"){
      pitcher = $scope.game.pitcher["home"]
    } else {
      pitcher = $scope.game.pitcher["away"]
    }
    
    var pm = (pitcher.WHIP / (pitcher.WHIP + 3)) - batter.OBP
    var rando = Math.random();
    //console.log("random number: " + rando)

    var singles = batter.hits - batter.doubles - batter.triples - batter.homeruns

    var walks_lim   = batter.walks * pm
    var HBP_lim     = (batter.HBP * pm) + walks_lim
    var single_lim  =        singles + (singles * pm) + HBP_lim
    var double_lim  = batter.doubles + (batter.doubles * pm) + single_lim
    var triple_lim  = batter.triples + (batter.triples * pm) + double_lim
    var homerun_lim = batter.homeruns + (batter.homeruns * pm) + triple_lim
    var strikeout_lim  = batter.strikeouts + homerun_lim
    var groundout_lim  = (batter.AB - batter.hits) * (pitcher.GoFo / (pitcher.GoFo + 1)) + strikeout_lim
    var flyout_lim = (batter.AB - batter.hits) * (1 / (pitcher.GoFo + 1)) + groundout_lim

    var outcome_num = rando * flyout_lim
    if(outcome_num < walks_lim)
      return {outs: 0, bases: 1, reach_type: "walk"}
    if(outcome_num < HBP_lim)
      return {outs: 0, bases: 1, reach_type: "hit by pitch"}
    if(outcome_num < single_lim)
      return {outs: 0, bases: 1, reach_type: "single"}
    if(outcome_num < double_lim)
      return {outs: 0, bases: 2, reach_type: "double"}
    if(outcome_num < triple_lim)
      return {outs: 0, bases: 3, reach_type: "triple"}
    if(outcome_num < homerun_lim)
      return {outs: 0, bases: 4, reach_type: "homerun"}
    if(outcome_num < strikeout_lim)
      return {outs: 1, bases: 0, out_type: "strikeout"}
    if(outcome_num < groundout_lim)
      return {outs: 1, bases: 0, out_type: "groundout"}
    if(outcome_num < flyout_lim)
      return {outs: 1, bases: 0, out_type: "flyout"}

  }

  convert_play_to_text = function(play_recap, batter_name){
    if(play_recap.outs == 1){
      var out_type = play_recap.out_type
      if(out_type == "strikeout"){
        return batter_name + " struck out. "
      }
      if(out_type == "groundout")
        return batter_name + " grounded out. "
      if(out_type == "flyout")
        return batter_name + " flew out. "
    }
    var reach_type = play_recap.reach_type
    if(reach_type == "walk")
      return batter_name + " reached on a walk. "
    if(reach_type == "single")
      return batter_name + " hit a single. "
    if(reach_type == "double")
      return batter_name + " hit a double. "
    if(reach_type == "triple")
      return batter_name + " hit a triple. "
    if(reach_type == "homerun")
      return batter_name + " hit a home run! "
    if(reach_type == "hit by pitch")
      return batter_name + " reached on a hit by pitch. "
  }
  $scope.popup = function() {
    alert("test")
  }



  }
]);