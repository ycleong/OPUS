var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent)
      || this.searchVersion(navigator.appVersion)
      || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i=0;i<data.length;i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {   string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {   // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
         string: navigator.userAgent,
         subString: "iPhone",
         identity: "iPhone/iPod"
      },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]

};
BrowserDetect.init();

var forbiddenIds = ["XXXXXX"]
// Block turkers who have done a version of this experiment before
if (_(forbiddenIds).contains(turk.workerId)) {
  location.href = "already.html"
}

// random(a,b); Returns random number between a and b, inclusive
function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

// Shuffles Array
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

function getCombinations(array, size, start, initialStuff, output) {
    if (initialStuff.length >= size) {
        output.push(initialStuff);
    } else {
        var i;
    
        for (i = start; i < array.length; ++i) {  
             getCombinations(array, size, i + 1, initialStuff.concat(array[i]), output);
        }
    }
}

function getAllPossibleCombinations(array, size, output) {
    getCombinations(array, size, 0, [], output);
}

/* showSlide(id); Displays each slide */
function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

// "Real" code begins here
var movie_cat = [
["appleofmyeye.png","loveontherailroad.png","courtshipedithjames.png","ellisisland.png"],
["railroadstation.png","returninghome.png","findingmonalisa.png","goldseeker.png"],
["planetoftheindigo.png","cyberneticromance.png","23rdcenturyromance.png","builttolast.png"],
["scientist.png","playingthegame.png","spacewarriors.png","worlddome.png"],
["loveoftheking.png","poisonousaffairs.png","ladyinred.png","inchains.png"],
["beforethetrail.png","challenger.png","nitotswords.png","outforblood.png"],
["flood.png","outdated.png","quarantined2.png","labrats.png"],
["loneranger.png","humantrafficking.png","wheretheyvegone.png","400years.png"]];

for (i = 0; i < 8; i++) { 
    movie_cat[i] = _.shuffle(movie_cat[i]);
  }

var images = new Array;

function preload(imgfiles) {
    for (i = 0; i < imgfiles.length; i++) {
        images[i] = new Image();
        images[i].src = "images/" + imgfiles[i];}}

preload([].concat.apply([],movie_cat))

var all_comb = [];
getAllPossibleCombinations([[0],[1],[2],[3],[4],[5],[6],[7]], 2, all_comb);

/*
Show the instructions slide — this is what we want subjects to see first.
*/
showSlide("instructions");

var experiment = {
  
  //Parameters
  OutcomeTime: 1000,
  MaxResponseTime: 4000,
  phase1_comb: _.shuffle(all_comb),
  phase2_comb: _.shuffle(all_comb),

  // Demographics
  gender: "",
  age:"",
  comments:"",

  // Data
  data:[],

// Goes to description slide
description: function() {
  showSlide("description");

  if (turk.previewMode) {
    alert ( "Please accept the HIT before continuing." );
  }

  var movies1 = [];
  var phase = 1;
  for (i = 0; i < 8; i++) { 
    movies1[i] = 
    _.shuffle([movie_cat[i][0],movie_cat[i][0],movie_cat[i][0],movie_cat[i][0],movie_cat[i][1],movie_cat[i][1],movie_cat[i][1]]);
  }

  $(document).keydown(function(event) {
    var keyCode = event.which;

    if (keyCode == 71) {
      $(document).unbind("keydown");
      experiment.startTask(movies1,phase);
    }
  })
},

// Instuctions for phase 2
description2: function() {
  showSlide("description2");

  var movies2 = [];
  var phase = 2;
  for (i = 0; i < 8; i++) { 
    movies2[i] = 
    _.shuffle([movie_cat[i][2],movie_cat[i][2],movie_cat[i][2],movie_cat[i][2],movie_cat[i][3],movie_cat[i][3],movie_cat[i][3]]);
  }

  $(document).keydown(function(event) {
    var keyCode = event.which;

    if (keyCode == 71) {
      $(document).unbind("keydown");
      experiment.startTask(movies2,phase);
    }
  })
},

startTask: function(movies,phase){
  var trial_num = 0;

  if (phase == 1){
    var cond = experiment.phase1_comb;
  } else {
    var cond = experiment.phase2_comb;
  }
  
  experiment.choice_screen(trial_num,movies,cond,phase)
},

choice_screen: function(trial_num,movies,cond,phase) {
  var this_cond = cond.shift();
  console.log(trial_num)
  console.log(this_cond)
  console.log(movies)
  console.log(phase)

    if (typeof this_cond == "undefined") {
      if (phase == 1){
      return experiment.description2();
    } else {
      return experiment.demographics();
    }
  }
  if (Math.random() < 0.5){
    var poster1 = movies[this_cond[0]].shift();
    var cond1 = this_cond[0];

    var poster2 = movies[this_cond[1]].shift();
    var cond2 = this_cond[1];
  } else
  { 
    var poster2 = movies[this_cond[0]].shift();
    var cond2 = this_cond[0];

    var poster1 = movies[this_cond[1]].shift();
    var cond1 = this_cond[1];
  }

  var startTime = (new Date()).getTime();
  showSlide("choice_screen")

  $("img.Poster1").attr("src", "images/" + poster1);
  $("img.Poster2").attr("src", "images/" + poster2);
  $(".left").show();
  $(".right").show();
  trial_num = trial_num + 1;


  $(document).keydown(function(event) {
    var keyCode = event.which;
    if (keyCode == 90) {
    //clearTimeout(timeout);
    var choice = 2;
    $(document).unbind("keydown");
    $(".right").hide();

    var endTime = (new Date()).getTime();

    var data = {
      trial_num: trial_num, 
      poster1:poster1,
      poster2:poster2,
      cond1:cond1,
      cond2:cond2,
      rt:endTime - startTime,
      choice:choice,
      phase: phase
    }
    experiment.data.push(data)
    setTimeout(function(){$(".left").hide();},experiment.OutcomeTime);
    setTimeout(function(){experiment.choice_screen(trial_num,movies,cond,phase);},500+experiment.OutcomeTime);
     }
     else if (keyCode == 77){
      //clearTimeout(timeout);
      var choice = 1;
      $(document).unbind("keydown");
      $(".left").hide();

      var endTime = (new Date()).getTime();
      var data = {
        trial_num: trial_num, 
        poster1:poster1,
        poster2:poster2,
        cond1:cond1,
        cond2:cond2,
        rt: endTime - startTime,
        choice:choice,
        phase: phase
      }
      experiment.data.push(data)
      setTimeout(function(){$(".right").hide();},experiment.OutcomeTime);
      setTimeout(function(){experiment.choice_screen(trial_num,movies,cond,phase);},500+experiment.OutcomeTime);
    }
  })
},

demographics: function() {

  // Show the finish slide.
  showSlide("demographics")

  },

  end: function() {
  if (experiment.tally < 4) {bonus = 20;} else if (experiment.tally > 20){bonus=100;} else{bonus = experiment.tally*5}
  $("#tally_id4").html(bonus);
  experiment.bonus = bonus;
  experiment.gender = $('input[name="genderButton"]:checked').val();
  experiment.age = $("input[name = 'age']").val();
  experiment.comments = $('textarea[name="commentsTextArea"]').val();
  experiment.mobile = $('input[name="mobileButton"]:checked').val();
  var checkboxValues = []
  $('input[type="checkbox"]:checked').each(function(index, elem) {
    checkboxValues.push($(elem).val());
  });
  experiment.race = checkboxValues;


  // Show the finish slide.
  showSlide("end_screen")

  /*
  Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we’re just submitting properties [i.e. data])
  */
  setTimeout(function() {turk.submit(experiment);}, 1200);
  },

};