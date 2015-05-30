function q_template(slide_name, phase) {
    return slide({
      name: slide_name,
      present: movies_by_phase[phase],
      present_handle: function(stim){
          // Present movie + question
          $('#'+slide_name+' .movietitle').html(stim.title);
          $('#'+slide_name+' .movieplot').html(stim.plot);
          $('#'+slide_name+' .poster-image').attr('src', 'images/' + stim.poster);
          $('#'+slide_name+' .questiontext').html(stim.question);
          
          // Shuffle alternatives
          tmp_alts = ['correct', 'alt1', 'alt2', 'alt3'];
          ans_labels = ['optiona', 'optionb', 'optionc', 'optiond'];
          tmp_alts.shuffle();
          
          // Place question alternatives
          $('#'+slide_name+' .atxt').html(stim[tmp_alts[0]]);
          $('#'+slide_name+' .btxt').html(stim[tmp_alts[1]]);
          $('#'+slide_name+' .ctxt').html(stim[tmp_alts[2]]);
          $('#'+slide_name+' .dtxt').html(stim[tmp_alts[3]]);
          
          this.stim = stim;
          this.attempts = 0;
          this.clicks = [];
          this.complete = false;
          exp.trialT = Date.now();
          
          $('#'+slide_name+' .warning').hide();
          $('#'+slide_name+' .correct').hide();
          $('#'+slide_name+' .incorrect').hide();
          $('#'+slide_name+' .continue').hide();
      },
      
      select: function() {
          ans = $("#"+slide_name+" label[for='"+$('input:checked').attr('class')+"']");
          if (Date.now()-exp.trialT < 5000) {
              $('#'+slide_name+' .warning').show();
          } else {
              $('#'+slide_name+' .warning').hide();
              this.clicks.push(tmp_alts[ans_labels.indexOf($(ans).attr('for'))]);
              if (ans.text() == this.stim.correct & !this.complete) {
                  this.attempts += 1;
                  this.complete = true;
                  console.log("Correct! " + this.attempts);
                  $('#'+slide_name+' .incorrect').hide();
                  $('#'+slide_name+' .correct').show();
                  $('#'+slide_name+' .continue').show();
              } else if (!this.complete) {
                  this.attempts += 1;
                  console.log("Incorrect! " + this.attempts);
                  $('#'+slide_name+' .correct').hide();
                  $('#'+slide_name+' .incorrect').show();
          }}},
      
      nextTrial: function() {
          $("." + ans.attr('for')).prop('checked', false)
          exp.RT = Date.now() - exp.trialT;
          this.log_responses();
          _stream.apply(this);
      },
      
      log_responses: function() {
          exp.data_trials.push({
             "movie": this.stim.title,
			 "attempts": this.attempts,
              "clicks": this.clicks,
             "rt_in_seconds": (Date.now() - exp.trialT)/1000
			 });
      }});}

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
    
    slides.comprehension = q_template("comprehension", 0);

    slides.choice_controls = slide({name: "choice_controls"});
    
    slides.choice_screen = slide({
        name: "choice_screen",
        present: choices_by_phase[0],
        present_handle: function(stim) {
            $(document).unbind('keydown');
            
            this.stim = stim;
            exp.trialT = Date.now();
            var slide_name = "choice_screen";
            
            $(slide_name).show();
            
            $('#'+slide_name+' .Poster1').attr('src', 'images/' + this.stim[0].poster);
            $('#'+slide_name+' .Poster2').attr('src', 'images/' + this.stim[1].poster);
            
            $('#'+slide_name+' .left').show();
            $('#'+slide_name+' .right').show();

            $(document).keydown(function(e) {
                var keyCode = event.which;
                
                // If participant selects the option on the left (Z = 90)
                if (keyCode == 90) {
                    $(document).unbind('keydown');
                    var t = Date.now();
                    _s.key = 1;
                    _s.pick =  _s.stim[0];
                    setTimeout(function(){$('#'+slide_name+' .right').hide()}, 50)
                    setTimeout(function(){_s.nextTrial()},1500);
                } 
                // If participant selects the option on the right (M = 77)
                else if (keyCode == 77) {
                    $(document).unbind('keydown');
                    _s.key = 2;
                    _s.pick = _s.stim[1];
                    setTimeout(function(){$('#'+slide_name+' .left').hide()}, 50);
                    setTimeout(function(){_s.nextTrial()},1500);
                }});
        },
        nextTrial: function() {
        this.log_responses();
        _stream.apply(this);
    },
    
    log_responses: function() {
        exp.data_trials.push({
            "options": [this.stim[0].title, this.stim[1].title],
            "condition": [this.stim[0].cond, this.stim[1].cond],
            "key": this.key,
            "choice": this.pick,
            "rt_in_seconds": (Date.now() - exp.trialT)/1000
        });
    }});
    
    slides.halfway_there = slide({name: "halfway_there"});
 
    slides.comprehension2 = q_template("comprehension2", 1);

    slides.choice_controls2 = slide({name: "choice_controls2"});
    
    slides.choice_screen2 = slide({
        name: "choice_screen2",
        present: choices_by_phase[1],
        present_handle: function(stim) {
            $(document).unbind('keydown');
            
            this.stim = stim;
            exp.trialT = Date.now();
            var slide_name = "choice_screen2";
            
            $(slide_name).show();
            
            $('#'+slide_name+' .Poster1').attr('src', 'images/' + this.stim[0].poster);
            $('#'+slide_name+' .Poster2').attr('src', 'images/' + this.stim[1].poster);
            
            $('#'+slide_name+' .left').show();
            $('#'+slide_name+' .right').show();

            $(document).keydown(function(e) {
                var keyCode = event.which;
                
                // If participant selects the option on the left (Z = 90)
                if (keyCode == 90) {
                    $(document).unbind('keydown');
                    var t = Date.now();
                    _s.key = 1;
                    _s.pick =  _s.stim[0];
                    setTimeout(function(){$('#'+slide_name+' .right').hide()}, 50)
                    setTimeout(function(){_s.nextTrial()},1500);
                } 
                // If participant selects the option on the right (M = 77)
                else if (keyCode == 77) {
                    $(document).unbind('keydown');
                    _s.key = 2;
                    _s.pick = _s.stim[1];
                    setTimeout(function(){$('#'+slide_name+' .left').hide()}, 50);
                    setTimeout(function(){_s.nextTrial()},1500);
                }});
        },
        nextTrial: function() {
        this.log_responses();
        _stream.apply(this);
    },
    
    log_responses: function() {
        exp.data_trials.push({
            "options": this.stim,
            "condition": [this.stim[0].cond, this.stim[1].cond],
            "key": this.key,
            "choice": this.pick,
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
  exp.counterbalancing = {
      movie_order: movies_by_phase,
      condition_order: conditions_by_phase,
      choice_order: choices_by_phase
  };
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
    exp.structure=['i0', 'comprehension', 'choice_controls', 'choice_screen', 'halfway_there',
                   'comprehension2', 'choice_controls2', 'choice_screen2',
                   'survey', 'thanks'];
    //exp.structure = ['i0', 'choice_screen'];
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