function q_template(slide_name, phase) {
    return slide({
      name: slide_name,
      present: movies_by_phase[phase],
      present_handle: function(stim){
          // Present movie + question
          $('#'+slide_name+' > .movietitle').html(stim.title);
          $('#'+slide_name+' > .movieplot').html(stim.plot);
          $('#'+slide_name+' > .poster-image').attr('src', 'images/' + stim.poster);
          $('#'+slide_name+' > .questiontext').html(stim.question);
          
          // Shuffle alternatives
          tmp_alts = ['correct', 'alt1', 'alt2', 'alt3'];
          tmp_alts.shuffle();
          
          // Place question alternatives
          $('#'+slide_name+' > .atxt').html(stim[tmp_alts[0]]);
          $('#'+slide_name+' >.btxt').html(stim[tmp_alts[1]]);
          $('#'+slide_name+' >.ctxt').html(stim[tmp_alts[2]]);
          $('.dtxt').html(stim[tmp_alts[3]]);
          
          this.stim = stim;
          this.attempts = 0;
          this.complete = false;
          exp.trialT = Date.now();
          
          $('#'+slide_name+' > .warning').hide();
          $('#'+slide_name+' > .correct').hide();
          $('#'+slide_name+' > .incorrect').hide();
          $('#'+slide_name+' > .continue').hide();
      },
      
      select: function() {
          ans = $("label[for='"+$('input:checked').attr('id')+"']");
          if (Date.now()-exp.trialT < 5000) {
              $('#'+slide_name+' > .warning').show();
          } else {
              $('#'+slide_name+' > .warning').hide();
              if (ans.text() == this.stim.correct & !this.complete) {
                  this.attempts += 1;
                  this.complete = true;
                  console.log("Correct! " + this.attempts);
                  $('#'+slide_name+' > .incorrect').hide();
                  $('#'+slide_name+' > .correct').show();
                  $('#'+slide_name+' > .continue').show();
              } else if (!this.complete) {
                  this.attempts += 1;
                  console.log("Incorrect! " + this.attempts);
                  $('#'+slide_name+' > .correct').hide();
                  $('#'+slide_name+' > .incorrect').show();
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
      }});}

function choice_template(slide_name, phase) {
    return slide({
        name: slide_name,
        present: choices_by_phase[phase],
        present_handle: function(stim) {
            $(document).unbind('keydown');
            
            this.stim = stim;
            exp.trialT = Date.now();
            
            $(slide_name).show();
            
            $('#'+slide_name+' > .img.Poster1').attr('src', 'images/' + stim[0].poster);
            $('#'+slide_name+' > .img.Poster2').attr('src', 'images/' + stim[1].poster);
            
            $('#'+slide_name+' > .left').show();
            $('#'+slide_name+' > .right').show();

            $(document).keydown(function(e) {
                var keyCode = event.which;
                
                // If participant selects the option on the left (Z = 90)
                if (keyCode == 90) {
                    $(document).unbind('keydown');
                    var t = Date.now();
                    _s.key = 1;
                    _s.pick =  _s.stim[0];
                    setTimeout(function(){$('#'+slide_name+' > .right').hide()}, 50)
                    setTimeout(function(){_s.nextTrial()},1500);
                } 
                // If participant selects the option on the right (M = 77)
                else if (keyCode == 77) {
                    $(document).unbind('keydown');
                    _s.key = 2;
                    _s.pick = _s.stim[1];
                    setTimeout(function(){$('#'+slide_name+' > .left').hide()}, 50);
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
    }});}