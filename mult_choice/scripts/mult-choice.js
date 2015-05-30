function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
      },
      button : function() {
          exp.go();
      }
  });
  
  slides.comprehension = slide({
      name: "comprehension",
      present: movies_by_phase[0],
      present_handle: function(stim){
          // Present movie + question
          $('#movietitle').html(stim.title);
          $('#movieplot').html(stim.plot);
          $('#poster-image').attr('src', 'images/' + stim.poster);
          $('#questiontext').html(stim.question);
          
          // Shuffle alternatives
          tmp_alts = ['correct', 'alt1', 'alt2', 'alt3'];
          tmp_alts.shuffle();
          
          // Place question alternatives
          $('#atxt').html(stim[tmp_alts[0]]);
          $('#btxt').html(stim[tmp_alts[1]]);
          $('#ctxt').html(stim[tmp_alts[2]]);
          $('#dtxt').html(stim[tmp_alts[3]]);
          
          this.stim = stim;
          this.attempts = 0;
          this.complete = false;
          exp.trialT = Date.now();
          
          $("#warning").hide();
          $("#correct").hide();
          $("#incorrect").hide();
          $("#continue").hide();
      },
      
      select: function() {
          ans = $("label[for='"+$('input:checked').attr('id')+"']");
          if (Date.now()-exp.trialT < 10000) {
              $("#warning").show();
          } else {
              $("#warning").hide();
              if (ans.text() == this.stim.correct & !this.complete) {
                  this.attempts += 1;
                  this.complete = true;
                  console.log("Correct! " + this.attempts);
                  $("#incorrect").hide();
                  $("#correct").show();
                  $("#continue").show();
              } else if (!this.complete) {
                  this.attempts += 1;
                  console.log("Incorrect! " + this.attempts);
                  $("#correct").hide();
                  $("#incorrect").show();
          }}},
      
      nextTrial: function() {
          $("#" + ans.attr('for')).prop('checked', false)
          exp.RT = Date.now() - exp.trialT;
          this.log_responses();
          _stream.apply(this);
      },
      
      log_responses: function() {
          exp.data_trials.push({
             "movie": this.stim.title,
			 "attempts": this.attempts,
             "rt_in_seconds": (Date.now() - exp.trialT)/1000
			 });
      }});
    
    slides.survey =  slide({
    name : "survey",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }});
    
    slides.thanks = slide({
        name : "thanks",
        start : function() {
          exp.data= {
              "trials" : exp.data_trials,
              "system" : exp.system,
              "condition" : exp.condition,
              "subject_information" : exp.subj_data,
              "time_in_minutes" : (Date.now() - exp.startT)/60000
          };
          setTimeout(function() {turk.submit(exp.data);}, 1000);
        }
      });
    
  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["CONDITION 1", "condition 2"]); //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=['i0', 'comprehension', 'survey', 'thanks'];
  
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}