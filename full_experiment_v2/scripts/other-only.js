// ——————————————— HELPER FUNCTIONS ———————————————
// Returns index of string in an array of strings
function searchStringInArray(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

// Creates "meet the movies" slides
function q_template(slide_name, phase) {
    return slide({
      name: slide_name,
      present: movies_by_phase[phase],
      present_handle: function(stim){
          $(document).unbind('click');
          
          // Set start of trial
          exp.trialT = Date.now();
          exp.selected = false;
          
          // Present movie + question
          $('#'+slide_name+' .movietitle').html(stim.title);
          $('#'+slide_name+' .movieplot').html(stim.plot);
          $('#'+slide_name+' .poster-image').attr('src', 'images/' + stim.poster);
          $('#'+slide_name+' .tags').html('<strong>Tags: </strong>'+stim.tag);
          
          // Shuffle alternatives          
          this.stim = stim;
          
          // Clean up slide
          $('#'+slide_name+' .warning').hide();
          $('#'+slide_name+' .tags').show();
          $('#'+slide_name+' .rating').show();
          $('#'+slide_name+' .check').hide();
          
          $('#'+slide_name+' #checkQ').hide();
          $('#'+slide_name+' #next_movie').hide();
      },
      
      select: function() {
          if (Date.now()-exp.trialT < 5000) {
              // Prevent participants from choosing a rating before they've read the plot
              $("input[type='radio'][name='likert']:checked").prop('checked', false)
              $('#'+slide_name+' .warning').show();
          } else {
              $('#'+slide_name+' .warning').hide();
              exp.selected = true;
              $('#'+slide_name+' #checkQ').show();
          }},
        
        // When continue button is first pressed, show check question
      checkQ: function () {
          if (exp.selected) {
          // Set up slide
          $('#'+slide_name+' .rating').hide();
          $('#'+slide_name+' .tags').hide();
          $('#'+slide_name+' .check').show();
          $('#'+slide_name+' #checkQ').hide();
          
          // Reveal second button
          $('#'+slide_name+' #next_movie').show();        
      }},

      nextTrial: function() {
              // Record RT
              exp.RT = Date.now() - exp.trialT;
              
              // Record data for this trial
              this.log_responses();
              
              // Uncheck all boxes
              $("input[type='radio'][name='likert']:checked").prop('checked', false)
              $("input[type='radio'][name='valence']:checked").prop('checked', false)
              $("input[type='radio'][name='setting']:checked").prop('checked', false)
              $("input[type='radio'][name='genre']:checked").prop('checked', false)

              _stream.apply(this);
      },
      
      log_responses: function() {
          exp.data_trials.push({
             "movie": this.stim.poster,
              "rating": $("input[type='radio'][name='likert']:checked").val(),
              "tags": [$("input[type='radio'][name='valence']:checked").val(),
                       $("input[type='radio'][name='setting']:checked").val(),
                       $("input[type='radio'][name='genre']:checked").val()],
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
    
    slides.phase1 = slide({
        name: 'phase1',
        verified: false,
        present: ['foo'],
        present_handle: function(stim) {
            $('#phase1_demo').attr('src', 'instructions/phase1_demo.gif');
        },
        verify: function() {
            _s.verified = true;
        },
        nextTrial: function() {
            exp.data_trials.push({"verified": this.verified});
            exp.go();
        }
    });
    
    slides.phase2 = slide({
        name: 'phase2',
        present: ['foo'],
        present_handle: function(stim) {
            $('#phase2_demo').attr('src', 'instructions/phase2_demo.gif');
        }
    });

    slides.choice_controls = slide({name: "choice_controls"});
    
    slides.choice_screen = slide({
        name: "choice_screen",
        present: exp_info[1][0],
        correct: exp_info[2][0],
        present_handle: function(stim) {
            $(document).unbind('keydown');
            
            // Setup variables
            this.stim = stim;
            this.right_ans = _s.correct.shift();
            exp.trialT = Date.now();
            var slide_name = "choice_screen";
            var choice_posters = [' .left', ' .right'];
            var ans_displayed = false;
            
            // Retrieve tags for each movie
            poster_tags = [_.find(movies, function(obj) { return obj['poster'] == _s.stim[0]})['tag'],
                           _.find(movies, function(obj) { return obj['poster'] == _s.stim[1]})['tag']];
            
            $(slide_name).show();
            
            // Show posters
            $('#'+slide_name+' .Poster1').attr('src', 'images/' + this.stim[0]);
            $('#'+slide_name+' .Poster2').attr('src', 'images/' + this.stim[1]);
            
            // Show tags
            $('#poster1_tags').html(poster_tags[0]);
            $('#poster2_tags').html(poster_tags[1]);
            
            // Clean up slide
            $('#'+slide_name+' .left').show();
            $('#'+slide_name+' .right').show();
            $('#'+slide_name+' .correct').hide();
            $('#'+slide_name+' .incorrect').hide();
            $('#'+slide_name+' .left img').removeClass('target-answer correct-answer wrong-answer');
            $('#'+slide_name+' .right img').removeClass('target-answer correct-answer wrong-answer');
            $('#'+slide_name+' .left img').addClass('unselected');
            $('#'+slide_name+' .right img').addClass('unselected');
            $('#'+slide_name+' .ans_feedback').html("<h1 style='text-align:center;'>&nbsp;</h1>");
            
            
            setTimeout(function(){
                ans_poster = '#'+slide_name+choice_posters[searchStringInArray(_s.right_ans, _s.stim)]+" img";
                $(ans_poster).removeClass('unselected');
                $(ans_poster).addClass('target-answer');
                ans_displayed = true; // Prevents participants from responding before they see a target answer come up
                
                }, 1250)

            $(document).keydown(function(event) {
                var keyCode = event.which;
                
                // If participant selects the option on the left (Z = 90)
                if (ans_displayed && (keyCode == 90 | keyCode == 77)) {
                    $(document).unbind('keydown');
                    var t = Date.now();
                    _s.key = ((keyCode == 90)?  0 : 1)
                    _s.pick = _s.stim[_s.key];
                    
                    $('#'+slide_name+' .left img').removeClass('target-answer');
                    $('#'+slide_name+' .right img').removeClass('target-answer');
                                        
                    if (_s.pick == _s.right_ans) {
                        $('#'+slide_name+choice_posters[_s.key]+" img").addClass('correct-answer');
                        $('#'+slide_name+' .ans_feedback').html('<h1 style = "text-align: center; color: #66cdaa;">Correct!</h1>');
                    } else {
                        $('#'+slide_name+choice_posters[_s.key]+" img").addClass('wrong-answer');
                        $('#'+slide_name+' .ans_feedback').html('<h1 style = "text-align: center; color: #FF4444;">Incorrect!</h1>');
                    }
                    
                    //setTimeout(function(){$('#'+slide_name+choice_posters[((_s.key == 0)? 1 : 0)]).hide()}, 50);
                    setTimeout(function(){_s.nextTrial()},2000);
                }})}, 
        
        nextTrial: function() {
        this.log_responses();
        _stream.apply(this);
    },
    
    log_responses: function() {
        exp.data_trials.push({
            "options": [this.stim[0], this.stim[1]],
            "condition": exp_info[0][0].shift(),
            "key": this.key,
            "ans": this.right_ans,
            "correct": this.pick == this.right_ans,
            "choice": this.pick,
            "rt_in_seconds": (Date.now() - exp.trialT)/1000
        });
    }});
    
    slides.halfway_there = slide({name: "halfway_there"});
 
    slides.comprehension2 = q_template("comprehension", 1);

    slides.choice_controls2 = slide({name: "choice_controls"});
    
    slides.choice_screen2 = slide({
        name: "choice_screen",
        present: exp_info[1][1],
        correct: exp_info[2][1],
        present_handle: function(stim) {
            $(document).unbind('keydown');
            
            // Setup variables
            this.stim = stim;
            this.right_ans = _s.correct.shift();
            exp.trialT = Date.now();
            var slide_name = "choice_screen";
            var choice_posters = [' .left', ' .right'];
            
            $(slide_name).show();
            
            // Retrieve tags for each movie
            poster_tags = [_.find(movies, function(obj) { return obj['poster'] == _s.stim[0]})['tag'],
                           _.find(movies, function(obj) { return obj['poster'] == _s.stim[1]})['tag']];
            
            // Place poster images
            var choice_posters = [' .left', ' .right'];
            $('#'+slide_name+' .Poster1').attr('src', 'images/' + this.stim[0]);
            $('#'+slide_name+' .Poster2').attr('src', 'images/' + this.stim[1]);
            
            // Show tags
            $('#poster1_tags').html(poster_tags[0]);
            $('#poster2_tags').html(poster_tags[1]);
            
            // Clean up slide
            $('#'+slide_name+' .left').show();
            $('#'+slide_name+' .right').show();
            $('#'+slide_name+' .correct').hide();
            $('#'+slide_name+' .incorrect').hide();
            $('#'+slide_name+' .left img').removeClass('correct-answer wrong-answer target-answer');
            $('#'+slide_name+' .right img').removeClass('correct-answer wrong-answer target-answer');
            $('#'+slide_name+' .left img').addClass('unselected');
            $('#'+slide_name+' .right img').addClass('unselected');
            $('#'+slide_name+' .ans_feedback').html("<h1 style='text-align:center;'>Which movie did Turker choose?</h1>");

            $(document).keydown(function(event) {
                var keyCode = event.which;
                
                // If participant selects the option on the left (Z = 90)
                if (keyCode == 90 | keyCode == 77) {
                    $(document).unbind('keydown');
                    var t = Date.now();
                    _s.key = ((keyCode == 90)?  0 : 1)
                    _s.pick = _s.stim[_s.key];
                    
                    $('#'+slide_name+choice_posters[_s.key]+" img").removeClass('unselected');
                    $('#'+slide_name+choice_posters[_s.key]+" img").addClass('target-answer');
                    
                    setTimeout(function(){_s.nextTrial()},1500);
                }})}, 
        
        nextTrial: function() {
        this.log_responses();
        _stream.apply(this);
    },
    
    log_responses: function() {
        exp.data_trials.push({
            "options": [this.stim[0], this.stim[1]],
            "condition": exp_info[0][1].shift(),
            "key": this.key,
            "ans": this.right_ans,
            "correct": this.pick == this.right_ans,
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
        preferences: $("#preferences").val(),
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
              "condition" : exp.target,
              "counterbalancing": exp.counterbalancing,
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
    
    exp.target = _.sample([0, 1, 2, 3]);
    exp_info = get_ans(exp.target);
    exp.trials = [];
  exp.catch_trials = [];
  exp.counterbalancing = {
      movie_order: movies_by_phase,
      condition_order: exp_info[0],
      choice_order: exp_info[1]
  };
    exp.ans = exp_info[2];
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
    exp.structure=['i0', 'comprehension', 'phase1', 'choice_screen', 'halfway_there',
                   'comprehension2', 'phase2', 'choice_screen2', 'survey', 'thanks'];
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